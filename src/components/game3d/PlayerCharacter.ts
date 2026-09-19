import * as THREE from 'three';
import { CharacterId } from '../../types';
import { SingaporeWorld } from './SingaporeWorld';

export class PlayerCharacter {
  public mesh: THREE.Group;
  public characterId: CharacterId;
  public position: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  public rotation: number = 0;
  public isMoving: boolean = false;
  public isSprinting: boolean = false;
  public currentSpeed: number = 0;

  // Character body parts for procedural animation
  private leftLeg: THREE.Mesh;
  private rightLeg: THREE.Mesh;
  private leftArm: THREE.Mesh;
  private rightArm: THREE.Mesh;
  private torso: THREE.Mesh;
  private head: THREE.Group;
  private animTimer: number = 0;

  // Speeds
  private walkSpeed = 6.8;
  private sprintSpeed = 11.5;

  constructor(scene: THREE.Scene, characterId: CharacterId = 'maya', startPos = new THREE.Vector3(-14, 0, -25)) {
    this.characterId = characterId;
    this.position.copy(startPos);

    this.mesh = new THREE.Group();
    this.mesh.position.copy(this.position);

    // Outfit Colors per Character
    const outfitColors = this.getOutfitColors(characterId);

    // 1. Torso
    const torsoGeo = new THREE.BoxGeometry(0.7, 0.9, 0.45);
    const torsoMat = new THREE.MeshStandardMaterial({
      color: outfitColors.top,
      roughness: 0.7,
    });
    this.torso = new THREE.Mesh(torsoGeo, torsoMat);
    this.torso.position.y = 1.35;
    this.torso.castShadow = true;
    this.mesh.add(this.torso);

    // 2. Head & Hair
    this.head = new THREE.Group();
    this.head.position.y = 2.05;

    const faceMat = new THREE.MeshStandardMaterial({ color: 0xf8d6b8, roughness: 0.6 });
    const face = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.5, 0.45), faceMat);
    face.castShadow = true;
    this.head.add(face);

    // Hair
    const hairMat = new THREE.MeshStandardMaterial({ color: outfitColors.hair, roughness: 0.9 });
    const hair = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.25, 0.48), hairMat);
    hair.position.y = 0.2;
    this.head.add(hair);

    // Ponytail for Maya
    if (characterId === 'maya') {
      const ponytail = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.6, 6), hairMat);
      ponytail.rotation.x = Math.PI / 3;
      ponytail.position.set(0, 0.1, -0.35);
      this.head.add(ponytail);
    }

    this.mesh.add(this.head);

    // 3. Legs
    const legGeo = new THREE.BoxGeometry(0.24, 0.85, 0.28);
    const pantsMat = new THREE.MeshStandardMaterial({
      color: outfitColors.bottom,
      roughness: 0.8,
    });

    this.leftLeg = new THREE.Mesh(legGeo, pantsMat);
    this.leftLeg.position.set(-0.2, 0.45, 0);
    this.leftLeg.castShadow = true;
    this.mesh.add(this.leftLeg);

    this.rightLeg = new THREE.Mesh(legGeo, pantsMat);
    this.rightLeg.position.set(0.2, 0.45, 0);
    this.rightLeg.castShadow = true;
    this.mesh.add(this.rightLeg);

    // 4. Arms
    const armGeo = new THREE.BoxGeometry(0.2, 0.75, 0.22);
    const armMat = new THREE.MeshStandardMaterial({
      color: outfitColors.top,
      roughness: 0.7,
    });

    this.leftArm = new THREE.Mesh(armGeo, armMat);
    this.leftArm.position.set(-0.5, 1.35, 0);
    this.leftArm.castShadow = true;
    this.mesh.add(this.leftArm);

    this.rightArm = new THREE.Mesh(armGeo, armMat);
    this.rightArm.position.set(0.5, 1.35, 0);
    this.rightArm.castShadow = true;
    this.mesh.add(this.rightArm);

    scene.add(this.mesh);
  }

  private getOutfitColors(id: CharacterId) {
    switch (id) {
      case 'maya':
        return { top: 0x0d9488, bottom: 0x0f172a, hair: 0x1c1917 }; // Teal track jacket
      case 'jay':
        return { top: 0x312e81, bottom: 0x1e293b, hair: 0x18181b }; // Indigo hoodie
      case 'eli':
        return { top: 0x27272a, bottom: 0x3f3f46, hair: 0x292524 }; // Charcoal streetwear
      case 'lina':
        return { top: 0xc2410c, bottom: 0x475569, hair: 0x1c1917 }; // Warm orange knit
    }
  }

  public update(
    delta: number,
    inputVector: { x: number; z: number },
    sprint: boolean,
    cameraAngleY: number,
    world: { checkCollision: (pos: THREE.Vector3, radius?: number) => boolean }
  ) {
    this.isSprinting = sprint;
    const speed = sprint ? this.sprintSpeed : this.walkSpeed;

    const inputLength = Math.hypot(inputVector.x, inputVector.z);
    this.isMoving = inputLength > 0.1;

    if (this.isMoving) {
      // Normalize input
      const nx = inputVector.x / inputLength;
      const nz = inputVector.z / inputLength;

      // Rotate input relative to third-person camera orientation
      const moveAngle = Math.atan2(nx, nz) + cameraAngleY;

      const targetX = this.position.x + Math.sin(moveAngle) * speed * delta;
      const targetZ = this.position.z + Math.cos(moveAngle) * speed * delta;

      // Check collision before committing move
      const nextPos = new THREE.Vector3(targetX, this.position.y, targetZ);
      if (!world.checkCollision(nextPos, 0.5)) {
        this.position.x = targetX;
        this.position.z = targetZ;
      } else {
        // Slide along X or Z axis if one is clear
        const slideX = new THREE.Vector3(targetX, this.position.y, this.position.z);
        if (!world.checkCollision(slideX, 0.5)) {
          this.position.x = targetX;
        } else {
          const slideZ = new THREE.Vector3(this.position.x, this.position.y, targetZ);
          if (!world.checkCollision(slideZ, 0.5)) {
            this.position.z = targetZ;
          }
        }
      }

      // Smooth rotation toward movement angle
      const diff = moveAngle - this.rotation;
      const normalizedDiff = Math.atan2(Math.sin(diff), Math.cos(diff));
      this.rotation += normalizedDiff * Math.min(1.0, 12 * delta);

      // Animate limb swing
      this.animTimer += delta * (sprint ? 14 : 9);
      const swing = Math.sin(this.animTimer);

      this.leftLeg.rotation.x = swing * 0.7;
      this.rightLeg.rotation.x = -swing * 0.7;
      this.leftArm.rotation.x = -swing * 0.7;
      this.rightArm.rotation.x = swing * 0.7;

      // Subtle torso bobbing
      this.torso.position.y = 1.35 + Math.abs(Math.cos(this.animTimer)) * 0.05;
      this.head.position.y = 2.05 + Math.abs(Math.cos(this.animTimer)) * 0.05;
    } else {
      // Return to natural idle pose
      this.leftLeg.rotation.x *= 0.85;
      this.rightLeg.rotation.x *= 0.85;
      this.leftArm.rotation.x *= 0.85;
      this.rightArm.rotation.x *= 0.85;

      // Breathing idle
      this.animTimer += delta * 2;
      this.torso.position.y = 1.35 + Math.sin(this.animTimer) * 0.015;
      this.head.position.y = 2.05 + Math.sin(this.animTimer) * 0.015;
    }

    this.mesh.position.copy(this.position);
    this.mesh.rotation.y = this.rotation;
  }
}
