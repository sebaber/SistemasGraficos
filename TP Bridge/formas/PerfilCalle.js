function PerfilCalle(anchoCalle) {
  this.vertices = [
    // [0.2,-anchoCalle/2,0],//[3,-1,0],
    // [0.2,anchoCalle/2,0],//[3,1,0],
    // [-0.2,anchoCalle/2,0],
    // [-0.2,(anchoCalle/2)-(anchoCalle/8),0],//[2.5,1,0],
    // [-0.1,(anchoCalle/2)-(anchoCalle/6),0],//[2,0.5,0],
    // [-0.1,-(anchoCalle/2)+(anchoCalle/6),0],//[-2,0.5,0],
    // [-0.2,-(anchoCalle/2)+(anchoCalle/8),0],//[-2.5,1,0],
    // [-0.2,-(anchoCalle/2),0],//[-3,1,0],
    // [0.2,-(anchoCalle/2),0],//[-3,-1,0],
    // [1,-3,0]//[3,-1,0]
    [0.2,0,0],//[-2,0.5,0],
    [0.2,(anchoCalle/2)-(anchoCalle/6),0],//[2,0.5,0],
    [-0.1,(anchoCalle/2)-(anchoCalle/6),0],//[2,0.5,0]
    [-0.1,0,0],//[-2,0.5,0],
    [-0.1,-(anchoCalle/2)+(anchoCalle/6),0],//[-2,0.5,0],
    [0.2,-(anchoCalle/2)+(anchoCalle/6),0],//[-2,0.5,0],
    [0.2,0,0],//[-2,0.5,0],












  ];
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

  PerfilCalle.prototype.getNormals = function(){
  return this.normals;
  };

  PerfilCalle.prototype.getBinormals = function(){
  return this.binormals;
  };

  PerfilCalle.prototype.getTangentes = function(){
  return this.tangentes;
  };

  PerfilCalle.prototype.getPoints = function(){

  return this.npoints;
  };

  PerfilCalle.prototype.getVertices = function() {
  return this.allVertices;
  };
