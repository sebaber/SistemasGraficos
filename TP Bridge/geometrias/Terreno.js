function Terreno(anchoCosta,largoCosta,anchoRio) {
  ModeloComplejo.call(this);
  this.anchoCosta = anchoCosta;
  this.largoCosta = largoCosta;
  this.anchoRio = anchoRio;
  var costaIzq = new Lamina(
    new BezierCubica([anchoCosta,0,0],[anchoCosta-2,largoCosta/3,0],[anchoCosta-2,largoCosta*2/3,0],[anchoCosta,largoCosta,0]),
    new Segmento([0,0,0],[0,largoCosta,0]),
    6
  );
  var costaDer = new Lamina(
    new BezierCubica([anchoCosta+anchoRio,0,0],[anchoCosta-2+anchoRio,largoCosta/3,0],[anchoCosta-2+anchoRio,largoCosta*2/3,0],[anchoCosta+anchoRio,largoCosta,0]),
    new Segmento([anchoRio+2*anchoCosta,0,0],[anchoRio+2*anchoCosta,largoCosta,0]),
    6
  );
  var torre = new Torre(2,1,0.5);
  this.agregarModelo(costaIzq);
  this.agregarModelo(costaDer);

  // this.setPosition(0,0,-10);
  this.rotateX(-(3.14/2.0));
  this.agregarModelo(torre);

  this.agregarArboles();
}

inheritPrototype(Terreno, ModeloComplejo);

Terreno.prototype.agregarArboles = function() {
  for(var i = 0;i<10;++i){
    var arbol = new ArbolRandom();
    var randomNumber = Math.random(); // 0 y 1
    var x,z;
    //PRIMERA COSTA
    if (randomNumber < 0.5){
      x = Utils.getRandomBetweenMaxMin(0,this.anchoCosta-2);
      z = -Utils.getRandomBetweenMaxMin(0,this.largoCosta);
    }
    //SEGUNDA COSTA
    else{
      x = Utils.getRandomBetweenMaxMin(this.anchoCosta+this.anchoRio+5,this.anchoCosta+this.anchoRio+this.anchoCosta-5);
      z = -Utils.getRandomBetweenMaxMin(5,this.largoCosta-5);
    }
    arbol.init(x,0,z);
    this.agregarModelo(arbol);
  }
};
