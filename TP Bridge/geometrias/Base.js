function Base(curva,anchoCosta,anchoRio,profundidad,nlevels) {
  ExtrusionAbierta.call(this,curva, new PerfilTerreno(anchoCosta,anchoRio,profundidad,0.1),nlevels);

  this.initTexture("tierra1.jpg");
}

inheritPrototype(Base, ExtrusionAbierta);

Base.prototype.setPosicionVertices= function(matrizTraslacion,vertices,tangentes,normales,binormales,i){

  for (var j = 0.0; j < vertices.length; j++) {

    var vertice = vec4.create();
    vec4.set(vertice,vertices[j][0],vertices[j][1],vertices[j][2],1.0);
    vec4.transformMat4(vertice,vertice,matrizTraslacion);
    if(j===0) vertice[0] = 0;
    if(j==vertices.length-1) vertice[0] = app.anchoCosta;

    // console.log(vertice);
    this.position_buffer.push(vertice[0]);
    this.position_buffer.push(vertice[1]);
    this.position_buffer.push(vertice[2]);

    // console.log("NUEVO PUNTO DE LA BASE");
    // console.log("i: "+i/this.nlevels+" j: "+j/vertices.length);
    // console.log("");
    this.texture_coord_buffer.push(vertice[0]/app.anchoCosta);
    this.texture_coord_buffer.push(vertice[1]/app.largoCosta);

    this.tangent_buffer.push(tangentes[j][0]);
  this.tangent_buffer.push(tangentes[j][1]);
  this.tangent_buffer.push(tangentes[j][2]);

  this.binormal_buffer.push(binormales[j][0]);
  this.binormal_buffer.push(binormales[j][1]);
  this.binormal_buffer.push(binormales[j][2]);

  this.normal_buffer.push(normales[j][0]);
  this.normal_buffer.push(normales[j][1]);
  this.normal_buffer.push(normales[j][2]);

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
