import * as THREE from 'three';
import {rotateObject,
        changeLightSource
} 
from './subroutines.js';

export function addBarn(scene){
    // The barn...
    const barnDepth = 8;
    const barnWallsTexture = new THREE.TextureLoader().load('./assets/barn.jpg');
    // Walls.
    const wallsGeometry = new THREE.BoxGeometry(5, 5.20, barnDepth);
    const wallsMaterial = new THREE.MeshStandardMaterial({map: barnWallsTexture});

    const supportingWalls = new THREE.Mesh(wallsGeometry, wallsMaterial);
    supportingWalls.position.set(8, 2.70, -6);
    supportingWalls.castShadow = true;
    scene.add(supportingWalls);

    // The roof.
    // Vertices of a 2D triangle.
    var A = new THREE.Vector2(0, 0);
    var B = new THREE.Vector2(7, 0.0);
    var C = new THREE.Vector2(3.50, 4);

    var vertices = [A, B, C];

    var shape = new THREE.Shape();

    // join the vertices of the 2D shape using line segments.
    shape.moveTo(vertices[0].x, vertices[0].y);
    for(var i=1; i<vertices.length; i++)
        shape.lineTo(vertices[i].x, vertices[i].y);
    
    shape.lineTo(vertices[0].x, vertices[0].y);

    // Properties of the shape.
    const settings = {
    depth: barnDepth,
    bevelEnabled: true
    };

    // Create a 3D geometry from the 2D triangle.
    const roofGeometry = new THREE.ExtrudeGeometry(shape, settings);
    const barnRoofTexture = new THREE.TextureLoader().load('./assets/roof.jpg');
    barnRoofTexture.wrapS = THREE.RepeatWrapping;
    barnRoofTexture.wrapT = THREE.RepeatWrapping;
    barnRoofTexture.repeat.set(1, 1);
    const roofMaterial = new THREE.MeshStandardMaterial({map: barnRoofTexture});
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.set(4.35, 5.00, -10);
    roof.castShadow = true;
    scene.add(roof);
}

