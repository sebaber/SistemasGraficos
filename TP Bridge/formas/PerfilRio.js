function PerfilRio(anchoCosta,anchoRio,profundidad) {
  this.vertices = [
    [anchoCosta/2-anchoRio,0,-profundidad],
    [anchoCosta/2+anchoRio,0,-profundidad]
  ];
  this.npoints = this.vertices.length;
}

PerfilRio.prototype.getPoints = function(){
	return this.npoints;
};

PerfilRio.prototype.getVertices = function() {
	return this.vertices;
};
