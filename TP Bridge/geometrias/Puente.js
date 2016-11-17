function Puente(curva,anchoCalle,nlevels) {
  Extrusion.call(this,curva, new PerfilCalle(anchoCalle),nlevels);

  this.initTexture("tramo-doblemarilla.jpg");
}

inheritPrototype(Puente, Extrusion);