// Trees.
export function addTrees(scene){
    // Generate an array of values.
    function arrayRange(start, finish, step){
        var array = [];
        if(step>0){    
            for(var i=start; i<=finish; i+=step)
                array.push(i);
        }
        else if(step<0){
            for(var j=start; j>=finish; j-=step)
                array.push(i);
        }
        return array;
    }

    // return a random value from an array.
    function getRandomValue(arr){
        const randomIndex = Math.floor(Math.random()*arr.length);
        const value = arr[randomIndex];
        return value;
    }

    // tree trunk function.
    function populateTrunk(ts){
        const trunkGeometry = new THREE.CylinderGeometry(
            ts.trunkTopRadius,
            ts.trunkBottomRadius,
            ts.trunkHeight
        )
        const trunkTexture = new THREE.TextureLoader().load("./assets/tree-trunk.jpg");
        const trunkMaterial = new THREE.MeshStandardMaterial({
            map: trunkTexture});
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        // translate object.
        trunk.position.set(ts.translateX, ts.translateY, ts.translateZ);
        trunk.castShadow = true;
        scene.add(trunk);
    }

    // tree branches/leafs function.
    function populateBranchLeaf(bs){
        
        var axisBoundedAngleRight = arrayRange(0, 90, 5);
        var axisBoundedAngleLeft = arrayRange(90, 180, 5);
        var axisBoundedAngleLowerLeft = arrayRange(180, 220, 5);
        var axisBoundedAngleLowerRight = arrayRange(320, 360, 5);
        var randomAngle = 0;

        // randomly populate branches/leafs within the upper vicinity of the
        // tree trunk.
        const branchGeometry = new THREE.ConeGeometry(bs.branchRadius, bs.branchLength);
        const branchMaterial = new THREE.MeshBasicMaterial({color:0x00ff00});
        for(var i=1; i<=60; i++){    
            const branch = new THREE.Mesh(branchGeometry, branchMaterial);
            branch.castShadow = true;
            branch.position.set(getRandomValue(bs.dimensionXBound), 
            getRandomValue(bs.dimensionYBound), getRandomValue(bs.dimensionZBound));
            
            if(i<=15){
                randomAngle = getRandomValue(axisBoundedAngleRight);
            }
            else if(i>15&&i<=30){
                randomAngle = getRandomValue(axisBoundedAngleLeft);
            }
            else if(i>30&&i<=45){
                randomAngle = getRandomValue(axisBoundedAngleLowerLeft);
            }
            else if(i>45&&i<=60){
                randomAngle = getRandomValue(axisBoundedAngleLowerRight);
            }
            rotateObject(branch, randomAngle, randomAngle, randomAngle);
            scene.add(branch);
        }
    }

    // tree1.
    const trunk1 = {
        trunkTopRadius: 0.5,
        trunkBottomRadius: 2,
        trunkHeight: 6,
        translateX: -6,
        translateY: 3.10,
        translateZ: 6
    };

    // branches/leafs1.
    const branchLeaf1 = {
        branchRadius: 0.20,
        branchLength: 0.75,
        dimensionXBound: arrayRange(-8, -4, 0.25),
        dimensionYBound: arrayRange(4, 7, 0.25),
        dimensionZBound: arrayRange(4, 8, 0.25)
    };
    
    // populate tree1.
    populateTrunk(trunk1);
    populateBranchLeaf(branchLeaf1);

    // tree2.
    const trunk2 = {
        trunkTopRadius: 0.25,
        trunkBottomRadius: 0.75,
        trunkHeight: 6*(2/3),
        translateX: -3,
        translateY: 3.10*(2/3),
        translateZ: 12
    };

    // branches/leafs2.
    const branchLeaf2 = {
        branchRadius: 0.1,
        branchLength: 0.50,
        dimensionXBound: arrayRange(-4, -1, 0.25),
        dimensionYBound: arrayRange(3, 5, 0.25),
        dimensionZBound: arrayRange(11, 13, 0.25)
    };

    // populate tree2.
    populateTrunk(trunk2);
    populateBranchLeaf(branchLeaf2);

    // tree3
    const trunk3 = {
        trunkTopRadius: 0.17,
        trunkBottomRadius: 0.51,
        trunkHeight: 6*(3/4),
        translateX: -9,
        translateY: 3.10*(3/4),
        translateZ: 10
    };

    const branchLeaf3 = {
        branchRadius: 0.1,
        branchLength: 0.50,
        dimensionXBound: arrayRange(-10, -8, 0.25),
        dimensionYBound: arrayRange(3, 5, 0.25),
        dimensionZBound: arrayRange(9, 11, 0.25)
    };

    // populate tree3.
    populateTrunk(trunk3);
    populateBranchLeaf(branchLeaf3);
}

export function dayScene(scene){
    changeLightSource(scene, "./assets/sun.jpg");
    
    scene.getObjectByName("lightObjects").getObjectByName("ambientLight").intensity = 0.25;
    scene.getObjectByName("lightObjects").getObjectByName("dLight").intensity = 0.80;

    scene.getObjectByName("lightObjects").getObjectByName("posLight1").intensity = 0.00;
    scene.getObjectByName("lightObjects").getObjectByName("posLight2").intensity = 0.00;
    scene.getObjectByName("lightObjects").getObjectByName("posLight3").intensity = 0.00;

    return 'D';
}

export function addGardenLights(scene){
    const light1Geometry = new THREE.CylinderGeometry(0.5, 0.5);
    const light2Geometry = new THREE.CylinderGeometry(0.5, 0.5);
    const light3Geometry = new THREE.CylinderGeometry(0.5, 0.5);

    const light1Material = new THREE.MeshStandardMaterial({color: 0x85A3FF});
    const light2Material = new THREE.MeshStandardMaterial({color: 0x85A3FF});
    const light3Material = new THREE.MeshStandardMaterial({color: 0x85A3FF});

    const light1 = new THREE.Mesh(light1Geometry, light1Material);
    const light2 = new THREE.Mesh(light2Geometry, light2Material);
    const light3 = new THREE.Mesh(light3Geometry, light3Material);

    light1.position.set(0, 0.4, 0);
    light2.position.set(-12, 0.4, 12);
    light3.position.set(12, 0.4, 12);

    scene.add(light1);
    scene.add(light2);
    scene.add(light3);
}