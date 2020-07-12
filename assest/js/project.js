var projectscene = new THREE.Scene();
const project = document.querySelector(".project");

var projectcamera = new THREE.PerspectiveCamera(
  75,
  project.clientWidth / project.clientHeight,
  0.1,
  1000
);

//Load for picture
//const loader = new THREE.TextureLoader();
//const pixelRatio = window.devicePixelRatio;
//console.log(pixelRatio);
var projectrenderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});
//projectrenderer.setClearColor(0x27750, 1);
projectrenderer.setPixelRatio(window.devicePixelRatio);
const projectwidth = project.clientWidth;
console.log(projectwidth);
const projectheight = project.clientHeight;
projectrenderer.setSize(projectwidth / 2, projectheight);

//adding canvas to html
project.appendChild(projectrenderer.domElement);

var projectgeometry = new THREE.PlaneGeometry(5, 3, 50, 30);
var projectmaterial = new THREE.MeshBasicMaterial({
  wireframe: false,
  color: 0xd8d0d1,
  map: loader.load("one.jpg"),
});
var projectmesh = new THREE.Mesh(projectgeometry, projectmaterial);
projectscene.add(projectmesh);

projectcamera.position.z = 5;
//setting plane horizontal
//projectmesh.position.set(0, -1.9, 1);

projectmesh.rotation.set(-0.1, 0, 0);

//for automatic move
//const clock = new THREE.Clock();

//mouse event
var mousePos = { x: 0, y: 0 };
document.addEventListener("mousemove", handleMouseMove, false);
function handleMouseMove(event) {
  var tx = -1 + (event.clientX / project.clientWidth) * 2;
  var ty = 1 - (event.clientY / project.clientHeight) * 2;
  mousePos = { x: tx, y: ty };
}

console.log(project.dataset.postion);
// animate plane
function projectanimate() {
  const t = clock.getElapsedTime();

  projectmesh.geometry.vertices.map((v) => {
    const projectwaveX1 = 0.5 * Math.sin(v.x * 2 + t);
    //const waveX2 = 0.25 * Math.sin(v.x * 3 + t * 2);
    const projectcwaveY1 = 0.1 * Math.sin(v.y * 5 + t * 2);
    v.z = projectcwaveY1 + projectwaveX1;

    //const multi = (v.y - 2.5) / 5;
  });

  projectmesh.geometry.verticesNeedUpdate = true;

  requestAnimationFrame(projectanimate);
  projectrenderer.render(projectscene, projectcamera);
}
projectanimate();

//resize window
window.addEventListener("resize", () => {
  projectcamera.aspect = project.clientWidth / project.clientHeight;
  projectrenderer.setSize(project.clientWidth, project.clientHeight);
  projectcamera.updateProjectionMatrix();
});
