/**
 * Horror Room, a WebVR experience
 * by Nick & Tobias
 */

var scene, camera, renderer, room, controls, element, container, isMouseDown = false;

function initScene() {

    WEBVR.checkAvailability().catch( function( message ) {

        document.body.appendChild( WEBVR.getMessageContainer( message ) );

    } );

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    element = renderer.domElement;
    renderer.setSize( window.innerWidth, window.innerHeight );
    container = document.getElementById('webglviewer');
    container.appendChild(element);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    //scene.add(camera);

    controls = new THREE.OrbitControls(camera, element);
    controls.target.set(
        camera.position.x + 0.15,
        camera.position.y,
        camera.position.z
    );
    controls.noPan = true;
    controls.noZoom = true;

    renderer.vr.enabled = true;

    WEBVR.getVRDisplay( function ( display ) {

        renderer.vr.setDevice( display );

        document.body.appendChild( WEBVR.getButton( display, renderer.domElement ) );

    } );

    renderer.domElement.addEventListener( 'mousedown', onMouseDown, false );
    renderer.domElement.addEventListener( 'mouseup', onMouseUp, false );
    renderer.domElement.addEventListener( 'touchstart', onMouseDown, false );
    renderer.domElement.addEventListener( 'touchend', onMouseUp, false );

    //

    window.addEventListener( 'resize', onWindowResize, false );

}

function onMouseDown() {

    isMouseDown = true;

}

function onMouseUp() {

    isMouseDown = false;

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    controls.target.set(
        camera.position.x + 0.15,
        camera.position.y,
        camera.position.z
    );


    renderer.setSize( window.innerWidth, window.innerHeight );

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
    var floorMaterial = new THREE.MeshLambertMaterial({
        map: textureLoader.load('textures/concrete.jpg'),
        side: THREE.DoubleSide
    });

    room = new THREE.Mesh(floorGeometry, floorMaterial);

    //The walls
    var wallNGeometry = new THREE.BoxGeometry(5, 3, .1);
    var wallEGeometry = new THREE.BoxGeometry(0.1, 3, 5);
    var wallSGeometry = new THREE.BoxGeometry(5, 3, .1);
    var wallWGeometry = new THREE.BoxGeometry(.1, 3, 5);
    var ceilingGeometry = new THREE.BoxGeometry(5, .1, 5);

    var wallNMaterial = new THREE.MeshLambertMaterial({
        map: textureLoader.load('textures/Keu.jpg'),
        side: THREE.DoubleSide
    });
    var wallEMaterial = new THREE.MeshLambertMaterial({
        map: textureLoader.load('textures/Keu.jpg'),
        side: THREE.DoubleSide
    });
    var wallSMaterial = new THREE.MeshLambertMaterial({
        map: textureLoader.load('textures/Keu.jpg'),
        side: THREE.DoubleSide
    });
    var wallWMaterial = new THREE.MeshLambertMaterial({
        map: textureLoader.load('textures/Keu.jpg'),
        side: THREE.DoubleSide
    });
    var ceilingMaterial = new THREE.MeshLambertMaterial({
        map: textureLoader.load('textures/concrete.jpg'),
        side: THREE.DoubleSide
    });

    var roomData = [
        {posX: 0, posY: 1.5, posZ: -2.5, rotX: 0, rotY: 0, rotZ: 0, geometry: wallNGeometry, material: wallNMaterial},
        {posX: 2.5, posY: 1.5, posZ: 0, rotX: 0, rotY: 90, rotZ: 0, geometry: wallEGeometry, material: wallEMaterial},
        {posX: 0, posY: 1.5, posZ: 2.5, rotX: 0, rotY: 0, rotZ: 0, geometry: wallSGeometry, material: wallSMaterial},
        {posX: -2.5, posY: 1.5, posZ: 0, rotX: 0, rotY: 90, rotZ: 0, geometry: wallWGeometry, material: wallWMaterial},
        {posX: 0, posY: 3, posZ: 0, rotX: 0, rotY: 0, rotZ: 0, geometry: ceilingGeometry, material: ceilingMaterial}
    ];

    for (var i = 0; i < roomData.length; i++) {
        var wall = new THREE.Mesh(roomData[i].geometry, roomData[i].material);
        wall.position.set(roomData[i].posX, roomData[i].posY, roomData[i].posZ);
        room.add(wall);
    }

    light(0, 2, 0, room);


    room.position.set(0, -1.3, -2);
    scene.add(room);
}

function lighting() {


    var ambient = new THREE.AmbientLight(0xFFFFFF, 0.3);
    scene.add(ambient);

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