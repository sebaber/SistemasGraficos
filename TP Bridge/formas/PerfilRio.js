function PerfilRio(anchoCosta,anchoRio,profundidad) {
  this.vertices = [
    [anchoCosta/2-anchoRio,0,-profundidad],
    [anchoCosta/2+anchoRio,0,-profundidad]
  ];

  this.segmentos = [];
  this.normals = [];
  this.tangentes = [];
  this.binormals = [];
  this.allVertices = [];
  var i;
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

PerfilRio.prototype.getNormals = function(){
  return this.normals;
};

PerfilRio.prototype.getBinormals = function(){
  return this.binormals;
};

PerfilRio.prototype.getTangentes = function(){
  return this.tangentes;
};

PerfilRio.prototype.getPoints = function(){

  return this.npoints;
};

PerfilRio.prototype.getVertices = function() {
  return this.allVertices;
};
