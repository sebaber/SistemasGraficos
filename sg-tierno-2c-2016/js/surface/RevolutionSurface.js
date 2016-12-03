
var RevolutionSurface = function(levels, faces, curve, limit,textGenerator){
	this.curve = curve;
	this.limit = limit;
	Geometry.call(this, levels, faces, textGenerator);
}

Utils.inheritPrototype(RevolutionSurface, Geometry);

RevolutionSurface.prototype.createGrid = function () {
	var step = 1.0/(this.faces-1);
	var angleStep = this.limit / (this.levels-1);
	var initialTanget = vec3.fromValues(0,0,-1);
	var positions = [];
	var normals = [];
	var tangents = [];
	var binormals = [];
	var texturecoord = [];
	for(var i = 0; i < this.levels; i++) {
		var matrix = mat4.create();
		mat4.rotate(matrix, matrix, angleStep * i, [0, 1, 0]);
		var levelTg = vec3.fromValues(0,0,0);
		vec3.transformMat4(levelTg,initialTanget,matrix);
		//revolucion sobre Y
		for(var j = 0; j < this.faces; j++) {
			var pos = this.curve.getPosition(step*j);
			vec3.transformMat4(pos,pos,matrix);
			positions.push(pos[0]);
			positions.push(pos[1]);
			positions.push(pos[2]);

			var normal = this.curve.getNormal(step*j);
			vec3.transformMat4(normal,normal,matrix);
			normals.push(normal[0]);
			normals.push(normal[1]);
			normals.push(normal[2]);


			tangents.push(levelTg[0]);
			tangents.push(levelTg[1]);
			tangents.push(levelTg[2]);


			var bin = vec3.create();
			vec3.cross(bin,normal, levelTg);

			binormals.push(bin[0]);
			binormals.push(bin[1]);
			binormals.push(bin[2]);


			//los tres son perpendiculares entre si.
			if(Utils.isDefined(this.textGenerator)) this.textGenerator.push(step*j,angleStep * i /this.limit);
		}

	}
	this.setPositions(positions);
	this.setNormals(normals);
	this.setTangents(tangents);
	this.setBinormals(binormals);
}



/*****
	Sphere

******/
var Sphere = function(definition,txg){
	// necesito la mitad derecha del plano XY para hacer la revolución.
	var curve = new Circle(1, Math.PI/2, -Math.PI/2);
	RevolutionSurface.call(this,definition,definition,curve, 2*Math.PI,txg);
}

Utils.inheritPrototype(Sphere, RevolutionSurface);
	

