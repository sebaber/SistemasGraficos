function Esfera(npoints,radio,texture_file) {
	this.npoints = npoints;
	this.radio = radio;
	this.vertexOfProfile = this.getVertices();
	var color = [0.2,0.1,0.1];
	SuperficieDeRevolucion.call(this, this.vertexOfProfile,color);

	this.initTexture(texture_file);
}

inheritPrototype(Esfera, SuperficieDeRevolucion);

Esfera.prototype.getPosition = function(t) {
	return [ this.radio * Math.cos( Math.PI * t - (Math.PI/2.0)),
			this.radio * Math.sin( Math.PI * t - (Math.PI/2.0))];
};

Esfera.prototype.getVertices = function() {
	var vertices = [];
	var d = 1.0 / this.npoints;
	var pos;
	for (var i = 0; i <= this.npoints; i++) {
		var t = d * i;
		pos = this.getPosition(t);
    	vertices.push(pos[0]);
    	vertices.push(pos[1]);
	}
	return vertices;
};

Esfera.prototype.postInit = function(){
};
