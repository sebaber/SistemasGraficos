function Segmento (vi,vf) {
  this.vi = vi;
  this.vf = vf;

  this.vertices = [];
  this.points = 0;

  this.normals = [];
  this.binormals = [];
  this.tangentes = [];
}
Segmento.prototype.getPosition = function(t) {
  var pos = vec3.create();
  pos[0] = this.vf[0]*t + this.vi[0]*(1-t);
  pos[1] = this.vf[1]*t + this.vi[1]*(1-t);
  pos[2] = this.vf[2]*t + this.vi[2]*(1-t);
  return pos;
};

Segmento.prototype.getTangente = function (u){
  /* Devuelve el vector tangente a la curva en el punto.*/
  var pos = vec3.create();
  pos[0] = this.vf[0] - this.vi[0];
  pos[1] = this.vf[1] - this.vi[1];
  pos[2] = this.vf[2] - this.vi[2];

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

Segmento.prototype.init = function(){
  for(var i = 0;i<=1;i+=0.1){
    this.vertices.push(this.getPosition(i));
    this.tangentes.push(this.getTangente(i));
    this.normals.push(this.getNormal(t));
    this.binormals.push(this.getBiNormal(t));
    this.points +=1;
  }
};

Segmento.prototype.getPoints = function(){
  return this.points;
};

Segmento.prototype.getVertices = function(){
  return this.vertices;
};

Segmento.prototype.getTangentes = function(){
  return this.tangentes;
};

Segmento.prototype.getNormals = function(){
  return this.normals;
};

Segmento.prototype.getBinormals = function(){
  return this.binormals;
};
