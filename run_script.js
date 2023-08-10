import {
    initAndRetEnvironment,
    addVillageGround,
    addWaterTank,
    addPond,
    nightScene,
} from './subroutines.js';
import {
    addBarn,
    addTrees,
    dayScene
} from './subroutines2.js';
import * as THREE from 'three';

// create environment.
var environment = initAndRetEnvironment();

document.addEventListener("keydown", function(event){
    // Change the light settings group.
    event.key;
    if((event.key == "D" || event.key == "d") && 
            (environment.mode == 'N')){
        environment.mode = dayScene(environment.scene.getObjectByName("lightObjects"));
    }
    else if((event.key == "N" || event.key == "n") && 
            (environment.mode == 'D')){
        environment.mode = nightScene(environment.scene.getObjectByName("type", THREE.Group));
    }    
});

// add the ground to the scene.
addVillageGround(environment.scene);

// add the water tank.
addWaterTank(environment.scene);

// add the barn.
addBarn(environment.scene);

// add the trees.
addTrees(environment.scene);

// add the water pond.
addPond(environment.scene);

// program controls.
// toggle start/stop of shape rotation button...
// toggle direction of shape rotation button...
// increase/decrease speed of shape rotation slider...
// zoom in/out of centre slider...

function animate(){
    // render the scene using the camera's perspective.
    environment.orbit.update();
    environment.renderer.render(
        environment.scene,
        environment.camera
    );
}

environment.renderer.setAnimationLoop(animate);