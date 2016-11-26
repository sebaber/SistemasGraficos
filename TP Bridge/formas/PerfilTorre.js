/**
 * Created by chris on 07/10/15.
 */
function PerfilTorre(vertices) {
  this.vertices = vertices;
  this.npoints = this.vertices.length;
  var i;
  this.segmentos = [];
  this.normals = [];
  this.tangentes = [];
  this.binormals = [];
  this.allVertices = [];
  this.npoints = 0;
  for(i = 0; i< this.vertices.length-1; ++i){
    this.segmentos.push(new Segmento(this.vertices[i],this.vertices[i+1]));
  }
  for(i = 0; i< this.segmentos.length; ++i){
    this.segmentos[i].init();
    this.normals = this.normals.concat(this.segmentos[i].getNormals());
    this.binormals = this.binormals.concat(this.segmentos[i].getBinormals());
    this.tangentes = this.tangentes.concat(this.segmentos[i].getTangentes());
    this.allVertices = this.allVertices.concat(this.segmentos[i].getVertices());
    this.npoints += this.segmentos[i].getPoints();
  }

}

PerfilTorre.prototype.getNormals = function(){
  return this.normals;
};

PerfilTorre.prototype.getBinormals = function(){
  return this.binormals;
};

PerfilTorre.prototype.getTangentes = function(){
  return this.tangentes;
};

PerfilTorre.prototype.getPoints = function(){

  return this.npoints;
};

PerfilTorre.prototype.getVertices = function() {
  return this.allVertices;
};
