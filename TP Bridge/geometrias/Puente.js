function Puente(curva,nlevels) {
  Extrusion.call(this,curva, new PerfilCalle(),nlevels);
}

inheritPrototype(Puente, Extrusion);
