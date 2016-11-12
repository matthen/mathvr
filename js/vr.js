var VR = function () {
  this.canvas_wrapper = document.getElementById("canvas_wrapper");

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


  // Creates camera, scene, renderer for viewing.
  // Adds the renderer canvas to the page.
  this.createViewer = function() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
                        75,  // field of view in degrees.
                        window.innerWidth / window.innerHeight,  // aspect ratio
                        0.05,  // near plane
                        10000);  // far plane
    this.camera.rotation.order = "ZXY";

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
    this.canvas_wrapper.appendChild(this.renderer.domElement);

    window.addEventListener('resize', function() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }.bind(this), false);
    this.createScene();
  }

  // Start the animation.
  this.start = function () {
    this.reset();
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

  // Add a button.
  this.addButton = function(icon) {
    let button = document.createElement("button");
    button.className = ("mdl-button mdl-js-button "
                        + "mdl-button--fab mdl-js-ripple-effect "
                        + "mdl-button--colored");
    let button_i = document.createElement("i");
    button_i.className = "material-icons";
    button_i.innerText = icon;
    button.appendChild(button_i);
    this.control_buttons.appendChild(button);
    componentHandler.upgradeAllRegistered();
    return button;
  }

  // Movement.
  let velocity = new THREE.Vector3();
  let moving_t = 0.1;
  this.addMovementButtons = function() {
    let forward_button = this.addButton("arrow_upward");
    let backward_button = this.addButton("arrow_downward");

    function startForward() {
       velocity.copy(this.camera.getWorldDirection().multiplyScalar(0.5));
    }
    function startBackward() {
       velocity.copy(this.camera.getWorldDirection().multiplyScalar(-0.5));
    }
    function stopMoving() {
      velocity.setScalar(0);
      moving_t = 0.1;
    }
    forward_button.addEventListener("touchstart", startForward.bind(this),
                                    false);
    forward_button.addEventListener("touchend", stopMoving, false);
    backward_button.addEventListener("touchstart", startBackward.bind(this),
                                    false);
    backward_button.addEventListener("touchend", stopMoving, false);
  }
  this.updateMovement = function() {
    if (velocity.lengthSq() > 0) {
      moving_t += 0.005;
      if (moving_t > 1.0) {
        moving_t = 1.0;
      }
      let v = new THREE.Vector3();
      v.copy(velocity).multiplyScalar(moving_t * moving_t);
      this.camera.position.add(v);
    }
  }

  // Removes the renderer canvas from the page, returns state to before
  // start was called.
  this.reset = function() {
    this.canvas_wrapper.innerHTML = "<div id='control_buttons'></div>";
    this.control_buttons = document.getElementById("control_buttons");
  }

}  // VR


// Create the scene, run after the viewer is created. Should be overwritten.
VR.prototype.createScene = function() {
  //
}
