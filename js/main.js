/**
 * Horror Room, a WebVR experience
 * by Nick & Tobias
 */

var scene, camera, renderer, room, controls, effect, element, container;

function initScene() {

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    element = renderer.domElement;
    renderer.setSize( window.innerWidth, window.innerHeight );
    container = document.getElementById('webglviewer');
    container.appendChild(element);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 1.5);

    controls = new THREE.OrbitControls(camera, element);
    controls.target.set(
        camera.position.x + 0.15,
        camera.position.y,
        camera.position.z
    );
    controls.noPan = true;
    controls.noZoom = true;

    effect = new THREE.StereoEffect(renderer);

}

function setOrientationControls(e) {
    if (!e.alpha) {
        return;
    }
    controls = new THREE.DeviceOrientationControls(camera, true);
    controls.connect();
    controls.update();
    element.addEventListener('click', fullscreen, false);
    window.removeEventListener('deviceorientation', setOrientationControls, true);
}
window.addEventListener('deviceorientation', setOrientationControls, true);

function initRoom() {
    var textureLoader = new THREE.TextureLoader();

    var floorGeometry = new THREE.BoxGeometry(5, .01, 5);
    var floorMaterial = new THREE.MeshLambertMaterial({map: textureLoader.load('textures/laken.jpg'), side: THREE.DoubleSide});

    room = new THREE.Mesh(floorGeometry, floorMaterial);

    //The walls
    var wallNGeometry = new THREE.BoxGeometry(5, 3, 0);
    var wallEGeometry = new THREE.BoxGeometry(0.01, 3, 5);
    var wallSGeometry = new THREE.BoxGeometry(5, 3, .01);
    var wallWGeometry = new THREE.BoxGeometry(.01, 3, 5);
    var ceilingGeometry = new THREE.BoxGeometry(5, .01, 5);

    var wallNMaterial = new THREE.MeshLambertMaterial({map: textureLoader.load('textures/Keu.jpg'), side: THREE.DoubleSide});
    var wallEMaterial = new THREE.MeshLambertMaterial({map: textureLoader.load('textures/Keu.jpg'), side: THREE.DoubleSide});
    var wallSMaterial = new THREE.MeshLambertMaterial({map: textureLoader.load('textures/Keu.jpg'), side: THREE.DoubleSide});
    var wallWMaterial = new THREE.MeshLambertMaterial({map: textureLoader.load('textures/Keu.jpg'), side: THREE.DoubleSide});
    var ceilingMaterial = new THREE.MeshLambertMaterial({map: textureLoader.load('textures/1.jpg'), side: THREE.DoubleSide});

    var roomData = [
        {posX:0, posY:1.5, posZ:-2.5, rotX:0, rotY:0, rotZ:0, geometry:wallNGeometry, material:wallNMaterial},
        {posX:2.5, posY:1.5, posZ:0, rotX:0, rotY:90, rotZ:0, geometry:wallEGeometry, material:wallEMaterial},
        {posX:0, posY:1.5, posZ:2.5, rotX:0, rotY:0, rotZ:0, geometry:wallSGeometry, material:wallSMaterial},
        {posX:-2.5, posY:1.5, posZ:0, rotX:0, rotY:90, rotZ:0, geometry:wallWGeometry, material:wallWMaterial},
        {posX:0, posY:3, posZ:0, rotX:0, rotY:0, rotZ:0, geometry:ceilingGeometry, material:ceilingMaterial}
    ];

    for(var i = 0; i < roomData.length; i++){
        var wall = new THREE.Mesh(roomData[i].geometry, roomData[i].material);
        wall.position.set(roomData[i].posX, roomData[i].posY, roomData[i].posZ);
        room.add(wall);
    }

    scene.add(room);
}

function lighting() {
    var ambient = new THREE.AmbientLight(0x404040);
    scene.add(ambient)

}

function render() {
    requestAnimationFrame( render );

    controls.update();

    renderer.render( scene, camera );

}

initScene();
initRoom();
lighting();
render();