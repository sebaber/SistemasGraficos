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
  var normales = this.forma.getNormals();
  var binormales = this.forma.getBinormals();
  var tangentes = this.forma.getTangentes();
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

      var tangente = vec4.create();
      var normal = vec4.create();
      var binormal = vec4.create();

      vec4.set(tangente,tangentes[j][0],tangentes[j][1],tangentes[j][2],1.0);
      vec4.transformMat4(tangente,tangente,matrizRotacion);
      vec4.set(normal,normales[j][0],normales[j][1],normales[j][2],1.0);
      vec4.transformMat4(normal,normal,matrizRotacion);
      vec4.set(binormal,binormales[j][0],binormales[j][1],binormales[j][2],1.0);
      vec4.transformMat4(binormal,binormal,matrizRotacion);

      this.position_buffer.push(vertice[0]);
      this.position_buffer.push(vertice[1]);
      this.position_buffer.push(vertice[2]);

    //   this.normal_buffer.push(0.0);
  		// this.normal_buffer.push(0.0);
  		// this.normal_buffer.push(-1.0);

  		// this.tangent_buffer.push(1.0);
  		// this.tangent_buffer.push(0.0);
  		// this.tangent_buffer.push(0.0);

  		// this.binormal_buffer.push(0.0);
  		// this.binormal_buffer.push(-1.0);
  		// this.binormal_buffer.push(0.0);

    this.tangent_buffer.push(tangente[0]);
    this.tangent_buffer.push(tangente[1]);
    this.tangent_buffer.push(tangente[2]);

    this.binormal_buffer.push(binormal[0]);
    this.binormal_buffer.push(binormal[1]);
    this.binormal_buffer.push(binormal[2]);

    this.normal_buffer.push(normal[0]);
    this.normal_buffer.push(normal[1]);
    this.normal_buffer.push(normal[2]);

    var n = i;
    while (n >= 3.0){
      n -= 3.0;
    }  
    cantParaDibujar = 3;
    this.setTextureBuffer(n/cantParaDibujar,j/vertices.length);

    }
  }
};


Extrusion.prototype.getPosition = function(t){
  return this.curva.getPosition(t);
};
