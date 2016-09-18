function ConoCerrado(rows,cols,radio){
  this.radio = radio;
  Grilla.call(this,rows,cols);
}

inheritPrototype(ConoCerrado, Grilla);



ConoCerrado.prototype._setPositionAndColorVertex = function(){
  this.position_buffer = [];
  this.color_buffer = [];

  for (var i = 0.0; i < this.rows; i++) {
     for (var j = 0.0; j < this.cols; j++) {

      if(i===0){
          this.position_buffer.push(0);
          this.position_buffer.push(i);
          this.position_buffer.push(0);
      }else if(i == 2){
          this.position_buffer.push(0);
          this.position_buffer.push(0);
          this.position_buffer.push(i-1);

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
