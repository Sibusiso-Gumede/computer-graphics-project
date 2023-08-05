import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

// setup the renderer, scene, camera and the rest.
export function initAndRetEnvironment(){

    const renderer = new THREE.WebGLRenderer();

    // make the canvas be the same size as the browser window.
    renderer.setSize(window.innerWidth, window.innerHeight);

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
    var startRotationButton = document.getElementById("StartButton");
    var stopRotationButton = document.getElementById("StopButton");
    var toggleRotationButton = document.getElementById("DirectionButton");
    var speedSlider = document.getElementById("increaseSpeedSlider");
    var buttonInput = document.getElementById("btn");
    
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

    if (buttonInput.addEventListener) 
        buttonInput.addEventListener("click", testtest, false);

    else if (buttonInput.attachEvent) 
        buttonInput.attachEvent('onclick', testtest);

    function testtest(e) {
        var value = speedSlider.value;
        if (value > 0 && value < 5)
            alert("First");
        else
            alert("Second");
    }

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // move the camera to a preferable position.
    camera.position.set(11, 7, 11);

    const gridHelper = new THREE.GridHelper(30);
    scene.add(gridHelper);

    return new Object({scene, camera, renderer, orbit});
}

/* since our scene is based in an outdoor environment, a
    mesh material that will react 'correctly' under all
    lighting is needed. Therefore, a standard material will 
    be appropriate. */

export function AddVillageGround(scene){
    // the village ground...
    const groundGeometry = new THREE.PlaneGeometry(30, 30);
    const groundMaterial = new THREE.MeshBasicMaterial({
        color: 0xc79c4d,
        side: THREE.DoubleSide
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -0.5 * Math.PI;
    scene.add(ground);
}

// the water tank...
export function AddWaterTank(scene){
    const waterTankGeometry = new THREE.CylinderGeometry(3, 3, 4); 
    const waterTankMaterial = new THREE.MeshBasicMaterial({color: 0x2EB82E});
    const waterTank = new THREE.Mesh(waterTankGeometry, waterTankMaterial);
    waterTank.position.set(-6, 5, -6);
    scene.add(waterTank);

    // the support structure of the water tank.
    const supportGeometry = new THREE.BoxGeometry(6, 3, 6);
    const supportMaterial = new THREE.MeshBasicMaterial({
        color: 0x99999a
    });
    const supportStructure = new THREE.Mesh(supportGeometry, supportMaterial);
    supportStructure.position.set(-6, 1.55, -6);
    scene.add(supportStructure);
}

// subroutine for rotating an object on its axis.
export function rotateObject(object, degreeX=0, degreeY=0, degreeZ=0) {
    object.rotateX(degreeX * (Math.PI / 180));
    object.rotateY(degreeY * (Math.PI / 180));
    object.rotateZ(degreeZ * (Math.PI / 180));
 }
 
// the pond.
export function AddPond(scene){
    // create two circles forming a pond.
    const pondRadius = 2;
    const pondGeometry1 = new THREE.CircleGeometry(pondRadius);
    const pondGeometry2 = new THREE.CircleGeometry(pondRadius+1);
    const algaeGeometry = new THREE.CircleGeometry(pondRadius*0.125);
    const algaeGeometry2 = new THREE.CircleGeometry(pondRadius*0.25);
    const pondMaterial = new THREE.MeshBasicMaterial({color:0x5f87d7});
    // add some algae for realistic effects.
    const algaeMaterial = new THREE.MeshBasicMaterial({color:0x007f00});
    const pond1 = new THREE.Mesh(pondGeometry1, pondMaterial);
    const pond2 = new THREE.Mesh(pondGeometry2, pondMaterial);
    const algae = new THREE.Mesh(algaeGeometry, algaeMaterial);
    const algae2 = new THREE.Mesh(algaeGeometry2, algaeMaterial);
    pond1.position.set(5, 0.10, 5);
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

// the program controls.
function optionControls(){
    
}