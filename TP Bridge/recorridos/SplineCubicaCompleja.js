function SplineCubicaCompleja (largoDelRio,largoDelCanvas,anchoRio,anchoCanvas) {
  this.anchoRio = anchoRio;
  this.anchoCanvas = anchoCanvas;
  this.factorX = anchoRio/anchoCanvas;
    this.factor = largoDelRio / largoDelCanvas;
    this.largoDelRio = largoDelRio;
    this.largoDelCanvas = largoDelCanvas;
    this.splines = [];
}

SplineCubicaCompleja.prototype.agregarSpline = function(spline){
    this.splines.push( spline );
    this.splines.sort(function(a, b){return a.inicio()-b.inicio();});
};

SplineCubicaCompleja.prototype.getPosition = function(u) {
  return this.p(u);
};

SplineCubicaCompleja.prototype.p = function(u) {
    var uGlobal = u * this.largoDelCanvas;
    var uTramo;
    var uReal;
    console.log("u: "+u);
    console.log("canvas y: "+uGlobal);
    for ( i = 0 ; i < this.splines.length; i++){
        var splineTramo = this.splines[i];
        if( splineTramo.inicio() <= uGlobal && uGlobal <= splineTramo.fin() ){
            if (splineTramo.inicio() != splineTramo.fin()){
              console.log("inicio: "+splineTramo.inicio());
              console.log("fin: "+splineTramo.fin());
                uTramo = uGlobal - splineTramo.inicio();
                console.log("uTramo: "+uTramo);
                uReal = uTramo / (splineTramo.fin() - splineTramo.inicio());
            } else {
                //En caso de que el camino sea nulo
                uReal = 0.0;
            }
            console.log("Ureal: "+uReal);
            var punto = splineTramo.p(uReal);
            console.log("ANTES");
            console.log(punto);
            punto[0] = punto[0]*this.factorX;
            punto[1] = punto[1]*this.factor;
            console.log("DESPUES");
            console.log(punto);
            return [punto[0], punto[1],0];
        }
        console.log("inicio: "+splineTramo.inicio());
        console.log("fin: "+splineTramo.fin());
    }
    //En caso de error
    console.log("ERROR POSICION");
    return [0,0,0];
};

SplineCubicaCompleja.prototype.getTangente = function(u) {
    var uGlobal = u * this.largoDelCanvas;
    var uTramo;
    var uReal;

    for ( i = 0 ; i < this.splines.length; i++){
        var splineTramo = this.splines[i];
        if( splineTramo.inicio() <= uGlobal && uGlobal <= splineTramo.fin() ){
            if (splineTramo.inicio() != splineTramo.fin()){
                uTramo = uGlobal - splineTramo.inicio();
                uReal = uTramo / (splineTramo.fin() - splineTramo.inicio());
            } else {
                //En caso de que el camino sea nulo
                uReal = 0.0;
            }
            return splineTramo.getTangente(uReal);
        }
    }
    //En caso de error
    console.log("ERROR TANGENTE");
    return [0,0,0];
};

SplineCubicaCompleja.prototype.getNormal = function(u) {
    var uGlobal = u * this.largoDelCanvas;
    var uTramo;
    var uReal;

    for ( i = 0 ; i < this.splines.length; i++){
        var splineTramo = this.splines[i];
        if( splineTramo.inicio() <= uGlobal && uGlobal <= splineTramo.fin() ){
            if (splineTramo.inicio() != splineTramo.fin()){
                uTramo = uGlobal - splineTramo.inicio();
                uReal = uTramo / (splineTramo.fin() - splineTramo.inicio());
            } else {
                //En caso de que el camino sea nulo
                uReal = 0.0;
            }
            return splineTramo.getNormal(uReal);
        }
    }
    console.log("ERROR NORMAL");
    //En caso de error
    return [0,0,0];
};

SplineCubicaCompleja.prototype.getBiNormal = function(u) {
    var uGlobal = u * this.largoDelCanvas;
    var uTramo;
    var uReal;

    for ( i = 0 ; i < this.splines.length; i++){
        var splineTramo = this.splines[i];
        if( splineTramo.inicio() <= uGlobal && uGlobal <= splineTramo.fin() ){
            if (splineTramo.inicio() != splineTramo.fin()){
                uTramo = uGlobal - splineTramo.inicio();
                uReal = uTramo / (splineTramo.fin() - splineTramo.inicio());
            } else {
                //En caso de que el camino sea nulo
                uReal = 0.0;
            }
            return splineTramo.getBiNormal(uReal);
        }
    }
    console.log("ERROR BINORMAL");
    //En caso de error
    return [0,0,0];
};
