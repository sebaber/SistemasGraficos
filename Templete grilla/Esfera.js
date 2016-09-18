function Esfera(rows,cols,radio){
  this.radio = radio;
  Grilla.call(this,rows,cols);
}

inheritPrototype(Esfera, Grilla);



Esfera.prototype._setPositionAndColorVertex = function(){
  this.position_buffer = [];
  this.color_buffer = [];

  for (var i = 0.0; i <= this.rows; i++) {
      for (var j = 0.0; j < this.cols; j++) {

          this.position_buffer.push(
            this.radio*Math.sin((i*Math.PI/12.0))*Math.cos((j*Math.PI)/ 6.0));
          this.position_buffer.push(
            this.radio*Math.sin((i*Math.PI/12.0))*Math.sin((j*Math.PI)/ 6.0));
          this.position_buffer.push(this.radio*Math.cos((i*Math.PI)/ 12.0));

         // Para cada vértice definimos su color
         this.color_buffer.push(1.0/this.rows * i);
         this.color_buffer.push(0.2);
         this.color_buffer.push(1.0/this.cols * j);
     }
  }
};
