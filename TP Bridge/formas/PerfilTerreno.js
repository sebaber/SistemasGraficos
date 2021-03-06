function PerfilTerreno(anchoCosta,anchoRio,profundidad,u) {
  profundidad = profundidad;
  this.u = u;
  this.splineCompleja = new SplineCompleja();
  this.puntos = [];
  this.puntos.push([0,0,0]);
  this.puntos.push([0,0,0]);
  this.puntos.push([0,0,0]);
  this.puntos.push([anchoCosta/4,0,0]);
  this.puntos.push([anchoCosta/2-anchoRio/2,0,0]);
  // this.puntos.push([anchoCosta,0,0]);
  this.puntos.push([anchoCosta/2-anchoRio/2+anchoRio/24,-1*profundidad/5,0]);
  this.puntos.push([anchoCosta/2-anchoRio/2+anchoRio/12,-2*profundidad/5,0]);
  this.puntos.push([anchoCosta/2-anchoRio/2+anchoRio/12,-2*profundidad/5,0]);
  this.puntos.push([anchoCosta/2-anchoRio/2+anchoRio/6,-4*profundidad/5,0]);
  this.puntos.push([anchoCosta/2-anchoRio/3,-profundidad,0]);
  this.puntos.push([anchoCosta/2,-profundidad,0]);
  this.puntos.push([anchoCosta/2+anchoRio/3,-profundidad,0]);
  this.puntos.push([anchoCosta/2+(5*anchoRio/6),-4*profundidad/5,0]);
  this.puntos.push([anchoCosta/2+(11*anchoRio/12),-2*profundidad/5,0]);
  this.puntos.push([anchoCosta/2+(23*anchoRio/24),-1*profundidad/5,0]);
  this.puntos.push([anchoCosta/2+anchoRio/2,0,0]);
  this.puntos.push([anchoCosta*3/4,0,0]);
  this.puntos.push([anchoCosta,0,0]);
  this.puntos.push([anchoCosta,0,0]);
  this.puntos.push([anchoCosta,0,0]);
  for(var i=0;i<this.puntos.length-3;++i){
    this.splineCompleja.agregarSpline(new SplineCubica(this.puntos[i],this.puntos[i+1],this.puntos[i+2],this.puntos[i+3]));
  }
  this.vertices = [];
  this.vertices = this.createVertices();
  this.normales = this.createNormales();
  this.binormales = this.createBinormales();
  this.tangentes = this.createTangentes();
  this.npoints = this.vertices.length;
}

PerfilTerreno.prototype.getNormals = function(){
  return this.normales;
};

PerfilTerreno.prototype.getBinormals = function(){
  return this.binormales;
};

PerfilTerreno.prototype.getTangentes = function(){
  return this.tangentes;
};

PerfilTerreno.prototype.getPoints = function(){
	return this.npoints;
};

PerfilTerreno.prototype.createVertices = function() {
  var vertices = [];
  var pos;
  for (var t = 0; t <= 1; t+=this.u) {
    // vertices.push(this.splineCompleja.p(t));
    pos = this.splineCompleja.p(t);
    vertices.push([pos[0],pos[2],pos[1]]);
	}
	return vertices;
};

PerfilTerreno.prototype.createNormales = function() {
  var vertices = [];
  var pos;
  for (var t = 0; t <= 1; t+=this.u) {
    // vertices.push(this.splineCompleja.p(t));
    pos = this.splineCompleja.n(t);
    vertices.push([pos[0],pos[1],pos[2]]);
	}
	return vertices;
};

PerfilTerreno.prototype.createBinormales = function() {
  var vertices = [];
  var pos;
  for (var t = 0; t <= 1; t+=this.u) {
    // vertices.push(this.splineCompleja.p(t));
    pos = this.splineCompleja.bn(t);
    vertices.push([pos[0],pos[1],pos[2]]);
	}
	return vertices;
};

PerfilTerreno.prototype.createTangentes = function() {
  var vertices = [];
  var pos;
  for (var t = 0; t <= 1; t+=this.u) {
    // vertices.push(this.splineCompleja.p(t));
    pos = this.splineCompleja.t(t);
    vertices.push([pos[0],pos[1],pos[2]]);
	}
	return vertices;
};

PerfilTerreno.prototype.getVertices = function(){
  return this.vertices;
};
