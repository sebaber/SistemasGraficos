function PerfilCalle(anchoCalle) {
  this.vertices = [
    [0.2,-anchoCalle/2,0],//[3,-1,0],
    [0.2,anchoCalle/2,0],//[3,1,0],
    [-0.2,anchoCalle/2,0],
    [-0.2,(anchoCalle/2)-(anchoCalle/8),0],//[2.5,1,0],
    [-0.1,(anchoCalle/2)-(anchoCalle/6),0],//[2,0.5,0],
    [-0.1,-(anchoCalle/2)+(anchoCalle/6),0],//[-2,0.5,0],
    [-0.2,-(anchoCalle/2)+(anchoCalle/8),0],//[-2.5,1,0],
    [-0.2,-(anchoCalle/2),0],//[-3,1,0],
    [0.2,-(anchoCalle/2),0],//[-3,-1,0],
    // [1,-3,0]//[3,-1,0]
  ];
  this.npoints = this.vertices.length;
}

PerfilCalle.prototype.getPoints = function(){
	return this.npoints;
};

PerfilCalle.prototype.getVertices = function() {
	return this.vertices;
};
