function PiezaTorre(curva,niveles){
  Extrusion.call(
    this,
    curva,
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
      [1,1,0]]
    ),
    niveles
  );

  this.initTexture("oxido.jpg");
  this.initNormalMap("oxido-normal map.jpg");
}

inheritPrototype(PiezaTorre, Extrusion);

PiezaTorre.prototype.setTextureBuffer = function(i,j){
  this.texture_coord_buffer.push(i);
  this.texture_coord_buffer.push(j);
};
