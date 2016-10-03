/**
 * Created by chris on 07/10/15.
 */
function PerfilTorre(vertices) {
  this.vertices = vertices;
  this.npoints = this.vertices.length-1;
}

PerfilTorre.prototype.getPoints = function(){
	return this.npoints;
};

PerfilTorre.prototype.getVertices = function() {
	return this.vertices;
};
