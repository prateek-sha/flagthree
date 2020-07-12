var scene = new THREE.Scene();
const section = document.querySelector(".flag");

var camera = new THREE.PerspectiveCamera(
  75,
  section.clientWidth / section.clientHeight,
  0.1,
  1000
);

//Load for picture
const loader = new THREE.TextureLoader();

var renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
renderer.setClearColor(0x27750, 1);
renderer.setSize(section.clientWidth, section.clientHeight);

//adding canvas to html
section.appendChild(renderer.domElement);

var geometry = new THREE.PlaneGeometry(19, 5, 70, 30);
var material = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: 0xd8d0d1,
});
var flag = new THREE.Mesh(geometry, material);
scene.add(flag);

camera.position.z = 5;
//setting plane horizontal
flag.position.set(0, -1.9, 1);

flag.rotation.set(-1, 0, 0);

//for automatic move
const clock = new THREE.Clock();

//mouse event
var mousePos = { x: 0, y: 0 };
document.addEventListener("mousemove", handleMouseMove, false);
function handleMouseMove(event) {
  var tx = -1 + (event.clientX / section.clientWidth) * 2;
  var ty = 1 - (event.clientY / section.clientHeight) * 2;
  mousePos = { x: tx, y: ty };
}

if (window.innerWidth < 768) {
  flag.position.set(0, -2.1, 1);
}
if (section.dataset.postion) {
  flag.position.set(0, section.dataset.postion, 1);
}

console.log(section.dataset.postion);
// animate plane
function animate() {
  const t = clock.getElapsedTime();

  flag.geometry.vertices.map((v) => {
    if (window.innerWidth < 768) {
      const waveX1 = 0.5 * Math.sin(v.x * 2 + t);
      //const waveX2 = 0.25 * Math.sin(v.x * 3 + t * 2);
      const waveY1 = 0.1 * Math.sin(v.y * 5 + t * 2);
      v.z = waveY1 + waveX1;
    } else {
      const waveX1 = 0.5 * Math.sin(v.x * 2 + mousePos.x);
      //const waveX2 = 0.25 * Math.sin(v.x * 3 + t * 2);
      const waveY1 = 0.1 * Math.sin(v.y * 5 + mousePos.y * 2);
      v.z = waveY1 + waveX1;
    }

    //const multi = (v.y - 2.5) / 5;
  });

  flag.geometry.verticesNeedUpdate = true;

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

//resize window
window.addEventListener("resize", () => {
  camera.aspect = section.clientWidth / section.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(section.clientWidth, section.clientHeight);
});
