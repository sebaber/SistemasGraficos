/**
 * Created by chris on 07/10/15.
 */
function Circulo(radio, x0, y0, z) {
	this.radio = radio;
	this.x0 = x0;
	this.y0 = y0;
	this.z = z;
}

Circulo.prototype.getPosition = function(t) {
	return [ this.radio * Math.cos(2 * Math.PI * t) + this.x0,
			this.radio * Math.sin(2 * Math.PI * t) + this.y0, this.z ];
};

Circulo.prototype.getTangente = function(t) {
	var nt = [ -2 * Math.PI * this.radio * Math.sin(2 * Math.PI * t),
			2 * Math.PI * this.radio * Math.cos(2 * Math.PI * t), this.z ];
	var vect = vec3.create(nt);
	vec3.normalize(vect, vect);
	return [ vect[0], vect[1], vect[2] ];
};

Circulo.prototype.getNormal = function(t) {
	var tan = this.t(t);
	return [ tan[1], -tan[0], tan[2] ];
};
