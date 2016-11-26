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
  var normalesInf = this.tapaInf.getNormals();
  var binormalesInf = this.tapaInf.getBinormals();
  var tangentesInf = this.tapaInf.getTangentes();

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

    this.tangent_buffer.push(tangentesInf[j][0]);
    this.tangent_buffer.push(tangentesInf[j][1]);
    this.tangent_buffer.push(tangentesInf[j][2]);

    this.binormal_buffer.push(binormalesInf[j][0]);
    this.binormal_buffer.push(binormalesInf[j][1]);
    this.binormal_buffer.push(binormalesInf[j][2]);

    this.normal_buffer.push(normalesInf[j][0]);
    this.normal_buffer.push(normalesInf[j][1]);
    this.normal_buffer.push(normalesInf[j][2]);

  }

  verticesSup = this.tapaSup.getVertices();
  var normalesSup = this.tapaSup.getNormals();
  var binormalesSup = this.tapaSup.getBinormals();
  var tangentesSup = this.tapaSup.getTangentes();
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

    this.tangent_buffer.push(tangentesSup[j][0]);
    this.tangent_buffer.push(tangentesSup[j][1]);
    this.tangent_buffer.push(tangentesSup[j][2]);

    this.binormal_buffer.push(binormalesSup[j][0]);
    this.binormal_buffer.push(binormalesSup[j][1]);
    this.binormal_buffer.push(binormalesSup[j][2]);

    this.normal_buffer.push(normalesSup[j][0]);
    this.normal_buffer.push(normalesSup[j][1]);
    this.normal_buffer.push(normalesSup[j][2]);

  }




};
