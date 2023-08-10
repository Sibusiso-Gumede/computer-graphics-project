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
    scene.add(defaultLightSettings());

    const lightSourceGeometry = new THREE.SphereGeometry(3);
    const lightSourceTexture = new THREE.TextureLoader().load("./assets/moon.jpg");
    const lightSourceMaterial = new THREE.MeshBasicMaterial({
        map: lightSourceTexture});
    const lightSource = new THREE.Mesh(lightSourceGeometry, lightSourceMaterial);
    lightSource.position.set(-30, 25, 0);
    lightSource.name = "lightSource";

    scene.add(lightSource);

    return new Object({scene, camera, renderer, orbit, mode});
}

export function addVillageGround(scene){
    // The village ground...
    const groundGeometry = new THREE.PlaneGeometry(30, 30);
    const groundTexture = new THREE.TextureLoader().load('./assets/lawn2.jpg');
    const groundMaterial = new THREE.MeshStandardMaterial({
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
    const waterTankMaterial = new THREE.MeshStandardMaterial({map: waterTankTexture});
    const waterTank = new THREE.Mesh(waterTankGeometry, waterTankMaterial);
    waterTank.position.set(-6, 5, -6);
    waterTank.castShadow = true;
    scene.add(waterTank);

    // The support structure of the water tank.
    const supportGeometry = new THREE.BoxGeometry(6, 3, 6);
    const supportMaterial = new THREE.MeshStandardMaterial({color: 0x99999a});
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
        map: pondTexture});
    
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

export function nightScene(scene){
    changeLightSource(scene, "./assets/moon.jpg");
    scene.getObjectByName("lightObjects").getObjectByName("ambientLight").intensity = 0.00;
    scene.getObjectByName("lightObjects").getObjectByName("dLight").intensity = 0.0125;
    
    scene.getObjectByName("lightObjects").getObjectByName("posLight1").intensity = 0.0032;
    scene.getObjectByName("lightObjects").getObjectByName("posLight2").intensity = 0.0032;
    scene.getObjectByName("lightObjects").getObjectByName("posLight3").intensity = 0.0032;
    
    return 'N';
}

export function defaultLightSettings(){
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.00);
    ambientLight.name = "ambientLight";
    const dLight = new THREE.DirectionalLight(0xffffff, 0.0125);
    dLight.name = "dLight";
    
    dLight.position.set(-25, 25, 0);
    dLight.castShadow = true;
    dLight.shadow.camera.top = 12;
    dLight.shadow.camera.left = -12;
    dLight.shadow.camera.right = 12;
    
    const dLightHelper = new THREE.DirectionalLightHelper(dLight, 5);
    const dLightShadowHelper = new THREE.CameraHelper(dLight.shadow.camera);
    
    const lightObjects = new THREE.Group();
    lightObjects.name = "lightObjects";
    lightObjects.add(ambientLight);
    lightObjects.add(dLight);
    lightObjects.add(dLightHelper);
    lightObjects.add(dLightShadowHelper);

    const posLight1 = new THREE.DirectionalLight(0xffffff, 0.0032);
    const posLight2 = new THREE.DirectionalLight(0xffffff, 0.0032);
    const posLight3 = new THREE.DirectionalLight(0xffffff, 0.0032);

    posLight1.name = "posLight1";
    posLight2.name = "posLight2";
    posLight3.name = "posLight3";
    
    posLight1.position.set(0, 1, 0);
    posLight2.position.set(-12, 1, 12);
    posLight3.position.set(12, 1, 12);

    posLight1.castShadow = true;
    posLight2.castShadow = true;
    posLight3.castShadow = true;

    posLight1.shadow.camera.top = 2;
    posLight1.shadow.camera.bottom = 2;
    posLight1.shadow.camera.left = -2;
    posLight1.shadow.camera.right = 2;

    posLight2.shadow.camera.top = 2;
    posLight2.shadow.camera.bottom = 2;
    posLight2.shadow.camera.left = -2;
    posLight2.shadow.camera.right = 2;

    posLight3.shadow.camera.top = 2;
    posLight3.shadow.camera.bottom = 2;
    posLight3.shadow.camera.left = -2;
    posLight3.shadow.camera.right = 2;

    const p1LightHelper = new THREE.DirectionalLightHelper(posLight1, 1);
    const p2LightHelper = new THREE.DirectionalLightHelper(posLight2, 1);
    const p3LightHelper = new THREE.DirectionalLightHelper(posLight3, 1);

    lightObjects.add(posLight1);
    lightObjects.add(posLight2);
    lightObjects.add(posLight3);
    lightObjects.add(p1LightHelper);
    lightObjects.add(p2LightHelper);
    lightObjects.add(p3LightHelper);
    
    return lightObjects;
}

export function changeLightSource(scene, textureMap){
    const sourceTexture = new THREE.TextureLoader().load(textureMap);
    const sourceMaterial = new THREE.MeshBasicMaterial({
        map: sourceTexture});
    scene.getObjectByName("lightSource").material = sourceMaterial;
}