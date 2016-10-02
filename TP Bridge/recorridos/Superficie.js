function Superficie(curva,segmento,nlevels){
  this.segmento = segmento;
  this.curva = curva;
  this.nlevels = nlevels;
  Modelo.call(this,this.nlevels,2);
}

inheritPrototype(Superficie, Modelo);

Superficie.prototype._setPositionAndColorVertex = function(){
  var posCurva = [];
  var posSegmento = [];
  this.position_buffer = [];
  this.color_buffer = [];
  var t;

  // posCurva = this.curva.getPosition(0);
  // posSegmento = this.segmento.getPosition(0);
  //
  //
  // this.position_buffer.push(posSegmento[0]);
  // this.position_buffer.push(posSegmento[1]);
  // this.position_buffer.push(posSegmento[2]);
  // this.position_buffer.push(posCurva[0]);
  // this.position_buffer.push(posCurva[1]);
  // this.position_buffer.push(posCurva[2]);

    // this.color_buffer.push(1.0/this.rows * i);
    // this.color_buffer.push(0.2);
    // this.color_buffer.push(1.0/this.cols * i);
    // this.color_buffer.push(1.0/this.rows * i);
    // this.color_buffer.push(0.2);
    // this.color_buffer.push(1.0/this.cols * i);

  for (var i = 0.0; i < this.nlevels; i++) {
    t = i/(this.nlevels-1);

    posCurva = this.curva.getPosition(t);
    posSegmento = this.segmento.getPosition(t);
    console.log("posCurva: "+posCurva);
    console.log("posSegmento: "+posSegmento);

    this.position_buffer.push(posSegmento[0]);
    this.position_buffer.push(posSegmento[1]);
    this.position_buffer.push(posSegmento[2]);
      this.position_buffer.push(posCurva[0]);
      this.position_buffer.push(posCurva[1]);
      this.position_buffer.push(posCurva[2]);
      // this.position_buffer.push(posCurva[0]);
      // this.position_buffer.push(posCurva[1]);
      // this.position_buffer.push(posCurva[2]);
      // this.position_buffer.push(posSegmento[0]);
      // this.position_buffer.push(posSegmento[1]);
      // this.position_buffer.push(posSegmento[2]);

      this.color_buffer.push(1.0/this.rows * i);
      this.color_buffer.push(0.2);
      this.color_buffer.push(1.0/this.cols * i);
      this.color_buffer.push(1.0/this.rows * i);
      this.color_buffer.push(0.2);
      this.color_buffer.push(1.0/this.cols * i);
      // this.color_buffer.push(1.0/this.rows * i);
      // this.color_buffer.push(0.2);
      // this.color_buffer.push(1.0/this.cols * i);
      // this.color_buffer.push(1.0/this.rows * i);
      // this.color_buffer.push(0.2);
      // this.color_buffer.push(1.0/this.cols * i);
  }

  // posCurva = this.curva.getPosition(1);
  // posSegmento = this.segmento.getPosition(1);
  //
  // this.position_buffer.push(posCurva[0]);
  // this.position_buffer.push(posCurva[1]);
  // this.position_buffer.push(posCurva[2]);
  // this.position_buffer.push(posSegmento[0]);
  // this.position_buffer.push(posSegmento[1]);
  // this.position_buffer.push(posSegmento[2]);

  // this.position_buffer.push(posSegmento[0]);
  // this.position_buffer.push(posSegmento[1]);
  // this.position_buffer.push(posSegmento[2]);
  // this.position_buffer.push(posCurva[0]);
  // this.position_buffer.push(posCurva[1]);
  // this.position_buffer.push(posCurva[2]);


    // this.color_buffer.push(1.0/this.rows * i);
    // this.color_buffer.push(0.2);
    // this.color_buffer.push(1.0/this.cols * i);
    // this.color_buffer.push(1.0/this.rows * i);
    // this.color_buffer.push(0.2);
    // this.color_buffer.push(1.0/this.cols * i);

    // this.color_buffer.push(1.0/this.rows * i);
    // this.color_buffer.push(0.2);
    // this.color_buffer.push(1.0/this.cols * i);
    // this.color_buffer.push(1.0/this.rows * i);
    // this.color_buffer.push(0.2);
    // this.color_buffer.push(1.0/this.cols * i);
    console.log("position_buffer: "+this.position_buffer);

};
