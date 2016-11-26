function PerfilVereda(anchoCalle,discriminante) {
  if(discriminante === 0){
    this.vertices = [
      [0.2,anchoCalle/2,0],//[3,1,0],
      [-0.2,anchoCalle/2,0],
      [-0.2,(anchoCalle/2)-(anchoCalle/8),0],//[2.5,1,0],
      [-0.1,(anchoCalle/2)-(anchoCalle/6),0],//[2,0.5,0],
      [0.2,(anchoCalle/2)-(anchoCalle/6),0],//[2,0.5,0],
      [0.2,anchoCalle/2,0],//[3,1,0],
    ];


  }else{
    this.vertices = [
      [0.2,-anchoCalle/2,0],//[3,1,0],
      [-0.2,-anchoCalle/2,0],
      [-0.2,-(anchoCalle/2)+(anchoCalle/8),0],//[2.5,1,0],
      [-0.1,-(anchoCalle/2)+(anchoCalle/6),0],//[2,0.5,0],
      [0.2,-(anchoCalle/2)+(anchoCalle/6),0],//[2,0.5,0],
      [0.2,-anchoCalle/2,0],//[3,1,0],
    ];

  }
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

PerfilVereda.prototype.getNormals = function(){
  return this.normals;
};

PerfilVereda.prototype.getBinormals = function(){
  return this.binormals;
};

PerfilVereda.prototype.getTangentes = function(){
  return this.tangentes;
};

PerfilVereda.prototype.getPoints = function(){

  return this.npoints;
};

PerfilVereda.prototype.getVertices = function() {
  return this.allVertices;
};
