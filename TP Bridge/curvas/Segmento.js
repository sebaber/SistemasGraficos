function Segmento (vi,vf) {
    this.vi = vi;
    this.vf = vf;
}
Segmento.prototype.getPosition = function(t) {
    var pos = vec3.create();
    pos[0] = this.vf[0]*t + this.vi[0]*(1-t);
    pos[1] = this.vf[1]*t + this.vi[1]*(1-t);
    pos[2] = 0;
    return pos;
};

Segmento.prototype.getTangente = function (u){
    /* Devuelve el vector tangente a la curva en el punto.*/
    var pos = vec3.create();
    pos[0] = this.vf[0] - this.vi[0];
    pos[1] = this.vf[1] - this.vi[1];
    pos[2] = 0;

    vec3.normalize(pos,pos);
    return pos;
};

Segmento.prototype.getNormal = function(t) {
	var tan = this.getTangente(t);
	return [ tan[1], -tan[0], tan[2] ];
};

Segmento.prototype.getBiNormal = function(t) {
	var bin = vec3.create();
  return vec3.cross(bin,this.getTangente(t),this.getNormal(t));
};
