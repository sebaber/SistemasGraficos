function ConoAbierto(rows,cols,radio){
  this.radio = radio;
  Modelo.call(this,rows,cols);
}

inheritPrototype(ConoAbierto, Modelo);



ConoAbierto.prototype._setPositionAndColorVertex = function(){
  // console.log(this.getObjectMatrix());
  this.position_buffer = [];
  this.color_buffer = [];

  for (var i = 0.0; i < this.rows; i++) {
     for (var j = 0.0; j < this.cols; j++) {

         if(i!==0){
          this.position_buffer.push(0);
          this.position_buffer.push(0);
          this.position_buffer.push(i);
         }else{
          this.position_buffer.push(this.radio*Math.sin((j*Math.PI)/ 6 ));
          this.position_buffer.push(this.radio*Math.cos((j*Math.PI)/ 6 ));
          this.position_buffer.push(i);
          }

         this.color_buffer.push(1.0/this.rows * i);
         this.color_buffer.push(0.2);
         this.color_buffer.push(1.0/this.cols * j);

     }
  }
};
