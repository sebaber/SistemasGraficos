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

Esfera.prototype._setPositionAndColorVertex = function(){
	this.position_buffer = [];
	this.normal_buffer = [];
	this.texture_coord_buffer = [];

	var i, j, k, x, y, z, nextX, nextY, nextZ, nextI, nextJ;

	for(i=0; i < this.numberOfVerticesInProfile; ++i){

		var partialPositions = [];
		var partialNextPositions = [];

		for(j=0; j <= this.numberOfAngularSteps; ++j){
			nextI = i + 1;
			nextJ = j + 1;
			x = this.profileVerticesList[2*i] * Math.cos(j*2.0*Math.PI/this.numberOfAngularSteps);
			y = this.profileVerticesList[2*i] * Math.sin(j*2.0*Math.PI/this.numberOfAngularSteps);
			z = this.profileVerticesList[2*i + 1];
			nextX = this.profileVerticesList[2*nextI] * Math.cos(j*2.0*Math.PI/this.numberOfAngularSteps);
			nextY = this.profileVerticesList[2*nextI] * Math.sin(j*2.0*Math.PI/this.numberOfAngularSteps);
			nextZ = this.profileVerticesList[2*nextI + 1];

			// partialPositions.push(x);
			// partialPositions.push(y);
			// partialPositions.push(z);
			// partialNextPositions.push(nextX);
			// partialNextPositions.push(nextY);
			//
			//
			// partialNextPositions.push(nextZ);

			this.position_buffer.push(x);
			this.position_buffer.push(y);
			this.position_buffer.push(z);
			this.normal_buffer.push(-1.0*z);
			this.normal_buffer.push(y);
			this.normal_buffer.push(1.0*x);

			this.texture_coord_buffer.push((this.numberOfVerticesInProfile - i)/this.numberOfVerticesInProfile);
			this.texture_coord_buffer.push((this.numberOfAngularSteps- j)/this.numberOfAngularSteps);

			// this.texture_coord_buffer.push((this.numberOfAngularSteps- j)/this.numberOfAngularSteps);
			// this.texture_coord_buffer.push(i/this.numberOfVerticesInProfile);
		}

		// for(k=0; k < partialPositions.length; ++k){
		// 	// if(k%3 !== 0) this.texture_coord_buffer.push(partialPositions[k]);
	  //   // this.color_buffer.push(this.color[k%3]);
		// 	this.position_buffer.push(partialPositions[k]);
		// 	this.normal_buffer.push(partialPositions[k]);
		// }
		//
		// for(k=0; k < partialNextPositions.length; ++k){
		// 	// if(k%3 !== 0) this.texture_coord_buffer.push(partialNextPositions[k]);
		// 	// this.color_buffer.push(this.color[k%3]);
		// 	this.normal_buffer.push(partialNextPositions[k]);
		// 	this.position_buffer.push(partialNextPositions[k]);
		// }

	}
};
