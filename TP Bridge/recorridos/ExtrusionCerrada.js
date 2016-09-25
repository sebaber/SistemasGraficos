function ExtrusionCerrada(largo, verticesNivel,nlevels){
  this.verticesNivel = verticesNivel;
  this.largo = largo;
  this.nlevels = nlevels;
  Modelo.call(this, this.nlevels, this.verticesNivel.length);
}

inheritPrototype(ExtrusionCerrada, Modelo);

ExtrusionCerrada.prototype._setPositionAndColorVertex = function(){
  this.position_buffer = [];
  this.color_buffer = [];

  for (var i = 0.0; i < this.nlevels; i++) {
    for (var j = 0.0; j < this.verticesNivel.length; j++) {
      if(i === 0.0){
        this.position_buffer.push(0);
        this.position_buffer.push(0);
        this.position_buffer.push(0);
      }else if(i == this.nlevels-1.0){
        this.position_buffer.push(0);
        this.position_buffer.push(0);
        this.position_buffer.push((i-2)/this.nlevels * this.largo);
      }else{
        this.position_buffer.push(this.verticesNivel[j][1.0]);
        this.position_buffer.push(this.verticesNivel[j][0.0]);
        this.position_buffer.push((i-1)/this.nlevels * this.largo);
      }

      this.color_buffer.push(1.0/this.rows * i);
      this.color_buffer.push(0.2);
      this.color_buffer.push(1.0/this.cols * j);

    }
  }
  
};
