//Start-Variablen
let container;
let camera;
let renderer;
let scene;
let objectModel;

function init() {
    container = document.querySelector('.scene');

    //Erstelle die Scene
    scene = new THREE.Scene();

    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 500;

    //Camera Setup 
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 18, 80);
    
    //set Hintergrundbeleuchtung
    const ambient = new THREE.AmbientLight(0xffff00,30)
    scene.add(ambient)

    const plight = new THREE.PointLight( 0xffff00, 10, 10 );
    plight.position.set( 5, 12, 5 );
    scene.add( plight );

    // set Strahler
    const light = new THREE.DirectionalLight(0xffffff,15);
    light.position.set(70,70,70);
    scene.add(light);

    //Renderer-Setup
    renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    //Load 3D-Model
    let loader = new THREE.GLTFLoader();
    loader.load('3DModels/tesla_tequila/scene.gltf', function(gltf) {
        scene.add(gltf.scene);
        objectModel = gltf.scene.children[0];
        objectModel.rotation.z = -1.6;
        //renderer.render(scene, camera);
        animate();
    });

}

// lässt das Model rotieren
function animate() {
    requestAnimationFrame(animate);
    objectModel.rotation.z -= 0.0005;
    //objectModel.rotation.y += 0.001;
    renderer.render(scene, camera);
   
}

init();

// resized das Model wenn Fenster sich verkleinert 
function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(container.clientWidth,container.clientHeight);
}

//die Funktion wird aufgerufen wenn Fenster tatsächlich verkleinert wird
window.addEventListener("resize", onWindowResize);

