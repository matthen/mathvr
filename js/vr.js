var VR = function (params) {
  // Load the params.
  params = params || {};

  // If true, the camera always points to the origin, and the camera moves
  // around the surface of a sphere.
  var inward_view = params.inward_view || false;
  var inward_view_radius = params.inward_view_radius || 10;

  this.canvas_wrapper = document.getElementById("canvas_wrapper");

  // Error messages.
  var webgl_dialog = document.getElementById("webgl_dialog");
  if (!webgl_dialog.showModal) {
    dialogPolyfill.registerDialog(webgl_dialog);
  }
  var orientation_dialog = document.getElementById("orientation_dialog");
  if (!orientation_dialog.showModal) {
    dialogPolyfill.registerDialog(orientation_dialog);
  }
  var fullscreen_dialog = document.getElementById("fullscreen_dialog");
  if (!fullscreen_dialog.showModal) {
    dialogPolyfill.registerDialog(fullscreen_dialog);
  }
  // TODO(matthen) - detect if orientation is enabled

  // Returns whether webgl is available.
  function webglAvailable() {
    try {
      var canvas = document.createElement("canvas");
      return !!
          window.WebGLRenderingContext &&
          (canvas.getContext("webgl") ||
           canvas.getContext("experimental-webgl"));
    } catch(e) {
        return false;
    }
  }

  this.paused = true;
  // Request full screen mode.
  function requestFullScreen() {
    fullscreen_dialog.showModal();
  }
  document.getElementById("fullscreen_button").addEventListener(
      "click", function() {
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
        this.paused = false;
        fullscreen_dialog.close();
        screen.orientation.lock('portrait').then(function() {

        });
      }.bind(this), false);

  // If full screen exits, bring the dialog back up.
  function exitHandler() {
    if (!document.webkitIsFullScreen && !document.mozFullScreen &&
        document.msFullscreenElement == null) {
      this.paused = true;
      fullscreen_dialog.showModal();
    }
  }
  document.addEventListener('webkitfullscreenchange', exitHandler.bind(this), false);
  document.addEventListener('mozfullscreenchange', exitHandler.bind(this), false);
  document.addEventListener('fullscreenchange', exitHandler.bind(this), false);
  document.addEventListener('MSFullscreenChange', exitHandler.bind(this), false);

  // Creates camera, scene, renderer for viewing.
  // Adds the renderer canvas to the page.
  this.createViewer = function() {
    this.canvas_wrapper.innerHTML = "<div id='control_buttons'></div>";
    this.control_buttons = document.getElementById("control_buttons");

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
                        75,  // field of view in degrees.
                        window.innerWidth / window.innerHeight,  // aspect ratio
                        0.05,  // near plane
                        10000);  // far plane
    this.camera.rotation.order = "ZXY";

    // Create the renderer;
    this.renderer = new THREE.WebGLRenderer();
    var deg2rad = Math.PI / 180;
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
      this.camera.rotation.set(e.beta * deg2rad,
                               e.gamma * deg2rad,
                               alpha * deg2rad);
      if (inward_view) {
        var v = this.camera.getWorldDirection().normalize();
        v.multiplyScalar(-inward_view_radius);
        this.camera.position.copy(v);
      }

    }.bind(this), false);

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.canvas_wrapper.appendChild(this.renderer.domElement);

    window.addEventListener('resize', function() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }.bind(this), false);

    // Request full screen.
    requestFullScreen();
    this.createScene();
  }

  // Should be implemented if the scene changes.
  this.updateScene = function () {}

  // Called for every new frame.
  this.animate = function () {
    requestAnimationFrame(this.animate.bind(this));
    if (this.paused) {
      return;
    }
    this.updateScene();
    this.updateMovement();
    this.renderer.render(this.scene, this.camera);
  }

  // Start the animation.
  this.start = function () {
    if (!hasDeviceOrientation()) {
      orientation_dialog.showModal();
      return;
    }
    if (!webglAvailable()) {
      webgl_dialog.showModal();
      return;
    }
    this.createViewer();
    this.animate();
  }

  // Add a button.
  this.addButton = function(icon) {
    var button = document.createElement("button");
    button.className = ("mdl-button mdl-js-button "
                        + "mdl-button--fab mdl-js-ripple-effect "
                        + "mdl-button--colored");
    var button_i = document.createElement("i");
    button_i.className = "material-icons";
    button_i.innerText = icon;
    button.appendChild(button_i);
    this.control_buttons.appendChild(button);
    componentHandler.upgradeAllRegistered();
    return button;
  }

  // Movement.
  // TODO(matthen) fix selecting button text;
  var velocity = new THREE.Vector3();
  var v_direction = 0;  // 0, -1 or 1.
  var moving_t = 0.1;
  this.addMovementButtons = function() {
    var forward_button = this.addButton("arrow_upward");
    var backward_button = this.addButton("arrow_downward");

    function startForward() {
      v_direction = 1;
      velocity.copy(this.camera.getWorldDirection().multiplyScalar(0.5));
    }
    function startBackward() {
      v_direction = -1;
      velocity.copy(this.camera.getWorldDirection().multiplyScalar(-0.5));
    }
    function stopMoving() {
      v_direction = 0;
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
      if (inward_view) {
        inward_view_radius -= 0.5 * v_direction * moving_t;
        if (inward_view_radius < 2) {
          inward_view_radius = 2;
        }
        var v = this.camera.getWorldDirection().normalize();
        v.multiplyScalar(-inward_view_radius);
        this.camera.position.copy(v);
        return;
      }
      var v = new THREE.Vector3();
      v.copy(velocity).multiplyScalar(moving_t * moving_t);
      this.camera.position.add(v);
    }
  }

  // Adding stars.
  this.addStars = function (num_stars, min_radius, max_radius) {
    var num_added = 0;
    var geometry = new THREE.TetrahedronGeometry(0.5, 0);
    var material = new THREE.MeshBasicMaterial({color: 0xffffff});
    while (num_added < num_stars) {
      var x = max_radius * (2 * Math.random() - 1),
          y = max_radius * (2 * Math.random() - 1),
          z = max_radius * (2 * Math.random() - 1);
      if (x * x + y * y + z * z < min_radius * min_radius) {
        continue;
      }
      num_added++;
      var star = new THREE.Mesh(geometry, material);
      star.position.x = x;
      star.position.y = y;
      star.position.z = z;
      star.rotation.x = Math.random() * Math.PI;
      star.rotation.y = Math.random() * Math.PI;
      this.scene.add(star);
    }
  }

  this.showToast = function (message, timeout) {
    timeout = timeout || 1000;
    var snackbarContainer = document.getElementById('toast');
    if (snackbarContainer.className.includes("active")) {
      return;
    }
    snackbarContainer.MaterialSnackbar.showSnackbar({
        message: message,
        timeout: timeout
    });
  }

}  // VR


// Create the scene, run after the viewer is created. Should be overwritten.
VR.prototype.createScene = function() {
  //
}
