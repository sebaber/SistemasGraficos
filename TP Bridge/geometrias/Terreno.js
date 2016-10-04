function Terreno(anchoCosta,largoCosta,anchoRio,anchoCalle,nroTorres,sepTensor) {
  ModeloComplejo.call(this);
  this.anchoCosta = anchoCosta;
  this.largoCosta = largoCosta;
  this.anchoRio = anchoRio;
  var terrenoIzq = new Lamina(
    new BezierCubica([anchoCosta,0,0],[anchoCosta-2,largoCosta/3,0],[anchoCosta-2,largoCosta*2/3,0],[anchoCosta,largoCosta,0]),
    new Segmento([0,0,0],[0,largoCosta,0]),
    6
  );
  var CostaIzq = new Lamina(
    new BezierCubica([anchoCosta,0,0],[anchoCosta-2,largoCosta/3,0],[anchoCosta-2,largoCosta*2/3,0],[anchoCosta,largoCosta,0]),
    new BezierCubica([anchoCosta+anchoRio/4,0,-4],[anchoCosta+anchoRio/4-2,largoCosta/3,-4],[anchoCosta+anchoRio/4-2,largoCosta*2/3,-4],[anchoCosta+anchoRio/4,largoCosta,-4]),
    6
  );
  var terrenoDer = new Lamina(
    new BezierCubica([anchoCosta+anchoRio,0,0],[anchoCosta-2+anchoRio,largoCosta/3,0],[anchoCosta-2+anchoRio,largoCosta*2/3,0],[anchoCosta+anchoRio,largoCosta,0]),
    new Segmento([anchoRio+2*anchoCosta,0,0],[anchoRio+2*anchoCosta,largoCosta,0]),
    6
  );
  this.agregarModelo(terrenoIzq);
  this.agregarModelo(terrenoDer);
  // this.agregarModelo(CostaIzq);

  // this.setPosition(0,0,-10);
  this.rotateX(-(3.14/2.0));

  var offsetTorrePuente = (anchoRio/6);
  var distTorres = (anchoRio-(2*offsetTorrePuente))/(nroTorres-1);
  var h1=1.5;
  var h2=1;
  var h3=0.5;
  var hmax=h1+h1/4+h2+h2/4+h3+h3/4;
  var offsetPuente=1.5;


  for(var i = 0;i<nroTorres;++i){

    var torre = new Torre(h1,h2,h3);
    torre.init(
      anchoCosta + offsetTorrePuente - offsetPuente + i*distTorres,
      0,
      -largoCosta/2 - anchoCalle/2
    );
    this.agregarModelo(torre);
    
    if(i==0){
      var viga = new Viga(
        new BezierCubica(
          [anchoCosta - offsetPuente, h3, -largoCosta/2 - anchoCalle/2],
          [anchoCosta + offsetTorrePuente/3 - offsetPuente, h2, -largoCosta/2 - anchoCalle/2],
          [anchoCosta + offsetTorrePuente/1.5 - offsetPuente, h1, -largoCosta/2 - anchoCalle/2],
          [anchoCosta + offsetTorrePuente - offsetPuente, hmax, -largoCosta/2 - anchoCalle/2]
         ),
         0.03,
         12,
         20
       );
     this.agregarModelo(viga);
    }
    
    if(i>0){
      var viga = new Viga(
        new BezierCubica(
          [anchoCosta + offsetTorrePuente - offsetPuente + ((i-1)*distTorres) ,hmax, -largoCosta/2 - anchoCalle/2],
          [anchoCosta + offsetTorrePuente - offsetPuente + ((i-1)*distTorres) + distTorres/3, h1 + h3, -largoCosta/2 - anchoCalle/2],
          [anchoCosta + offsetTorrePuente - offsetPuente + ((i-1)*distTorres) + distTorres/1.5, h1 + h3, -largoCosta/2 - anchoCalle/2],
          [anchoCosta + offsetTorrePuente - offsetPuente + (i*distTorres), hmax, -largoCosta/2 - anchoCalle/2]
         ),
         0.03,
         12,
         20
       );
     this.agregarModelo(viga);
    }
  }
  var viga = new Viga(
        new BezierCubica(
          [anchoCosta + anchoRio - offsetPuente, h3, -largoCosta/2 - anchoCalle/2],
          [anchoCosta - offsetTorrePuente/3 + anchoRio - offsetPuente, h2, -largoCosta/2 - anchoCalle/2],
          [anchoCosta - offsetTorrePuente/1.5 + anchoRio - offsetPuente, h1, -largoCosta/2 - anchoCalle/2],
          [anchoCosta - offsetTorrePuente + anchoRio - offsetPuente, hmax, -largoCosta/2 - anchoCalle/2]
         ),
         0.03,
         12,
         20
       );
     this.agregarModelo(viga);
  for(var i = 0;i<nroTorres;++i){
    
    var torre = new Torre(1.5,1,0.5);
    torre.init(
      anchoCosta + offsetTorrePuente - offsetPuente + (i*distTorres),
      0,
      -largoCosta/2 + anchoCalle/2 + anchoCalle/8);
    this.agregarModelo(torre);

    if(i==0){
      var viga = new Viga(
        new BezierCubica(
          [anchoCosta - offsetPuente, h3, -largoCosta/2 + anchoCalle/2 + anchoCalle/8],
          [anchoCosta + offsetTorrePuente/3 - offsetPuente, h2, -largoCosta/2 + anchoCalle/2 + anchoCalle/8],
          [anchoCosta + offsetTorrePuente/1.5 - offsetPuente, h1, -largoCosta/2 + anchoCalle/2 + anchoCalle/8],
          [anchoCosta + offsetTorrePuente - offsetPuente, hmax, -largoCosta/2 + anchoCalle/2 + anchoCalle/8]
         ),
         0.03,
         12,
         20
       );
     this.agregarModelo(viga);
    }

    else if(i>0){
      var viga = new Viga(
        new BezierCubica(
          [anchoCosta + offsetTorrePuente - offsetPuente + ((i-1)*distTorres) ,hmax, -largoCosta/2 + anchoCalle/2 + anchoCalle/8],
          [anchoCosta + offsetTorrePuente - offsetPuente + ((i-1)*distTorres) + distTorres/3, h1 + h3, -largoCosta/2 + anchoCalle/2 + anchoCalle/8],
          [anchoCosta + offsetTorrePuente - offsetPuente + ((i-1)*distTorres) + distTorres/1.5, h1 + h3, -largoCosta/2 + anchoCalle/2 + anchoCalle/8],
          [anchoCosta + offsetTorrePuente - offsetPuente + (i*distTorres), hmax, -largoCosta/2 + anchoCalle/2 + anchoCalle/8]
         ),
         0.03,
         12,
         20
       );
     this.agregarModelo(viga);
    }
  }

  var viga = new Viga(
        new BezierCubica(
          [anchoCosta + anchoRio - offsetPuente, h3, -largoCosta/2 + anchoCalle/2 + anchoCalle/8],
          [anchoCosta - offsetTorrePuente/3 + anchoRio - offsetPuente, h2, -largoCosta/2 + anchoCalle/2 + anchoCalle/8],
          [anchoCosta - offsetTorrePuente/1.5 + anchoRio - offsetPuente, h1, -largoCosta/2 + anchoCalle/2 + anchoCalle/8],
          [anchoCosta - offsetTorrePuente + anchoRio - offsetPuente, hmax, -largoCosta/2 + anchoCalle/2 + anchoCalle/8]
         ),
         0.03,
         12,
         20
       );
     this.agregarModelo(viga);
  
  var puente = new Puente(
  new BezierCubica([anchoCosta - offsetPuente, 0, -largoCosta/2],//-largoCosta/2
    [anchoCosta - offsetPuente + (anchoRio/3), 1, -largoCosta/2],//-largoCosta/2
    [anchoCosta - offsetPuente + (2*anchoRio/3), 1, -largoCosta/2],//-largoCosta/2
    [anchoCosta - offsetPuente + anchoRio, 0, -largoCosta/2]),//-largoCosta/2
    anchoCalle,
    10
  );
  var calleIzq = new Calle(new Segmento([0,0,-largoCosta/2],[anchoCosta-offsetPuente,0,-largoCosta/2]),
    anchoCalle,
    10
  );
  var calleDer = new Calle(new Segmento([anchoCosta+anchoRio-offsetPuente,0,-largoCosta/2],[anchoCosta+anchoRio+anchoCosta,0,-largoCosta/2]),
    anchoCalle,
    10
  );
  // puente.translate(0,0,-3);
  this.agregarModelo(calleDer);
  this.agregarModelo(calleIzq);
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
