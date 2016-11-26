function EmpalmeTorre(alturaI,altura){
  ExtrusionTapas.call(this,
    new Segmento([0,alturaI,0],[0,alturaI+altura,0]),
    new PerfilTorre([
      [1,1,0],
      [2,1,0],
      [2,2,0],
      [-2,2,0],
      [-2,1,0],
      [-1,1,0],
      [-1,-1,0],
      [-2,-1,0],
      [-2,-2,0],
      [2,-2,0],
      [2,-1,0],
      [1,-1,0],
      [1,1,0]
    ]),
  new PerfilTorre([
    [0.5,0.5,0],
    [1,0.5,0],
    [1,1,0],
    [-1,1,0],
    [-1,0.5,0],
    [-0.5,0.5,0],
    [-0.5,-0.5,0],
    [-1,-0.5,0],
    [-1,-1,0],
    [1,-1,0],
    [1,-0.5,0],
    [0.5,-0.5,0],
    [0.5,0.5,0]]),
    10
  );

  this.initTexture("oxido.jpg");
  this.initNormalMap("oxido-normal map.jpg");
}

inheritPrototype(EmpalmeTorre, ExtrusionTapas);
