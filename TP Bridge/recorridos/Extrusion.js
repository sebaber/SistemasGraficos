function Extrusion(curva,forma,nlevels){
  this.curva = curva;
  this.nlevels = nlevels;
  this.forma = forma;
  Modelo.call(this,this.nlevels,this.forma.getPoints());
}

inheritPrototype(Extrusion, Modelo);

Extrusion.prototype._setPositionAndColorVertex = function(){
  var pos = [];
  var vertices = [];
  this.position_buffer = [];
  this.normal_buffer = [];
  this.texture_coord_buffer = [];
  var t;
  vertices = this.forma.getVertices();
  for (var i = 0.0; i < this.nlevels; i++) {
    t = i/(this.nlevels-1);

    pos = this.curva.getPosition(t);
    matrizRotacion = Utils.getMatrizRotacion(this.curva.getTangente(t),this.curva.getNormal(t),this.curva.getBiNormal(t));

    var pos4 = vec4.create();
    vec4.set(pos4,pos[0],pos[1],pos[2],1.0);

    var matrizTraslacion = mat4.create();
    mat4.translate(matrizTraslacion,matrizTraslacion,pos4);

    var matFinal = mat4.create();
    mat4.multiply(matFinal,matrizTraslacion,matrizRotacion);

    for (var j = 0.0; j < vertices.length; j++) {

      var vertice = vec4.create();
      vec4.set(vertice,vertices[j][0],vertices[j][1],vertices[j][2],1.0);
      vec4.transformMat4(vertice,vertice,matFinal);

      this.position_buffer.push(vertice[0]);
      this.position_buffer.push(vertice[1]);
      this.position_buffer.push(vertice[2]);

      this.normal_buffer.push(0.0);
  		this.normal_buffer.push(0.0);
  		this.normal_buffer.push(-1.0);

  		this.tangent_buffer.push(1.0);
  		this.tangent_buffer.push(0.0);
  		this.tangent_buffer.push(0.0);

  		this.binormal_buffer.push(0.0);
  		this.binormal_buffer.push(-1.0);
  		this.binormal_buffer.push(0.0);

      this.setTextureBuffer(i/this.nlevels,j/vertices.length);

    }
  }
};


Extrusion.prototype.getPosition = function(t){
  return this.curva.getPosition(t);
};
