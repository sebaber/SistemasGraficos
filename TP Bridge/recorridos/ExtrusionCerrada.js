function ExtrusionCerrada(curva,forma,nlevels){
  this.curva = curva;
  this.nlevels = nlevels;
  this.forma = forma;
  // Modelo.call(this,this.nlevels+2,this.forma.getPoints()+1);
  Modelo.call(this,this.nlevels+2,this.forma.getPoints());
}

inheritPrototype(ExtrusionCerrada, Modelo);

ExtrusionCerrada.prototype.addTapaInferior = function(){

  var pos = this.curva.getPosition(0);

  var pos4 = vec4.create();
  vec4.set(pos4,pos[0],pos[1],pos[2],1.0);

  var matrizTraslacion = mat4.create();
  mat4.translate(matrizTraslacion,matrizTraslacion,pos4);

  var vertice = vec4.create();
  vec4.set(vertice,0.0,0.0,0.0,1.0);

  vec4.transformMat4(vertice,vertice,matrizTraslacion);

  for(var j= 0.0;j<(this.forma.getPoints()+1);j++){
    this.position_buffer.push(vertice[0]);
    this.position_buffer.push(vertice[1]);
    this.position_buffer.push(vertice[2]);
    this.normal_buffer.push(vertice[0]);
    this.normal_buffer.push(vertice[1]);
    this.normal_buffer.push(-1);
    this.texture_coord_buffer.push(0);
    this.texture_coord_buffer.push(0);
  }
};

ExtrusionCerrada.prototype.addTapaSuperior = function(){

  var pos = this.curva.getPosition(1);

  var pos4 = vec4.create();
  vec4.set(pos4,pos[0],pos[1],pos[2],1.0);

  var matrizTraslacion = mat4.create();
  mat4.translate(matrizTraslacion,matrizTraslacion,pos4);

  var vertice = vec4.create();
  vec4.set(vertice,0.0,0.0,0.0,1.0);

  vec4.transformMat4(vertice,vertice,matrizTraslacion);

  for(var j= 0.0;j<(this.forma.getPoints()+1);j++){
    this.position_buffer.push(vertice[0]);
    this.position_buffer.push(vertice[1]);
    this.position_buffer.push(vertice[2]);
    this.normal_buffer.push(vertice[0]);
    this.normal_buffer.push(vertice[1]);
    this.normal_buffer.push(-1);
    this.texture_coord_buffer.push(1);
    this.texture_coord_buffer.push(1);
  }
};


ExtrusionCerrada.prototype._setPositionAndColorVertex = function(){
  var pos = [];
  var vertices = [];
  this.position_buffer = [];
  this.normal_buffer = [];
  this.texture_coord_buffer = [];

  vertices = this.forma.getVertices();

  this.addTapaInferior();

  for (var i = 0.0; i < this.nlevels; i++) {
    var t = i/(this.nlevels-1);

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

      this.normal_buffer.push(vertice[0]);
      this.normal_buffer.push(vertice[1]);
      this.normal_buffer.push(-1);

      this.texture_coord_buffer.push(j/vertices.length);
      this.texture_coord_buffer.push(i/this.nlevels);

    }
  }

  this.addTapaSuperior();
};


ExtrusionCerrada.prototype.getPosition = function(t){
  return this.curva.getPosition(t);
};
