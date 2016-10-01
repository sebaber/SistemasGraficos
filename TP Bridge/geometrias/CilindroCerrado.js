function CilindroCerrado(curva,radio,npoints,nlevels) {
  ExtrusionCerrada.call(this,curva, new Circulo(npoints,radio,0.0, 0.0, 0.0),nlevels+2);
}

inheritPrototype(CilindroCerrado, ExtrusionCerrada);
