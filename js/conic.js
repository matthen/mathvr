window.addEventListener("load", function() {
  var vr = new VR({
    inward_view: true,
    inward_view_radius: 20,
  });
  var t = 0;
  var wall, cube, torch;
  var target_rotation, holding_target = false, holding_target_t = 0;
  vr.createScene = function () {
    // Create lights.
    var pl = new THREE.PointLight(0xffffff, 0.5, 1000);
    pl.position.set(10, 0, 0);
    this.scene.add(pl);
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.2));


    // Add the plane.
    var plane_width = 600;
    this.addStars(100, 1.5 * plane_width, 2 * plane_width, 5);
    var geometry = new THREE.PlaneGeometry(plane_width, plane_width);
    var texture = THREE.ImageUtils.loadTexture("../images/grid_texture.png");
    texture.repeat.set(plane_width / 5, plane_width / 5);
    texture.wrapS = THREE.RepeatWrapping; texture.wrapT = THREE.RepeatWrapping;
    geometry.computeVertexNormals();
    var material = new THREE.MeshPhongMaterial();
    material.map = texture;
    material.side = THREE.DoubleSide;
    wall = new THREE.Mesh(geometry, material);
    wall.position.set(0, 0, -22);  // just below the camera's initial swing.
    this.scene.add(wall);


    // the torch
    torch = new THREE.Group();
    geometry = new THREE.CylinderGeometry(0.5, 0.5, 2.5, 32);
    material = new THREE.MeshPhongMaterial({color: 0xa5361a});
    var cylinder = new THREE.Mesh(geometry, material);
    torch.add(cylinder);
    geometry = new THREE.CylinderGeometry(0.6, 0.6, 1, 32);
    material = new THREE.MeshPhongMaterial({color: 0x5f64ef});
    var cylinder2 = new THREE.Mesh(geometry, material);
    cylinder2.position.y += 1.5;
    torch.add(cylinder2);
    torch_light = new THREE.SpotLight(0xfffdf4, 0.3, 1000, Math.PI / 9, 0, 1);
    torch_light.position.set(0, 0.5, 0);
    torch_light.target.position.set(0, 1, 0);
    torch.add(torch_light.target);
    torch.add(torch_light);
    var h = plane_width * 1.5;
    geometry = new THREE.ConeGeometry(h * Math.tan(torch_light.angle), h, 64);
    material = new THREE.MeshLambertMaterial({color: 0xfffdf4, opacity: 0.2, transparent: true});
    var cone = new THREE.Mesh(geometry, material);
    cone.rotateX(Math.PI);
    cone.position.copy(torch_light.position.clone());
    cone.position.y += h / 2;
    torch.add(cone);

    this.scene.add(torch);
    target_rotation = new THREE.Object3D();
    target_rotation.rotateX(-Math.PI / 3);
    this.scene.add(target_rotation);


    // Add button to move torch to current location.
    button = this.addButton("gps_not_fixed");
    button.addEventListener("touchstart", function () {
      holding_target = true;
    }.bind(this));
    button.addEventListener("touchend", function () {
      holding_target = false;
      holding_target_t = 0;
    }.bind(this));

    this.addMovementButtons();
  };

  vr.updateScene = function () {
    if (holding_target) {
      target_rotation.rotation.copy(this.camera.rotation);
      target_rotation.rotateX(-Math.PI / 2);
      target_rotation.rotation.y = 0;
      var a = -target_rotation.rotation.x;
      if (a < -torch_light.angle) {
        return;
      }
      var text = "hyperbola!";
      if (Math.abs(a - Math.PI / 2) < 0.05) {
        text = "circle! pointing straight downwards.";
      } else if (Math.abs(a - torch_light.angle) < 0.01) {
        text = "parabola! the top of the light cone is horizontal.";
      } else if (a > torch_light.angle) {
        text = "ellipse!";
      }
      this.showToastIndefinite(text);
      holding_target_t += 0.01;
    }
    var s = 0.1 + 0.9 * Math.tanh(holding_target_t);
    var rot = target_rotation.rotation.clone().toVector3().multiplyScalar(s);
    rot.add(torch.rotation.clone().toVector3().multiplyScalar(1 - s));
    torch.rotation.setFromVector3(rot, "ZXY");
  }


  vr.start();
}, false);  // window load
