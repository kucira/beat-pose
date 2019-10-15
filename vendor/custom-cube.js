let mouse = {x: 0, y: 0};
let el;

AFRAME.registerComponent('custom-cube', {
    schema: {
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 1},
        depth: {type: 'number', default: 1},
        color: {type: 'color', default: '#AAA'},
    },
    init: function () {
        var data = this.data;
        el = this.el;
        document.addEventListener('mousemove', this.onMouseMove, false);
    
        // Create geometry.
        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
        // Create material.
        this.material = new THREE.MeshStandardMaterial({color: data.color});
        // Create mesh.
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        // Set mesh on entity.
        el.setObject3D('mesh', this.mesh);
    },

    onMouseMove: function(event){
        event.preventDefault();

        // var camera = document.querySelector('#camera');
        // var cameraEl = camera.object3D.children[1];

        // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        // mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        // var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
        // vector.unproject(cameraEl);

        // var cameraElPosition = cameraEl.el.object3D.position;

        // var dir = vector.sub(cameraElPosition).normalize();
        // var distance = - cameraElPosition.z / dir.z;
        // var pos = cameraElPosition.clone().add(dir.multiplyScalar(distance));
        // el.object3D.position.copy(pos);
    },

    update: function (oldData) {
        var data = this.data;
        var el = this.el;
        // If `oldData` is empty, then this means we're in the initialization process.
        // No need to update.
        if (Object.keys(oldData).length === 0) { return; }
        // Geometry-related properties changed. Update the geometry.
        if (data.width !== oldData.width ||
            data.height !== oldData.height ||
            data.depth !== oldData.depth) {
          el.getObject3D('mesh').geometry = new THREE.BoxBufferGeometry(data.width, data.height,
                                                                        data.depth);
        }
    
        // Material-related properties changed. Update the material.
        if (data.color !== oldData.color) {
          el.getObject3D('mesh').material.color = new THREE.Color(data.color);
        }
      }
  });