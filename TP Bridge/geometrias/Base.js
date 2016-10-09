function Base(curva,anchoCosta,anchoRio,nlevels) {
  ExtrusionAbierta.call(this,curva, new PerfilTerreno(anchoCosta,anchoRio,0.1),nlevels);
}

inheritPrototype(Base, ExtrusionAbierta);

Base.prototype.getXMinimaDelRioParaY = function(y) {
  var pos = this.curva.getPosition(y/app.largoCosta);
  return app.anchoCosta/2+pos[0]-app.anchoRio/2;
};

Base.prototype.getXMaximaDelRioParaY = function(y) {
  var pos = this.curva.getPosition(y/app.largoCosta);
  return app.anchoCosta/2+pos[0]+app.anchoRio/2;
};
