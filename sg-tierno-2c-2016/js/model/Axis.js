


var Axis = function (long) {
	Model.call(this);
	var cylinder = new Cylinder(long,0.1, 20);
	
	var axisX = new Model(cylinder, new PhongMaterial({diffuseColor: [1, 0, 0], specularColor:[0,0,0], ambientColor:[1,0,0]}));
	axisX.translateX(long/2);
	var axisY = new Model(cylinder, new PhongMaterial({diffuseColor: [0, 1, 0], specularColor:[0,0,0], ambientColor:[0,1,0]}));
	axisY.translateX(long/2);
	axisY.rotateZ(90);

	var axisZ = new Model(cylinder, new PhongMaterial({diffuseColor: [0, 0, 1], specularColor:[0,0,0], ambientColor:[0,0,1]}));
	axisZ.translateX(long/2);
	axisZ.rotateY(-90);
	this.add(axisX);
	this.add(axisY);
	this.add(axisZ);
}
Utils.inheritPrototype(Axis, Model);