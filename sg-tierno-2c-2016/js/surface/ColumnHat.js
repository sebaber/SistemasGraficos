var ColumnHat = function(faces, firstCurve, secondCurve, h, txg){

	this.sc = firstCurve
	var path = new Segment(0,h);
	path.rotateZ(-90);
	
	SweptSurface.call(this, 2,faces,secondCurve, path,true,txg);
}

Utils.inheritPrototype(ColumnHat, SweptSurface);


ColumnHat.prototype.createGrid = function () {
	var curveStep = 1.0 /(this.faces-1);
	var positions = [];
	var normals = [];

	//Base:
	var attributes ={
		positions: [],
		normals : [],
		tangents: [],
		binormals : []

	};
	this._completeLevel(0, curveStep, 0,attributes);
	this.curve = this.sc;
	//Top
	if(this.finalH == 0){
		//this.curve = this._fixedH();
		this._completeLevel(1, curveStep, 1,attributes);
		
	} else {
		this._completeLevel(1, curveStep, 1,attributes);
		
	}

	this.setPositions(attributes.positions);
	this.setNormals(attributes.normals);
	this.setTangents(attributes.tangents);
	this.setBinormals(attributes.binormals);
}

ColumnHat.prototype._completeNormalsFixed = function (normals, normal) {
	for(var j = 0; j < this.faces; j++) { 
			normals.push(normal[0]);
			normals.push(normal[1]);
			normals.push(normal[2]);
	}
}


ColumnHat.prototype._fixedH = function (normals) {
	var curve = new ComplexCurve();
	var f = function(){
		return vec2.fromValues(0,0);
	};

	var der = function(){
		return vec2.fromValues(0,0);
	};

	var segPoint =  new ParametricCurve(0,1,f,der);
	segPoint.translateX(0.5);
	for(var i = 0; i<4; i++) {
		curve.add(segPoint);
	}

	var zeroPoint =  new ParametricCurve(0,1,f,der);
	curve.add(zeroPoint);

	var lPoint =  new ParametricCurve(0,1,f,der);
	lPoint.translateX(-0.5);
	for(var i = 0; i<5; i++) {
		curve.add(lPoint);
	}

	curve.add(zeroPoint);
	curve.add(segPoint);
	curve.applyTransformationMatrix(this.getMatrix(),true);
	return curve;
}