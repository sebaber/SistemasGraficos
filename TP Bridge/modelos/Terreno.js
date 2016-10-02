function Terreno(anchoCosta,largoCosta,anchoRio) {
  var costaIzq = new Lamina(
    new BezierCubica([anchoCosta,0,0],[anchoCosta-2,largoCosta/3,0],[anchoCosta-2,largoCosta*2/3,0],[anchoCosta,largoCosta,0]),
    new Segmento([0,0,0],[0,largoCosta,0]),
    6
  );
  var costaDer = new Lamina(
    new BezierCubica([anchoCosta+anchoRio,0,0],[anchoCosta-2+anchoRio,largoCosta/3,0],[anchoCosta-2+anchoRio,largoCosta*2/3,0],[anchoCosta+anchoRio,largoCosta,0]),
    new Segmento([anchoRio+2*anchoCosta,0,0],[anchoRio+2*anchoCosta,largoCosta,0]),
    6
  );
  this.modelos = [costaIzq,costaDer];
  this.setPosition(0,0,-10);
  this.rotateX(-(3.14/2.0));
}

Terreno.prototype.agregarModelo = function(modelo){
  this.modelos.push(modelo);
};

Terreno.prototype.rotateX = function(alfa){
  for(var i = 0;i<this.modelos.length;++i){
    this.modelos[i].rotateX(alfa);
  }
};

Terreno.prototype.setPosition = function(x,y,z){
  for(var i = 0;i<this.modelos.length;++i){
    this.modelos[i].setPosition(x,y,z);
  }
};

Terreno.prototype.draw = function(mvMatrix){
  for(var i = 0;i<this.modelos.length;++i){
    this.modelos[i].draw(mvMatrix);
  }
};
