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
  for (var i = 0.0; i < this.nlevels; i++) {
    t = i/(this.nlevels-1);

    posCurva = this.curva.getPosition(t);
    posSegmento = this.segmento.getPosition(t);

    this.position_buffer.push(posSegmento[0]);
    this.position_buffer.push(posSegmento[1]);
    this.position_buffer.push(posSegmento[2]);

    this.position_buffer.push(posCurva[0]);
    this.position_buffer.push(posCurva[1]);
    this.position_buffer.push(posCurva[2]);

    this.color_buffer.push(0);
    this.color_buffer.push(0.4);
    this.color_buffer.push(0);
    this.color_buffer.push(0);
    this.color_buffer.push(0.4);
    this.color_buffer.push(0);
  }

};
