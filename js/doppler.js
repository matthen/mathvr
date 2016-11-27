window.addEventListener("load", function() {
  var vr = new VR();

  // The source of sound.
  var source;

  // The time.
  var t = 0 ;

  // Parameters of the elliptical orbit.
  var a = 20, b = 10, omega = 0.5;

  vr.createScene = function () {
    // Add some lights.
    var point_light = new THREE.PointLight(0xf9f9b1, 0.5);
    point_light.position.set(-100, -100, 100);
    this.scene.add(point_light);
    var point_light_2 = new THREE.PointLight(0x8ffca8, 0.5);
    point_light_2.position.set(100, 100, 100);
    this.scene.add(point_light_2);
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    this.addStars(100, 20, 100);

    // Create the source.
    var source_geometry = new THREE.SphereGeometry(1, 32, 32);
    var source_material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0xd82ea2,
      shininess: 10,
      reflectivity: 0.3,
      });
    source = new THREE.Mesh(source_geometry, source_material);
    this.scene.add(source);

    // Draw its orbit.
    var orbit_material = new THREE.LineBasicMaterial({color: 0xff0000});
    var orbit_geometry = new THREE.Geometry();
    var dt = 0.1;
    for (var tt = 0; tt < 2 * Math.PI + dt; tt += dt) {
        orbit_geometry.vertices.push(
            new THREE.Vector3(a*Math.sin(tt), b*Math.cos(tt), 0));
    }
    this.scene.add(new THREE.Line(orbit_geometry, orbit_material));


    this.addMovementButtons();
  };

  vr.updateScene = function () {
    t += 0.01;
    source.position.set(a*Math.sin(omega * t), b*Math.cos(omega * t), 0);
  }

  vr.start();

}, false);  // window load
