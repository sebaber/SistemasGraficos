function Calle(curva,anchoCalle,nlevels) {
  Extrusion.call(this,curva, new PerfilCalle(anchoCalle),nlevels);
}

inheritPrototype(Calle, Extrusion);