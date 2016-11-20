window.addEventListener("load", function() {
  let buckyball_edges = [[[-0.16246, -2.11803, 1.27598], [0.262866, -2.42705, 0.425325]], [[-0.16246, -2.11803, 1.27598], [-1.11352, -1.80902,    1.27598]], [[-0.16246, -2.11803, 1.27598], [0.525731, -1.61803,    1.80171]], [[-0.16246, 2.11803, 1.27598], [0.262866, 2.42705,    0.425325]], [[-0.16246, 2.11803, 1.27598], [-1.11352, 1.80902,    1.27598]], [[-0.16246, 2.11803, 1.27598], [0.525731, 1.61803,    1.80171]], [[0.16246, -2.11803, -1.27598], [-0.262866, -2.42705, -0.425325]], [[0.16246, -2.11803, -1.27598], [1.11352, -1.80902, -1.27598]], [[0.16246, -2.11803, -1.27598], [-0.525731, -1.61803, -1.80171]], [[0.16246, 2.11803, -1.27598], [-0.262866,    2.42705, -0.425325]], [[0.16246, 2.11803, -1.27598], [1.11352,    1.80902, -1.27598]], [[0.16246, 2.11803, -1.27598], [-0.525731,    1.61803, -1.80171]], [[-0.262866, -0.809017, -2.32744], [0.688191, -0.5, -2.32744]], [[-0.262866, -0.809017, -2.32744], [-0.850651,    0., -2.32744]], [[-0.262866, -0.809017, -2.32744], [-0.525731, -1.61803, -1.80171]], [[-0.262866, -2.42705, -0.425325], [0.262866, -2.42705,    0.425325]], [[-0.262866, -2.42705, -0.425325], [-1.21392, -2.11803, -0.425325]], [[-0.262866, 0.809017, -2.32744], [0.688191,    0.5, -2.32744]], [[-0.262866, 0.809017, -2.32744], [-0.850651,    0., -2.32744]], [[-0.262866, 0.809017, -2.32744], [-0.525731,    1.61803, -1.80171]], [[-0.262866, 2.42705, -0.425325], [0.262866,    2.42705, 0.425325]], [[-0.262866, 2.42705, -0.425325], [-1.21392,    2.11803, -0.425325]], [[0.262866, -0.809017,    2.32744], [-0.688191, -0.5, 2.32744]], [[0.262866, -0.809017,    2.32744], [0.850651, 0., 2.32744]], [[0.262866, -0.809017,    2.32744], [0.525731, -1.61803, 1.80171]], [[0.262866, -2.42705,    0.425325], [1.21392, -2.11803, 0.425325]], [[0.262866, 0.809017,    2.32744], [-0.688191, 0.5, 2.32744]], [[0.262866, 0.809017,    2.32744], [0.850651, 0., 2.32744]], [[0.262866, 0.809017,    2.32744], [0.525731, 1.61803, 1.80171]], [[0.262866, 2.42705,    0.425325], [1.21392, 2.11803,    0.425325]], [[0.688191, -0.5, -2.32744], [0.688191,    0.5, -2.32744]], [[0.688191, -0.5, -2.32744], [1.37638, -1., -1.80171]], [[0.688191, 0.5, -2.32744], [1.37638,    1., -1.80171]], [[1.21392, -2.11803, 0.425325], [1.37638, -1.61803,     1.27598]], [[1.21392, -2.11803,    0.425325], [1.63925, -1.80902, -0.425325]], [[1.21392, 2.11803,    0.425325], [1.37638, 1.61803, 1.27598]], [[1.21392, 2.11803,    0.425325], [1.63925, 1.80902, -0.425325]], [[-2.06457, -0.5,    1.27598], [-2.06457, 0.5, 1.27598]], [[-2.06457, -0.5,    1.27598], [-1.37638, -1., 1.80171]], [[-2.06457, -0.5,    1.27598], [-2.22703, -1., 0.425325]], [[-2.06457, 0.5,    1.27598], [-1.37638, 1., 1.80171]], [[-2.06457, 0.5,    1.27598], [-2.22703, 1., 0.425325]], [[-1.37638, -1.,    1.80171], [-0.688191, -0.5, 2.32744]], [[-1.37638, -1.,    1.80171], [-1.11352, -1.80902, 1.27598]], [[-1.37638, 1.,    1.80171], [-0.688191, 0.5, 2.32744]], [[-1.37638, 1.,    1.80171], [-1.11352, 1.80902,    1.27598]], [[-1.37638, -1.61803, -1.27598], [-1.21392, -2.11803, -0.425325]], [[-1.37638, -1.61803, -1.27598], [-1.96417, -0.809017, -1.27598]], [[-1.37638, -1.61803, -1.27598], [-0.525731, -1.61803, -1.80171]], [[-1.37638, 1.61803, -1.27598], [-1.21392,    2.11803, -0.425325]], [[-1.37638, 1.61803, -1.27598], [-1.96417,    0.809017, -1.27598]], [[-1.37638, 1.61803, -1.27598], [-0.525731,    1.61803, -1.80171]], [[-0.688191, -0.5, 2.32744], [-0.688191, 0.5,    2.32744]], [[1.37638, -1., -1.80171], [2.06457, -0.5, -1.27598]], [[1.37638, -1., -1.80171], [1.11352, -1.80902, -1.27598]], [[1.37638,    1., -1.80171], [2.06457, 0.5, -1.27598]], [[1.37638,    1., -1.80171], [1.11352, 1.80902, -1.27598]], [[1.37638, -1.61803,    1.27598], [1.96417, -0.809017, 1.27598]], [[1.37638, -1.61803,    1.27598], [0.525731, -1.61803, 1.80171]], [[1.37638, 1.61803,    1.27598], [1.96417, 0.809017, 1.27598]], [[1.37638, 1.61803,    1.27598], [0.525731, 1.61803, 1.80171]], [[-1.7013,    0., -1.80171], [-1.96417, -0.809017, -1.27598]], [[-1.7013,    0., -1.80171], [-1.96417, 0.809017, -1.27598]], [[-1.7013,    0., -1.80171], [-0.850651, 0., -2.32744]], [[1.7013, 0.,    1.80171], [1.96417, -0.809017, 1.27598]], [[1.7013, 0.,    1.80171], [1.96417, 0.809017, 1.27598]], [[1.7013, 0.,    1.80171], [0.850651, 0.,    2.32744]], [[-1.21392, -2.11803, -0.425325], [-1.63925, -1.80902,    0.425325]], [[-1.21392, 2.11803, -0.425325], [-1.63925, 1.80902,    0.425325]], [[-1.96417, -0.809017, -1.27598], [-2.38949, -0.5, -0.425325]], [[-1.96417, 0.809017, -1.27598], [-2.38949,    0.5, -0.425325]], [[2.06457, -0.5, -1.27598], [2.06457,    0.5, -1.27598]], [[2.06457, -0.5, -1.27598], [2.22703, -1., -0.425325]], [[2.06457, 0.5, -1.27598], [2.22703,    1., -0.425325]], [[2.22703, -1., -0.425325], [2.38949, -0.5,    0.425325]], [[2.22703, -1., -0.425325], [1.63925, -1.80902, -0.425325]], [[2.22703, 1., -0.425325], [2.38949, 0.5,    0.425325]], [[2.22703, 1., -0.425325], [1.63925,    1.80902, -0.425325]], [[2.38949, -0.5, 0.425325], [2.38949, 0.5,    0.425325]], [[2.38949, -0.5, 0.425325], [1.96417, -0.809017,    1.27598]], [[2.38949, 0.5, 0.425325], [1.96417, 0.809017,    1.27598]], [[-1.11352, -1.80902, 1.27598], [-1.63925, -1.80902,    0.425325]], [[-1.11352, 1.80902, 1.27598], [-1.63925, 1.80902,    0.425325]], [[1.11352, -1.80902, -1.27598], [1.63925, -1.80902, -0.425325]], [[1.11352, 1.80902, -1.27598], [1.63925,    1.80902, -0.425325]], [[-2.38949, -0.5, -0.425325], [-2.38949,    0.5, -0.425325]], [[-2.38949, -0.5, -0.425325], [-2.22703, -1.,    0.425325]], [[-2.38949, 0.5, -0.425325], [-2.22703, 1.,    0.425325]], [[-1.63925, -1.80902, 0.425325], [-2.22703, -1.,    0.425325]], [[-1.63925, 1.80902, 0.425325], [-2.22703, 1.,    0.425325]]];
  let vr = new VR();
  vr.createScene = function () {
    // Add some lights.
    let ambient = new THREE.AmbientLight(0x404040, 0.8);
    let point = new THREE.PointLight(0xFFFFFF);
    point.position = new THREE.Vector3(-100, -100, 100);
    this.scene.add(ambient); this.scene.add(point);

    this.addStars(100, 20, 100);

    // add edges
    let material = new THREE.LineBasicMaterial({
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
        this.scene.add(edge);
      }
    }
    this.addMovementButtons();
  };

  vr.start();

}, false);  // window load
