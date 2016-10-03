function PiezaTorre(curva,niveles){
  ExtrusionCerrada.call(
    this,
    curva,
    new PerfilTorre([
      [1,-1,0],
      [2,-1,0],
      [2,-2,0],
      [-2,-2,0],
      [-2,-1,0],
      [-1,-1,0],
      [-1,1,0],
      [-2,1,0],
      [-2,2,0],
      [2,2,0],
      [2,1,0],
      [1,1,0],
      [1,-1,0]]
    ),
    niveles
  );
}

inheritPrototype(PiezaTorre, ExtrusionCerrada);
