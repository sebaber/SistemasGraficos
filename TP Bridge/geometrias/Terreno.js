function Terreno(anchoCosta,largoCosta,anchoRio,anchoCalle,nroTorres,sepTensor,
  alturaTorre1,alturaTorre2,alturaTorre3,yCalle,ph1,ph2,ph3,profundidad) {
    ModeloComplejo.call(this);
    this.anchoCosta = anchoCosta;
    this.largoCosta = largoCosta;
    this.anchoRio = anchoRio;

    var prof = profundidad;

    var base = new Base(perfilDelRioObject.obtenerFuncionSpline(largoCosta,200,anchoRio,200),anchoCosta,anchoRio,prof,100);
    // var base = new Base(new Segmento([0,0,0,0],[0,10,0]),xCostaDer,anchoRio,20);
    console.log(base);
    this.agregarModelo(base);

    var rio = new Rio(perfilDelRioObject.obtenerFuncionSpline(largoCosta,200,anchoRio,200),anchoCosta,anchoRio,ph1,100);
    this.agregarModelo(rio);
    this.rotateX(-(3.14/2.0));

    // var xCostaIzqTorre = base.getXMinimaDelRioParaY(yCalle);
    var xCostaIzq = base.getXMinimaDelRioParaY(yCalle)-anchoRio;
    var xCostaDer = base.getXMaximaDelRioParaY(yCalle)+anchoRio;
    var anchoPuente = xCostaDer-xCostaIzq;
    console.log("xCostaDer: "+xCostaDer);
    console.log("xCostaDer: "+xCostaIzq);
    var offsetTorrePuente = (anchoPuente/6);
    var distTorres = (anchoPuente-(2*offsetTorrePuente))/(nroTorres-1);
    var alturaTotal = ph1+ph2+ph3;
    var h1=ph2/2+ph1;
    var h2=ph2/2+ph3/2;
    var h3=ph3/2;
    console.log("ph1: "+ph1);
    console.log("ph2: "+ph2);
    console.log("ph3: "+ph3);
    // var h1=alturaTorre1;
    // var h2=alturaTorre2;
    // var h3=alturaTorre3;
    var hmax=h1+h1/4+h2+h2/4+h3+h3/4-ph1;
    // var offsetPuente=1.5;
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
          [xCostaIzq, 0, -yCalle],//-yCalle
          [xCostaIzq + (anchoPuente/3), ph2, -yCalle],//-yCalle
          [xCostaIzq + (2*anchoPuente/3), ph2, -yCalle],//-yCalle
          [xCostaIzq + anchoPuente, 0, -yCalle]
        ),//-yCalle
        anchoCalle,
        10
      );
      this.agregarModelo(puente);

      var i,torre,viga,distViga,distPuente;

      for(i = 0;i<nroTorres;++i){

        torre = new Torre(h1,h2,h3);
        torre.init(
          xCostaIzq + offsetTorrePuente + i*distTorres,
          -ph1,
          -yCalle - anchoCalle/2
        );
        this.agregarModelo(torre);

        if(i===0){
          viga = new Viga(
            new BezierCubica(
              [xCostaIzq , h3, -yCalle - anchoCalle/2],
              [xCostaIzq + offsetTorrePuente/3 , h2, -yCalle - anchoCalle/2],
              [xCostaIzq + offsetTorrePuente/1.5 , h1, -yCalle - anchoCalle/2],
              [xCostaIzq + offsetTorrePuente , hmax, -yCalle - anchoCalle/2]
            ),
            0.03,
            12,
            20
          );
          this.agregarModelo(viga);
          distViga = sepTensor;
          distPuente = sepTensor;
          while(distViga < (distTorres-sepTensor)){
            posPuente=puente.getPosition(distPuente/anchoPuente);
            posViga = viga.getPosition(distViga/distTorres);
            posPuente[0]=posViga[0];
            posPuente[1]+= 0.2-0.08;
            posPuente[2]-=anchoCalle/2;
            tensor = new CilindroCerrado(new Segmento(posPuente,posViga),0.01,12,3);
            this.agregarModelo(tensor);
            distViga+=sepTensor;
            distPuente+=sepTensor;
          }
        }

        if(i>0){
          viga = new Viga(
            new BezierCubica(
              [xCostaIzq + offsetTorrePuente  + ((i-1)*distTorres) ,hmax, -yCalle - anchoCalle/2],
              [xCostaIzq + offsetTorrePuente  + ((i-1)*distTorres) + distTorres/3, h1 + h3, -yCalle - anchoCalle/2],
              [xCostaIzq + offsetTorrePuente  + ((i-1)*distTorres) + distTorres/1.5, h1 + h3, -yCalle - anchoCalle/2],
              [xCostaIzq + offsetTorrePuente  + (i*distTorres), hmax, -yCalle - anchoCalle/2]
            ),
            0.03,
            12,
            20
          );
          distViga = sepTensor;
          distPuente = (offsetTorrePuente + (i-1)*distTorres +sepTensor);
          while(distViga < (distTorres-sepTensor)){
            posPuente=puente.getPosition(distPuente/anchoPuente);
            posViga = viga.getPosition(distViga/distTorres);
            posPuente[0]=posViga[0];
            posPuente[1]+= 0.2-0.01;
            posPuente[2]-=anchoCalle/2;
            tensor = new CilindroCerrado(new Segmento(posPuente,posViga),0.01,12,3);
            this.agregarModelo(tensor);
            distViga+=sepTensor;
            distPuente+=sepTensor;
          }
          this.agregarModelo(viga);
        }
      }
      viga = new Viga(
        new BezierCubica(
          [xCostaIzq + anchoPuente , h3, -yCalle - anchoCalle/2],
          [xCostaIzq - offsetTorrePuente/3 + anchoPuente , h2, -yCalle - anchoCalle/2],
          [xCostaIzq - offsetTorrePuente/1.5 + anchoPuente , h1, -yCalle - anchoCalle/2],
          [xCostaIzq - offsetTorrePuente + anchoPuente , hmax, -yCalle - anchoCalle/2]
        ),
        0.03,
        12,
        20
      );

      distViga = sepTensor;
      distPuente = anchoPuente - sepTensor;
      while(distViga < (distTorres-sepTensor)){
        posPuente=puente.getPosition(distPuente/anchoPuente);
        posViga = viga.getPosition(distViga/distTorres);
        posPuente[0]=posViga[0];
        posPuente[1]+= 0.2-0.08;
        posPuente[2]-=anchoCalle/2;
        tensor = new CilindroCerrado(new Segmento(posPuente,posViga),0.01,12,3);
        this.agregarModelo(tensor);
        distViga+=sepTensor;
        distPuente-=sepTensor;
      }

      this.agregarModelo(viga);


      for(i = 0;i<nroTorres;++i){

        torre = new Torre(h1,h2,h3);
        torre.init(
          xCostaIzq + offsetTorrePuente + i*distTorres,
          -ph1,
          -yCalle + anchoCalle/2
        );
        this.agregarModelo(torre);

        if(i===0){
          viga = new Viga(
            new BezierCubica(
              [xCostaIzq , h3, -yCalle + anchoCalle/2],
              [xCostaIzq + offsetTorrePuente/3 , h2, -yCalle + anchoCalle/2],
              [xCostaIzq + offsetTorrePuente/1.5 , h1, -yCalle + anchoCalle/2],
              [xCostaIzq + offsetTorrePuente , hmax, -yCalle + anchoCalle/2]
            ),
            0.03,
            12,
            20
          );
          this.agregarModelo(viga);
          distViga = sepTensor;
          distPuente = sepTensor;
          while(distViga < (distTorres-sepTensor)){
            posPuente=puente.getPosition(distPuente/anchoPuente);
            posViga = viga.getPosition(distViga/distTorres);
            posPuente[0]=posViga[0];
            posPuente[1]+= 0.2-0.08;
            posPuente[2]+=anchoCalle/2;
            tensor = new CilindroCerrado(new Segmento(posPuente,posViga),0.01,12,3);
            this.agregarModelo(tensor);
            distViga+=sepTensor;
            distPuente+=sepTensor;
          }
        }

        if(i>0){
          viga = new Viga(
            new BezierCubica(
              [xCostaIzq + offsetTorrePuente  + ((i-1)*distTorres) ,hmax, -yCalle + anchoCalle/2],
              [xCostaIzq + offsetTorrePuente  + ((i-1)*distTorres) + distTorres/3, h1 + h3, -yCalle + anchoCalle/2],
              [xCostaIzq + offsetTorrePuente  + ((i-1)*distTorres) + distTorres/1.5, h1 + h3, -yCalle + anchoCalle/2],
              [xCostaIzq + offsetTorrePuente  + (i*distTorres), hmax, -yCalle + anchoCalle/2]
            ),
            0.03,
            12,
            20
          );
          distViga = sepTensor;
          distPuente = (offsetTorrePuente + (i-1)*distTorres +sepTensor);
          while(distViga < (distTorres-sepTensor)){
            posPuente=puente.getPosition(distPuente/anchoPuente);
            posViga = viga.getPosition(distViga/distTorres);
            posPuente[0]=posViga[0];
            posPuente[1]+= 0.2-0.01;
            posPuente[2]+=anchoCalle/2;
            tensor = new CilindroCerrado(new Segmento(posPuente,posViga),0.01,12,3);
            this.agregarModelo(tensor);
            distViga+=sepTensor;
            distPuente+=sepTensor;
          }
          this.agregarModelo(viga);
        }
      }
      viga = new Viga(
        new BezierCubica(
          [xCostaIzq + anchoPuente , h3, -yCalle + anchoCalle/2],
          [xCostaIzq - offsetTorrePuente/3 + anchoPuente , h2, -yCalle + anchoCalle/2],
          [xCostaIzq - offsetTorrePuente/1.5 + anchoPuente , h1, -yCalle + anchoCalle/2],
          [xCostaIzq - offsetTorrePuente + anchoPuente , hmax, -yCalle + anchoCalle/2]
        ),
        0.03,
        12,
        20
      );

      distViga = sepTensor;
      distPuente = anchoPuente - sepTensor;
      while(distViga < (distTorres-sepTensor)){
        posPuente=puente.getPosition(distPuente/anchoPuente);
        posViga = viga.getPosition(distViga/distTorres);
        posPuente[0]=posViga[0];
        posPuente[1]+= 0.2-0.08;
        posPuente[2]+=anchoCalle/2;
        tensor = new CilindroCerrado(new Segmento(posPuente,posViga),0.01,12,3);
        this.agregarModelo(tensor);
        distViga+=sepTensor;
        distPuente-=sepTensor;
      }

      this.agregarModelo(viga);

      // for(i = 0;i<nroTorres;++i){
      //
      //   torre = new Torre(1.5,1,0.5);
      //   torre.init(
      //     xCostaDer + offsetTorrePuente  + (i*distTorres),
      //     0,
      //     -yCalle + anchoCalle/2
      //   );
      //   this.agregarModelo(torre);
      //
      //   if(i===0){
      //     viga = new Viga(
      //       new BezierCubica(
      //         [xCostaDer , h3, -yCalle + anchoCalle/2],
      //         [xCostaDer + offsetTorrePuente/3 , h2, -yCalle + anchoCalle/2],
      //         [xCostaDer + offsetTorrePuente/1.5 , h1, -yCalle + anchoCalle/2],
      //         [xCostaDer + offsetTorrePuente , hmax, -yCalle + anchoCalle/2]
      //       ),
      //       0.03,
      //       12,
      //       20
      //     );
      //     this.agregarModelo(viga);
      //     distViga = sepTensor;
      //     distPuente = sepTensor;
      //     while(distViga < (distTorres-sepTensor)){
      //       posPuente=puente.getPosition(distPuente/anchoRio);
      //       posViga = viga.getPosition(distViga/distTorres);
      //       posPuente[0]=posViga[0];
      //       posPuente[1]+= 0.2-0.08;
      //       posPuente[2]+=anchoCalle/2;
      //       tensor = new CilindroCerrado(new Segmento(posPuente,posViga),0.01,12,3);
      //       this.agregarModelo(tensor);
      //       distViga+=sepTensor;
      //       distPuente+=sepTensor;
      //     }
      //   }
      //
      //   else if(i>0){
      //     viga = new Viga(
      //       new BezierCubica(
      //         [xCostaDer + offsetTorrePuente  + ((i-1)*distTorres) ,hmax, -yCalle + anchoCalle/2],
      //         [xCostaDer + offsetTorrePuente  + ((i-1)*distTorres) + distTorres/3, h1 + h3, -yCalle + anchoCalle/2],
      //         [xCostaDer + offsetTorrePuente  + ((i-1)*distTorres) + distTorres/1.5, h1 + h3, -yCalle + anchoCalle/2],
      //         [xCostaDer + offsetTorrePuente  + (i*distTorres), hmax, -yCalle + anchoCalle/2]
      //       ),
      //       0.03,
      //       12,
      //       20
      //     );
      //     distViga = sepTensor;
      //     distPuente = (offsetTorrePuente + (i-1)*distTorres +sepTensor);
      //     while(distViga < (distTorres-sepTensor)){
      //       posPuente=puente.getPosition(distPuente/anchoRio);
      //       posViga = viga.getPosition(distViga/distTorres);
      //       posPuente[0]=posViga[0];
      //       posPuente[1]+= 0.2-0.01;
      //       posPuente[2]+=anchoCalle/2;
      //       tensor = new CilindroCerrado(new Segmento(posPuente,posViga),0.01,12,3);
      //       this.agregarModelo(tensor);
      //       distViga+=sepTensor;
      //       distPuente+=sepTensor;
      //     }
      //     this.agregarModelo(viga);
      //   }
      // }
      //
      // viga = new Viga(
      //   new BezierCubica(
      //     [xCostaDer + anchoRio , h3, -yCalle + anchoCalle/2],
      //     [xCostaDer - offsetTorrePuente/3 + anchoRio , h2, -yCalle + anchoCalle/2],
      //     [xCostaDer - offsetTorrePuente/1.5 + anchoRio , h1, -yCalle + anchoCalle/2],
      //     [xCostaDer - offsetTorrePuente + anchoRio , hmax, -yCalle + anchoCalle/2]
      //   ),
      //   0.03,
      //   12,
      //   20
      // );
      // this.agregarModelo(viga);
      //
      // distViga = sepTensor;
      // distPuente = anchoRio - sepTensor;
      // while(distViga < (distTorres-sepTensor)){
      //   posPuente=puente.getPosition(distPuente/anchoRio);
      //   posViga = viga.getPosition(distViga/distTorres);
      //   posPuente[0]=posViga[0];
      //   posPuente[1]+= 0.2-0.08;
      //   posPuente[2]+=anchoCalle/2;
      //   tensor = new CilindroCerrado(new Segmento(posPuente,posViga),0.01,12,3);
      //   this.agregarModelo(tensor);
      //   distViga+=sepTensor;
      //   distPuente-=sepTensor;
      // }


    // this.agregarArboles();

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
