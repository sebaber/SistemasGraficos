function Terreno(anchoCosta,largoCosta,anchoRio,anchoCalle,nroTorres) {
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

  for(var i = 0;i<nroTorres;++i){
    var torre = new Torre(1.5,1,0.5);
    torre.init(anchoCosta+(anchoRio/6)-1.5+(i*(anchoRio-((2*anchoRio)/6))/(nroTorres-1)),0,-largoCosta/2-anchoCalle/2);
    this.agregarModelo(torre);
    if(i==0){
      var viga = new Viga(
        new BezierCubica(
          [anchoCosta-1.5, 0.5,-largoCosta/2-anchoCalle/2],
          [anchoCosta+(anchoRio/6)/3-1.5, 1,-largoCosta/2-anchoCalle/2],
          [anchoCosta+(anchoRio/6)/1.5-1.5, 1.5,-largoCosta/2-anchoCalle/2],
          [anchoCosta+(anchoRio/6)-1.5,1.5+1+0.5+1.5/4+1/4+0.5/4,-largoCosta/2-anchoCalle/2]
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
          [anchoCosta+(anchoRio/6)-1.5+((i-1)*(anchoRio-(2*anchoRio/6))/(nroTorres-1)),1.5+1+0.5+1.5/4+1/4+0.5/4,-largoCosta/2-anchoCalle/2],
          [anchoCosta+(anchoRio/6)-1.5+((i-1)*(anchoRio-(2*anchoRio/6))/(nroTorres-1))+((anchoRio-(2*anchoRio/6))/(nroTorres-1))/3,1.5+0.5,-largoCosta/2-anchoCalle/2],
          [anchoCosta+(anchoRio/6)-1.5+((i-1)*(anchoRio-(2*anchoRio/6))/(nroTorres-1))+((anchoRio-(2*anchoRio/6))/(nroTorres-1))/1.5,1.5+0.5,-largoCosta/2-anchoCalle/2],
          [anchoCosta+(anchoRio/6)-1.5+(i*(anchoRio-(2*anchoRio/6))/(nroTorres-1)),1.5+1+0.5+1.5/4+1/4+0.5/4,-largoCosta/2-anchoCalle/2]
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
          [anchoCosta+anchoRio-1.5, 0.5,-largoCosta/2-anchoCalle/2],
          [anchoCosta-(anchoRio/6)/3+anchoRio-1.5, 1,-largoCosta/2-anchoCalle/2],
          [anchoCosta-(anchoRio/6)/1.5+anchoRio-1.5, 1.5,-largoCosta/2-anchoCalle/2],
          [anchoCosta-(anchoRio/6)+anchoRio-1.5,1.5+1+0.5+1.5/4+1/4+0.5/4,-largoCosta/2-anchoCalle/2]
         ),
         0.03,
         12,
         20
       );
     this.agregarModelo(viga);
  for(var i = 0;i<nroTorres;++i){
    var torre = new Torre(1.5,1,0.5);
    torre.init(anchoCosta+(anchoRio/6)-1.5+(i*(anchoRio-((2*anchoRio)/6))/(nroTorres-1)),0,-largoCosta/2+anchoCalle/2+anchoCalle/8);
    this.agregarModelo(torre);
    if(i==0){
      var viga = new Viga(
        new BezierCubica(
          [anchoCosta-1.5, 0.5,-largoCosta/2+anchoCalle/2+anchoCalle/8],
          [anchoCosta+(anchoRio/6)/3-1.5, 1,-largoCosta/2+anchoCalle/2+anchoCalle/8],
          [anchoCosta+(anchoRio/6)/1.5-1.5, 1.5,-largoCosta/2+anchoCalle/2+anchoCalle/8],
          [anchoCosta+(anchoRio/6)-1.5,1.5+1+0.5+1.5/4+1/4+0.5/4,-largoCosta/2+anchoCalle/2+anchoCalle/8]
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
          [anchoCosta+(anchoRio/6)-1.5+((i-1)*(anchoRio-(2*anchoRio/6))/(nroTorres-1)),1.5+1+0.5+1.5/4+1/4+0.5/4,-largoCosta/2+anchoCalle/2+anchoCalle/8],
          [anchoCosta+(anchoRio/6)-1.5+((i-1)*(anchoRio-(2*anchoRio/6))/(nroTorres-1))+((anchoRio-(2*anchoRio/6))/(nroTorres-1))/3,1.5+0.5,-largoCosta/2+anchoCalle/2+anchoCalle/8],
          [anchoCosta+(anchoRio/6)-1.5+((i-1)*(anchoRio-(2*anchoRio/6))/(nroTorres-1))+((anchoRio-(2*anchoRio/6))/(nroTorres-1))/1.5,1.5+0.5,-largoCosta/2+anchoCalle/2+anchoCalle/8],
          [anchoCosta+(anchoRio/6)-1.5+(i*(anchoRio-(2*anchoRio/6))/(nroTorres-1)),1.5+1+0.5+1.5/4+1/4+0.5/4,-largoCosta/2+anchoCalle/2+anchoCalle/8]
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
          [anchoCosta+anchoRio-1.5, 0.5,-largoCosta/2+anchoCalle/2+anchoCalle/8],
          [anchoCosta-(anchoRio/6)/3+anchoRio-1.5, 1,-largoCosta/2+anchoCalle/2+anchoCalle/8],
          [anchoCosta-(anchoRio/6)/1.5+anchoRio-1.5, 1.5,-largoCosta/2+anchoCalle/2+anchoCalle/8],
          [anchoCosta-(anchoRio/6)+anchoRio-1.5,1.5+1+0.5+1.5/4+1/4+0.5/4,-largoCosta/2+anchoCalle/2+anchoCalle/8]
         ),
         0.03,
         12,
         20
       );
     this.agregarModelo(viga);
  
  var puente = new Puente(new BezierCubica([anchoCosta-1.5,0,-largoCosta/2],//-largoCosta/2
    [anchoCosta-1.5+(anchoRio/3),1,-largoCosta/2],//-largoCosta/2
    [anchoCosta-1.5+(2*anchoRio/3),1,-largoCosta/2],//-largoCosta/2
    [anchoCosta+anchoRio-1.5,0,-largoCosta/2]),//-largoCosta/2
    anchoCalle,
    10
  );
  var calleIzq = new Calle(new Segmento([0,0,-largoCosta/2],[anchoCosta-1.5,0,-largoCosta/2]),
    anchoCalle,
    10
  );
  var calleDer = new Calle(new Segmento([anchoCosta+anchoRio-1.5,0,-largoCosta/2],[anchoCosta+anchoRio+anchoCosta,0,-largoCosta/2]),
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
