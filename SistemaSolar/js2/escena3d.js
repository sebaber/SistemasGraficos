
var escena;

var tiempo=0;
var stats;
var controls;
var cameraManual;
var renderer;


function initThreeJS() {


    var cont=$("#contenido");


    var container = document.getElementById('panel3d');

    escena = new THREE.Scene();



    cameraManual = new THREE.PerspectiveCamera(fov = 80, cont.width()/ cont.height(), 1, 10000);
    cameraManual.position.x = 40;
    cameraManual.position.y = 40;
    cameraManual.position.z = 40;
    cameraManual.far = 10000;


    controls = new THREE.OrbitControls(cameraManual, container);
    controls.target.y = 0;
    controls.update();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(cont.width(), cont.height());
    renderer.setClearColor(0xaaaaaa, 1);

    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;

    renderer.shadowMapBias = 0.1;
    renderer.shadowMapWidth = 2048;
    renderer.shadowMapHeight = 2048;

    $( window ).resize(function() {

        renderer.setSize(cont.width(), cont.height());


    });

    container.appendChild(renderer.domElement);

    var gridHelper = new THREE.GridHelper( 200, 20 );
    escena.add( gridHelper );



}

function setupLights(){
    dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.color.setHSL(0.1, 1, 0.95);

    dirLight.position.set(40,40, 40);
    dirLight.position.multiplyScalar(1);

    dirLight.castShadow = true;

    dirLight.shadowMapWidth = 2048;
    dirLight.shadowMapHeight = 2048;

    var d = 60;

    dirLight.shadowCameraLeft = -d;
    dirLight.shadowCameraRight = d;
    dirLight.shadowCameraTop = d;
    dirLight.shadowCameraBottom = -d;

    dirLight.shadowCameraNear = 1;
    dirLight.shadowCameraFar = 120;
   //dirLight.shadowBias = 10;
    dirLight.shadowDarkness = 0.5;
   //dirLight.shadowCameraVisible = true;


    escena.add(dirLight);




    var hemiLight = new THREE.HemisphereLight(0x666666, 0x666666, 0.75);
    hemiLight.color.setHSL(0.6, 0.3, .5);
    hemiLight.groundColor.setHSL(0.095, 0.2, 0.6);
    hemiLight.position.set(0, 10, 0);
    escena.add(hemiLight);


    var light = new THREE.AmbientLight( 0x333333 ); // soft white light
    escena.add( light );

/*
    var pointlight1 = new THREE.PointLight( 0xff0000, 10, 100 );
    pointlight1.position.set( 0, 0, 0 );
    scene.add( pointlight1 );
    */
}

function render() {
    requestAnimationFrame(render);
    renderer.render(escena, cameraManual);
    

}






