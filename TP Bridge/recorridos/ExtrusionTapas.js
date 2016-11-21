function ExtrusionTapas(curva,tapaInf,tapaSup){
  this.curva = curva;
  this.tapaInf = tapaInf;
  this.tapaSup = tapaSup;
  Modelo.call(this,2,this.tapaInf.getPoints());
}

inheritPrototype(ExtrusionTapas, Modelo);

ExtrusionTapas.prototype._setPositionAndColorVertex = function(){
  var pos = [];
  var verticesInf = [];
  var verticesSup = [];
  this.position_buffer = [];
  this.normal_buffer = [];
  this.texture_coord_buffer = [];
  var t,vertice;
  verticesInf = this.tapaInf.getVertices();

  pos = this.curva.getPosition(0);
  matrizRotacion = Utils.getMatrizRotacion(this.curva.getTangente(0),this.curva.getNormal(0),this.curva.getBiNormal(0));

  var pos4 = vec4.create();
  vec4.set(pos4,pos[0],pos[1],pos[2],1.0);

  var matrizTraslacion = mat4.create();
  mat4.translate(matrizTraslacion,matrizTraslacion,pos4);

  var matFinal = mat4.create();
  mat4.multiply(matFinal,matrizTraslacion,matrizRotacion);

  for (j = 0.0; j < verticesInf.length; j++) {

    vertice = vec4.create();
    vec4.set(vertice,verticesInf[j][0],verticesInf[j][1],verticesInf[j][2],1.0);
    vec4.transformMat4(vertice,vertice,matFinal);

    this.position_buffer.push(vertice[0]);
    this.position_buffer.push(vertice[1]);
    this.position_buffer.push(vertice[2]);

    this.texture_coord_buffer.push(j/verticesInf.length);
    this.texture_coord_buffer.push(0);

    this.normal_buffer.push(0.0);
    this.normal_buffer.push(0.0);
    this.normal_buffer.push(-1.0);

    this.tangent_buffer.push(1.0);
    this.tangent_buffer.push(0.0);
    this.tangent_buffer.push(0.0);

    this.binormal_buffer.push(0.0);
    this.binormal_buffer.push(-1.0);
    this.binormal_buffer.push(0.0);

  }

  verticesSup = this.tapaSup.getVertices();

  pos = this.curva.getPosition(1);
  matrizRotacion = Utils.getMatrizRotacion(this.curva.getTangente(1),this.curva.getNormal(1),this.curva.getBiNormal(1));

  pos4 = vec4.create();
  vec4.set(pos4,pos[0],pos[1],pos[2],1.0);

  matrizTraslacion = mat4.create();
  mat4.translate(matrizTraslacion,matrizTraslacion,pos4);

  matFinal = mat4.create();
  mat4.multiply(matFinal,matrizTraslacion,matrizRotacion);

  for (j = 0.0; j < verticesSup.length; j++) {

    vertice = vec4.create();
    vec4.set(vertice,verticesSup[j][0],verticesSup[j][1],verticesSup[j][2],1.0);
    vec4.transformMat4(vertice,vertice,matFinal);

    this.position_buffer.push(vertice[0]);
    this.position_buffer.push(vertice[1]);
    this.position_buffer.push(vertice[2]);

    this.texture_coord_buffer.push(j/verticesInf.length);
    this.texture_coord_buffer.push(1);

    this.normal_buffer.push(0.0);
    this.normal_buffer.push(0.0);
    this.normal_buffer.push(-1.0);

    this.tangent_buffer.push(1.0);
    this.tangent_buffer.push(0.0);
    this.tangent_buffer.push(0.0);

    this.binormal_buffer.push(0.0);
    this.binormal_buffer.push(-1.0);
    this.binormal_buffer.push(0.0);

  }




};
