function ModeloComplejo() {
    this.modelos = [];
}

ModeloComplejo.prototype.agregarModelo = function(modelo){
  this.modelos.push(modelo);
};

ModeloComplejo.prototype.draw = function(mvMatrix){
  for(var i = 0;i<this.modelos.length;++i){
    this.modelos[i].draw(mvMatrix);
  }
};
