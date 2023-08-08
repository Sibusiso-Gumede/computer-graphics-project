import {
    initAndRetEnvironment,
    addVillageGround,
    addWaterTank,
    addPond,
    nightScene
} from './subroutines.js';
import {
    addBarn,
    addTrees,
    dayScene
} from './subroutines2.js';

// create environment.
var environment = initAndRetEnvironment();

document.addEventListener("keydown", function(event){
    var key = event.key;
    if(key == "D" || key == "d")
        dayScene(environment.scene);
    else if(key == "N" || key == "n")
        nightScene(environment.scene);
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

// The night scene is initial state of the environment.


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