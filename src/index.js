
import Movements from "./movement.js";
import polygon from "./Web3";
import abi from "./abi/abi.json" assert {type:"json"};

const scene = new THREE.Scene();

//contract address = 0x6F20400075Bb45afc7E16F0ED73F963E35e579bb
//contract address = 0x6F20400075Bb45afc7E16F0ED73F963E35e579bb

// scene.background = new THREE.Color(0xf1ed11);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//adding effects to the cube, to show it more 3D
const ambient_light = new THREE.AmbientLight(0x404040);
const direction_light = new THREE.DirectionalLight(0xffffff,1);
ambient_light.add(direction_light);
scene.add( ambient_light );

//background area
//(length,weigth,hight in 3D)
const geometry_area = new THREE.BoxGeometry( 100, 0.2, 50 );
const material_area = new THREE.MeshPhongMaterial( { color: 0xffffff } );
const area = new THREE.Mesh( geometry_area, material_area );
scene.add( area );

// //one simple cube
// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// //we can change the material of the object as well
// const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// const geometry_cylinder = new THREE.CylinderGeometry( 5, 5, 20, 32 );
// const material_cylinder = new THREE.MeshPhongMaterial( {color: 0xffff00} );
// const cylinder = new THREE.Mesh( geometry_cylinder, material_cylinder );
// scene.add( cylinder );
// cylinder.position.set(20,5,0);

// //adding cone
// const geometry_cone = new THREE.ConeGeometry( 5, 20, 32 );
// const material_cone = new THREE.MeshPhongMaterial( {color: 0xfb3eef} );
// const cone = new THREE.Mesh( geometry_cone, material_cone );
// scene.add( cone );
// cone.position.set(-10,5,0);

//angle from ehich we are seeing the object
camera.position.z = 5;
camera.position.set(10,5,40);


function animate() {
    //rotate the cube w.r.t x-axis
    // cube.rotation.x+=0.05;
    // cube.rotation.y+=0.05;
    // cube.rotation.z+=0.05;
    // cylinder.rotation.x+=0.1;
    // cylinder.rotation.y+=0.1;
    // cone.rotation.x +=0.1;
    // cone.rotation.y+=0.1;
    requestAnimationFrame( animate );

    //left key = 37
    if (Movements.isPressed(37)){
        camera.position.x-=0.5;
    }
    if (Movements.isPressed(38)){
        camera.position.x+=0.5;
        camera.position.y+=0.5;
    }
    if (Movements.isPressed(39)){
        camera.position.x+=0.5;
    }
    if (Movements.isPressed(40)){
        camera.position.x-=0.5;
        camera.position.y-=0.5;
    }

    //moving about x direction
    //camera.position.x -= 0.01;
	
    camera.lookAt(area.position);
	renderer.render( scene, camera );
}
animate();


renderer.render(scene,camera );

const button = document.querySelector('#mint');
button.addEventListener('click',mintNFT);

function mintNFT() {
    let nft_name = document.querySelector("#nft_name").value;
    let nft_width = document.querySelector("#nft_width").value;
    let nft_height = document.querySelector("#nft_height").value;
    let nft_depth = document.querySelector("#nft_depth").value;
    let nft_x = document.querySelector("#nft_x").value;
    let nft_y = document.querySelector("#nft_y").value;
    let nft_z = document.querySelector("#nft_z").value;

    if (typeof window.ethereum == "undefined") {
        rej("You should install Metamask");
    }

    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(
        abi,
        "0x6F20400075Bb45afc7E16F0ED73F963E35e579bb"
    );

    //minting to convert digital file into crypto nft
    //send funtion to all mint function
    web3.eth.requestAccounts().then((accounts) => {
        contract.methods
          .mint(nft_name, nft_width, nft_height, nft_depth, nft_x, nft_y, nft_z)
          .send({
            from: accounts[0],
            value: "10",
          })
          .then((data) => {
            console.log("NFT is minted");
          });
      });
}

polygon.then((result)=>{
    result.nft.forEach((object,index) => {
        if (index<=result.supply) {
            const geometry_cone = new THREE.ConeGeometry( object.w, object.h, object.d );
            const material_cone = new THREE.MeshPhongMaterial( {color: 0xfb3eef} );
            const nft = new THREE.Mesh( geometry_cone, material_cone );
            nft.position.set(object.x,object.y,object.z);
            scene.add( cone );
        }
    })
})