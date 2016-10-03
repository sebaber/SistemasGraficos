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

ModeloComplejo.prototype.rotateX = function(alfa){
  for(var i = 0;i<this.modelos.length;++i){
    this.modelos[i].rotateX(alfa);
  }
};

ModeloComplejo.prototype.setPosition = function(x,y,z){
  for(var i = 0;i<this.modelos.length;++i){
    this.modelos[i].setPosition(x,y,z);
  }
};

ModeloComplejo.prototype.translate = function(x,y,z){
  for(var i = 0;i<this.modelos.length;++i){
    this.modelos[i].translate(x,y,z);
  }
};
