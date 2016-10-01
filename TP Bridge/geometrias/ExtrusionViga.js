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
  var t;
  vertices = this.getVertices();

  console.log("vertices: "+vertices);
  for (var i = 0.0; i < this.nlevels; i++) {
    t = i/(this.nlevels-1);

    pos = this.bezier.getPosition(t);

    matrizRotacion = Utils.getMatrizRotacion(this.bezier.getTangente(t),this.bezier.getNormal(t),this.bezier.getBiNormal(t));
    var pos4 = vec4.create();
    vec4.set(pos4,pos[0],pos[1],pos[2],1.0);

    var matrizTraslacion = mat4.create();
    mat4.translate(matrizTraslacion,matrizTraslacion,pos4);
    var matFinal = mat4.create();
    mat4.multiply(matFinal,matrizTraslacion,matrizRotacion);

    console.log("matriz");
    console.log(matrizRotacion);

    for (var j = 0.0; j < vertices.length; j++) {

      var vertice = vec4.create();
      vec4.set(vertice,vertices[j][0],vertices[j][1],vertices[j][2],1.0);
      vec4.transformMat4(vertice,vertice,matFinal);

      this.position_buffer.push(vertice[0]);
      this.position_buffer.push(vertice[1]);
      this.position_buffer.push(vertice[2]);

      this.color_buffer.push(1.0/this.rows * i);
      this.color_buffer.push(0.2);
      this.color_buffer.push(1.0/this.cols * j);

    }
  }
};

ExtrusionViga.prototype.getVertices = function(){
  // console.log("x: "+x+" y: "+y+" z: "+z);
  var vertices = [];
  // this.circulo.setCenter(x,y,z);
  var d = 1.0 / this.npoints;
  var pos;
  for (var i = 0; i < this.npoints; i++) {
		var t = d * i;
		pos = this.circulo.getPosition(t);
    vertices.push(pos);
	}
  pos = this.circulo.getPosition(0.0);
	vertices.push(pos);

  return vertices;
};
