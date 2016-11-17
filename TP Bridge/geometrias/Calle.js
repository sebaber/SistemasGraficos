function Calle(curva,anchoCalle,nlevels) {
  Extrusion.call(this,curva, new PerfilCalle(anchoCalle),nlevels);

  this.initTexture("tramo-doblemarilla.jpg");
}

inheritPrototype(Calle, Extrusion);
