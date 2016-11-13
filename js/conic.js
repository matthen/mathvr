window.addEventListener("load", function() {
  document.getElementById("start_conic").addEventListener("click", function() {
    let vr = new VR();
    let torch_light, torch_light_helper;
    let cube;
    vr.createScene = function () {
      // Create ambient light.
      this.scene.add(new THREE.PointLight(0xff0000, 0.5, 1000));
      this.scene.add(new THREE.AmbientLight(0xffff00, 0.2));


      // Add a wall.
      let geometry = new THREE.PlaneGeometry(1000, 1000);
      // TODO(matt) add a wallpaper.
      let material = new THREE.MeshPhongMaterial({ color: 0xfff0ff, side:THREE.DoubleSide  });
      let wall = new THREE.Mesh(geometry, material);
      wall.rotation.x = Math.PI / 2;
      wall.position.set(0, 100, 0);
      this.scene.add(wall);


      geometry = new THREE.PlaneGeometry(1000, 1000);
      // TODO(matt) add a wallpaper.
      material = new THREE.MeshPhongMaterial({ color: 0xfffff0, side:THREE.DoubleSide  });
      wall = new THREE.Mesh(geometry, material);
      wall.rotation.x = Math.PI / 2;
      wall.position.set(0, -100, 0);
      this.scene.add(wall);

      // Create torch_light.
      torch_light = new THREE.SpotLight(0x008888);
      torch_light.position.set(0, 0, 0);
      torch_light.angle = Math.PI / 8;
      torch_light.intensity = 1;
      torch_light_helper = new THREE.SpotLightHelper(torch_light);
      this.scene.add(torch_light.target);
      //    this.scene.add(torch_light_helper);
      this.scene.add(torch_light);


      // debug cube
      geometry = new THREE.BoxGeometry( 2, 20, 0.2 );
      material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      cube = new THREE.Mesh( geometry, {} );
      this.scene.add(cube);

      this.camera.position.set(0, 0, 0);

      // Create the torch.

    };

    vr.animate = function () {
      // Move torch_light.
      let v = this.camera.getWorldDirection().normalize();

      cube.position.copy(v.multiplyScalar(15));
      cube.rotation.copy(this.camera.rotation);
      cube.updateMatrixWorld();
      var vector = cube.geometry.vertices[2].clone();
      vector.applyMatrix4(cube.matrixWorld);
      console.log(vector);
      torch_light.position.copy(vector);
      torch_light.target.position.copy(vector).add(v);



      torch_light_helper.update();
      requestAnimationFrame(this.animate.bind(this));
      this.renderer.render(this.scene, this.camera);
    }
    vr.start();
  }, false);  // #start_conic click
}, false);  // window load

