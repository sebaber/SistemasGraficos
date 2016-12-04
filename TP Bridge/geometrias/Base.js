function Base(curva,anchoCosta,anchoRio,profundidad,nlevels) {
  ExtrusionAbierta.call(this,curva, new PerfilTerreno(anchoCosta,anchoRio,profundidad,0.1),nlevels);
  this.setBase(true);
  this.initTexture("tierra1.jpg");
  this.initNormalMap("rocas2-normalmap.jpg");
  this.initTexture2("pasto1.jpg");
  this.initTexture3("rocas2.jpg");
  this.initMezcla("difuminado2.jpg");
  this.setLightConfiguration(0.3, 0.3, 0.3,1.0, 1.0, 1.0,0.1, 0.1, 0.1);
}

inheritPrototype(Base, ExtrusionAbierta);

Base.prototype.setPosicionVertices= function(matrizTraslacion,matrizRotacion,vertices,tangentes,normales,binormales,i){

  for (var j = 0.0; j < vertices.length; j++) {

    var vertice = vec4.create();
    vec4.set(vertice,vertices[j][0],vertices[j][1],vertices[j][2],1.0);
    vec4.transformMat4(vertice,vertice,matrizTraslacion);

    var tangente = vec4.create();
    var normal = vec4.create();
    var binormal = vec4.create();

    vec4.set(tangente,tangentes[j][0],tangentes[j][1],tangentes[j][2],1.0);
    vec4.transformMat4(tangente,tangente,matrizRotacion);
    vec4.set(normal,normales[j][0],normales[j][1],normales[j][2],1.0);
    vec4.transformMat4(normal,normal,matrizRotacion);
    vec4.set(binormal,binormales[j][0],binormales[j][1],binormales[j][2],1.0);
    vec4.transformMat4(binormal,binormal,matrizRotacion);

    if(j===0) vertice[0] = 0;
    if(j==vertices.length-1) vertice[0] = app.anchoCosta;

    // console.log(vertice);
    this.position_buffer.push(vertice[0]);
    this.position_buffer.push(vertice[1]);
    this.position_buffer.push(vertice[2]);

    // console.log("NUEVO PUNTO DE LA BASE");
    // console.log("i: "+i/this.nlevels+" j: "+j/vertices.length);
    // console.log("");
    this.texture_coord_buffer.push(vertice[0]*4.0/app.anchoCosta);
    this.texture_coord_buffer.push(vertice[1]*4.0/app.largoCosta);

    this.tangent_buffer.push(tangente[0]);
  this.tangent_buffer.push(tangente[1]);
  this.tangent_buffer.push(tangente[2]);

  this.binormal_buffer.push(binormal[0]);
  this.binormal_buffer.push(binormal[1]);
  this.binormal_buffer.push(binormal[2]);

  this.normal_buffer.push(normal[0]);
  this.normal_buffer.push(normal[1]);
  this.normal_buffer.push(normal[2]);

  }
};

Base.prototype.getXMinimaDelRioParaY = function(y) {
  var pos = this.curva.getPosition(y/app.largoCosta);
  return app.anchoCosta/2+pos[0]-app.anchoRio/2;
};

Base.prototype.getXMaximaDelRioParaY = function(y) {
  var pos = this.curva.getPosition(y/app.largoCosta);
  return app.anchoCosta/2+pos[0]+app.anchoRio/2;
};
