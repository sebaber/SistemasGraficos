function Calle(curva,anchoCosta,anchoRio,nlevels) {
  Extrusion.call(this,curva, new PerfilCalle(anchoCosta,anchoRio,0.1),nlevels);
}

inheritPrototype(Calle, Extrusion);
