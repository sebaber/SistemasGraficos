function Puente(curva,anchoCalle,nlevels) {
  Extrusion.call(this,curva, new PerfilCalle(anchoCalle),nlevels);
}

inheritPrototype(Puente, Extrusion);
