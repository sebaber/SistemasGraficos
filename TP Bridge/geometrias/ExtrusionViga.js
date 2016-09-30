function ExtrusionViga(bezier,radio,nlevels,npoints){
  this.bezier = bezier;
  this.nlevels = nlevels;
  this.radio = radio;
  this.npoints = npoints;
	this.circulo = new Circulo(radio, 0.0, 0.0, 0.0);
  Modelo.call(this, this.nlevels, this.npoints+1);
}

inheritPrototype(ExtrusionViga, Modelo);

ExtrusionViga.prototype._setPositionAndColorVertex = function(){
  var pos = [];
  var vertices = [];
  this.position_buffer = [];
  this.color_buffer = [];

  for (var i = 0.0; i < this.nlevels; i++) {
    pos = this.bezier.p(i/(this.nlevels-1));
    vertices = this.getVerticesOfPosition(pos[0],pos[1],pos[2]);
    for (var j = 0.0; j < vertices.length; j++) {
      // var m = mat4.create();
      // // mat4.identity(m);
      // mat4.translate(m, m, vec3.fromValues(vertices[j][0],vertices[j][1],vertices[j][2]));
      // mat4.rotate(m, m, Math.PI/2,vec3.fromValues(0,1,0));
      //
      // var v = vec3.create();
    	// var inverse = mat4.create();
    	// mat4.invert(inverse, m);
    	// vec3.transformMat4(v, v, inverse);
    	// vec3.negate(v, v);
      // var vertice = v;
      this.position_buffer.push(vertices[j][0]);
      this.position_buffer.push(vertices[j][1]);
      this.position_buffer.push(vertices[j][2]);

      this.color_buffer.push(1.0/this.rows * i);
      this.color_buffer.push(0.2);
      this.color_buffer.push(1.0/this.cols * j);

    }
  }
};

ExtrusionViga.prototype.getVerticesOfPosition = function(x,y,z){
  //console.log("x: "+x+" y: "+y+" z: "+z);
  var vertices = [];
  this.circulo.setCenter(x,y,z);
  var d = 1.0 / this.npoints;
  var pos;
  for (var i = 0; i < this.npoints; i++) {
		var t = d * i;
		pos = this.circulo.getPosition(t);
    //console.log(pos);
		vertices.push([ x, pos[1], pos[0] ]);
	}
  pos = this.circulo.getPosition(0.0);
	vertices.push([ x, pos[1], pos[0] ]);

  return vertices;
};
