/**
 * Horror Room, a WebVR experience
 * by Nick & Tobias
 */

var scene, camera, renderer, room, controls, element, container, lamp, isMouseDown = false, spiderobj, dollchokeobj, lightflashenable, wallN, claustrotoggle;

function initScene() {

   /* WEBVR.checkAvailability().catch( function( message ) {

        document.body.appendChild( WEBVR.getMessageContainer( message ) );

    } );*/

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
        map: textureLoader.load('textures/floor.jpg'),
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
        map: textureLoader.load('textures/concrete_wall1.jpg'),
        side: THREE.DoubleSide
    });
    var wallEMaterial = new THREE.MeshLambertMaterial({
        map: textureLoader.load('textures/concrete_wall2.jpg'),
        side: THREE.DoubleSide
    });
    var wallSMaterial = new THREE.MeshLambertMaterial({
        map: textureLoader.load('textures/concrete_wall.jpg'),
        side: THREE.DoubleSide
    });
    var wallWMaterial = new THREE.MeshLambertMaterial({
        map: textureLoader.load('textures/concrete_wall.jpg'),
        side: THREE.DoubleSide
    });
    var ceilingMaterial = new THREE.MeshLambertMaterial({
        map: textureLoader.load('textures/concrete.jpg'),
        side: THREE.DoubleSide
    });

    wallN = new THREE.Mesh(wallNGeometry, wallNMaterial);
    wallN.position.set(0, 1.5, -2.5);
    room.add(wallN);

    var wallE = new THREE.Mesh(wallEGeometry, wallEMaterial);
    wallE.position.set(2.5, 1.5, 0);
    room.add(wallE);

    var wallS = new THREE.Mesh(wallSGeometry, wallSMaterial);
    wallS.position.set(0, 1.5, 2.5);
    room.add(wallS);

    var wallW = new THREE.Mesh(wallWGeometry, wallWMaterial);
    wallW.position.set(-2.5, 1.5, 0);
    room.add(wallW);

    var ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.position.set(0, 3, 0);
    room.add(ceiling);

    /*
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
    */

    var doorGeo = new THREE.BoxGeometry(1, 0.2, 1);
    var doorMat = new THREE.MeshLambertMaterial({map: textureLoader.load('textures/wood.jpg')});
    var trapdoor = new THREE.Mesh(doorGeo, doorMat);
    trapdoor.position.set(1.8, 3, 1.8);

    room.add(trapdoor);

    room.position.set(0, -1.3, -2);
    scene.add(room);
}

function lighting() {

    var lampGeo = new THREE.SphereGeometry(0.1, 40, 40);
    var lampMat = new THREE.MeshPhongMaterial({color:0xffffff, emissive:0xffffff , side: THREE.DoubleSide});
    lamp = new THREE.Mesh(lampGeo, lampMat);

    var pointlight = new THREE.PointLight(0xffffff, 0.8, 200, 2);
    lamp.add(pointlight);


    var socketGeo = new THREE.CylinderGeometry(0.1, 0.2, 0.2, 40, 40);
    var socketMat = new THREE.MeshPhongMaterial({color:0xa8460a});
    var socket = new THREE.Mesh(socketGeo, socketMat);
    socket.scale.set(0.3, 0.3, 0.3);
    socket.position.set(0, 0.1, 0);
    lamp.add(socket);


    var wireGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.5, 40, 40);
    var wireMat = new THREE.MeshLambertMaterial({color:0x000000});
    var wire = new THREE.Mesh(wireGeo, wireMat);
    wire.position.set(0, 0.4, 0);
    lamp.add(wire);

    var plateGeo = new THREE.CylinderGeometry(0.1, 0.05, 0.05, 40, 40);
    var plateMat = new THREE.MeshLambertMaterial({color:0x000000});
    var plate = new THREE.Mesh(plateGeo, plateMat);
    plate.position.set(0, 0.7, 0);
    lamp.add(plate);

    var ambient = new THREE.AmbientLight(0xFFFFFF, 0.15);
    lamp.add(ambient);

    lamp.position.set(0, 2.25, 0);
    room.add(lamp);
}

function audioplay() {

    //heartbeat
    var listener = new THREE.AudioListener();
    camera.add( listener );
    var heartbeat = new THREE.Audio( listener );
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load( 'audio/heartbeat.mp3', function( buffer ) {
        heartbeat.setBuffer( buffer );
        heartbeat.setLoop(true);
        heartbeat.setVolume(0.1);
        heartbeat.play();
    });

}

function lightflash() {

    //lights flashing
    var onoff = Math.floor(Math.random() * 100) + 1;

    if (onoff >= 99){
        lamp.visible = true;

    }
    else{
        lamp.visible = false;
    }

}

function toggledarkness(value) {
    lamp.visible = !value;
    lightflashenable = value;
}

function spider() {

        THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());

        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath('models/');
        mtlLoader.load('Spiders.mtl', function (materials) {

            materials.preload();

            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath('models/');
            objLoader.load('Spiders.obj', function (object) {

                object.scale.set(.2, .2, .2);
                var angle = 90 * Math.PI / 180;
                object.rotateY(angle);
                object.rotateX(angle);
                object.rotateZ(angle * -1);
                object.position.set(0, 2.3, 2.1);

                spiderobj = object;
                room.add(spiderobj);
                spiderobj.visible = false;

            });

        });
}

function doll() {


    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( 'models/' );
    mtlLoader.load( 'horrordoll.mtl', function( materials ) {

        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.setPath( 'models/' );
        objLoader.load( 'horrordoll.obj', function ( object ) {

            object.scale.set(.2, .2, .2);
            object.position.set(-2.1, 0, -2);
            room.add( object );

        });

    });

}

function dollchoke() {


    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( 'models/' );
    mtlLoader.load( 'Doll-choke.mtl', function( materials ) {

        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.setPath( 'models/' );
        objLoader.load( 'Doll-choke.obj', function ( object ) {

            object.scale.set(.3, .3, .3);
            object.position.set(0, 0, 1);
            dollchokeobj = object;
            room.add( dollchokeobj );
            dollchokeobj.visible = false;

        });

    });

}

function spidervisible(value) {
     spiderobj.visible = value;
}

function dollchokevisible(value) {
    dollchokeobj.visible = value;
}

function claustrophobiastart() {
    if (wallN.position.z < -0.2){wallN.translateZ(0.003);}
}

function render() {
    requestAnimationFrame( render );
    controls.update();
    if (lightflashenable === true){lightflash()}
    if(claustrotoggle === true){claustrophobiastart();}

    renderer.render( scene, camera );
}

initScene();
initRoom();
lighting();
audioplay();
spider();
doll();
dollchoke();
render();