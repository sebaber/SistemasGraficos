function Rio(curva,anchoCosta,anchoRio,profundidad,nlevels) {
  ExtrusionAbierta.call(this,curva, new PerfilRio(anchoCosta,anchoRio,profundidad),nlevels);

  this.initTexture("aguaDeMar.jpg");
  this.initNormalMap("rocas2-normalmap.jpg");
}

inheritPrototype(Rio, ExtrusionAbierta);

Rio.prototype.setPosicionVertices= function(matrizTraslacion,vertices,i){

  for (var j = 0.0; j < vertices.length; j++) {

    var vertice = vec4.create();
    vec4.set(vertice,vertices[j][0],vertices[j][1],vertices[j][2],1.0);
    vec4.transformMat4(vertice,vertice,matrizTraslacion);
    // console.log(vertice);
    this.position_buffer.push(vertice[0]);
    this.position_buffer.push(vertice[1]);
    this.position_buffer.push(vertice[2]);

    this.texture_coord_buffer.push(vertice[0]/app.anchoCosta);
    this.texture_coord_buffer.push(vertice[1]/app.largoCosta);

    this.tangent_buffer.push(0.0);
    this.tangent_buffer.push(-1.0);
    this.tangent_buffer.push(0.0);

    this.binormal_buffer.push(-1.0);
    this.binormal_buffer.push(0.0);
    this.binormal_buffer.push(0.0);
    
    this.normal_buffer.push(0.0);
    this.normal_buffer.push(0.0);
    this.normal_buffer.push(1.0);

  }
};
