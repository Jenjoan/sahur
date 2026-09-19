import * as THREE from 'three';
import { WorldEntity } from '../../types';

export interface WorldCollisionBox {
  min: THREE.Vector3;
  max: THREE.Vector3;
}

export class SingaporeWorld {
  public scene: THREE.Scene;
  public collisionBoxes: WorldCollisionBox[] = [];
  public entityMeshes: Map<string, THREE.Group> = new Map();
  private lights: THREE.Light[] = [];

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.buildAtmosphere();
    this.buildTerrain();
    this.buildHDBBlocks();
    this.buildDrainageCanal();
    this.buildRainTreesAndPark();
    this.buildBasketballCourt();
    this.buildSchoolTrack();
    this.buildMamaShop();
    this.buildPoliceStation();
    this.buildStreetLamps();
  }

  // 1. Atmosphere: Singapore golden hour / dusk skybox with warm ambient
  public applyAtmosphere() {
    this.scene.background = new THREE.Color(0x1a2638);
    this.scene.fog = new THREE.FogExp2(0x233147, 0.012);
  }

  private buildAtmosphere() {
    this.applyAtmosphere();

    // Warm dusk directional sunlight (as in reference image 1)
    const sunLight = new THREE.DirectionalLight(0xffdfb3, 1.4);
    sunLight.position.set(60, 80, -40);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 250;
    const d = 80;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    this.scene.add(sunLight);
    this.lights.push(sunLight);

    // Ambient sky and ground hemisphere light
    const hemiLight = new THREE.HemisphereLight(0x7397b8, 0x2e382b, 0.9);
    this.scene.add(hemiLight);
    this.lights.push(hemiLight);
  }

  // 2. Terrain & Ground: Roads, pedestrian pavements, grass lawns
  private buildTerrain() {
    // Base grass lawn
    const grassGeo = new THREE.PlaneGeometry(300, 300);
    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x2f4b26,
      roughness: 0.9,
    });
    const grass = new THREE.Mesh(grassGeo, grassMat);
    grass.rotation.x = -Math.PI / 2;
    grass.receiveShadow = true;
    this.scene.add(grass);

    // Main asphalt road running through estate
    const roadGeo = new THREE.PlaneGeometry(14, 180);
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x262a30,
      roughness: 0.8,
    });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, 0.02, 0);
    road.receiveShadow = true;
    this.scene.add(road);

    // Road dashed white center line
    const lineGeo = new THREE.PlaneGeometry(0.4, 180);
    const lineMat = new THREE.MeshStandardMaterial({ color: 0xefede0 });
    const centerLine = new THREE.Mesh(lineGeo, lineMat);
    centerLine.rotation.x = -Math.PI / 2;
    centerLine.position.set(0, 0.03, 0);
    this.scene.add(centerLine);

    // Paved pedestrian walkways (concrete tiles)
    const walkwayMat = new THREE.MeshStandardMaterial({ color: 0x82888f, roughness: 0.7 });

    // East walkway
    const walkEast = new THREE.Mesh(new THREE.PlaneGeometry(6, 160), walkwayMat);
    walkEast.rotation.x = -Math.PI / 2;
    walkEast.position.set(10, 0.04, 0);
    walkEast.receiveShadow = true;
    this.scene.add(walkEast);

    // West walkway
    const walkWest = new THREE.Mesh(new THREE.PlaneGeometry(6, 160), walkwayMat);
    walkWest.rotation.x = -Math.PI / 2;
    walkWest.position.set(-10, 0.04, 0);
    walkWest.receiveShadow = true;
    this.scene.add(walkWest);
  }

  // 3. Singapore HDB Blocks (Mint Green Block 124, Coral Peach Block 125, Sky Blue Block 126)
  private buildHDBBlocks() {
    // Block 124: Mint Green Pastel with void deck
    this.createHDBBlock({
      x: -42,
      z: 10,
      width: 24,
      depth: 48,
      height: 42,
      color: 0x7eb89e, // Mint green as seen in screenshot 1
      blockNumber: '124',
    });

    // Block 125: Peach / Coral Pastel
    this.createHDBBlock({
      x: 42,
      z: 15,
      width: 24,
      depth: 54,
      height: 45,
      color: 0xd99a77, // Peach/terracotta as in screenshot 1
      blockNumber: '125',
    });

    // Block 126: Soft Sky Blue Pastel
    this.createHDBBlock({
      x: 42,
      z: 75,
      width: 22,
      depth: 46,
      height: 38,
      color: 0x82a9be, // Soft blue
      blockNumber: '126',
    });

    // Block 127: Pale Yellow / Cream
    this.createHDBBlock({
      x: -42,
      z: 70,
      width: 22,
      depth: 46,
      height: 36,
      color: 0xd8c894,
      blockNumber: '127',
    });
  }

  private createHDBBlock(opts: {
    x: number;
    z: number;
    width: number;
    depth: number;
    height: number;
    color: number;
    blockNumber: string;
  }) {
    const group = new THREE.Group();
    group.position.set(opts.x, 0, opts.z);

    const voidDeckHeight = 5.5;
    const upperHeight = opts.height - voidDeckHeight;

    // Upper residential storeys with windows
    const upperGeo = new THREE.BoxGeometry(opts.width, upperHeight, opts.depth);
    const upperMat = new THREE.MeshStandardMaterial({
      color: opts.color,
      roughness: 0.8,
    });
    const upper = new THREE.Mesh(upperGeo, upperMat);
    upper.position.y = voidDeckHeight + upperHeight / 2;
    upper.castShadow = true;
    upper.receiveShadow = true;
    group.add(upper);

    // Block Number Plate
    const signGeo = new THREE.PlaneGeometry(4, 2.5);
    const signMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 });
    const sign = new THREE.Mesh(signGeo, signMat);
    sign.position.set(0, voidDeckHeight + 4, opts.depth / 2 + 0.1);
    group.add(sign);

    // Void Deck ceiling slab
    const ceilingGeo = new THREE.BoxGeometry(opts.width, 0.6, opts.depth);
    const ceilingMat = new THREE.MeshStandardMaterial({ color: 0x334155 });
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceiling.position.y = voidDeckHeight;
    group.add(ceiling);

    // Void Deck Pillars (Open Singapore void deck ground floor)
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.7 });
    const pillarRows = Math.floor(opts.depth / 8);
    const pillarCols = Math.floor(opts.width / 8);

    for (let r = 0; r <= pillarRows; r++) {
      const zPos = -opts.depth / 2 + (r * opts.depth) / pillarRows;
      for (let c = 0; c <= pillarCols; c++) {
        const xPos = -opts.width / 2 + (c * opts.width) / pillarCols;
        const pillarGeo = new THREE.CylinderGeometry(0.5, 0.5, voidDeckHeight, 12);
        const pillar = new THREE.Mesh(pillarGeo, pillarMat);
        pillar.position.set(xPos, voidDeckHeight / 2, zPos);
        pillar.castShadow = true;
        pillar.receiveShadow = true;
        group.add(pillar);

        // Add collision for pillars
        this.addCollisionBox(
          new THREE.Vector3(opts.x + xPos - 0.6, 0, opts.z + zPos - 0.6),
          new THREE.Vector3(opts.x + xPos + 0.6, 6, opts.z + zPos + 0.6)
        );
      }
    }

    // Warm ground void-deck lighting (as seen in screenshot 1)
    const voidLight = new THREE.PointLight(0xffaa44, 2, 22);
    voidLight.position.set(0, 3.5, 0);
    group.add(voidLight);

    // Void deck tiled floor
    const floorGeo = new THREE.PlaneGeometry(opts.width, opts.depth);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.6 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0.05;
    floor.receiveShadow = true;
    group.add(floor);

    // Round concrete chess table & stools inside void deck
    const tableGroup = new THREE.Group();
    const tableTop = new THREE.Mesh(
      new THREE.CylinderGeometry(1.2, 1.2, 0.15, 16),
      new THREE.MeshStandardMaterial({ color: 0xcfd8dc })
    );
    tableTop.position.y = 1.1;
    tableGroup.add(tableTop);
    const tableLeg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.3, 1.1, 12),
      new THREE.MeshStandardMaterial({ color: 0x90a4ae })
    );
    tableLeg.position.y = 0.55;
    tableGroup.add(tableLeg);

    // Stools
    for (let a = 0; a < 4; a++) {
      const angle = (a * Math.PI) / 2;
      const stool = new THREE.Mesh(
        new THREE.CylinderGeometry(0.4, 0.4, 0.6, 12),
        new THREE.MeshStandardMaterial({ color: 0xb0bec5 })
      );
      stool.position.set(Math.cos(angle) * 1.8, 0.3, Math.sin(angle) * 1.8);
      tableGroup.add(stool);
    }
    tableGroup.position.set(-opts.width / 4, 0, 0);
    group.add(tableGroup);

    // Add general building collision boundary
    this.addCollisionBox(
      new THREE.Vector3(opts.x - opts.width / 2 + 1, 0, opts.z - opts.depth / 2 + 1),
      new THREE.Vector3(opts.x + opts.width / 2 - 1, opts.height, opts.z + opts.depth / 2 - 1)
    );

    this.scene.add(group);
  }

  // 4. Concrete Drainage Canal ("Longkang") with overhead sheltered bridge (Iconic Singapore feature from image 1)
  private buildDrainageCanal() {
    const canalGroup = new THREE.Group();
    canalGroup.position.set(16, 0, 0);

    const canalLength = 160;
    const canalWidth = 6;
    const canalDepth = 2.5;

    // Canal concrete bed & sloped walls
    const bedGeo = new THREE.BoxGeometry(canalWidth, 0.4, canalLength);
    const bedMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9 });
    const bed = new THREE.Mesh(bedGeo, bedMat);
    bed.position.y = -canalDepth;
    canalGroup.add(bed);

    // Water layer
    const waterGeo = new THREE.PlaneGeometry(canalWidth - 1, canalLength);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a4f,
      roughness: 0.1,
      metalness: 0.8,
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.y = -canalDepth + 0.3;
    canalGroup.add(water);

    // Green safety railings along canal edges
    const railingMat = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.5 });
    const railWest = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.2, canalLength), railingMat);
    railWest.position.set(-canalWidth / 2, 0.6, 0);
    canalGroup.add(railWest);

    const railEast = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.2, canalLength), railingMat);
    railEast.position.set(canalWidth / 2, 0.6, 0);
    canalGroup.add(railEast);

    // Overhead Sheltered Pedestrian Linkway (connecting Block 124 side to Block 125 side)
    const bridgeGroup = new THREE.Group();
    bridgeGroup.position.set(0, 0, -10);

    // Bridge walkway deck
    const bridgeDeck = new THREE.Mesh(
      new THREE.BoxGeometry(canalWidth + 8, 0.4, 4),
      new THREE.MeshStandardMaterial({ color: 0xcbd5e1 })
    );
    bridgeDeck.position.y = 0.2;
    bridgeGroup.add(bridgeDeck);

    // Bridge sheltered roof (classic green curved linkway roof)
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(canalWidth + 9, 0.3, 4.4),
      new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.6 })
    );
    roof.position.y = 3.2;
    bridgeGroup.add(roof);

    // Roof support posts
    for (const xOff of [-canalWidth / 2 - 3, 0, canalWidth / 2 + 3]) {
      for (const zOff of [-1.8, 1.8]) {
        const post = new THREE.Mesh(
          new THREE.CylinderGeometry(0.12, 0.12, 3, 8),
          new THREE.MeshStandardMaterial({ color: 0x64748b })
        );
        post.position.set(xOff, 1.6, zOff);
        bridgeGroup.add(post);
      }
    }
    canalGroup.add(bridgeGroup);

    // Add canal collision boundaries (prevent falling into canal except across bridge)
    this.addCollisionBox(new THREE.Vector3(13, 0, -80), new THREE.Vector3(19, 2, -13));
    this.addCollisionBox(new THREE.Vector3(13, 0, -7), new THREE.Vector3(19, 2, 80));

    this.scene.add(canalGroup);
  }

  // 5. Lush Rain Trees & Park Connector (As in Screenshot 2: grand canopy, walking trails, benches)
  private buildRainTreesAndPark() {
    const treePositions = [
      { x: -16, z: -10, scale: 1.3 },
      { x: -18, z: -35, scale: 1.5 },
      { x: -15, z: 15, scale: 1.2 },
      { x: -20, z: 40, scale: 1.4 },
      { x: 26, z: -40, scale: 1.3 },
      { x: 28, z: -15, scale: 1.6 },
      { x: 25, z: 20, scale: 1.4 },
      { x: -6, z: -55, scale: 1.7 },
      { x: 8, z: -60, scale: 1.5 },
    ];

    treePositions.forEach((tp) => {
      this.createRainTree(tp.x, tp.z, tp.scale);
    });

    // Park connector wooden park benches
    this.createParkBench(-14, -8, Math.PI / 6);
    this.createParkBench(-14, 18, -Math.PI / 4);
    this.createParkBench(24, -22, -Math.PI / 3);
  }

  private createRainTree(x: number, z: number, scale: number = 1.0) {
    const tree = new THREE.Group();
    tree.position.set(x, 0, z);

    // Massive gnarly trunk (characteristic of Singapore mature Rain Trees)
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3d2817, roughness: 0.9 });
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.7 * scale, 1.1 * scale, 5 * scale, 8),
      trunkMat
    );
    trunk.position.y = (2.5 * scale);
    trunk.castShadow = true;
    tree.add(trunk);

    // Sprawling canopy clusters with rich foliage green
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x2e6930,
      roughness: 0.8,
      flatShading: true,
    });

    const canopyBlobs = [
      { x: 0, y: 5.5 * scale, z: 0, r: 4.5 * scale },
      { x: 3 * scale, y: 5.2 * scale, z: 2 * scale, r: 3.5 * scale },
      { x: -3.2 * scale, y: 5.0 * scale, z: -1.5 * scale, r: 3.8 * scale },
      { x: 1.5 * scale, y: 6.2 * scale, z: -2.5 * scale, r: 3.6 * scale },
      { x: -2 * scale, y: 5.8 * scale, z: 2.8 * scale, r: 3.4 * scale },
    ];

    canopyBlobs.forEach((b) => {
      const blob = new THREE.Mesh(new THREE.DodecahedronGeometry(b.r, 1), leafMat);
      blob.position.set(b.x, b.y, b.z);
      blob.castShadow = true;
      blob.receiveShadow = true;
      tree.add(blob);
    });

    // Collision for trunk
    this.addCollisionBox(
      new THREE.Vector3(x - 0.8 * scale, 0, z - 0.8 * scale),
      new THREE.Vector3(x + 0.8 * scale, 6, z + 0.8 * scale)
    );

    this.scene.add(tree);
  }

  private createParkBench(x: number, z: number, rotation: number = 0) {
    const bench = new THREE.Group();
    bench.position.set(x, 0, z);
    bench.rotation.y = rotation;

    const woodMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.7 });
    const metalMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 });

    // Planks
    const seat = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.1, 0.6), woodMat);
    seat.position.y = 0.55;
    bench.add(seat);

    const back = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.4, 0.1), woodMat);
    back.position.set(0, 0.9, -0.25);
    bench.add(back);

    // Legs
    for (const xOff of [-0.9, 0.9]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.5, 0.5), metalMat);
      leg.position.set(xOff, 0.25, 0);
      bench.add(leg);
    }

    this.scene.add(bench);
  }

  // 6. Basketball Court with hoop towers and red/green pavement
  private buildBasketballCourt() {
    const courtGroup = new THREE.Group();
    courtGroup.position.set(30, 0.05, -20);

    const courtWidth = 18;
    const courtLength = 26;

    // Green & Red Court Pavement
    const courtPave = new THREE.Mesh(
      new THREE.PlaneGeometry(courtWidth, courtLength),
      new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.7 })
    );
    courtPave.rotation.x = -Math.PI / 2;
    courtPave.receiveShadow = true;
    courtGroup.add(courtPave);

    // Red Key Areas
    const redKeyMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c });
    const keyNorth = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), redKeyMat);
    keyNorth.rotation.x = -Math.PI / 2;
    keyNorth.position.set(0, 0.01, -courtLength / 2 + 3);
    courtGroup.add(keyNorth);

    const keySouth = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), redKeyMat);
    keySouth.rotation.x = -Math.PI / 2;
    keySouth.position.set(0, 0.01, courtLength / 2 - 3);
    courtGroup.add(keySouth);

    // Hoop Towers
    this.createBasketballHoop(courtGroup, 0, -courtLength / 2 + 1, 0);
    this.createBasketballHoop(courtGroup, 0, courtLength / 2 - 1, Math.PI);

    // Court Bleachers / Spectator Benches where Jay is seated
    const bleacher = new THREE.Group();
    bleacher.position.set(-courtWidth / 2 - 2, 0, 0);
    bleacher.rotation.y = Math.PI / 2;

    const stepMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.8 });
    const step1 = new THREE.Mesh(new THREE.BoxGeometry(6, 0.5, 1.2), stepMat);
    step1.position.y = 0.25;
    bleacher.add(step1);
    const step2 = new THREE.Mesh(new THREE.BoxGeometry(6, 1.0, 1.2), stepMat);
    step2.position.set(0, 0.5, -1.0);
    bleacher.add(step2);

    courtGroup.add(bleacher);

    this.scene.add(courtGroup);
  }

  private createBasketballHoop(parent: THREE.Group, x: number, z: number, rotY: number) {
    const hoop = new THREE.Group();
    hoop.position.set(x, 0, z);
    hoop.rotation.y = rotY;

    // Metal pole
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 4.2, 12),
      new THREE.MeshStandardMaterial({ color: 0x334155 })
    );
    pole.position.y = 2.1;
    hoop.add(pole);

    // Backboard
    const backboard = new THREE.Mesh(
      new THREE.BoxGeometry(2.0, 1.4, 0.08),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    backboard.position.set(0, 3.8, 0.6);
    hoop.add(backboard);

    // Orange Rim
    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(0.35, 0.03, 8, 16),
      new THREE.MeshStandardMaterial({ color: 0xea580c })
    );
    rim.rotation.x = Math.PI / 2;
    rim.position.set(0, 3.4, 1.0);
    hoop.add(rim);

    parent.add(hoop);
  }

  // 7. School Running Track & Grandstand (Maya's athletic territory)
  private buildSchoolTrack() {
    const trackGroup = new THREE.Group();
    trackGroup.position.set(-35, 0.06, -25);

    // Red Tartan track lanes
    const trackPavement = new THREE.Mesh(
      new THREE.RingGeometry(12, 22, 32),
      new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.7 })
    );
    trackPavement.rotation.x = -Math.PI / 2;
    trackGroup.add(trackPavement);

    // White lane dividers
    const laneLines = new THREE.Mesh(
      new THREE.RingGeometry(15, 15.2, 32),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    laneLines.rotation.x = -Math.PI / 2;
    laneLines.position.y = 0.01;
    trackGroup.add(laneLines);

    // Track benches & hurdles
    const hurdle = new THREE.Mesh(
      new THREE.BoxGeometry(2, 1, 0.1),
      new THREE.MeshStandardMaterial({ color: 0xfacc15 })
    );
    hurdle.position.set(0, 0.5, 18);
    trackGroup.add(hurdle);

    this.scene.add(trackGroup);
  }

  // 8. Block 125 Neighbourhood Mama Shop (Provisions store where Lina shops)
  private buildMamaShop() {
    const shopGroup = new THREE.Group();
    shopGroup.position.set(24, 0, 34);

    // Stall counter
    const counter = new THREE.Mesh(
      new THREE.BoxGeometry(4.5, 1.1, 1.5),
      new THREE.MeshStandardMaterial({ color: 0x1e293b })
    );
    counter.position.y = 0.55;
    shopGroup.add(counter);

    // Striped Awning (Classic Singapore mama shop)
    const awning = new THREE.Mesh(
      new THREE.BoxGeometry(5.0, 0.2, 2.5),
      new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.5 })
    );
    awning.position.set(0, 2.8, 0.8);
    awning.rotation.x = 0.2;
    shopGroup.add(awning);

    // Drink chillers with colourful beverage cans
    const fridge = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 2.2, 1.0),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3 })
    );
    fridge.position.set(-2.8, 1.1, 0);
    shopGroup.add(fridge);

    this.scene.add(shopGroup);
  }

  // 9. Singapore Police Force Divisional HQ & Consequence Centre
  private buildPoliceStation() {
    const stationGroup = new THREE.Group();
    const posX = 34;
    const posZ = -38;
    stationGroup.position.set(posX, 0, posZ);

    // Main HQ Building Block
    const bWidth = 26;
    const bDepth = 20;
    const bHeight = 10;

    const mainGeo = new THREE.BoxGeometry(bWidth, bHeight, bDepth);
    const mainMat = new THREE.MeshStandardMaterial({
      color: 0xd9e2ec,
      roughness: 0.6,
      metalness: 0.1,
    });
    const mainBuilding = new THREE.Mesh(mainGeo, mainMat);
    mainBuilding.position.y = bHeight / 2;
    mainBuilding.castShadow = true;
    mainBuilding.receiveShadow = true;
    stationGroup.add(mainBuilding);

    // Dark Navy Blue SPF Signature Architectural Banding
    const bandGeo = new THREE.BoxGeometry(bWidth + 0.4, 1.4, bDepth + 0.4);
    const bandMat = new THREE.MeshStandardMaterial({
      color: 0x0f2438, // SPF signature navy
      roughness: 0.4,
    });
    const navyBand = new THREE.Mesh(bandGeo, bandMat);
    navyBand.position.y = 8.5;
    stationGroup.add(navyBand);

    // Lower granite plinth
    const plinthGeo = new THREE.BoxGeometry(bWidth + 0.2, 1.2, bDepth + 0.2);
    const plinthMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8 });
    const plinth = new THREE.Mesh(plinthGeo, plinthMat);
    plinth.position.y = 0.6;
    stationGroup.add(plinth);

    // Front Entrance Portico & Canopy
    const canopyGeo = new THREE.BoxGeometry(10, 0.6, 5);
    const canopyMat = new THREE.MeshStandardMaterial({ color: 0x0f2438, metalness: 0.3 });
    const canopy = new THREE.Mesh(canopyGeo, canopyMat);
    canopy.position.set(0, 4.2, 10 + 2.5);
    canopy.castShadow = true;
    stationGroup.add(canopy);

    // Portico support columns
    const colGeo = new THREE.CylinderGeometry(0.25, 0.25, 4.2, 16);
    const colMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
    const colLeft = new THREE.Mesh(colGeo, colMat);
    colLeft.position.set(-4.2, 2.1, 10 + 4.5);
    colLeft.castShadow = true;
    stationGroup.add(colLeft);

    const colRight = new THREE.Mesh(colGeo, colMat);
    colRight.position.set(4.2, 2.1, 10 + 4.5);
    colRight.castShadow = true;
    stationGroup.add(colRight);

    // Illuminated Main Signboard: "SINGAPORE POLICE FORCE"
    const signBoardGeo = new THREE.BoxGeometry(9.2, 1.1, 0.2);
    const signBoardMat = new THREE.MeshStandardMaterial({
      color: 0x0a192f,
      roughness: 0.3,
    });
    const signBoard = new THREE.Mesh(signBoardGeo, signBoardMat);
    signBoard.position.set(0, 4.8, 10 + 2.5);
    stationGroup.add(signBoard);

    // Sub-signboard: "CONSEQUENCE CENTRE — LAW & YOUTH EDUCATION"
    const subSignGeo = new THREE.BoxGeometry(8.5, 0.65, 0.15);
    const subSignMat = new THREE.MeshBasicMaterial({ color: 0x14b8a6 }); // Glowing teal
    const subSign = new THREE.Mesh(subSignGeo, subSignMat);
    subSign.position.set(0, 3.8, 10 + 4.9);
    stationGroup.add(subSign);

    // Glass Double Entrance Doors
    const doorFrameGeo = new THREE.BoxGeometry(4.2, 3.2, 0.3);
    const doorFrameMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
    const doorFrame = new THREE.Mesh(doorFrameGeo, doorFrameMat);
    doorFrame.position.set(0, 1.6, 10 + 0.1);
    stationGroup.add(doorFrame);

    const glassDoorGeo = new THREE.BoxGeometry(3.6, 2.8, 0.1);
    const glassDoorMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
      roughness: 0.1,
    });
    const glassDoor = new THREE.Mesh(glassDoorGeo, glassDoorMat);
    glassDoor.position.set(0, 1.6, 10 + 0.15);
    stationGroup.add(glassDoor);

    // Warm entrance lobby spotlight
    const lobbyLight = new THREE.PointLight(0x38bdf8, 2, 14);
    lobbyLight.position.set(0, 3.5, 10 + 2.0);
    stationGroup.add(lobbyLight);

    // Paved Station Forecourt
    const forecourtGeo = new THREE.PlaneGeometry(30, 18);
    const forecourtMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.8 });
    const forecourt = new THREE.Mesh(forecourtGeo, forecourtMat);
    forecourt.rotation.x = -Math.PI / 2;
    forecourt.position.set(0, 0.05, 14);
    forecourt.receiveShadow = true;
    stationGroup.add(forecourt);

    // Parking lot divider lines
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
    const bayLine1 = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 5.5), lineMat);
    bayLine1.rotation.x = -Math.PI / 2;
    bayLine1.position.set(-8, 0.06, 13);
    stationGroup.add(bayLine1);

    const bayLine2 = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 5.5), lineMat);
    bayLine2.rotation.x = -Math.PI / 2;
    bayLine2.position.set(-4, 0.06, 13);
    stationGroup.add(bayLine2);

    const bayLine3 = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 5.5), lineMat);
    bayLine3.rotation.x = -Math.PI / 2;
    bayLine3.position.set(6, 0.06, 13);
    stationGroup.add(bayLine3);

    const bayLine4 = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 5.5), lineMat);
    bayLine4.rotation.x = -Math.PI / 2;
    bayLine4.position.set(10, 0.06, 13);
    stationGroup.add(bayLine4);

    // Parked Police Patrol Vehicles
    this.createPoliceCar(stationGroup, -6, 13, 0);
    this.createPoliceCar(stationGroup, 8, 13, 0);

    // Flagpole
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.1, 7, 12),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.8 })
    );
    pole.position.set(-11, 3.5, 12);
    stationGroup.add(pole);

    const flag = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 1.0, 0.04),
      new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.5 })
    );
    flag.position.set(-10.2, 6.2, 12);
    stationGroup.add(flag);

    this.scene.add(stationGroup);

    // Collision Box for Police Station Building
    this.addCollisionBox(
      new THREE.Vector3(posX - bWidth / 2 - 0.5, 0, posZ - bDepth / 2 - 0.5),
      new THREE.Vector3(posX + bWidth / 2 + 0.5, bHeight, posZ + bDepth / 2 + 0.5)
    );

    // Collision Boxes for Parked Police Cars
    this.addCollisionBox(
      new THREE.Vector3(posX - 8, 0, posZ + 10.5),
      new THREE.Vector3(posX - 4, 2.5, posZ + 15.5)
    );
    this.addCollisionBox(
      new THREE.Vector3(posX + 6, 0, posZ + 10.5),
      new THREE.Vector3(posX + 10, 2.5, posZ + 15.5)
    );
  }

  // Helper: Stylized Singapore Police Fast Response Car
  private createPoliceCar(parent: THREE.Group, x: number, z: number, rotY: number) {
    const car = new THREE.Group();
    car.position.set(x, 0, z);
    car.rotation.y = rotY;

    // White Main Car Body
    const bodyGeo = new THREE.BoxGeometry(2.3, 0.8, 4.6);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.65;
    body.castShadow = true;
    car.add(body);

    // Cabin / Windshield
    const cabinGeo = new THREE.BoxGeometry(2.0, 0.75, 2.4);
    const cabinMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.1,
      metalness: 0.5,
    });
    const cabin = new THREE.Mesh(cabinGeo, cabinMat);
    cabin.position.set(0, 1.35, -0.2);
    cabin.castShadow = true;
    car.add(cabin);

    // High-Vis Battenburg Police Markings (Navy & Fluorescent Yellow)
    const stripeGeo = new THREE.BoxGeometry(2.34, 0.35, 3.8);
    const stripeMat = new THREE.MeshStandardMaterial({ color: 0x0f2438 });
    const stripe = new THREE.Mesh(stripeGeo, stripeMat);
    stripe.position.y = 0.65;
    car.add(stripe);

    // Roof Emergency Lightbar (Red & Blue)
    const barGeo = new THREE.BoxGeometry(1.6, 0.2, 0.4);
    const barMat = new THREE.MeshStandardMaterial({ color: 0x334155 });
    const bar = new THREE.Mesh(barGeo, barMat);
    bar.position.set(0, 1.8, -0.2);
    car.add(bar);

    const redLight = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 0.22, 0.35),
      new THREE.MeshBasicMaterial({ color: 0xef4444 })
    );
    redLight.position.set(-0.45, 1.82, -0.2);
    car.add(redLight);

    const blueLight = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 0.22, 0.35),
      new THREE.MeshBasicMaterial({ color: 0x3b82f6 })
    );
    blueLight.position.set(0.45, 1.82, -0.2);
    car.add(blueLight);

    // Wheels (4)
    const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.3, 16);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 });

    const wheelFL = new THREE.Mesh(wheelGeo, wheelMat);
    wheelFL.rotation.z = Math.PI / 2;
    wheelFL.position.set(-1.15, 0.35, 1.4);
    car.add(wheelFL);

    const wheelFR = new THREE.Mesh(wheelGeo, wheelMat);
    wheelFR.rotation.z = Math.PI / 2;
    wheelFR.position.set(1.15, 0.35, 1.4);
    car.add(wheelFR);

    const wheelRL = new THREE.Mesh(wheelGeo, wheelMat);
    wheelRL.rotation.z = Math.PI / 2;
    wheelRL.position.set(-1.15, 0.35, -1.4);
    car.add(wheelRL);

    const wheelRR = new THREE.Mesh(wheelGeo, wheelMat);
    wheelRR.rotation.z = Math.PI / 2;
    wheelRR.position.set(1.15, 0.35, -1.4);
    car.add(wheelRR);

    parent.add(car);
  }

  // 10. Warm streetlamps lighting the footpaths
  private buildStreetLamps() {
    const lampPositions = [
      { x: -8, z: -25 },
      { x: -8, z: 0 },
      { x: -8, z: 25 },
      { x: -8, z: 50 },
      { x: 8, z: -25 },
      { x: 8, z: 0 },
      { x: 8, z: 25 },
      { x: 8, z: 50 },
    ];

    lampPositions.forEach((p) => {
      const lamp = new THREE.Group();
      lamp.position.set(p.x, 0, p.z);

      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.15, 6, 8),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6 })
      );
      pole.position.y = 3;
      lamp.add(pole);

      // Warm glowing lantern bulb
      const bulb = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xffe082 })
      );
      bulb.position.set(0, 6, 0);
      lamp.add(bulb);

      const light = new THREE.PointLight(0xffb74d, 1.2, 18);
      light.position.set(0, 5.8, 0);
      lamp.add(light);

      this.scene.add(lamp);
    });
  }

  private addCollisionBox(min: THREE.Vector3, max: THREE.Vector3) {
    this.collisionBoxes.push({ min, max });
  }

  // Check if character position collides with world objects
  public checkCollision(pos: THREE.Vector3, radius: number = 0.6): boolean {
    for (const box of this.collisionBoxes) {
      if (
        pos.x + radius > box.min.x &&
        pos.x - radius < box.max.x &&
        pos.z + radius > box.min.z &&
        pos.z - radius < box.max.z
      ) {
        return true;
      }
    }
    return false;
  }
}
