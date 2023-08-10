import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

// Initialize the environment.
export function initAndRetEnvironment(){

    const renderer = new THREE.WebGLRenderer();

    // Make the canvas be the same size as the browser window.
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    // map the canvas to the body segment of the HTML document.
    document.body.appendChild(renderer.domElement);

    // declare and initialize the scene for the environment.
    const scene = new THREE.Scene();

    // declare and initialize the camera.
    const camera = new THREE.PerspectiveCamera(
        75,
        800 / 400,
        1,
        1000
    );

    const orbit = new OrbitControls(camera, renderer.domElement);

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // Move the camera to a preferable position.
    camera.position.set(11, 7, 11);

    const gridHelper = new THREE.GridHelper(30);
    scene.add(gridHelper);    

    var startRotationButton = document.getElementById("StartButton");
    var stopRotationButton = document.getElementById("StopButton");
    var toggleRotationButton = document.getElementById("DirectionButton");
    var speedSlider = document.getElementById("increaseSpeedSlider");
        
    startRotationButton.addEventListener("click", function(){
        orbit.autoRotate = true;
    });

    stopRotationButton.addEventListener("click", function(){
        orbit.autoRotate = false;
    });

    toggleRotationButton.addEventListener("click", function(){
        if(orbit.autoRotateSpeed > 0)
            orbit.autoRotateSpeed = -1;
        else if(orbit.autoRotateSpeed < 0)
            orbit.autoRotateSpeed = 1;
    });

    let rangeValues = {
        50:1, 40:-1, 60:2, 30:-2, 70:3, 20:-3, 80:4, 10:-4, 
        90:5, 0:-5, 100:6
    };

    speedSlider.addEventListener("mouseup", function(){
        orbit.autoRotateSpeed = rangeValues[speedSlider.value];
    });
    
    // Scene mode. D for day. N for night.
    var mode = 'N';
    // add light sources.
    var lights = defaultLightSettings();

    scene.add(lights);

    return new Object({scene, camera, renderer, orbit, mode});
}

export function addVillageGround(scene){
    // The village ground...
    const groundGeometry = new THREE.PlaneGeometry(30, 30);
    const groundTexture = new THREE.TextureLoader().load('./assets/grass.jpg');
    const groundMaterial = new THREE.MeshStandardMaterial({
        //color: 0xc79c4d,
        side: THREE.DoubleSide,
        map: groundTexture
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -0.5 * Math.PI;
    ground.receiveShadow = true;
    scene.add(ground);
}

// The water tank...
export function addWaterTank(scene){
    const waterTankGeometry = new THREE.CylinderGeometry(3, 3, 4); 
    const waterTankTexture = new THREE.TextureLoader().load('./assets/water-tank.jpg');
    waterTankTexture.wrapS = THREE.RepeatWrapping;
    waterTankTexture.wrapT = THREE.RepeatWrapping;
    waterTankTexture.repeat.set(5, 1);
    const waterTankMaterial = new THREE.MeshStandardMaterial({
        //color: 0x2EB82E,
        map: waterTankTexture
    });
    const waterTank = new THREE.Mesh(waterTankGeometry, waterTankMaterial);
    waterTank.position.set(-6, 5, -6);
    waterTank.castShadow = true;
    scene.add(waterTank);

    // The support structure of the water tank.
    const supportGeometry = new THREE.BoxGeometry(6, 3, 6);
    const supportMaterial = new THREE.MeshStandardMaterial({
        color: 0x99999a
        //map: 
    });
    const supportStructure = new THREE.Mesh(supportGeometry, supportMaterial);
    supportStructure.position.set(-6, 1.55, -6);
    supportStructure.castShadow = true;
    scene.add(supportStructure);
}

// subroutine for rotating an object on its axis.
export function rotateObject(object, degreeX=0, degreeY=0, degreeZ=0){
    object.rotateX(degreeX * (Math.PI / 180));
    object.rotateY(degreeY * (Math.PI / 180));
    object.rotateZ(degreeZ * (Math.PI / 180));
}
 
// the pond.
export function addPond(scene){
    // create two circles forming a pond.
    const pondRadius = 2;
    const pondGeometry1 = new THREE.CircleGeometry(pondRadius);
    const pondGeometry2 = new THREE.CircleGeometry(pondRadius+1);
    const pondTexture = new THREE.TextureLoader().load('./assets/water.jpg');
    const algaeGeometry = new THREE.CircleGeometry(pondRadius*0.125);
    const algaeGeometry2 = new THREE.CircleGeometry(pondRadius*0.25);
    const pondMaterial = new THREE.MeshStandardMaterial({
        //color:0x5f87d7,
        map: pondTexture
    });
    
    // add some algae for realistic effects.
    const algaeMaterial = new THREE.MeshBasicMaterial({color:0x007f00});
    const pond1 = new THREE.Mesh(pondGeometry1, pondMaterial);
    const pond2 = new THREE.Mesh(pondGeometry2, pondMaterial);
    const algae = new THREE.Mesh(algaeGeometry, algaeMaterial);
    const algae2 = new THREE.Mesh(algaeGeometry2, algaeMaterial);

    pond1.position.set(5, 0.11, 5);
    pond2.position.set(8, 0.10, 8);
    algae.position.set(4, 0.12, 5);
    algae2.position.set(7, 0.12, 7);

    pond1.rotation.x = -0.5 * Math.PI;
    pond2.rotation.x = -0.5 * Math.PI;
    algae.rotation.x = -0.5 * Math.PI;
    algae2.rotation.x = -0.5 * Math.PI;
    
    scene.add(pond1);
    scene.add(pond2);
    scene.add(algae);
    scene.add(algae2);
}

export function nightScene(lightSettings){
    lightSettings.getObjectByProperty("type", THREE.AmbientLight).intensity = 0.00;
    lightSettings.getObjectByProperty("type", THREE.DirectionalLight).intensity = 0.20;
}

export function defaultLightSettings(){
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.00);
    const dLight = new THREE.DirectionalLight(0xffffff, 0.20);
    
    dLight.position.set(-30, 25, 0);
    dLight.castShadow = true;
    dLight.shadow.camera.top = 12;
    dLight.shadow.camera.left = -12;
    dLight.shadow.camera.right = 12;
    
    const dLightHelper = new THREE.DirectionalLightHelper(dLight, 5);
    const dLightShadowHelper = new THREE.CameraHelper(dLight.shadow.camera);
    
    var lightObjects = new THREE.Group();
    lightObjects.add(ambientLight);
    lightObjects.add(dLight);
    lightObjects.add(dLightHelper);
    lightObjects.add(dLightShadowHelper);
    
    return lightObjects;
}