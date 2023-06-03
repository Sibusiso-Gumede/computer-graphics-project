# computer-graphics-project
A simple village: a university project developed using WebGL and ThreeJS which is part of my final year computer graphics module.

## Table of Contents
  Tech Stack  
  Module Dependencies  
  Program Modules  
  How to Run the Program

## Tech Stack
  Node.js (npm tool for managing packages like vite)  
  WebGL  
  Vite (for local development server)  
  ThreeJS (provides a rich set of geometries, shading functions and more)

## Module Dependencies
'three/examples/jsm/controls/OrbitControls.js'

## Program Modules
|Name         |Purpose of the module                                              |  
|---|---|
|index        |The entry point to the application. It resolves <script></script>  |
|             |which references the JavaScript source code.|  
|run_script   |Integrates all the subroutines to initialise the scene objects.    |  
|subroutines  |Contains functions that modify the scene.                          |  
|subroutines2 |Contains functions used in the run_script module.                  |  

## How to Run the Program?
Since ES6 modules work via HTTP(s) protocol and not via file:// protocol,  
you've two options:
1)  Install a development web server tool by typing,  
    $ npm install vite  
    and  
    $ npx vite (to initialise the web server)
    on your cli.
2)  Or run chrome using the --allow-file-access-from-files flag.
