/**
 * Horror Room, a WebVR experience
 * by Nick & Tobias
 */

var scene, camera, renderer, room, container;

function initScene() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(window.innerWidth / window.innerHeight, 0.1, 10);


    //create the room


    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    renderer.vr.enabled = true;

    WEBVR.getVRDisplay( function ( display ) {

        renderer.vr.setDevice( display );

        document.body.appendChild( WEBVR.getButton( display, renderer.domElement ) );

    } );

}

function render() {


    renderer.render( scene, camera );
}

initScene();
render();