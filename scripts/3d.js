window.addEventListener('DOMContentLoaded', init);

function init() 
{
    // レンダラーを作成
    
    
    const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#canvas')});
    renderer.shadowMap.enabled = true;
    // ウィンドウサイズ設定
    //width = document.getElementById('main_canvas').getBoundingClientRect().width;
    //height = document.getElementById('main_canvas').getBoundingClientRect().height;
    width = 960;
    height = 540;
    const mouse = new THREE.Vector2();
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);
    console.log(window.devicePixelRatio);
    console.log(width + ", " + height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 400, -1000);

    
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    
    ////////////////////////////////////////////////////////////////////////////////ロード
    var meshList = [];
    const loader = new THREE.GLTFLoader();
    const url = 'Cup.glb';
    let model = null;
    loader.load(
        url,
        function (gltf) 
        {
            model = gltf.scene;
            // model.name = "model_with_cloth";
            model.scale.set(200.0, 200.0, 200.0);
            model.position.set(0, -200, 0);
            //console.log( model.position) 
            gltf.scene.traverse( function ( child ) {
                  if ( child.isMesh ) meshList.push(child)
            } );
            scene.add(model);


            // model["test"] = 100;
        },
        function (error) 
        {
            console.log('Load Error');
            console.log(error);
        }
    );
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;


    
    ////////////////////////////////////////////////////////////////////////////////平行光源

    const light = new THREE.DirectionalLight(0xFFFFFF);
    light.intensity = 2;
    light.position.set(1, 1, -1);
    scene.add(light);
    
    const light2 = new THREE.DirectionalLight(0xFFFFFF);
    light2.intensity = 0.2;
    light2.position.set(-1, 0, -1);
    scene.add(light2);
    

    ////////////////////////////////////////////////////////////////////////////////マウスイベント追加
    var mode = 0;
    var tar;
    const raycaster = new THREE.Raycaster();
    canvas.addEventListener( 'mousedown', event => 
    {


        var element = event.currentTarget;
        var x = event.clientX - element.offsetLeft;
        var y = event.clientY - element.offsetTop;
        var w = element.offsetWidth;
        var h = element.offsetHeight;

        mouse.x = (x / w) * 2 - 1;
        mouse.y = -(y / h) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(scene.children, true);
        //console.log(intersects.length);

        if ( intersects.length > 0 ) 
        {
            if(intersects[0].object.name == "Cup")
            {
                mode = 1;
                console.log(intersects[0].object.name + "をタッチ");
                //console.log(intersects[0].object.position);
                //console.log(meshList[0].position);
            }
            else
            {
                mode = 0;
            }
        }
        else mode = 0;
    });
    
    canvas.addEventListener( 'mouseup', event => 
    {

        //mode = 0;
    });
    
    
    ////////////////////////////////////////////////////////////////////////////////アップデート関数
    tick();
    
    function tick() 
    {

        if (model != null) 
        {
            //console.log(mode);
        }
        //typeOf02.call(meshList[0]) 
        if(meshList.length > 0 )
        {
            switch(mode)
            {
                case 0:
                    meshList[1].position.y += (0.1 - meshList[1].position.y)*0.1;
                    break;
                case 1:
                    meshList[1].position.y += (1 - meshList[1].position.y)*0.1;
                    break;
            }
        }

        renderer.render(scene, camera);
        requestAnimationFrame(tick);
        
    }
    function typeOf02() 
    {
      'use strict';
      console.log(typeof this);
    }
}


