
/*****
Curva paramétrizada de dos dimensiones.

********/


var ParametricCurve = function(start,length, position, derivative) {
	this.position = position;
	this.derivative = derivative;
	Curve.call(this,start,length);

}

Utils.inheritPrototype(ParametricCurve, Curve);

ParametricCurve.prototype._getPosition= function(step){
	var position = this.position(step);
    var result = vec3.fromValues(position[0], position[1],0);
    return result;
};


ParametricCurve.prototype._getTangent= function(step){	
	var tangent = this.derivative(step);
    var result = vec3.fromValues(tangent[0], tangent[1],0);
    vec3.normalize(result,result);
    return result;
};
