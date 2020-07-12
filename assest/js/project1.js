var projectscene1 = new THREE.Scene();
const project1 = document.querySelector(".project1");

var projectcamera1 = new THREE.PerspectiveCamera(
  75,
  project1.clientWidth / project1.clientHeight,
  0.1,
  1000
);

//Load for picture
//const loader = new THREE.TextureLoader();
//const pixelRatio = window.devicePixelRatio;
//console.log(pixelRatio);
var projectrenderer1 = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});
//projectrenderer1.setClearColor(0x27750, 1);
projectrenderer1.setPixelRatio(window.devicePixelRatio);
const projectwidth1 = project1.clientWidth;
console.log(projectwidth1);
const projectheight1 = project1.clientHeight;
projectrenderer1.setSize(projectwidth1, projectheight1);

//adding canvas to html
project1.appendChild(projectrenderer1.domElement);

var projectgeometry1 = new THREE.PlaneGeometry(5, 3, 50, 30);
var projectmaterial1 = new THREE.MeshBasicMaterial({
  wireframe: false,
  color: 0xd8d0d1,
  map: loader.load("dsc.png"),
});
var projectmesh1 = new THREE.Mesh(projectgeometry1, projectmaterial1);
projectscene1.add(projectmesh1);

projectcamera1.position.z = 5;
//setting plane horizontal
//projectmesh1.position.set(0, -1.9, 1);

projectmesh1.rotation.set(-0.1, 0, 0);

//for automatic move
//const clock = new THREE.Clock();

//mouse event
var mousePos = { x: 0, y: 0 };
document.addEventListener("mousemove", handleMouseMove, false);
function handleMouseMove(event) {
  var tx = -1 + (event.clientX / project1.clientWidth) * 2;
  var ty = 1 - (event.clientY / project1.clientHeight) * 2;
  mousePos = { x: tx, y: ty };
}

console.log(project1.dataset.postion);
// animate plane
function projectanimate1() {
  const t = clock.getElapsedTime();

  projectmesh1.geometry.vertices.map((v) => {
    const projectwaveX1 = 0.5 * Math.sin(v.x * 2 + t);
    //const waveX2 = 0.25 * Math.sin(v.x * 3 + t * 2);
    const projectcwaveY1 = 0.1 * Math.sin(v.y * 5 + t * 2);
    const multi = (v.y + 2.5) / 5;
    v.z = (projectcwaveY1 + projectwaveX1) * multi;
  });

  projectmesh1.geometry.verticesNeedUpdate = true;

  requestAnimationFrame(projectanimate1);
  projectrenderer1.render(projectscene1, projectcamera1);
}
projectanimate1();

//resize window
window.addEventListener("resize", () => {
  projectcamera1.aspect = project1.clientWidth / project1.clientHeight;
  projectrenderer1.setSize(project1.clientWidth, project1.clientHeight);
  projectcamera1.updateProjectionMatrix();
});
