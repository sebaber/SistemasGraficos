function ExtrusionAbierta(curva,forma,nlevels){
  this.curva = curva;
  this.nlevels = nlevels;
  this.forma = forma;
  ModeloAbierto.call(this,this.nlevels,this.forma.getPoints());
}

inheritPrototype(ExtrusionAbierta, ModeloAbierto);

ExtrusionAbierta.prototype._setPositionAndColorVertex = function(){
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

    matrizRotacion = Utils.getMatrizRotacion(this.curva.getNormal(t),this.curva.getTangente(t),this.curva.getBiNormal(t));

    var pos4 = vec4.create();
    vec4.set(pos4,pos[0],pos[1],pos[2],1.0);
    var matrizTraslacion = mat4.create();
    mat4.translate(matrizTraslacion,matrizTraslacion,pos4);

    this.setPosicionVertices(matrizTraslacion,matrizRotacion,vertices,tangentes,normales,binormales,i);
  }
};


ExtrusionAbierta.prototype.getPosition = function(t){
  return this.curva.getPosition(t);
};
