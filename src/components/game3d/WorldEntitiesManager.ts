import * as THREE from 'three';
import { WorldEntity } from '../../types';

export class WorldEntitiesManager {
  private scene: THREE.Scene;
  public entityMeshes: Map<string, THREE.Group> = new Map();
  public markerRings: THREE.Mesh[] = [];

  constructor(scene: THREE.Scene, entities: WorldEntity[]) {
    this.scene = scene;
    entities.forEach((entity) => {
      this.createEntityVisual(entity);
    });
  }

  private createEntityVisual(entity: WorldEntity) {
    const group = new THREE.Group();
    group.position.set(entity.position.x, entity.position.y, entity.position.z);

    if (entity.type === 'npc') {
      // NPC 3D Model
      this.buildNPCFigure(group, entity);
    } else {
      // Inspectable Object 3D Model
      this.buildObjectProp(group, entity);
    }

    // Glowing Proximity Ground Ring (Gold for Quest, Cyan for NPCs, Amber for Objects)
    const ringGeo = new THREE.RingGeometry(1.2, 1.4, 32);
    const ringColor =
      entity.id === 'npc_jay' || entity.id === 'obj_suspicious_pod' ? 0xf59e0b : 0x14b8a6;
    const ringMat = new THREE.MeshBasicMaterial({
      color: ringColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.04;
    group.add(ring);
    this.markerRings.push(ring);

    // Floating Interaction Beacon (Pulsing Diamond)
    const beaconGeo = new THREE.OctahedronGeometry(0.35, 0);
    const beaconMat = new THREE.MeshStandardMaterial({
      color: ringColor,
      emissive: ringColor,
      emissiveIntensity: 0.6,
      roughness: 0.2,
    });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.y = 2.8;
    group.add(beacon);

    this.scene.add(group);
    this.entityMeshes.set(entity.id, group);
  }

  private buildNPCFigure(group: THREE.Group, entity: WorldEntity) {
    const npcColors: Record<string, { top: number; bottom: number }> = {
      npc_coach: { top: 0x1e3a8a, bottom: 0x0f172a }, // Coach navy track
      npc_chloe: { top: 0xdb2777, bottom: 0x334155 }, // Pink cropped tee
      npc_jay: { top: 0x4338ca, bottom: 0x1e293b }, // Jay distressed navy
      npc_eli: { top: 0x3f3f46, bottom: 0x18181b }, // Eli dark jacket
      npc_lina: { top: 0xd97706, bottom: 0x475569 }, // Lina amber knit
    };

    const colors = npcColors[entity.id] || { top: 0x0284c7, bottom: 0x1e293b };

    // Torso
    const torso = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 0.85, 0.4),
      new THREE.MeshStandardMaterial({ color: colors.top, roughness: 0.7 })
    );
    torso.position.y = 1.35;
    torso.castShadow = true;
    group.add(torso);

    // Head
    const head = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, 0.48, 0.42),
      new THREE.MeshStandardMaterial({ color: 0xf8d6b8, roughness: 0.6 })
    );
    head.position.y = 2.05;
    head.castShadow = true;
    group.add(head);

    // Hair
    const hair = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 0.22, 0.45),
      new THREE.MeshStandardMaterial({ color: 0x1c1917 })
    );
    hair.position.y = 2.25;
    group.add(hair);

    // Legs
    const legGeo = new THREE.BoxGeometry(0.22, 0.85, 0.26);
    const legMat = new THREE.MeshStandardMaterial({ color: colors.bottom });

    const lLeg = new THREE.Mesh(legGeo, legMat);
    lLeg.position.set(-0.18, 0.45, 0);
    group.add(lLeg);

    const rLeg = new THREE.Mesh(legGeo, legMat);
    rLeg.position.set(0.18, 0.45, 0);
    group.add(rLeg);

    // Special pose for Jay: sitting/hunched clutching chest
    if (entity.id === 'npc_jay') {
      torso.rotation.x = 0.25;
      torso.position.y = 1.1;
      head.position.y = 1.7;
      head.rotation.x = 0.3;
    }
  }

  private buildObjectProp(group: THREE.Group, entity: WorldEntity) {
    if (entity.id === 'obj_suspicious_pod') {
      // Unmarked Pod on small riser base
      const base = new THREE.Mesh(
        new THREE.CylinderGeometry(0.6, 0.7, 0.8, 16),
        new THREE.MeshStandardMaterial({ color: 0x475569 })
      );
      base.position.y = 0.4;
      group.add(base);

      // Glowing vape pod
      const pod = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 0.45, 12),
        new THREE.MeshStandardMaterial({
          color: 0xfde047,
          emissive: 0xeab308,
          emissiveIntensity: 0.8,
        })
      );
      pod.position.set(0, 0.95, 0);
      group.add(pod);
    } else if (entity.id === 'obj_cnb_board') {
      // Anti-drug notice board
      const frame = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 1.6, 0.15),
        new THREE.MeshStandardMaterial({ color: 0x1e3a8a })
      );
      frame.position.y = 1.8;
      group.add(frame);

      const poster = new THREE.Mesh(
        new THREE.PlaneGeometry(2.0, 1.4),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 })
      );
      poster.position.set(0, 1.8, 0.09);
      group.add(poster);

      // Support posts
      for (const x of [-0.9, 0.9]) {
        const post = new THREE.Mesh(
          new THREE.CylinderGeometry(0.08, 0.08, 1.8, 8),
          new THREE.MeshStandardMaterial({ color: 0x334155 })
        );
        post.position.set(x, 0.9, 0);
        group.add(post);
      }
    } else {
      // Default prop marker
      const pedestal = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.6, 0.7, 12),
        new THREE.MeshStandardMaterial({ color: 0x64748b })
      );
      pedestal.position.y = 0.35;
      group.add(pedestal);
    }
  }

  public update(delta: number, time: number) {
    // Pulse and rotate beacons
    this.entityMeshes.forEach((mesh) => {
      const beacon = mesh.children.find((c) => c instanceof THREE.Mesh && c.geometry instanceof THREE.OctahedronGeometry);
      if (beacon) {
        beacon.rotation.y += delta * 1.5;
        beacon.position.y = 2.8 + Math.sin(time * 3) * 0.15;
      }
    });

    // Pulse ground rings
    this.markerRings.forEach((ring) => {
      const mat = ring.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.5 + Math.sin(time * 2.5) * 0.3;
    });
  }
}
