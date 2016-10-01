/**
 * Created by chris on 07/10/15.
 */
function PerfilTorre() {
  this.vertices = [
    [0.5,-0.5,0],
    [0.5,-1,0],
    [1,-1,0],
    [1,1,0],
    [0.5,1,0],
    [0.5,0.5,0],
    [-0.5,0.5,0],
    [-0.5,1,0],
    [-1,1,0],
    [-1,-1,0],
    [-0.5,-1,0],
    [-0.5,-0.5,0],
    [0.5,-0.5,0]
  ];
  this.npoints = this.vertices.length-1;
}

PerfilTorre.prototype.getPoints = function(){
	return this.npoints;
};

PerfilTorre.prototype.getVertices = function() {
	return this.vertices;
};
