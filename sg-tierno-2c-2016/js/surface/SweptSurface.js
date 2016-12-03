var SweptSurface = function(levels, faces, curve, path,adaptative, textGenerator){
	this.curve = curve;
	this.path = path;
	this.adaptative = Utils.isDefined(adaptative) ? adaptative : true;
	Geometry.call(this, levels, faces,textGenerator);

}

Utils.inheritPrototype(SweptSurface, Geometry);

SweptSurface.prototype.createGrid = function () {
	var pathStep = 1.0/(this.levels-1);
	var curveStep = 1.0 /(this.faces-1);


	var attributes = {
		positions: [],
		normals : [],
		tangents : [],
		binormals : []
	};
	for(var i = 0; i < this.levels; i++) {
		this._completeLevel(pathStep,curveStep, i, attributes);

	}
	this.setPositions(attributes.positions);
	this.setNormals(attributes.normals);
	this.setTangents(attributes.tangents);
	this.setBinormals(attributes.binormals);
}

SweptSurface.prototype._completeLevel = function (pathStep, curveStep, nStep,attributes) {
		var matrix = mat4.create();
		var normal_matrix = mat4.create();
		if(this.adaptative) {
			matrix = this.path.getKinematicReference(pathStep*nStep);
			normal_matrix = Utils.calculateNormalMatrix(matrix);
		}
		

		var translationMatrix = mat4.create();
		mat4.fromTranslation(translationMatrix, this.path.getPosition(pathStep*nStep));
		//revolucion sobre Y
		for(var j = 0; j < this.faces; j++) {
			var posAdapted = vec3.create();
			var pos = this.curve.getPosition(curveStep*j);
			vec3.transformMat4(posAdapted,pos,matrix);

			vec3.transformMat4(posAdapted,posAdapted,translationMatrix);

			var normal = this.curve.getNormal(curveStep*j);
			var tangent = this.curve.getTangent(curveStep*j);
			var binormal = vec3.create();
			vec3.transformMat4(normal,normal,matrix);
			vec3.transformMat4(tangent, tangent, matrix);
			vec3.cross(binormal, normal,tangent);


			

			attributes.positions.push(posAdapted[0]);
			attributes.positions.push(posAdapted[1]);
			attributes.positions.push(posAdapted[2]);

			attributes.normals.push(normal[0]);
			attributes.normals.push(normal[1]);
			attributes.normals.push(normal[2]);

			attributes.tangents.push(tangent[0]);
			attributes.tangents.push(tangent[1]);
			attributes.tangents.push(tangent[2]);

			attributes.binormals.push(binormal[0]);
			attributes.binormals.push(binormal[1]);
			attributes.binormals.push(binormal[2]);


			if(Utils.isDefined(this.textGenerator)) {
				//this.textGenerator.push(pathStep*nStep,curveStep*j,posAdapted);
				this.textGenerator.push(pathStep*nStep,curveStep*j,posAdapted,tangent,normal);
			}
		}
}
var Cylinder = function(h,radius, definition,textGenerator){
	var curve = new Circle(radius);
	var path = new Segment(-h/2, h);
	curve.rotateY(90);
	SweptSurface.call(this, 2, definition,curve,path,true, textGenerator);

}

Utils.inheritPrototype(Cylinder, SweptSurface);



// ESTE EJEMPLO SIRVE PORQUE NO SE, HAY ALGO QUE NO ME CIERRA COŃ CÓMO TENGO QUE PONER LAS FIGURAS ANTES DE ARRANCAR LA ESTRUSION
// .
var Donut = function(definition){
	//juego con los limites para que se vea cómo esta construida.
	var curve = new Circle(1,-Math.PI/2,Math.PI);
	var path = new Circle(1.5, Math.PI/2, 2 *Math.PI );
	curve.rotateY(90);
	SweptSurface.call(this, definition, definition,curve,path);

}

Utils.inheritPrototype(Donut, SweptSurface);


var Plane = function(){
	var curve = new Segment();
	var path = new Segment();
	curve.rotateZ(-90);
	SweptSurface.call(this, 2, 2,curve,path);

}

Utils.inheritPrototype(Plane, SweptSurface);


var Platform = function(width, height, length){


	var seg1 = new Segment(0,width);
	seg1.translateX(-width/2);
	seg1.translateY(-height/2);


	var seg4 = new Segment(0,height);
	seg4.rotateZ(-90);
	seg4.translateY(height/2);
	seg4.translateX(-width/2);

	var seg2 = new Segment(0,height);
	seg2.rotateZ(90);
	seg2.translateY(-height/2);
	seg2.translateX(width/2);

	var seg3 = new Segment(0,width);
	seg3.rotateY(180);
	seg3.translateY(height/2);
	seg3.translateX(width/2);

	var complex = new ComplexCurve();
	complex.add(seg1);
	complex.add(seg2);
	complex.add(seg3);
	complex.add(seg4);
	complex.rotateY(90);
	var axis = new Axis(1.5);
	var path = new Segment(0,length);
	path.translateX(-length/2);
	SweptSurface.call(this, 2, 5,complex, path);
}

Utils.inheritPrototype(Platform, SweptSurface);
