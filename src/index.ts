import { AmbientLight, BoxGeometry, BufferGeometry, DirectionalLight, Line, LineBasicMaterial, Mesh, MeshPhongMaterial, OrthographicCamera, PerspectiveCamera, Renderer, Scene, Vector3, WebGLRenderer } from 'three';

import './index.css';

const renderer = new WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// const fov = 75;
// const aspect = window.innerWidth / window.innerHeight;
// const near = 0.1;
// const far = 5;
// const camera = new PerspectiveCamera(fov, aspect, near, far);

const left = -1; //window.innerWidth / 2;
const right = 1; //window.innerWidth / 2;
const top = 1; //window.innerHeight / 2;
const bottom = -1; //window.innerHeight / 2;
const near = 0.1;
const far = 5;
const camera  = new OrthographicCamera(left, right, top, bottom, near, far);

camera.position.set(0, 0, 2);
camera.lookAt(0, 0, 0);

const scene = new Scene();

{
  const color = 0xffffff;
  const intensity = 1;
  const light = new DirectionalLight(color, intensity);

  light.position.set(-1, 2, 4);
  scene.add(light);

  scene.add(new AmbientLight(0xffffff, 0.2));
}


const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);


function makeInstance(geometry: BufferGeometry, color: number, x: number) {
  const material = new MeshPhongMaterial({ color });

  const cube = new Mesh(geometry, material);
  scene.add(cube);

  cube.position.x = x;

  return cube;
}

const cubes = [
  makeInstance(geometry, 0x44aa88, 0),
  makeInstance(geometry, 0x8844aa, -2),
  makeInstance(geometry, 0xaa8844, 2),
]

renderer.render(scene, camera);

function resizeRendererToDisplaySize(renderer: Renderer) {
  const canvas = renderer.domElement;

  const pixelRatio = window.devicePixelRatio ?? 1;
  const width = canvas.clientWidth * pixelRatio;
  const height = canvas.clientHeight * pixelRatio;

  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }

  return needResize;
}

function render(time: number) {
  const seconds = time * 0.001;

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    // camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  cubes.forEach((cube, idx) => {
    const speed = 1 + idx * 0.1;
    const rot = seconds * speed;

    cube.rotation.x = rot;
    cube.rotation.y = rot;
  });

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}
requestAnimationFrame(render);
