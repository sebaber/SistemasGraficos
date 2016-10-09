function PerfilTerreno(anchoCosta,anchoRio,u) {
  this.u = u;
  this.splineCompleja = new SplineCompleja();
  this.puntos = [];
  this.puntos.push([0,0,0]);
  this.puntos.push([0,0,0]);
  this.puntos.push([0,0,0]);
  this.puntos.push([anchoCosta/3,0,0]);
  this.puntos.push([2*anchoCosta/3,0,0]);
  this.puntos.push([anchoCosta,0,0]);
  this.puntos.push([anchoCosta+anchoRio/12,-2*anchoRio/5,0]);
  this.puntos.push([anchoCosta+anchoRio/6,-4*anchoRio/5,0]);
  this.puntos.push([anchoCosta+anchoRio/3,-anchoRio,0]);
  this.puntos.push([anchoCosta+anchoRio/2,-anchoRio,0]);
  this.puntos.push([anchoCosta+(2*anchoRio/3),-anchoRio,0]);
  this.puntos.push([anchoCosta+(5*anchoRio/6),-4*anchoRio/5,0]);
  this.puntos.push([anchoCosta+(11*anchoRio/12),-2*anchoRio/5,0]);
  this.puntos.push([anchoCosta+anchoRio+anchoCosta/3,0,0]);
  this.puntos.push([anchoCosta+anchoRio+(2*anchoCosta/3),0,0]);
  this.puntos.push([anchoCosta+anchoRio+anchoCosta,0,0]);
  this.puntos.push([anchoCosta+anchoRio+anchoCosta,0,0]);
  this.puntos.push([anchoCosta+anchoRio+anchoCosta,0,0]);
  for(var i=0;i<this.puntos.length-3;++i){
    this.splineCompleja.agregarSpline(new SplineCubica(this.puntos[i],this.puntos[i+1],this.puntos[i+2],this.puntos[i+3]));
  }
  this.vertices = [];
  this.vertices = this.createVertices();
  this.npoints = this.vertices.length;
}

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

PerfilTerreno.prototype.getVertices = function(){
  return this.vertices;
};
