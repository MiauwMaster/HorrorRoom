var light = function (x, y, z, addto) {

    var lampGeometry = new THREE.SphereGeometry(0.2, 40, 40);
    var lampMaterial = new THREE.MeshPhongMaterial({color:0xffffff, emissive:0xffffff , side: THREE.DoubleSide});

    this.lamp = new THREE.Mesh(lampGeometry, lampMaterial);
    this.lamp.position.set(x, y, z);

    this.pointlight = new THREE.PointLight(0x768221, 3, 200, 2);
    this.pointlight.position.set(x, y, z);
    this.lamp.add(this.pointlight);


    var plateGeometry = new THREE.CylinderGeometry(1, 0.4, 0.4, 40, 40);
    var plateMaterial = new THREE.MeshLambertMaterial({emissive:0x000000});
    var plate = new THREE.Mesh(plateGeometry, plateMaterial);
    plate.scale.set(.3, .3, .3);
    plate.position.set(0, 0.1, 0);
    this.lamp.add(plate);

    addto.add(this.lamp);

};