/*****
Curva Bezier generica para el orden que sea, 
********/


//TODO NO FUNCIONA PARA HACER ESTRUSION CON LA CURVA ROTADA.

var AproximatedCurve = function(basis, derivatedBasis, newCurvePoints) {
	this.order = basis.length -1;
	this.basis = basis;
	this.derivatedBasis = derivatedBasis;
	this.complexCurve = new  ComplexCurve();
	this.currentCurvePoints = 0;
	this.controlPoints = [];
	this.newCurvePoints = newCurvePoints;
	Curve.call(this, 0,1);	
}

Utils.inheritPrototype(AproximatedCurve, Curve);

AproximatedCurve.prototype.addControlPoint= function(point){
	 this.currentCurvePoints++;
	 this.controlPoints.push(point);
	 if(this.currentCurvePoints == this.order + 1) {
	 	this.currentCurvePoints = this.order + 1 - this.newCurvePoints;
	 	var points = [];
	 	for (var i=this.order + 1; i > 0; i--){
	 		points.push(this.controlPoints[this.controlPoints.length - i]);
	 	}
	 	var these = this;
	 	var position = function (step) {
	 		var x = 0;
	 		var y = 0;
	 		for(var j = 0; j < points.length; j++){
	 			var factor = these.basis[j](step);
	 			x += factor* points[j][0];
	 			y += factor* points[j][1];
	 		}
	 		
	 		return vec2.fromValues(x,y);
	 	}
	 	var derivated = function (step) {
	 		var x = 0;
	 		var y = 0;
	 		for(var j = 0; j < points.length; j++){
	 			var factor = these.derivatedBasis[j](step);
	 			x += factor* points[j][0];
	 			y += factor* points[j][1];
	 		}
	 		return vec2.fromValues(x,y);
	 	}
	 	this.complexCurve.add(new ParametricCurve(0,1,position,derivated));

	 }
};



AproximatedCurve.prototype._getPosition= function(step){
	var position = this.complexCurve.getPosition(step)
	return position;
};


AproximatedCurve.prototype._getTangent= function(step){
	var tangent = this.complexCurve.getTangent(step);
	return  tangent;
};

AproximatedCurve.prototype._getBinormal= function(step){
	var binormal = this.complexCurve.getBinormal(step);
	return  binormal;
};


AproximatedCurve.prototype.recalculateLength= function(def) {
	this.complexCurve.recalculateLength(def);
}


AproximatedCurve.prototype.getKinematicReference = function(step) {
	 var tang = this.getTangent(step);
	 var bin = this.getBiNormal(step);
	 var normal = vec3.create();

	 
	 vec3.cross(normal,tang,bin);
	 vec3.normalize(normal, normal);
	 var matrix = mat4.fromValues(tang[0], normal[0], bin[0],0,tang[1], normal[1], bin[1],0,tang[2], normal[2], bin[2],0,0,0,0,1);
     return matrix;
}
/*****
Curvas BSpline
********/

var CubicBSpline = function() {
	var basis = [];
	basis[0] = function (u) {
		return (1 - u) * (1 - u) * (1 - u) * 1 / 6;
	};
	basis[1] = function (u) {
		return (4 - 6 * u * u + 3 * u * u * u) * 1 / 6;
	};
	basis[2] = function (u) {
		return (1 + 3 * u + 3 * u * u - 3 * u * u * u) * 1 / 6;
	};
	basis[3] = function (u) {
		return u * u * u * 1 / 6;
	};

	var derivativeBasis = [];
	derivativeBasis[0] = function (u) {
		return  (1 - u) * (1 - u) * -1 / 2;
	};
	derivativeBasis[1] = function (u) {
		return (-4* u + 3*u*u) * 1 / 2;
	};
	derivativeBasis[2] = function (u) {
		return (1 + 2 * u - 3 * u * u) * 1 / 2;
	};
	derivativeBasis[3] = function (u) {
		return u * u * 1 / 2;
	};

	AproximatedCurve.call(this,basis, derivativeBasis,1);
}

Utils.inheritPrototype(CubicBSpline, AproximatedCurve);




var QuadraticBSpline = function() {
	var basis = [];
	basis[0] = function (u) {
		return 0.5 * (1 - u) * (1 - u);
	};
	basis[1] = function (u) {
		return 0.5 * u * (1 - u);
	};
	basis[2] = function (u) {
		return 0.5 * u * u;
	};

	var derivativeBasis = [];
	derivativeBasis[0] = function (u) {
		return u-1;
	};
	derivativeBasis[1] = function (u) {
		return 0.5*(1-2*u);
	};
	derivativeBasis[2] = function (u) {
		return u;
	};

	AproximatedCurve.call(this,basis, derivativeBasis,1);
}

Utils.inheritPrototype(QuadraticBSpline, AproximatedCurve);


var CubicBezier = function() {
	var basis = [];

	basis[0] = function (u) {
		return (1 - u) * (1 - u) * (1 - u);
	};
	basis[1] = function (u) {
		return 3 * (1 - u) * (1 - u) * u;
	};
	basis[2] = function (u) {
		return 3 * (1 - u) * u * u;
	};
	basis[3] = function (u) {
		return u * u * u;
	};


	var derivativeBasis = [];
	derivativeBasis[0] = function (u) {
		return -3*(1-u)*(1-u);
	};
	derivativeBasis[1] = function (u) {
		return -6*(1-u)*u + 3*(1-u)*(1-u);
	};
	derivativeBasis[2] = function (u) {
		return -3*u*u + 6*(1-u)*u;
	};
	derivativeBasis[3] = function (u) {
		return 3*u*u;
	};
	AproximatedCurve.call(this,basis, derivativeBasis,3);
}

Utils.inheritPrototype(CubicBezier, AproximatedCurve);


var QuadraticBezier = function() {
	var basis = [];


	basis[0] = function (u) {
		return (1 - u) * (1 - u);
	};
	basis[1] = function (u) {
		return 2 * u * (1 - u);
	};
	basis[2] = function (u) {
		return u * u;
	};

	var derivativeBasis = [];
	derivativeBasis[0] = function (u) {
		return -2 + 2 *u;
	};
	derivativeBasis[1] = function (u) {
		return 2-4*u;
	};
	derivativeBasis[2] = function (u) {
		return 2*u;
	};

	AproximatedCurve.call(this,basis, derivativeBasis,2);
}

Utils.inheritPrototype(QuadraticBezier, AproximatedCurve);