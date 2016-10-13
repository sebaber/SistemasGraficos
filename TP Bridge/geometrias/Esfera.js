function Esfera(npoints,radio, x0, y0,z) {
	this.npoints = npoints;
	this.radio = radio;
	this.x0 = x0;
	this.y0 = y0;
	this.z = z;
	this.vertexOfProfile = this.getVertices();
	var color = [0.7,0.0,0.0];
	SuperficieDeRevolucion.call(this, this.vertexOfProfile,color);
}

inheritPrototype(Esfera, SuperficieDeRevolucion);

Esfera.prototype.getPosition = function(t) {
	return [ this.radio * Math.cos( Math.PI * t - (Math.PI/2.0)) + this.x0,
			this.radio * Math.sin( Math.PI * t - (Math.PI/2.0)) + this.z];
};

Esfera.prototype.getVertices = function() {
	var vertices = [];
	var d = 1.0 / this.npoints;
	var pos;
	for (var i = 0; i < this.npoints; i++) {
		var t = d * i;
    vertices.push(this.getPosition(t));
	}
	return vertices;
};

Esfera.prototype.postInit = function(){
};
