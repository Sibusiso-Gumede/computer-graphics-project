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
    dayScene,
    addGardenLights
} from './subroutines2.js';

// create environment.
var environment = initAndRetEnvironment();

document.addEventListener("keydown", function(event){
    // Change the light settings group and update the mode flag.
    if((event.key == "D" || event.key == "d") && 
            (environment.mode == 'N')){
        environment.mode = dayScene(environment.scene);
    }
    else if((event.key == "N" || event.key == "n") && 
            (environment.mode == 'D')){
        environment.mode = nightScene(environment.scene);
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

addGardenLights(environment.scene);

function animate(){
    // render the scene using the camera's perspective.
    environment.orbit.update();
    environment.renderer.render(
        environment.scene,
        environment.camera
    );
}

environment.renderer.setAnimationLoop(animate);