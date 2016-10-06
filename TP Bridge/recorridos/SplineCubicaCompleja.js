function SplineCubicaCompleja (largoDelRio,largoDelCanvas) {
    this.factor = largoDelRio / largoDelCanvas; 
    this.largoDelRio = largoDelRio;
    this.largoDelCanvas = largoDelCanvas; 
    this.splines = [];
}

SplineCubicaCompleja.prototype.agregarSpline = function(spline){
    this.splines.push( spline );
    this.splines.sort(function(a, b){return a.inicio()-b.inicio()});
}

SplineCubicaCompleja.prototype.p = function(u) {
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
            var punto = splineTramo.p(uReal);
            punto[0] = punto[0]*this.factor;
            punto[1] = punto[1]*this.factor;
            return [punto[0], punto[1],0];  
        }
    }
    //En caso de error
    return [0,0];
}

SplineCubicaCompleja.prototype.t = function (u){
    /* Devuelve el vector tangente a la curva en el punto.*/
    return [0,0];
}

