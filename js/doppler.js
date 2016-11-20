window.addEventListener("load", function() {
  let vr = new VR();
  vr.createScene = function () {
    // Add some lights.
    let ambient = new THREE.AmbientLight(0x404040, 0.8);
    let point = new THREE.PointLight(0xFFFFFF);
    point.position = new THREE.Vector3(-100, -100, 100);
    this.scene.add(ambient); this.scene.add(point);

    this.addStars(100, 20, 100);


    this.addMovementButtons();
  };

  vr.animate = function () {
    requestAnimationFrame(this.animate.bind(this));
    if (this.paused) {
      return;
    }
    this.updateMovement();
    this.renderer.render(this.scene, this.camera);

  }
  vr.start();

}, false);  // window load
