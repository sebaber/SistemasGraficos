/**
 * @param profileVerticesList: es una lista de vertices que recorren el perfil,
 * 							con sus coordenadas r,z:
 * 								[r1,z1,r2,z2,...,rn,zn]
 */

function SuperficieDeRevolucion(profileVerticesList,color){
	this.numberOfVerticesInProfile = profileVerticesList.length/2.0;
	this.numberOfAngularSteps = 50;
	this.profileVerticesList = profileVerticesList;
	this.color = color;
	Modelo.call(this, (2*this.numberOfVerticesInProfile), this.numberOfAngularSteps+1);
}

inheritPrototype(SuperficieDeRevolucion, Modelo);

SuperficieDeRevolucion.prototype._setPositionAndColorVertex = function(){
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

			partialPositions.push(x);
			partialPositions.push(y);
			partialPositions.push(z);
			partialNextPositions.push(nextX);
			partialNextPositions.push(nextY);
			partialNextPositions.push(nextZ);
		}

		for(k=0; k < partialPositions.length; ++k){
			if(k%3 !== 0) this.texture_coord_buffer.push(k/partialPositions.length);
	    // this.color_buffer.push(this.color[k%3]);
			this.position_buffer.push(partialPositions[k]);
		}

		for(k=0; k < partialNextPositions.length; ++k){
			if(k%3 !== 0) this.texture_coord_buffer.push(k/partialNextPositions.length);
			// this.color_buffer.push(this.color[k%3]);
			this.position_buffer.push(partialNextPositions[k]);
		}

	}
};
