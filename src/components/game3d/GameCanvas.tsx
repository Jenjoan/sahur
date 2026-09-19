import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { SingaporeWorld } from './SingaporeWorld';
import { ConsequenceCentreWorld, ConsequenceCentreInteractiveSpot } from './ConsequenceCentreWorld';
import { PlayerCharacter } from './PlayerCharacter';
import { WorldEntitiesManager } from './WorldEntitiesManager';
import { WORLD_ENTITIES, GAME_MISSIONS } from '../../data/missions';
import { CharacterId, WorldEntity, ChoiceOption, GameMission } from '../../types';
import { MissionHUD } from './MissionHUD';
import { InteractionDialogModal } from './InteractionDialogModal';
import { PoliceStationModals } from './PoliceStationModals';
import { soundFx } from '../../utils/soundEffects';

interface GameCanvasProps {
  activeCharacterId: CharacterId;
  onOpenPhone: () => void;
  onOpenLifeAlbum: () => void;
  onOpenCharacterSelect: () => void;
  onOpenCombatArcade: () => void;
  onUnlockMemory: (memoryId: string) => void;
  unreadPhoneCount: number;
  unlockedMemoryCount: number;
  totalMemories: number;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  activeCharacterId,
  onOpenPhone,
  onOpenLifeAlbum,
  onOpenCharacterSelect,
  onOpenCombatArcade,
  onUnlockMemory,
  unreadPhoneCount,
  unlockedMemoryCount,
  totalMemories,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Game Mission state
  const [currentMission, setCurrentMission] = useState<GameMission>(GAME_MISSIONS[0]);
  const [currentLocation, setCurrentLocation] = useState<'neighbourhood' | 'consequence_centre'>('neighbourhood');
  const [nearbyEntity, setNearbyEntity] = useState<WorldEntity | null>(null);
  const [distanceToEntity, setDistanceToEntity] = useState<number>(999);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogEntity, setDialogEntity] = useState<WorldEntity | null>(null);

  // Police Station Interior Modal state
  const [policeModal, setPoliceModal] = useState<{
    isOpen: boolean;
    type: 'case' | 'law' | 'evidence' | 'consequence' | 'dilemma' | 'reception' | null;
    activeId: string | null;
    dilemmaOptionId?: 'A' | 'B' | 'C' | null;
  }>({
    isOpen: false,
    type: null,
    activeId: null,
    dilemmaOptionId: null,
  });

  // Player state
  const [playerPosition, setPlayerPosition] = useState<{ x: number; z: number }>({ x: -14, z: -25 });
  const [playerHeading, setPlayerHeading] = useState<number>(0);
  const [sprintStamina, setSprintStamina] = useState<number>(100);
  const [isSprinting, setIsSprinting] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.getMuted());

  // Input states
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const virtualInput = useRef<{ x: number; z: number }>({ x: 0, z: 0 });
  const mouseDrag = useRef<{ isDragging: boolean; lastX: number; lastY: number }>({
    isDragging: false,
    lastX: 0,
    lastY: 0,
  });

  // Camera Orbit Angles
  const cameraAngles = useRef<{ theta: number; phi: number }>({
    theta: 0, // Horizontal orbit angle
    phi: 0.38, // Vertical pitch angle
  });

  // Three.js instances ref
  const gameRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    world: SingaporeWorld;
    consequenceWorld: ConsequenceCentreWorld;
    player: PlayerCharacter;
    entitiesManager: WorldEntitiesManager;
    clock: THREE.Clock;
    animFrameId: number;
    currentLocation: 'neighbourhood' | 'consequence_centre';
  } | null>(null);

  // Location Transition Handler
  const switchLocation = useCallback((targetLoc: 'neighbourhood' | 'consequence_centre') => {
    if (!gameRef.current) return;
    soundFx.playChoiceChime('neutral');

    if (targetLoc === 'consequence_centre') {
      gameRef.current.currentLocation = 'consequence_centre';
      gameRef.current.consequenceWorld.applyAtmosphere();
      gameRef.current.player.position.set(0, ConsequenceCentreWorld.Y_OFFSET, -20);
      gameRef.current.player.mesh.position.copy(gameRef.current.player.position);
      cameraAngles.current.theta = Math.PI; // Face north into museum
      setCurrentLocation('consequence_centre');
    } else {
      gameRef.current.currentLocation = 'neighbourhood';
      gameRef.current.world.applyAtmosphere();
      gameRef.current.player.position.set(34, 0, -22);
      gameRef.current.player.mesh.position.copy(gameRef.current.player.position);
      cameraAngles.current.theta = 0;
      setCurrentLocation('neighbourhood');
    }
  }, []);

  // Initialize Three.js Engine
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera (Third-person perspective)
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 500);

    // 3. Renderer with realistic lighting & shadows
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 4. Build Outdoor Singapore World
    const world = new SingaporeWorld(scene);

    // 5. Build Police Station Consequence Centre Interior
    const consequenceWorld = new ConsequenceCentreWorld(scene);

    // 6. Spawn Player Character
    const startPos =
      activeCharacterId === 'jay'
        ? new THREE.Vector3(26, 0, -18)
        : activeCharacterId === 'eli'
        ? new THREE.Vector3(-14, 0, 24)
        : activeCharacterId === 'lina'
        ? new THREE.Vector3(20, 0, 30)
        : new THREE.Vector3(-14, 0, -25);

    const player = new PlayerCharacter(scene, activeCharacterId, startPos);

    // 7. Spawn World Entities
    const entitiesManager = new WorldEntitiesManager(scene, WORLD_ENTITIES);

    const clock = new THREE.Clock();

    gameRef.current = {
      scene,
      camera,
      renderer,
      world,
      consequenceWorld,
      player,
      entitiesManager,
      clock,
      animFrameId: 0,
      currentLocation: 'neighbourhood',
    };

    // 8. Main Game Loop
    let staminaVal = 100;

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();
      const loc = gameRef.current ? gameRef.current.currentLocation : 'neighbourhood';

      // Gather Input
      let moveX = virtualInput.current.x;
      let moveZ = virtualInput.current.z;

      if (keysPressed.current['KeyW'] || keysPressed.current['ArrowUp']) moveZ -= 1;
      if (keysPressed.current['KeyS'] || keysPressed.current['ArrowDown']) moveZ += 1;
      if (keysPressed.current['KeyA'] || keysPressed.current['ArrowLeft']) moveX -= 1;
      if (keysPressed.current['KeyD'] || keysPressed.current['ArrowRight']) moveX += 1;

      const wantsSprint =
        (keysPressed.current['ShiftLeft'] || keysPressed.current['ShiftRight'] || isSprinting) &&
        (Math.abs(moveX) > 0 || Math.abs(moveZ) > 0);

      // Handle Stamina
      if (wantsSprint && staminaVal > 5) {
        staminaVal = Math.max(0, staminaVal - delta * 25);
      } else {
        staminaVal = Math.min(100, staminaVal + delta * 15);
      }
      setSprintStamina(Math.round(staminaVal));

      const canSprint = wantsSprint && staminaVal > 10;

      // Update Player with matching collision world
      const activeCollisionWorld = loc === 'consequence_centre' ? consequenceWorld : world;
      player.update(delta, { x: moveX, z: moveZ }, canSprint, cameraAngles.current.theta, activeCollisionWorld);

      // Update Camera (Spring-arm Third Person Follow)
      const camDist = 7.5;
      const camHeight = 3.2;
      const theta = cameraAngles.current.theta;
      const phi = cameraAngles.current.phi;

      const camX = player.position.x - Math.sin(theta) * Math.cos(phi) * camDist;
      const camZ = player.position.z - Math.cos(theta) * Math.cos(phi) * camDist;
      const camY = player.position.y + Math.sin(phi) * camDist + camHeight;

      camera.position.set(camX, camY, camZ);
      camera.lookAt(player.position.x, player.position.y + 1.6, player.position.z);

      // Update Visuals
      if (loc === 'consequence_centre') {
        consequenceWorld.update(delta, time);
      } else {
        entitiesManager.update(delta, time);
      }

      // Update React HUD position state
      setPlayerPosition({ x: player.position.x, z: player.position.z });
      setPlayerHeading(theta);

      // Proximity Detection
      if (loc === 'consequence_centre') {
        let closestSpot: ConsequenceCentreInteractiveSpot | null = null;
        let closestDist = 999;

        consequenceWorld.interactiveSpots.forEach((spot) => {
          const d = Math.hypot(spot.position.x - player.position.x, spot.position.z - player.position.z);
          if (d < spot.interactionDistance && d < closestDist) {
            closestSpot = spot;
            closestDist = d;
          }
        });

        if (closestSpot) {
          const s: ConsequenceCentreInteractiveSpot = closestSpot;
          const virtualEntity: WorldEntity = {
            id: s.id,
            name: s.name,
            role: s.sublabel,
            type: s.category === 'npc' ? 'npc' : 'object',
            position: { x: s.position.x, y: s.position.y, z: s.position.z },
            interactionDistance: s.interactionDistance,
            promptText: s.label,
          };
          setNearbyEntity(virtualEntity);
          setDistanceToEntity(Math.round(closestDist * 10) / 10);
        } else {
          setNearbyEntity(null);
          setDistanceToEntity(999);
        }
      } else {
        let closest: WorldEntity | null = null;
        let closestDist = 999;

        WORLD_ENTITIES.forEach((entity) => {
          const d = Math.hypot(entity.position.x - player.position.x, entity.position.z - player.position.z);
          if (d < (entity.interactionDistance || 3.8) && d < closestDist) {
            closest = entity;
            closestDist = d;
          }
        });

        setNearbyEntity(closest);
        setDistanceToEntity(Math.round(closestDist * 10) / 10);
      }

      renderer.render(scene, camera);
      gameRef.current!.animFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (gameRef.current) {
        cancelAnimationFrame(gameRef.current.animFrameId);
        renderer.dispose();
      }
    };
  }, [activeCharacterId]);

  // Open Interaction Dialog or Police Station Modals
  const handleInteract = () => {
    if (!nearbyEntity) return;

    // 1. If at Police Station Entrance in Neighbourhood
    if (nearbyEntity.id === 'police_station_entrance') {
      switchLocation('consequence_centre');
      return;
    }

    // 2. If at Exit doors inside Consequence Centre
    if (nearbyEntity.id === 'spot_exit_neighbourhood') {
      switchLocation('neighbourhood');
      return;
    }

    // 3. If inside Consequence Centre at an interactive exhibit
    if (gameRef.current?.currentLocation === 'consequence_centre') {
      soundFx.playClick();
      const spot = gameRef.current.consequenceWorld.interactiveSpots.find((s) => s.id === nearbyEntity.id);
      if (spot) {
        if (spot.category === 'case') {
          setPoliceModal({ isOpen: true, type: 'case', activeId: spot.targetId || null });
        } else if (spot.category === 'law') {
          setPoliceModal({ isOpen: true, type: 'law', activeId: spot.targetId || null });
        } else if (spot.category === 'evidence') {
          setPoliceModal({ isOpen: true, type: 'evidence', activeId: spot.targetId || null });
        } else if (spot.category === 'consequence') {
          setPoliceModal({ isOpen: true, type: 'consequence', activeId: null });
        } else if (spot.category === 'dilemma') {
          setPoliceModal({ isOpen: true, type: 'dilemma', activeId: null, dilemmaOptionId: spot.podiumId || null });
        } else if (spot.category === 'npc') {
          setPoliceModal({ isOpen: true, type: 'reception', activeId: null });
        }
        return;
      }
    }

    // 4. Default outdoor NPC / inspectable object
    soundFx.playClick();
    setDialogEntity(nearbyEntity);
    setIsDialogOpen(true);

    const currentObj = currentMission.objectives[currentMission.currentObjectiveIndex];
    if (currentObj && currentObj.targetEntityId === nearbyEntity.id) {
      advanceMissionObjective();
    }
  };

  // Handle Keyboard Listeners
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = true;

      // Interaction shortcut [E]
      if (e.code === 'KeyE' && nearbyEntity && !isDialogOpen && !policeModal.isOpen) {
        handleInteract();
      }

      // Life Album shortcut [KeyM]
      if (e.code === 'KeyM' && !isDialogOpen && !policeModal.isOpen) {
        soundFx.playClick();
        onOpenLifeAlbum();
      }

      // Phone shortcut [KeyP]
      if (e.code === 'KeyP' && !isDialogOpen && !policeModal.isOpen) {
        soundFx.playClick();
        onOpenPhone();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [nearbyEntity, isDialogOpen, policeModal.isOpen, onOpenLifeAlbum, onOpenPhone, switchLocation]);

  // Mouse / Touch Drag to Orbit Camera
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseDrag.current = { isDragging: true, lastX: e.clientX, lastY: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mouseDrag.current.isDragging) return;
    const dx = e.clientX - mouseDrag.current.lastX;
    const dy = e.clientY - mouseDrag.current.lastY;
    mouseDrag.current.lastX = e.clientX;
    mouseDrag.current.lastY = e.clientY;

    cameraAngles.current.theta -= dx * 0.006;
    cameraAngles.current.phi = Math.max(0.1, Math.min(0.8, cameraAngles.current.phi + dy * 0.005));
  };

  const handleMouseUp = () => {
    mouseDrag.current.isDragging = false;
  };

  const advanceMissionObjective = useCallback(() => {
    setCurrentMission((prev) => {
      const nextIdx = prev.currentObjectiveIndex + 1;
      const updatedObjectives = prev.objectives.map((obj, idx) =>
        idx === prev.currentObjectiveIndex ? { ...obj, isCompleted: true } : obj
      );

      const isAllDone = nextIdx >= prev.objectives.length;
      if (isAllDone) {
        soundFx.playChoiceChime('positive');
      }

      return {
        ...prev,
        objectives: updatedObjectives,
        currentObjectiveIndex: Math.min(nextIdx, prev.objectives.length - 1),
        isCompleted: isAllDone,
      };
    });
  }, []);

  const handleSelectChoice = (choice: ChoiceOption, entity: WorldEntity) => {
    soundFx.playChoiceChime(choice.consequenceType);
    advanceMissionObjective();
    if (entity.associatedMemoryId) {
      onUnlockMemory(entity.associatedMemoryId);
    }
  };

  const toggleMute = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="relative w-full h-[calc(100vh-4rem)] overflow-hidden bg-slate-950 select-none cursor-grab active:cursor-grabbing"
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Fortnite-inspired Realism Mission HUD */}
      <MissionHUD
        mission={currentMission}
        activeCharacterId={activeCharacterId}
        nearbyEntity={nearbyEntity}
        distanceToEntity={distanceToEntity}
        playerHeading={playerHeading}
        playerPosition={playerPosition}
        sprintStamina={sprintStamina}
        isSprinting={isSprinting}
        isMuted={isMuted}
        currentLocation={currentLocation}
        onToggleLocation={switchLocation}
        onToggleMute={toggleMute}
        onInteract={handleInteract}
        onOpenPhone={onOpenPhone}
        onOpenLifeAlbum={onOpenLifeAlbum}
        onOpenCharacterSelect={onOpenCharacterSelect}
        onOpenCombatArcade={onOpenCombatArcade}
        unreadPhoneCount={unreadPhoneCount}
        unlockedMemoryCount={unlockedMemoryCount}
        totalMemories={totalMemories}
        onVirtualMove={(v) => {
          virtualInput.current = v;
        }}
        onToggleSprint={() => setIsSprinting(!isSprinting)}
      />

      {/* Realistic NPC Dialogue & Inspection Modal */}
      <InteractionDialogModal
        entity={dialogEntity}
        activeCharacterId={activeCharacterId}
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setDialogEntity(null);
        }}
        onSelectChoice={handleSelectChoice}
        onUnlockMemory={onUnlockMemory}
      />

      {/* Police Station Consequence Centre Modals */}
      <PoliceStationModals
        isOpen={policeModal.isOpen}
        modalType={policeModal.type}
        activeId={policeModal.activeId}
        dilemmaOptionId={policeModal.dilemmaOptionId}
        onClose={() => {
          setPoliceModal({ isOpen: false, type: null, activeId: null, dilemmaOptionId: null });
        }}
        onUnlockMemory={onUnlockMemory}
      />
    </div>
  );
};
