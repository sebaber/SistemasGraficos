function Rio(curva,anchoCosta,anchoRio,profundidad,nlevels) {
  ExtrusionAbierta.call(this,curva, new PerfilRio(anchoCosta,anchoRio,profundidad),nlevels);
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

    this.color_buffer.push(1.0/this.rows * i);
    this.color_buffer.push(0.2);
    this.color_buffer.push(1.0/this.cols * j);

  }
};
