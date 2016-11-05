window.onload = (function () {

  var deg2rad = Math.PI / 180;
  var camera, scene, renderer, controls;

  function startAnimation() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.rotation.order = "ZXY";

    scene = new THREE.Scene();

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshLambertMaterial({color: 0x00ff00});

    // Add stars.
    let num_stars = 0;
    while (num_stars < 100) {
      let x = 100 * (2 * Math.random() - 1), y = 100 * (2 * Math.random() - 1),
          z = 100 * (2 * Math.random() - 1);
      if (x * x + y * y + z * z < 10) {
        continue;
      }
      num_stars++;
      let geometry = new THREE.TetrahedronGeometry(0.5, 0);
      let material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
      let star = new THREE.Mesh(geometry, material);
      star.position.x = x;
      star.position.y = y;
      star.position.z = z;
      star.rotation.x = Math.random() * Math.PI;
      star.rotation.y = Math.random() * Math.PI;

      scene.add(star);
    }

    // add edges
    material = new THREE.LineBasicMaterial({
      color: 0xeeeeff
    });
    for (var j = 0; j < 2; ++j) {
      let offset = new THREE.Vector3(0, 10 * j, -j);
      for (var i = 0; i < buckyball_edges.length; ++i) {
        let geometry = new THREE.Geometry();
        let a = new THREE.Vector3(buckyball_edges[i][0][0],
                                  buckyball_edges[i][0][1],
                                  buckyball_edges[i][0][2]),
            b = new THREE.Vector3(buckyball_edges[i][1][0],
                                  buckyball_edges[i][1][1],
                                  buckyball_edges[i][1][2]);

        a.add(offset);
        b.add(offset);
        geometry.vertices.push(a, b);

        let edge = new THREE.Line(geometry, material);
        scene.add(edge);
      }
    }


    // add an ambient light
    var light = new THREE.AmbientLight(0x404040, 0.8);
    scene.add( light );


    // create a point light
    var pointLight = new THREE.PointLight(0xFFFFFF);

    // set its position
    pointLight.position.x = -100;
    pointLight.position.y = -100;
    pointLight.position.z = 100;

    // add to the scene
    scene.add(pointLight);

    renderer = new THREE.WebGLRenderer();

    var initial_alpha;
    window.addEventListener("deviceorientation", function(e) {
      if (!e.alpha) {
        return;
      }
      if (!initial_alpha) {
        initial_alpha = e.alpha;
      }
      var alpha = e.alpha - initial_alpha;
      alpha = alpha < 0 ? alpha + 360 : alpha
      camera.rotation.set (e.beta * deg2rad, e.gamma * deg2rad, alpha * deg2rad);
    }, false);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = 0;
    renderer.domElement.style.left = 0;
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', function() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }, false);

    var velocity = new THREE.Vector3(0, 0, 0);

    renderer.domElement.addEventListener("touchstart", function (e) {
      velocity.copy(camera.getWorldDirection().multiplyScalar(0.1));
      e.preventDefault();
    }, false);
    renderer.domElement.addEventListener("touchend", function (e) {
      velocity.setScalar(0);
    }, false);

    let up = new THREE.Vector3(0, 0, 1);
    function animate() {
      if (velocity.lengthSq() > 0) {
        camera.position.add(velocity);
      }
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
  }

  document.getElementById("start_full").onclick = function() {
    docelem = document.documentElement;
    if (docelem.requestFullscreen) {
        docelem.requestFullscreen();
    }
    else if (docelem.mozRequestFullScreen) {
        docelem.mozRequestFullScreen();
    }
    else if (docelem.webkitRequestFullscreen) {
        docelem.webkitRequestFullscreen();
    }
    else if (docelem.msRequestFullscreen) {
        docelem.msRequestFullscreen();
    }
    screen.orientation.lock('portrait').then(startAnimation);
  }
  document.getElementById("start").onclick = startAnimation;



});
