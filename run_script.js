import {
    initAndRetEnvironment,
    AddVillageGround,
    AddWaterTank,
    AddPond
} from './subroutines.js';
import {
    AddBarn,
    AddTrees
} from './subroutines2.js';

// create environment.
var environment = initAndRetEnvironment();

// add the ground to the scene.
AddVillageGround(environment.scene);

// add the water tank.
AddWaterTank(environment.scene);

// add the barn.
AddBarn(environment.scene);

// add the trees.
AddTrees(environment.scene);

// add the water pond.
AddPond(environment.scene);

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