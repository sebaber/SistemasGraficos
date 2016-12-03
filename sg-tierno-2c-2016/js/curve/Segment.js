
/*****
Segmento de recta que comienza en cero y tiene una longitud de length. Esta ubicada sobre el eje x;
********/


var Segment = function(start,length) {
	var that = this;
	var position = function (step){
		return vec2.fromValues(step,0);
	}

	var derivative = function (step){
		return vec2.fromValues(length,0);
	}


	var start_defined = Utils.isDefined(start) ? start : 0;
	var length_defined = Utils.isDefined(length) ? length : 1;
	ParametricCurve.call(this, start_defined, length_defined, position, derivative);
}

Utils.inheritPrototype(Segment, ParametricCurve);


