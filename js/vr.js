var VR = function () {
  // Returns whether the browser is compatible.
  // TODO(matt)
  function isCompatible() {
    return true;
  }

  // Displays the error message.
  // TODO(matt)
  function displayError(message) {
    window.alert(message);
  }


  // Creates camera, lights, scene, renderer for viewing.
  // Adds the renderer canvas to the page.
  this.createViewer = function() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
                        75,  // field of view in degrees.
                        window.innerWidth / window.innerHeight,  // aspect ratio
                        0.5,  // near plane
                        1000);  // far plane
    this.camera.rotation.order = "ZXY";

    // Add default lights.
    let ambient = new THREE.AmbientLight(0x404040, 0.8);
    let point = new THREE.PointLight(0xFFFFFF);
    point.position = new THREE.Vector3(-100, -100, 100);
    this.scene.add(ambient); this.scene.add(point);
    this.lights = [ambient, point];

    // Create the renderer;
    this.renderer = new THREE.WebGLRenderer();
    let deg2rad = Math.PI / 180;
    let initial_alpha;
    window.addEventListener("deviceorientation", function(e) {
      if (!e.alpha) {
        return;
      }
      if (!initial_alpha) {
        initial_alpha = e.alpha;
      }
      let alpha = e.alpha - initial_alpha;
      alpha = alpha < 0 ? alpha + 360 : alpha
      this.camera.rotation.set(e.beta * deg2rad,
                               e.gamma * deg2rad,
                               alpha * deg2rad);
    }.bind(this), false);

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.domElement.style.position = 'absolute';
    this.renderer.domElement.style.top = 0;
    this.renderer.domElement.style.left = 0;
    document.body.appendChild(this.renderer.domElement);

    window.addEventListener('resize', function() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }.bind(this), false);
    this.createScene();
  }

  // Start the animation.
  this.start = function () {
    // TODO(matt) add listener for going out of fullscreen.

    // Request full screen.
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
    screen.orientation.lock('portrait').then(function() {
      this.createViewer();
      this.animate();
    }.bind(this));

  }

  // Removes the renderer canvas from the page, returns state to before
  // start was called.
  // TODO(matt) - remove event listeners etc.
  this.stop = function() {
  }

}  // VR

// Animate the next frame. Should be overwritten.
VR.prototype.animate = function() {
  requestAnimationFrame(this.animate.bind(this));
  this.renderer.render(this.scene, this.camera);
}

// Create the scene, run after the viewer is created. Should be overwritten.
VR.prototype.createScene = function() {
  //
}
