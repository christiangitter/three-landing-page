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
    camera.position.set(0, 0, 5);
    
    //set Hintergrundbeleuchtung
    const ambient = new THREE.AmbientLight(0x404040,4)
    scene.add(ambient)

    // set Strahler
    const light = new THREE.DirectionalLight(0xffffff,5);
    light.position.set(10,10,10);
    scene.add(light);

    //Renderer-Setup
    renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    //Load 3D-Model
    let loader = new THREE.GLTFLoader();
    loader.load('3DModel/scene.gltf', function(gltf) {
        scene.add(gltf.scene);
        objectModel = gltf.scene.children[0];
        animate();
    });

}

// lässt das Model rotieren
function animate() {
    requestAnimationFrame(animate);
    objectModel.rotation.z += 0.002;
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

