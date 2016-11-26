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

    var tangenteInf = vec4.create();
    var normalInf = vec4.create();
    var binormalInf = vec4.create();

    vec4.set(tangenteInf,tangentesInf[j][0],tangentesInf[j][1],tangentesInf[j][2],1.0);
    vec4.transformMat4(tangenteInf,tangenteInf,matrizRotacion);
    vec4.set(normalInf,normalesInf[j][0],normalesInf[j][1],normalesInf[j][2],1.0);
    vec4.transformMat4(normalInf,normalInf,matrizRotacion);
    vec4.set(binormalInf,binormalesInf[j][0],binormalesInf[j][1],binormalesInf[j][2],1.0);
    vec4.transformMat4(binormalInf,binormalInf,matrizRotacion);

    this.position_buffer.push(vertice[0]);
    this.position_buffer.push(vertice[1]);
    this.position_buffer.push(vertice[2]);

    this.texture_coord_buffer.push(j/verticesInf.length);
    this.texture_coord_buffer.push(0);

    this.tangent_buffer.push(tangenteInf[0]);
  this.tangent_buffer.push(tangenteInf[1]);
  this.tangent_buffer.push(tangenteInf[2]);

  this.binormal_buffer.push(binormalInf[0]);
  this.binormal_buffer.push(binormalInf[1]);
  this.binormal_buffer.push(binormalInf[2]);

  this.normal_buffer.push(normalInf[0]);
  this.normal_buffer.push(normalInf[1]);
  this.normal_buffer.push(normalInf[2]);

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

    var tangenteSup = vec4.create();
    var normalSup = vec4.create();
    var binormalSup = vec4.create();

    vec4.set(tangenteSup,tangentesSup[j][0],tangentesSup[j][1],tangentesSup[j][2],1.0);
    vec4.transformMat4(tangenteSup,tangenteSup,matrizRotacion);
    vec4.set(normalSup,normalesSup[j][0],normalesSup[j][1],normalesSup[j][2],1.0);
    vec4.transformMat4(normalSup,normalSup,matrizRotacion);
    vec4.set(binormalSup,binormalesSup[j][0],binormalesSup[j][1],binormalesSup[j][2],1.0);
    vec4.transformMat4(binormalSup,binormalSup,matrizRotacion);

    this.position_buffer.push(vertice[0]);
    this.position_buffer.push(vertice[1]);
    this.position_buffer.push(vertice[2]);

    this.texture_coord_buffer.push(j/verticesSup.length);
    this.texture_coord_buffer.push(1);

    this.tangent_buffer.push(tangenteSup[0]);
  this.tangent_buffer.push(tangenteSup[1]);
  this.tangent_buffer.push(tangenteSup[2]);

  this.binormal_buffer.push(binormalSup[0]);
  this.binormal_buffer.push(binormalSup[1]);
  this.binormal_buffer.push(binormalSup[2]);

  this.normal_buffer.push(normalSup[0]);
  this.normal_buffer.push(normalSup[1]);
  this.normal_buffer.push(normalSup[2]);

  }




};
