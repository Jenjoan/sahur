import * as THREE from 'three';
import { WorldCollisionBox } from './SingaporeWorld';

export interface ConsequenceCentreInteractiveSpot {
  id: string;
  name: string;
  category: 'law' | 'case' | 'evidence' | 'consequence' | 'dilemma' | 'exit' | 'npc';
  position: THREE.Vector3;
  interactionDistance: number;
  label: string;
  sublabel: string;
  targetId?: string;
  podiumId?: 'A' | 'B' | 'C';
}

export class ConsequenceCentreWorld {
  public static readonly Y_OFFSET = -100;
  public scene: THREE.Scene;
  public rootGroup: THREE.Group;
  public collisionBoxes: WorldCollisionBox[] = [];
  public interactiveSpots: ConsequenceCentreInteractiveSpot[] = [];
  private lights: THREE.Light[] = [];
  private animatedMeshes: { mesh: THREE.Object3D; basePos: THREE.Vector3; speed: number; rotSpeed: number }[] = [];

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.rootGroup = new THREE.Group();
    this.rootGroup.position.set(0, ConsequenceCentreWorld.Y_OFFSET, 0);
    this.scene.add(this.rootGroup);

    this.buildAtmosphere();
    this.buildFloorAndCeiling();
    this.buildWallsAndPartitions();
    this.buildAtriumAndReception();
    this.buildLawWallWing();
    this.buildDetentionCorridor();
    this.buildEvidenceRoom();
    this.buildConsequenceWall();
    this.buildDilemmaChamber();
  }

  // 1. Atmosphere configuration
  public applyAtmosphere() {
    this.scene.background = new THREE.Color(0x0a101d);
    this.scene.fog = new THREE.FogExp2(0x0a101d, 0.015);
  }

  private buildAtmosphere() {
    // Cool white ambient museum light
    const hemiLight = new THREE.HemisphereLight(0x94a3b8, 0x1e293b, 0.85);
    this.rootGroup.add(hemiLight);
    this.lights.push(hemiLight);

    // Overhead central soft directional light
    const dirLight = new THREE.DirectionalLight(0xe2e8f0, 0.9);
    dirLight.position.set(0, 15, 0);
    dirLight.castShadow = true;
    this.rootGroup.add(dirLight);
    this.lights.push(dirLight);
  }

  // 2. Floor & Ceiling
  private buildFloorAndCeiling() {
    // Polished dark slate granite flooring
    const floorGeo = new THREE.PlaneGeometry(54, 54);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x111927,
      roughness: 0.25,
      metalness: 0.2,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.rootGroup.add(floor);

    // High ceiling with acoustic panels
    const ceilGeo = new THREE.PlaneGeometry(54, 54);
    const ceilMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.9,
    });
    const ceil = new THREE.Mesh(ceilGeo, ceilMat);
    ceil.rotation.x = Math.PI / 2;
    ceil.position.y = 5.6;
    this.rootGroup.add(ceil);

    // Recessed LED Guide Lines on the floor (Teal & Blue)
    const lineMat = new THREE.MeshBasicMaterial({ color: 0x14b8a6 });
    // North line to detention
    const lineNorth = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 20), lineMat);
    lineNorth.rotation.x = -Math.PI / 2;
    lineNorth.position.set(0, 0.02, 0);
    this.rootGroup.add(lineNorth);

    // West line to Law Wall
    const lineWest = new THREE.Mesh(new THREE.PlaneGeometry(16, 0.3), lineMat);
    lineWest.rotation.x = -Math.PI / 2;
    lineWest.position.set(-8, 0.02, -6);
    this.rootGroup.add(lineWest);

    // East line to Evidence Room
    const lineEast = new THREE.Mesh(new THREE.PlaneGeometry(16, 0.3), lineMat);
    lineEast.rotation.x = -Math.PI / 2;
    lineEast.position.set(8, 0.02, -6);
    this.rootGroup.add(lineEast);
  }

  // 3. Perimeter Walls & Room Partitions
  private buildWallsAndPartitions() {
    const wallHeight = 5.6;
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.7,
    });

    const createWall = (x: number, z: number, w: number, d: number) => {
      const geo = new THREE.BoxGeometry(w, wallHeight, d);
      const mesh = new THREE.Mesh(geo, wallMat);
      mesh.position.set(x, wallHeight / 2, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.rootGroup.add(mesh);

      this.addCollisionBox(
        new THREE.Vector3(x - w / 2, 0, z - d / 2),
        new THREE.Vector3(x + w / 2, wallHeight, z + d / 2)
      );
      return mesh;
    };

    // Outer boundary walls (54 x 54 m boundary)
    createWall(0, 26, 54, 1.2); // North outer wall
    createWall(0, -26, 54, 1.2); // South outer wall
    createWall(-26, 0, 1.2, 54); // West outer wall
    createWall(26, 0, 1.2, 54); // East outer wall

    // Internal Wing Dividers
    createWall(-11, 4, 1.0, 18); // West corridor partition
    createWall(11, 4, 1.0, 18); // East corridor partition
    createWall(18, 0, 14, 1.0); // Partition between Evidence Room & Consequence Wall
  }

  // 4. Central Atrium & Reception
  private buildAtriumAndReception() {
    const yOff = ConsequenceCentreWorld.Y_OFFSET;

    // Exit Doors to Neighbourhood (South end)
    const exitDoor = new THREE.Group();
    exitDoor.position.set(0, 0, -24.5);

    const doorFrame = new THREE.Mesh(
      new THREE.BoxGeometry(5.0, 3.4, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x0f2438 })
    );
    doorFrame.position.y = 1.7;
    exitDoor.add(doorFrame);

    const doorGlass = new THREE.Mesh(
      new THREE.BoxGeometry(4.4, 3.0, 0.1),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 })
    );
    doorGlass.position.y = 1.7;
    exitDoor.add(doorGlass);

    // Exit Signboard
    const exitSign = new THREE.Mesh(
      new THREE.BoxGeometry(2.8, 0.6, 0.1),
      new THREE.MeshBasicMaterial({ color: 0x22c55e })
    );
    exitSign.position.set(0, 3.6, 0.2);
    exitDoor.add(exitSign);

    this.rootGroup.add(exitDoor);

    this.interactiveSpots.push({
      id: 'spot_exit_neighbourhood',
      name: 'Exit to Singapore Neighbourhood',
      category: 'exit',
      position: new THREE.Vector3(0, yOff, -23),
      interactionDistance: 3.0,
      label: 'Exit to Neighbourhood',
      sublabel: 'Return outdoors to HDB estate',
    });

    // Central Reception Desk
    const deskGroup = new THREE.Group();
    deskGroup.position.set(0, 0, -12);

    const deskCounter = new THREE.Mesh(
      new THREE.BoxGeometry(5.2, 1.15, 1.6),
      new THREE.MeshStandardMaterial({ color: 0x0f2438, roughness: 0.3, metalness: 0.2 })
    );
    deskCounter.position.y = 0.575;
    deskCounter.castShadow = true;
    deskGroup.add(deskCounter);

    // Glowing counter edge
    const edge = new THREE.Mesh(
      new THREE.BoxGeometry(5.25, 0.08, 1.65),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    );
    edge.position.y = 1.15;
    deskGroup.add(edge);

    // Police Officer at Desk (Duty Inspector Wong)
    this.createNPCFigure(deskGroup, 0, 0, 0, 'Duty Inspector Wong');

    this.rootGroup.add(deskGroup);

    this.addCollisionBox(new THREE.Vector3(-2.8, 0, -13.2), new THREE.Vector3(2.8, 2.5, -10.8));

    this.interactiveSpots.push({
      id: 'spot_reception_officer',
      name: 'Duty Inspector Wong',
      category: 'npc',
      position: new THREE.Vector3(0, yOff, -10),
      interactionDistance: 3.2,
      label: 'Talk to Inspector Wong',
      sublabel: 'Consequence Centre Guide & Safe Reporting Advice',
    });

    // Overhead Directional Signage
    const signHanger = new THREE.Mesh(
      new THREE.BoxGeometry(7, 1.0, 0.3),
      new THREE.MeshStandardMaterial({ color: 0x0a192f })
    );
    signHanger.position.set(0, 4.4, -6);
    this.rootGroup.add(signHanger);

    // Atrium Spotlight
    const atLight = new THREE.PointLight(0x38bdf8, 2.0, 16);
    atLight.position.set(0, 4.8, -12);
    this.rootGroup.add(atLight);
  }

  // 5. Wing 1: Interactive Law Wall (West Wing)
  private buildLawWallWing() {
    const posX = -19;
    const yOff = ConsequenceCentreWorld.Y_OFFSET;

    // Law Wall backing panel
    const wallBoard = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 4.2, 18),
      new THREE.MeshStandardMaterial({ color: 0x0f2438, roughness: 0.4 })
    );
    wallBoard.position.set(-25, 2.6, 0);
    this.rootGroup.add(wallBoard);

    // 5 Interactive Hologram Pedestals for Singapore Drug Offences
    const lawExhibits = [
      { id: 'law_possession', name: 'Possession (MDA Sec 8a)', z: -6.5, color: 0xf43f5e },
      { id: 'law_consumption', name: 'Consumption (Sec 8b & Overseas)', z: -3.2, color: 0xf59e0b },
      { id: 'law_trafficking', name: 'Trafficking & Sharing (Sec 5)', z: 0, color: 0xef4444 },
      { id: 'law_import_export', name: 'Import / Courier Parcels (Sec 7)', z: 3.2, color: 0xa855f7 },
      { id: 'law_vaping_substances', name: 'Synthetic Cannabinoids & Vapes', z: 6.5, color: 0x06b6d4 },
    ];

    lawExhibits.forEach((item) => {
      const pedGroup = new THREE.Group();
      pedGroup.position.set(posX, 0, item.z);

      const stand = new THREE.Mesh(
        new THREE.CylinderGeometry(0.4, 0.5, 1.1, 16),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.4 })
      );
      stand.position.y = 0.55;
      pedGroup.add(stand);

      const screen = new THREE.Mesh(
        new THREE.BoxGeometry(0.75, 0.1, 0.55),
        new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.2 })
      );
      screen.position.set(0, 1.12, 0);
      screen.rotation.x = 0.4;
      pedGroup.add(screen);

      const holo = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.25),
        new THREE.MeshBasicMaterial({ color: item.color, wireframe: true })
      );
      holo.position.set(0, 1.75, 0);
      pedGroup.add(holo);
      this.animatedMeshes.push({ mesh: holo, basePos: new THREE.Vector3(0, 1.75, 0), speed: 2, rotSpeed: 1.5 });

      const pLight = new THREE.PointLight(item.color, 1.2, 5);
      pLight.position.set(0, 1.5, 0);
      pedGroup.add(pLight);

      this.rootGroup.add(pedGroup);

      this.addCollisionBox(
        new THREE.Vector3(posX - 0.7, 0, item.z - 0.7),
        new THREE.Vector3(posX + 0.7, 1.8, item.z + 0.7)
      );

      this.interactiveSpots.push({
        id: `spot_${item.id}`,
        name: item.name,
        category: 'law',
        targetId: item.id,
        position: new THREE.Vector3(posX, yOff, item.z),
        interactionDistance: 2.8,
        label: 'Examine Law Exhibit',
        sublabel: item.name,
      });
    });
  }

  // 6. Wing 2: Detention Corridor & Cells (North Wing)
  private buildDetentionCorridor() {
    const yOff = ConsequenceCentreWorld.Y_OFFSET;
    const cases = [
      { id: 'case_2410', name: 'Case #2410: Leon T. (Courier Trap)', x: -10.5 },
      { id: 'case_2411', name: 'Case #2411: Sarah K. (Overseas Vape)', x: -3.5 },
      { id: 'case_2412', name: 'Case #2412: Marcus L. (Study Pill Trap)', x: 3.5 },
      { id: 'case_2413', name: 'Case #2413: Chloe W. (Social Sharing)', x: 10.5 },
    ];

    const corridorZ = 16;
    const cellDepth = 6;
    const cellZ = corridorZ + cellDepth / 2;

    cases.forEach((c) => {
      const cellGroup = new THREE.Group();
      cellGroup.position.set(c.x, 0, cellZ);

      // Cell partition walls
      const wallMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.9 });
      const sideWallL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.0, cellDepth), wallMat);
      sideWallL.position.set(-3.0, 2.0, 0);
      cellGroup.add(sideWallL);

      const sideWallR = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.0, cellDepth), wallMat);
      sideWallR.position.set(3.0, 2.0, 0);
      cellGroup.add(sideWallR);

      // Concrete detention bench
      const bench = new THREE.Mesh(
        new THREE.BoxGeometry(4.0, 0.55, 1.2),
        new THREE.MeshStandardMaterial({ color: 0x64748b })
      );
      bench.position.set(0, 0.28, 2.0);
      cellGroup.add(bench);

      // Stylized Fictional Inmate Figure sitting on bench
      this.createDetentionInmate(cellGroup, 0, 0.28, 2.0, c.id);

      // Front Steel Bars
      const barCount = 10;
      const barMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 });
      for (let i = 0; i <= barCount; i++) {
        const barX = -2.8 + (i * 5.6) / barCount;
        const barMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 4.0, 8), barMat);
        barMesh.position.set(barX, 2.0, -cellDepth / 2);
        cellGroup.add(barMesh);
      }

      // Interactive Case File Placard Terminal outside the cell
      const placard = new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 1.2, 0.1),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3 })
      );
      placard.position.set(0, 1.4, -cellDepth / 2 - 0.2);
      cellGroup.add(placard);

      const headerPlate = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.25, 0.12),
        new THREE.MeshBasicMaterial({ color: 0xef4444 })
      );
      headerPlate.position.set(0, 1.85, -cellDepth / 2 - 0.2);
      cellGroup.add(headerPlate);

      const spot = new THREE.PointLight(0xfff176, 1.2, 7);
      spot.position.set(0, 3.2, -1.0);
      cellGroup.add(spot);

      this.rootGroup.add(cellGroup);

      this.addCollisionBox(
        new THREE.Vector3(c.x - 3.2, 0, cellZ - cellDepth / 2 - 0.2),
        new THREE.Vector3(c.x + 3.2, 4.0, cellZ + cellDepth / 2)
      );

      this.interactiveSpots.push({
        id: `spot_${c.id}`,
        name: c.name,
        category: 'case',
        targetId: c.id,
        position: new THREE.Vector3(c.x, yOff, corridorZ - 1.2),
        interactionDistance: 2.8,
        label: `Investigate ${c.name.split(':')[0]}`,
        sublabel: c.name,
      });
    });
  }

  // Helper: Stylized Inmate Figure
  private createDetentionInmate(parent: THREE.Group, x: number, y: number, z: number, caseId: string) {
    const inmate = new THREE.Group();
    inmate.position.set(x, y, z);

    const torso = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 0.75, 0.35),
      new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.7 })
    );
    torso.position.y = 0.55;
    inmate.add(torso);

    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 12, 12),
      new THREE.MeshStandardMaterial({ color: 0xe2a77a, roughness: 0.6 })
    );
    head.position.y = 1.05;
    inmate.add(head);

    const legs = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.35, 0.65),
      new THREE.MeshStandardMaterial({ color: 0x92400e })
    );
    legs.position.set(0, 0.18, 0.25);
    inmate.add(legs);

    parent.add(inmate);

    this.animatedMeshes.push({
      mesh: inmate,
      basePos: new THREE.Vector3(x, y, z),
      speed: 1.0,
      rotSpeed: 0,
    });
  }

  // 7. Wing 3: Forensic Evidence Room (East Wing North)
  private buildEvidenceRoom() {
    const yOff = ConsequenceCentreWorld.Y_OFFSET;
    const evidenceExhibits = [
      { id: 'ev_spiked_vape', name: 'Seized Spiked Vape Cartridge', x: 15, z: 3, color: 0x06b6d4 },
      { id: 'ev_courier_parcel', name: 'Disguised Courier Package', x: 22, z: 3, color: 0xf59e0b },
      { id: 'ev_burner_phone', name: 'Encrypted Syndicate Phone', x: 15, z: 9, color: 0xec4899 },
      { id: 'ev_forfeited_proceeds', name: 'Forfeited Proceeds & Assets', x: 22, z: 9, color: 0x10b981 },
    ];

    evidenceExhibits.forEach((ev) => {
      const standGroup = new THREE.Group();
      standGroup.position.set(ev.x, 0, ev.z);

      const ped = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 1.0, 1.2),
        new THREE.MeshStandardMaterial({ color: 0x0f2438, metalness: 0.5 })
      );
      ped.position.y = 0.5;
      standGroup.add(ped);

      const glass = new THREE.Mesh(
        new THREE.BoxGeometry(1.0, 0.9, 1.0),
        new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.35 })
      );
      glass.position.y = 1.45;
      standGroup.add(glass);

      const artifact = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.25),
        new THREE.MeshStandardMaterial({ color: ev.color, roughness: 0.2, metalness: 0.8 })
      );
      artifact.position.y = 1.45;
      standGroup.add(artifact);
      this.animatedMeshes.push({ mesh: artifact, basePos: new THREE.Vector3(0, 1.45, 0), speed: 2.2, rotSpeed: 1.8 });

      const spot = new THREE.PointLight(ev.color, 1.5, 6);
      spot.position.set(0, 2.5, 0);
      standGroup.add(spot);

      this.rootGroup.add(standGroup);

      this.addCollisionBox(
        new THREE.Vector3(ev.x - 0.8, 0, ev.z - 0.8),
        new THREE.Vector3(ev.x + 0.8, 2.0, ev.z + 0.8)
      );

      this.interactiveSpots.push({
        id: `spot_${ev.id}`,
        name: ev.name,
        category: 'evidence',
        targetId: ev.id,
        position: new THREE.Vector3(ev.x, yOff, ev.z),
        interactionDistance: 2.6,
        label: 'Inspect Evidence: Object Found',
        sublabel: ev.name,
      });
    });
  }

  // 8. Wing 4: Consequence Wall & Support Directory (East Wing South)
  private buildConsequenceWall() {
    const yOff = ConsequenceCentreWorld.Y_OFFSET;
    const wallX = 25;
    const wallZ = -10;

    const wallMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 4.6, 16),
      new THREE.MeshStandardMaterial({ color: 0x091424, roughness: 0.3 })
    );
    wallMesh.position.set(wallX - 0.2, 2.6, wallZ);
    this.rootGroup.add(wallMesh);

    const terminal = new THREE.Group();
    terminal.position.set(20, 0, wallZ);

    const tBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.6, 1.1, 16),
      new THREE.MeshStandardMaterial({ color: 0x1e293b })
    );
    tBase.position.y = 0.55;
    terminal.add(tBase);

    const tScreen = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.1, 0.8),
      new THREE.MeshStandardMaterial({ color: 0xf43f5e })
    );
    tScreen.position.set(0, 1.15, 0);
    tScreen.rotation.x = 0.35;
    terminal.add(tScreen);

    const cLight = new THREE.PointLight(0xf43f5e, 2, 10);
    cLight.position.set(20, 2.5, wallZ);
    this.rootGroup.add(cLight);

    this.rootGroup.add(terminal);

    this.addCollisionBox(new THREE.Vector3(19, 0, wallZ - 0.9), new THREE.Vector3(21, 2.0, wallZ + 0.9));

    this.interactiveSpots.push({
      id: 'spot_consequence_wall',
      name: 'Life & Legal Consequences Wall',
      category: 'consequence',
      position: new THREE.Vector3(20, yOff, wallZ),
      interactionDistance: 2.8,
      label: 'Examine Consequence Wall',
      sublabel: 'Legal, Physical, Family & Helpline Directory',
    });
  }

  // 9. Wing 5: "What Would You Do?" Interactive Dilemma Chamber
  private buildDilemmaChamber() {
    const yOff = ConsequenceCentreWorld.Y_OFFSET;
    const chamberX = -18;
    const chamberZ = -18;

    const centerGroup = new THREE.Group();
    centerGroup.position.set(chamberX, 0, chamberZ);

    const baseCol = new THREE.Mesh(
      new THREE.CylinderGeometry(1.2, 1.4, 0.4, 32),
      new THREE.MeshStandardMaterial({ color: 0x0f2438 })
    );
    baseCol.position.y = 0.2;
    centerGroup.add(baseCol);

    const holoSphere = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.6, 2),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true })
    );
    holoSphere.position.y = 1.8;
    centerGroup.add(holoSphere);
    this.animatedMeshes.push({ mesh: holoSphere, basePos: new THREE.Vector3(0, 1.8, 0), speed: 1.5, rotSpeed: 1.2 });

    const holoLight = new THREE.PointLight(0x38bdf8, 2, 10);
    holoLight.position.set(0, 2.2, 0);
    centerGroup.add(holoLight);

    this.rootGroup.add(centerGroup);

    this.addCollisionBox(
      new THREE.Vector3(chamberX - 1.4, 0, chamberZ - 1.4),
      new THREE.Vector3(chamberX + 1.4, 2.5, chamberZ + 1.4)
    );

    const podiums = [
      { id: 'A', name: 'Option A: Agree & Take Envelope', offsetX: -4.2, offsetZ: 0, color: 0xef4444 },
      { id: 'B', name: 'Option B: Firmly Decline & Alert Adult', offsetX: 0, offsetZ: 4.2, color: 0x10b981 },
      { id: 'C', name: 'Option C: Make Excuse & Look Away', offsetX: 4.2, offsetZ: 0, color: 0xf59e0b },
    ];

    podiums.forEach((p) => {
      const pGroup = new THREE.Group();
      const pX = chamberX + p.offsetX;
      const pZ = chamberZ + p.offsetZ;
      pGroup.position.set(pX, 0, pZ);

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.8, 1.0, 32),
        new THREE.MeshBasicMaterial({ color: p.color, side: THREE.DoubleSide })
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.03;
      pGroup.add(ring);

      const pillar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.35, 0.4, 1.0, 16),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 })
      );
      pillar.position.y = 0.5;
      pGroup.add(pillar);

      const beacon = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.2, 0.4),
        new THREE.MeshBasicMaterial({ color: p.color })
      );
      beacon.position.y = 1.05;
      pGroup.add(beacon);

      const light = new THREE.PointLight(p.color, 1.2, 4);
      light.position.set(0, 1.3, 0);
      pGroup.add(light);

      this.rootGroup.add(pGroup);

      this.addCollisionBox(new THREE.Vector3(pX - 0.5, 0, pZ - 0.5), new THREE.Vector3(pX + 0.5, 1.6, pZ + 0.5));

      this.interactiveSpots.push({
        id: `spot_dilemma_${p.id}`,
        name: p.name,
        category: 'dilemma',
        podiumId: p.id as 'A' | 'B' | 'C',
        position: new THREE.Vector3(pX, yOff, pZ),
        interactionDistance: 2.5,
        label: `Walk-up Option ${p.id}`,
        sublabel: p.name,
      });
    });
  }

  // Helper: Friendly Police Officer NPC Figure
  private createNPCFigure(parent: THREE.Group, x: number, y: number, z: number, name: string) {
    const officer = new THREE.Group();
    officer.position.set(x, y, z);

    const torso = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.9, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x0a192f, roughness: 0.4 })
    );
    torso.position.y = 1.35;
    officer.add(torso);

    const badge = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.15, 0.05),
      new THREE.MeshBasicMaterial({ color: 0xe2e8f0 })
    );
    badge.position.set(-0.18, 1.55, 0.22);
    officer.add(badge);

    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.24, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xdf9e72 })
    );
    head.position.y = 2.05;
    officer.add(head);

    const cap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.28, 0.15, 16),
      new THREE.MeshStandardMaterial({ color: 0x0a192f })
    );
    cap.position.set(0, 2.22, 0.05);
    officer.add(cap);

    parent.add(officer);
  }

  private addCollisionBox(min: THREE.Vector3, max: THREE.Vector3) {
    const yOff = ConsequenceCentreWorld.Y_OFFSET;
    this.collisionBoxes.push({
      min: new THREE.Vector3(min.x, min.y + yOff, min.z),
      max: new THREE.Vector3(max.x, max.y + yOff, max.z),
    });
  }

  // Collision Detection against Interior Walls & Pedestals
  public checkCollision(pos: THREE.Vector3, radius: number = 0.55): boolean {
    for (const box of this.collisionBoxes) {
      if (
        pos.x + radius > box.min.x &&
        pos.x - radius < box.max.x &&
        pos.z + radius > box.min.z &&
        pos.z - radius < box.max.z &&
        pos.y >= box.min.y - 1 &&
        pos.y <= box.max.y + 1
      ) {
        return true;
      }
    }
    return false;
  }

  // Animation updates (hologram rotations, subtle floating)
  public update(delta: number, time: number) {
    this.animatedMeshes.forEach((item) => {
      item.mesh.rotation.y += delta * item.rotSpeed;
      if (item.speed > 0) {
        item.mesh.position.y = item.basePos.y + Math.sin(time * item.speed) * 0.06;
      }
    });
  }

  public dispose() {
    this.lights.forEach((l) => this.rootGroup.remove(l));
    this.scene.remove(this.rootGroup);
  }
}
