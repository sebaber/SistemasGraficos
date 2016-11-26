function SplineCompleja () {
    this.splines = [];
}

SplineCompleja.prototype.agregarSpline = function(spline){
    this.splines.push( spline );
};

SplineCompleja.prototype.p = function(u) {
  // console.log("p x final: "+this.splines[this.splines.length-1].finX());
  // console.log("p x inicio: "+this.splines[0].inicioX());
    var uGlobal = u * this.splines[this.splines.length-1].finX()-this.splines[0].inicioX();
    var uTramo;
    var uReal;

    for ( i = 0 ; i < this.splines.length; i++){
        var splineTramo = this.splines[i];
        if( splineTramo.inicioX() <= uGlobal && uGlobal <= splineTramo.finX() ){
            if (splineTramo.inicioX() != splineTramo.finX()){
                uTramo = uGlobal - splineTramo.inicioX();
                uReal = uTramo / (splineTramo.finX() - splineTramo.inicioX());
            } else {
                //En caso de que el camino sea nulo
                uReal = 0.0;
            }

            return splineTramo.p(uReal);
        }
    }
    //En caso de error
    console.log("ERROR POSICION");
    return [0,0,0];
};

SplineCompleja.prototype.t = function(u) {
  // console.log("p x final: "+this.splines[this.splines.length-1].finX());
  // console.log("p x inicio: "+this.splines[0].inicioX());
    var uGlobal = u * this.splines[this.splines.length-1].finX()-this.splines[0].inicioX();
    var uTramo;
    var uReal;

    for ( i = 0 ; i < this.splines.length; i++){
        var splineTramo = this.splines[i];
        if( splineTramo.inicioX() <= uGlobal && uGlobal <= splineTramo.finX() ){
            if (splineTramo.inicioX() != splineTramo.finX()){
                uTramo = uGlobal - splineTramo.inicioX();
                uReal = uTramo / (splineTramo.finX() - splineTramo.inicioX());
            } else {
                //En caso de que el camino sea nulo
                uReal = 0.0;
            }

            return splineTramo.getTangente(uReal);
        }
    }
    //En caso de error
    console.log("ERROR POSICION");
    return [0,0,0];
};

SplineCompleja.prototype.n = function(u) {
  // console.log("p x final: "+this.splines[this.splines.length-1].finX());
  // console.log("p x inicio: "+this.splines[0].inicioX());
    var uGlobal = u * this.splines[this.splines.length-1].finX()-this.splines[0].inicioX();
    var uTramo;
    var uReal;

    for ( i = 0 ; i < this.splines.length; i++){
        var splineTramo = this.splines[i];
        if( splineTramo.inicioX() <= uGlobal && uGlobal <= splineTramo.finX() ){
            if (splineTramo.inicioX() != splineTramo.finX()){
                uTramo = uGlobal - splineTramo.inicioX();
                uReal = uTramo / (splineTramo.finX() - splineTramo.inicioX());
            } else {
                //En caso de que el camino sea nulo
                uReal = 0.0;
            }

            return splineTramo.getNormal(uReal);
        }
    }
    //En caso de error
    console.log("ERROR POSICION");
    return [0,0,0];
};

SplineCompleja.prototype.bn = function(u) {
  // console.log("p x final: "+this.splines[this.splines.length-1].finX());
  // console.log("p x inicio: "+this.splines[0].inicioX());
    var uGlobal = u * this.splines[this.splines.length-1].finX()-this.splines[0].inicioX();
    var uTramo;
    var uReal;

    for ( i = 0 ; i < this.splines.length; i++){
        var splineTramo = this.splines[i];
        if( splineTramo.inicioX() <= uGlobal && uGlobal <= splineTramo.finX() ){
            if (splineTramo.inicioX() != splineTramo.finX()){
                uTramo = uGlobal - splineTramo.inicioX();
                uReal = uTramo / (splineTramo.finX() - splineTramo.inicioX());
            } else {
                //En caso de que el camino sea nulo
                uReal = 0.0;
            }

            return splineTramo.getBiNormal(uReal);
        }
    }
    //En caso de error
    console.log("ERROR POSICION");
    return [0,0,0];
};
