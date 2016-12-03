/*********************
Curva que puede ser recorrida por un step entre 0 y 1;
*****************/

var Curve = function(start, length) {
	 Transformable.call(this);
     this.start = start;
     this.length = length;
     
}

Utils.inheritPrototype(Curve, Transformable);



// Seteo los buffers de webgl.
Curve.prototype.getPosition= function(step){

	var pos = this._getPosition(this._getNormalizedStep(step));
	return this._apply(pos);
     
};


Curve.prototype.getTangent= function(step){
	var tangent =  this._getTangent(this._getNormalizedStep(step));
	return this._applyRotation(tangent);
     
};


Curve.prototype.getBiNormal= function(step){
	var binormal = this._getBiNormal(this._getNormalizedStep(step));
	return this._applyRotation(binormal);
};



// Seteo los buffers de webgl.
Curve.prototype._getPosition= function(step){
     throw new Error('Not implemented');
};


Curve.prototype._getTangent= function(step){
	throw new Error('Not implemented');
     
};

Curve.prototype.getNormal= function(step){
	 var tang = this.getTangent(step);
	 var bi = this.getBiNormal(step);
	 var res = vec3.create();
	 vec3.cross(res, bi,tang);
	 vec3.normalize(res, res);
     return res;
};

Curve.prototype.getKinematicReference = function(step) {
	 var tang = this.getTangent(step);
	 var bin = this.getBiNormal(step);
	 var normal = vec3.create();

	 
	 vec3.cross(normal,bin,tang);
	 vec3.normalize(normal, normal);
	 var matrix = mat4.fromValues(tang[0], normal[0], bin[0],0,tang[1], normal[1], bin[1],0,tang[2], normal[2], bin[2],0,0,0,0,1);
     return matrix;
}


Curve.prototype._getNormalizedStep= function(step) {
	return this.length * step + this.start;
}

Curve.prototype._getBiNormal= function(step) {
	return vec3.fromValues(0,0,1);
}

Curve.prototype.recalculateLength= function(def) {
	this.length = 0;
	var lastp= 0;
	var i = 0;
	var step = 1/(def);
	var currp,nextp;
	for(var i = 0; i<def; i++) {
		currp = this._getPosition(step*i);
		nextp = this._getPosition(step*(i+1));
		this.length += vec3.dist(currp, nextp);
	}
}