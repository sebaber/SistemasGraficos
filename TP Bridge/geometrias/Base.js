function Base(curva,anchoCosta,anchoRio,nlevels) {
  ExtrusionAbierta.call(this,curva, new PerfilTerreno(anchoCosta,anchoRio,0.1),nlevels);
}

inheritPrototype(Base, ExtrusionAbierta);
