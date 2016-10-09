function Rio(curva,anchoCosta,anchoRio,profundidad,nlevels) {
  ExtrusionAbierta.call(this,curva, new PerfilRio(anchoCosta,anchoRio,profundidad),nlevels);
}

inheritPrototype(Rio, ExtrusionAbierta);
