function Rio(curva,anchoCosta,anchoRio,profundidad,nlevels) {
  ExtrusionAbierta.call(this,curva, new PerfilRio(anchoCosta,anchoRio,profundidad),nlevels);

  this.initTexture("water2.jpg");
  this.initNormalMap("rocas2-normalmap.jpg");
  // this.setTransparente(true);
  this.setLightConfiguration(0.5, 0.5, 0.5,0.0, 0.0, 0.0,0.0, 0.0, 0.0)
  this.initReflectionMap("sky_lightblue.jpg");
}

inheritPrototype(Rio, ExtrusionAbierta);

Rio.prototype.setPosicionVertices= function(matrizTraslacion,matrizRotacion,vertices,tangentes,normales,binormales,i){

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

    // console.log(vertice);
    this.position_buffer.push(vertice[0]);
    this.position_buffer.push(vertice[1]);
    this.position_buffer.push(vertice[2]);

    this.texture_coord_buffer.push(vertice[0]/app.anchoCosta);
    this.texture_coord_buffer.push(vertice[1]/app.largoCosta);

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
