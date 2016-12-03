/***
	Circulo sobre el plano XY  con angulo= 0 en (1,0);
***/


var Circle = function(radius, start, end) {
	 var start_defined = Utils.isDefined(start) ? start : 0;
	 var end_defined = Utils.isDefined(end) ? end : 2*Math.PI;
	 Curve.call(this,start_defined,end_defined-start_defined);
     this.radius = radius;
}

Utils.inheritPrototype(Circle, Curve);


Circle.prototype._getPosition= function(normalizedStep){
    var position = vec3.fromValues(this.radius * Math.cos(normalizedStep), this.radius * Math.sin(normalizedStep), 0);
    return position;
};



Circle.prototype._getTangent= function(normalizedStep){
	 var derived = vec3.fromValues(-1*this.radius * Math.sin(normalizedStep), this.radius * Math.cos(normalizedStep), 0);
	 vec3.normalize(derived, derived);
     return derived;
};


Circle.prototype._getBiNormal= function(normalizedStep){
	 return vec3.fromValues(0,0,-1);
};