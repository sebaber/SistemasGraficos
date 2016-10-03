function Terreno(anchoCosta,largoCosta,anchoRio,nroTorres) {
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
  this.agregarModelo(costaIzq);
  this.agregarModelo(costaDer);

  // this.setPosition(0,0,-10);
  this.rotateX(-(3.14/2.0));

  for(var i = 0;i<nroTorres;++i){
    var torre = new Torre(1.5,1,0.5);
    torre.init(anchoCosta-1.5+(i*anchoRio/(nroTorres-1)),0,-largoCosta/2-1);
    this.agregarModelo(torre);
  }

  for(var i = 0;i<nroTorres;++i){
    var torre = new Torre(1.5,1,0.5);
    torre.init(anchoCosta-1.5+(i*anchoRio/(nroTorres-1)),0,-largoCosta/2+1);
    this.agregarModelo(torre);
  }
  var puente = new Puente(new BezierCubica([anchoCosta-1.25,0,-largoCosta/2],//-largoCosta/2
    [anchoCosta-1.25+(anchoRio/3),1,-largoCosta/2],//-largoCosta/2
    [anchoCosta-1.25+(2*anchoRio/3),1,-largoCosta/2],//-largoCosta/2
    [anchoCosta-1.25+anchoRio,0,-largoCosta/2]),//-largoCosta/2
    10
  );
  // puente.translate(0,0,-3);
  this.agregarModelo(puente);
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
      x = Utils.getRandomBetweenMaxMin(1,this.anchoCosta-3);
      z = -Utils.getRandomBetweenMaxMin(1,this.largoCosta-1);
    }
    //SEGUNDA COSTA
    else{
      x = Utils.getRandomBetweenMaxMin(this.anchoCosta+this.anchoRio+1,this.anchoCosta+this.anchoRio+this.anchoCosta-1);
      z = -Utils.getRandomBetweenMaxMin(1,this.largoCosta-1);
    }
    arbol.init(x,0,z);
    this.agregarModelo(arbol);
  }
};

Terreno.prototype.postInit = function(){
};
