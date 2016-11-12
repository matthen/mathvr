window.addEventListener("load", function() {
  document.getElementById("start_lattice").addEventListener("click", function() {
    let vr = new VR();

    let lp_queue = [];
    let lattice_points = [];
    let button;
    let simple = true;  // showing the simple lattice
    let transitioning = false;
    let transition_t = 0;

    vr.createScene = function () {
      // Create lights.
      let point_light = new THREE.PointLight(0xb1e6f9, 0.5);
      point_light.position.set(-100, -100, 100);
      this.scene.add(point_light);
      let point_light_2 = new THREE.PointLight(0xfc8f8f, 0.5);
      point_light_2.position.set(100, 100, 100);
      this.scene.add(point_light_2);
      this.scene.add(new THREE.AmbientLight(0xf8ff84, 0.2));

      // Create the points on the lattice.
      let n = 5;
      for (let i = -n; i < n; i++) {
        for (let j = -n; j < n; j++) {
          for (let k = -n; k < n; k++) {
            if (i == 0 && j ==0 && k == 0) {
              continue;
            }
            lp_queue.push([i, j, k]);
          }
        }
      }
      lp_queue.sort(function (p1, p2) {
        return (  (p1[0]*p1[0] + p1[1]*p1[1] + p1[2]*p1[2])
                < (p2[0]*p2[0] + p2[1]*p2[1] + p2[2]*p2[2]));
      });

      // Add button to change lattice type;
      button = vr.addButton("swap_horizontal");
      button.addEventListener("click", function () {
        simple = !simple;
        transitioning = true;
        this.disabled = true;
      });
      vr.addMovementButtons();

    };

    let lp_geometry = new THREE.SphereGeometry(0.15, 16, 16);
    let lp_material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0x2f89d8,
      shininess: 10,
      reflectivity: 0.7,
      });
    let bc_basis = new THREE.Matrix3();
    bc_basis.set(1.25, 0, 0.625, 0, 1.25, 0.625, 0, 0, 0.625);
    function addLatticePoint(centre) {
      let lp = new THREE.Mesh(lp_geometry, lp_material);
      lp.simple_position = new THREE.Vector3(centre[0], centre[1], centre[2]);
      lp.bc_position = new THREE.Vector3();
      lp.bc_position.copy(lp.simple_position);
      lp.bc_position.applyMatrix3(bc_basis);
      if (simple) {
        lp.position.copy(lp.simple_position);
      } else {
        lp.position.copy(lp.bc_position);
      }
      lattice_points.push(lp);
      this.scene.add(lp);
    }

    vr.animate = function () {
      // Transition between simple and body centred lattice.
      if (transitioning) {
        transition_t += 0.01;
        if (transition_t > 1.0) {
          transition_t = 1.0;
          transitioning = false;
        }
        let tau = transition_t;
        if (!simple) {
          tau = 1 - tau;
        }
        tau = 0.5 + 0.5 * Math.tanh(5 * (tau - 0.5));
        for (var i = 0; i < lattice_points.length; ++i) {
          let lp = lattice_points[i];
          lp.position.copy(lp.simple_position).multiplyScalar(tau);
          let v = new THREE.Vector3();
          v.copy(lp.bc_position).multiplyScalar(1 - tau);
          lp.position.add(v);
        }
      } else {
        transition_t = 0;
        button.disabled = false;
      }
      if (lp_queue.length > 0 && !transitioning) {
        addLatticePoint.bind(this)(lp_queue.pop());
      }
      this.updateMovement();
      requestAnimationFrame(this.animate.bind(this));
      this.renderer.render(this.scene, this.camera);
    }
    vr.start();
  }, false);  // #start_conic click
}, false);  // window load

