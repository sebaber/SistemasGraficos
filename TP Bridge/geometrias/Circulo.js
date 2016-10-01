/**
 * Created by chris on 07/10/15.
 */
function Circulo(radio, x0, y0, z) {
	this.radio = radio;
	this.x0 = x0;
	this.y0 = y0;
	this.z = z;
}

Circulo.prototype.setCenter = function(x,y,z){
	this.x0 = x;
	this.y0=y;
	this.z0=z;
};

Circulo.prototype.getPosition = function(t) {
	return [ this.radio * Math.cos(2 * Math.PI * t) + this.x0,
			this.radio * Math.sin(2 * Math.PI * t) + this.y0, this.z ];
};

Circulo.prototype.getPositionXZ = function(t) {
	return [
		this.x0,
		this.radio * Math.sin(2 * Math.PI * t) + this.y0,
		this.radio * Math.cos(2 * Math.PI * t) + this.x0
	];
};

Circulo.prototype.getTangente = function(t) {
	var nt = [ -2 * Math.PI * this.radio * Math.sin(2 * Math.PI * t),
			2 * Math.PI * this.radio * Math.cos(2 * Math.PI * t), this.z ];
	vec3.normalize(nt, nt);
	return [ vect[0], vect[1], vect[2] ];
};

Circulo.prototype.getNormal = function(t) {
	var tan = this.getTangente(t);
	return [ tan[1], -tan[0], tan[2] ];
};

Circulo.prototype.getBiNormal = function(t) {
	var tan = this.getTangente(t);
	var nor = this.getNormal(t);
	return [
		tan[1]*nor[2] - tan[2]*nor[1],
	 	tan[2]*nor[0] - tan[0]*nor[2],
		tan[0]*nor[1] - tan[1]*nor[0]
	];
};
