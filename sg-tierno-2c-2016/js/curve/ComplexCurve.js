
/*****
Curva compuesta por mas curvas.
********/


var ComplexCurve = function() {
	Curve.call(this,0,1);
	this.curves = [];
	this.controls = []
}

Utils.inheritPrototype(ComplexCurve, Curve);


ComplexCurve.prototype.add= function(curve){
     this.curves.push(curve);
     this.controls = [];
     //le asigno proporcional a cada curva lo mismo.
     var prop = 1/this.curves.length;
     this.controls.push(0);
     for(var i=1; i <= this.curves.length; i++) {
     	this.controls.push(i*prop);
     }
};

ComplexCurve.prototype.getPosition= function(step){
	var segment = this._getCurve(step);
	var localP =  this._getLocalParam(segment, step);
	var pos = this.curves[segment].getPosition(localP);
	return this._apply(pos);

};


ComplexCurve.prototype._getTangent= function(step){
	var segment = this._getCurve(step);
	var localP =  this._getLocalParam(segment, step);
	return this.curves[segment].getTangent(localP);
};


ComplexCurve.prototype._getBiNormal= function(step){
	var segment = this._getCurve(step);
	var localP =  this._getLocalParam(segment, step);
	return this.curves[segment].getBiNormal(localP);
};


ComplexCurve.prototype._getCurve= function(step){
	
	for(var i = 0; i< this.controls.length; i++) {
		if(step >= this.controls[i] && step <= this.controls[i+1]){
			return i;
		}
	}


};

ComplexCurve.prototype._getLocalParam= function(segment,step){
	
	var start = this.controls[segment];
	var end = this.controls[segment+1] - start;
	var act = step - start;

	return act / end ;

};

ComplexCurve.prototype.recalculateLength= function(def) {
	this.length = 0;
	this.controls = [];
	
	for(var i in this.curves) {
		this.curves[i].recalculateLength(def);
		this.length += this.curves[i].length;
	}
	this.controls.push(0);
	for(var i in this.curves) {
		var prop = this.curves[i].length/this.length;
		this.controls.push(this.controls[i]+ prop);
	}
	this.controls[this.controls.length -1] = 1; 
}




