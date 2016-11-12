window.addEventListener("load", function() {
  document.getElementById("start_lattice").addEventListener("click", function() {
    let vr = new VR();
    let torch_light, torch_light_helper;
    let cube;
    vr.createScene = function () {
      // Create ambient light.
      this.scene.add(new THREE.AmbientLight(0xffff00, 0.2));

    };

    vr.animate = function () {
      requestAnimationFrame(this.animate.bind(this));
      this.renderer.render(this.scene, this.camera);
    }
    vr.start();
  }, false);  // #start_conic click
}, false);  // window load

