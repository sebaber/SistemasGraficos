function Calle(curva,nlevels) {
  Extrusion.call(this,curva, new PerfilCalle(),nlevels);
}

inheritPrototype(Calle, Extrusion);