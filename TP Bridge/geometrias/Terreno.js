function Terreno(anchoCosta,largoCosta,anchoRio,anchoCalle,nroTorres,sepTensor,
  alturaTorre1,alturaTorre2,alturaTorre3,yCalle) {
    ModeloComplejo.call(this);
    this.anchoCosta = anchoCosta;
    this.largoCosta = largoCosta;
    this.anchoRio = anchoRio;

    var base = new Base(perfilDelRioObject.obtenerFuncionSpline(largoCosta,200,anchoRio,200),anchoCosta,anchoRio,400);
    // var base = new Base(new Segmento([0,0,0,0],[0,10,0]),anchoCosta,anchoRio,20);
    console.log(base);
    this.agregarModelo(base);

    // console.log(new PerfilTerreno(anchoCosta,anchoRio,0.1));
    // console.log(perfilDelRioObject.obtenerFuncionSpline(largoCosta,200));
    // var viga,posViga,i,torre,distViga,distPuente,posPuente,tensor;
    // var terrenoIzq = new Lamina(
    //   new BezierCubica([anchoCosta,0,0],[anchoCosta-2,largoCosta/3,0],[anchoCosta-2,largoCosta*2/3,0],[anchoCosta,largoCosta,0]),
    //   new Segmento([0,0,0],[0,largoCosta,0]),
    //   6
    // );
    // var CostaIzq = new Lamina(
    //   new BezierCubica([anchoCosta,0,0],[anchoCosta-2,largoCosta/3,0],[anchoCosta-2,largoCosta*2/3,0],[anchoCosta,largoCosta,0]),
    //   new BezierCubica([anchoCosta+anchoRio/4,0,-4],[anchoCosta+anchoRio/4-2,largoCosta/3,-4],[anchoCosta+anchoRio/4-2,largoCosta*2/3,-4],[anchoCosta+anchoRio/4,largoCosta,-4]),
    //   6
    // );
    // var terrenoDer = new Lamina(
    //   new BezierCubica([anchoCosta+anchoRio,0,0],[anchoCosta-2+anchoRio,largoCosta/3,0],[anchoCosta-2+anchoRio,largoCosta*2/3,0],[anchoCosta+anchoRio,largoCosta,0]),
    //   new Segmento([anchoRio+2*anchoCosta,0,0],[anchoRio+2*anchoCosta,largoCosta,0]),
    //   6
    // );
    // this.agregarModelo(terrenoIzq);
    // this.agregarModelo(terrenoDer);
    // this.agregarModelo(CostaIzq);

    // this.setPosition(0,0,-10);
    this.rotateX(-(3.14/2.0));
    //
    var offsetTorrePuente = (anchoRio/6);
    var distTorres = (anchoRio-(2*offsetTorrePuente))/(nroTorres-1);
    var h1=alturaTorre1;
    var h2=alturaTorre2;
    var h3=alturaTorre3;
    var hmax=h1+h1/4+h2+h2/4+h3+h3/4;
    var offsetPuente=1.5;
    //

    var xCostaIzq = base.getXMinimaDelRioParaY(yCalle)-anchoRio;
    var xCostaDer = base.getXMaximaDelRioParaY(yCalle)+anchoRio;
    console.log("xCostaDer: "+xCostaDer);
    console.log("xCostaDer: "+xCostaIzq);
    var anchoPuente = xCostaDer-xCostaIzq;
    var calleIzq = new Calle(
      new Segmento([0,0,-yCalle],[xCostaIzq,0,-yCalle]),
      anchoCalle,
      10
    );
    var calleDer = new Calle(
      new Segmento([xCostaDer,0,-yCalle],[anchoCosta,0,-yCalle]),
      anchoCalle,
      10
    );
    this.agregarModelo(calleIzq);
    this.agregarModelo(calleDer);

      var puente = new Puente(
        new BezierCubica(
          [xCostaIzq, 0, -yCalle],//-largoCosta/2
          [xCostaIzq + (anchoPuente/3), 1, -yCalle],//-largoCosta/2
          [xCostaIzq + (2*anchoPuente/3), 1, -yCalle],//-largoCosta/2
          [xCostaIzq + anchoPuente, 0, -yCalle]
        ),//-largoCosta/2
        anchoCalle,
        10
      );
      this.agregarModelo(puente);


    //
    //   for(i = 0;i<nroTorres;++i){
    //
    //     torre = new Torre(h1,h2,h3);
    //     torre.init(
    //       anchoCosta + offsetTorrePuente - offsetPuente + i*distTorres,
    //       0,
    //       -largoCosta/2 - anchoCalle/2
    //     );
    //     this.agregarModelo(torre);
    //
    //     if(i===0){
    //       viga = new Viga(
    //         new BezierCubica(
    //           [anchoCosta - offsetPuente, h3, -largoCosta/2 - anchoCalle/2],
    //           [anchoCosta + offsetTorrePuente/3 - offsetPuente, h2, -largoCosta/2 - anchoCalle/2],
    //           [anchoCosta + offsetTorrePuente/1.5 - offsetPuente, h1, -largoCosta/2 - anchoCalle/2],
    //           [anchoCosta + offsetTorrePuente - offsetPuente, hmax, -largoCosta/2 - anchoCalle/2]
    //         ),
    //         0.03,
    //         12,
    //         20
    //       );
    //       this.agregarModelo(viga);
    //       distViga = sepTensor;
    //       distPuente = sepTensor;
    //       while(distViga < (distTorres-sepTensor)){
    //         posPuente=puente.getPosition(distPuente/anchoRio);
    //         posViga = viga.getPosition(distViga/distTorres);
    //         posPuente[0]=posViga[0];
    //         posPuente[1]+= 0.2-0.08;
    //         posPuente[2]-=anchoCalle/2;
    //         tensor = new CilindroCerrado(new Segmento(posPuente,posViga),0.01,12,3);
    //         this.agregarModelo(tensor);
    //         distViga+=sepTensor;
    //         distPuente+=sepTensor;
    //       }
    //     }
    //
    //     if(i>0){
    //       viga = new Viga(
    //         new BezierCubica(
    //           [anchoCosta + offsetTorrePuente - offsetPuente + ((i-1)*distTorres) ,hmax, -largoCosta/2 - anchoCalle/2],
    //           [anchoCosta + offsetTorrePuente - offsetPuente + ((i-1)*distTorres) + distTorres/3, h1 + h3, -largoCosta/2 - anchoCalle/2],
    //           [anchoCosta + offsetTorrePuente - offsetPuente + ((i-1)*distTorres) + distTorres/1.5, h1 + h3, -largoCosta/2 - anchoCalle/2],
    //           [anchoCosta + offsetTorrePuente - offsetPuente + (i*distTorres), hmax, -largoCosta/2 - anchoCalle/2]
    //         ),
    //         0.03,
    //         12,
    //         20
    //       );
    //       distViga = sepTensor;
    //       distPuente = (offsetTorrePuente + (i-1)*distTorres +sepTensor);
    //       while(distViga < (distTorres-sepTensor)){
    //         posPuente=puente.getPosition(distPuente/anchoRio);
    //         posViga = viga.getPosition(distViga/distTorres);
    //         posPuente[0]=posViga[0];
    //         posPuente[1]+= 0.2-0.01;
    //         posPuente[2]-=anchoCalle/2;
    //         tensor = new CilindroCerrado(new Segmento(posPuente,posViga),0.01,12,3);
    //         this.agregarModelo(tensor);
    //         distViga+=sepTensor;
    //         distPuente+=sepTensor;
    //       }
    //       this.agregarModelo(viga);
    //     }
    //   }
    //   viga = new Viga(
    //     new BezierCubica(
    //       [anchoCosta + anchoRio - offsetPuente, h3, -largoCosta/2 - anchoCalle/2],
    //       [anchoCosta - offsetTorrePuente/3 + anchoRio - offsetPuente, h2, -largoCosta/2 - anchoCalle/2],
    //       [anchoCosta - offsetTorrePuente/1.5 + anchoRio - offsetPuente, h1, -largoCosta/2 - anchoCalle/2],
    //       [anchoCosta - offsetTorrePuente + anchoRio - offsetPuente, hmax, -largoCosta/2 - anchoCalle/2]
    //     ),
    //     0.03,
    //     12,
    //     20
    //   );
    //
    //   distViga = sepTensor;
    //   distPuente = anchoRio - sepTensor;
    //   while(distViga < (distTorres-sepTensor)){
    //     posPuente=puente.getPosition(distPuente/anchoRio);
    //     posViga = viga.getPosition(distViga/distTorres);
    //     posPuente[0]=posViga[0];
    //     posPuente[1]+= 0.2-0.08;
    //     posPuente[2]-=anchoCalle/2;
    //     tensor = new CilindroCerrado(new Segmento(posPuente,posViga),0.01,12,3);
    //     this.agregarModelo(tensor);
    //     distViga+=sepTensor;
    //     distPuente-=sepTensor;
    //   }
    //
    //   this.agregarModelo(viga);
    //   for(i = 0;i<nroTorres;++i){
    //
    //     torre = new Torre(1.5,1,0.5);
    //     torre.init(
    //       anchoCosta + offsetTorrePuente - offsetPuente + (i*distTorres),
    //       0,
    //       -largoCosta/2 + anchoCalle/2
    //     );
    //     this.agregarModelo(torre);
    //
    //     if(i===0){
    //       viga = new Viga(
    //         new BezierCubica(
    //           [anchoCosta - offsetPuente, h3, -largoCosta/2 + anchoCalle/2],
    //           [anchoCosta + offsetTorrePuente/3 - offsetPuente, h2, -largoCosta/2 + anchoCalle/2],
    //           [anchoCosta + offsetTorrePuente/1.5 - offsetPuente, h1, -largoCosta/2 + anchoCalle/2],
    //           [anchoCosta + offsetTorrePuente - offsetPuente, hmax, -largoCosta/2 + anchoCalle/2]
    //         ),
    //         0.03,
    //         12,
    //         20
    //       );
    //       this.agregarModelo(viga);
    //       distViga = sepTensor;
    //       distPuente = sepTensor;
    //       while(distViga < (distTorres-sepTensor)){
    //         posPuente=puente.getPosition(distPuente/anchoRio);
    //         posViga = viga.getPosition(distViga/distTorres);
    //         posPuente[0]=posViga[0];
    //         posPuente[1]+= 0.2-0.08;
    //         posPuente[2]+=anchoCalle/2;
    //         tensor = new CilindroCerrado(new Segmento(posPuente,posViga),0.01,12,3);
    //         this.agregarModelo(tensor);
    //         distViga+=sepTensor;
    //         distPuente+=sepTensor;
    //       }
    //     }
    //
    //     else if(i>0){
    //       viga = new Viga(
    //         new BezierCubica(
    //           [anchoCosta + offsetTorrePuente - offsetPuente + ((i-1)*distTorres) ,hmax, -largoCosta/2 + anchoCalle/2],
    //           [anchoCosta + offsetTorrePuente - offsetPuente + ((i-1)*distTorres) + distTorres/3, h1 + h3, -largoCosta/2 + anchoCalle/2],
    //           [anchoCosta + offsetTorrePuente - offsetPuente + ((i-1)*distTorres) + distTorres/1.5, h1 + h3, -largoCosta/2 + anchoCalle/2],
    //           [anchoCosta + offsetTorrePuente - offsetPuente + (i*distTorres), hmax, -largoCosta/2 + anchoCalle/2]
    //         ),
    //         0.03,
    //         12,
    //         20
    //       );
    //       distViga = sepTensor;
    //       distPuente = (offsetTorrePuente + (i-1)*distTorres +sepTensor);
    //       while(distViga < (distTorres-sepTensor)){
    //         posPuente=puente.getPosition(distPuente/anchoRio);
    //         posViga = viga.getPosition(distViga/distTorres);
    //         posPuente[0]=posViga[0];
    //         posPuente[1]+= 0.2-0.01;
    //         posPuente[2]+=anchoCalle/2;
    //         tensor = new CilindroCerrado(new Segmento(posPuente,posViga),0.01,12,3);
    //         this.agregarModelo(tensor);
    //         distViga+=sepTensor;
    //         distPuente+=sepTensor;
    //       }
    //       this.agregarModelo(viga);
    //     }
    //   }
    //
    //   viga = new Viga(
    //     new BezierCubica(
    //       [anchoCosta + anchoRio - offsetPuente, h3, -largoCosta/2 + anchoCalle/2],
    //       [anchoCosta - offsetTorrePuente/3 + anchoRio - offsetPuente, h2, -largoCosta/2 + anchoCalle/2],
    //       [anchoCosta - offsetTorrePuente/1.5 + anchoRio - offsetPuente, h1, -largoCosta/2 + anchoCalle/2],
    //       [anchoCosta - offsetTorrePuente + anchoRio - offsetPuente, hmax, -largoCosta/2 + anchoCalle/2]
    //     ),
    //     0.03,
    //     12,
    //     20
    //   );
    //   this.agregarModelo(viga);
    //
    //   distViga = sepTensor;
    //   distPuente = anchoRio - sepTensor;
    //   while(distViga < (distTorres-sepTensor)){
    //     posPuente=puente.getPosition(distPuente/anchoRio);
    //     posViga = viga.getPosition(distViga/distTorres);
    //     posPuente[0]=posViga[0];
    //     posPuente[1]+= 0.2-0.08;
    //     posPuente[2]+=anchoCalle/2;
    //     tensor = new CilindroCerrado(new Segmento(posPuente,posViga),0.01,12,3);
    //     this.agregarModelo(tensor);
    //     distViga+=sepTensor;
    //     distPuente-=sepTensor;
    //   }
    //

    // puente.translate(0,0,-3);
    this.agregarArboles();

  }

  inheritPrototype(Terreno, ModeloComplejo);

Terreno.prototype.agregarArboles = function() {
    var posicionesAnteriores = [];      
    for(var i = 0;i<10;++i){
        var arbol = new ArbolRandom();
        var randomNumber = Math.random(); // 0 y 1
        var x,z;
        var hayColisionConOtroArbol = true;
        while (hayColisionConOtroArbol){
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
            hayColisionConOtroArbol = this.huboColisionArboles(x,z,posicionesAnteriores,arbol);
        }
        posicionesAnteriores.push([x,z]);
        arbol.init(x,0,z);
        this.agregarModelo(arbol);
        }
    };

Terreno.prototype.huboColisionArboles = function(x,z,posicionesAnteriores,arbol) {
    for(var i = 0;i<posicionesAnteriores.length;i++){
        var x2 = posicionesAnteriores[i][0];
        var z2 = posicionesAnteriores[i][1]; 
        var distancia = Utils.distanceBetween(x,z,x2,z2);
        var diametro = 2*arbol.getRadio(); 
        if (distancia <= diametro){
            return true;
        }
    }
    return false;
}

  Terreno.prototype.postInit = function(){
  };
