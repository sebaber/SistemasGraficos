function calcularPuntoSiguiente2d(anteultimo,ultimo){
    var vec3ault = vec2.create(anteultimo);
    var vec3ult = vec2.create(ultimo);
    var aux = vec2.create();
    vec2.subtract(vec3ult,vec3ault,aux);
    vec2.add(vec3ult,aux,aux);
    var sig = [aux[0],aux[1]];
    return sig;
}

function SplineCubica (v0,v1,v2,v3) {
    /* Devuelve el punto correspondiente para la curva de Bezier con los puntos de control
        recibidos para el t especificado.*/
    this.v0 = [v0[0],v0[1],0];
    this.v1 = [v1[0],v1[1],0];
    this.v2 = [v2[0],v2[1],0];
    this.v3 = [v3[0],v3[1],0];
}

SplineCubica.prototype.p = function(u) {
    /* Devuelve el vector tangente a la curva en el punto.*/
    var x=this.Base0(u)*this.v0[0]+this.Base1(u)*this.v1[0]+this.Base2(u)*this.v2[0]+this.Base3(u)*this.v3[0];
    var y=this.Base0(u)*this.v0[1]+this.Base1(u)*this.v1[1]+this.Base2(u)*this.v2[1]+this.Base3(u)*this.v3[1];
    var z=this.Base0(u)*this.v0[2]+this.Base1(u)*this.v1[2]+this.Base2(u)*this.v2[2]+this.Base3(u)*this.v3[2];

    return [x,y,z];
};

SplineCubica.prototype.inicio = function(){
    // var p = this.p(0);
    // return p[1];
    return this.v0[1];
};

SplineCubica.prototype.fin = function(){
    // var p = this.p(1);
    // return p[1];
    return this.v3[1];
};

SplineCubica.prototype.inicioX = function(){
    var p = this.p(0);
    return p[0];
};

SplineCubica.prototype.finX = function(){
    var p = this.p(1);
    return p[0];
};

SplineCubica.prototype.pInicial = function(){
    return this.p(0);
};

SplineCubica.prototype.pFinal = function(){
    return this.p(1);
};

SplineCubica.prototype.getTangente = function (u){
    /* Devuelve el vector tangente a la curva en el punto.*/
    var pos = vec3.create();
    pos[0] = this.Base0der(u)*this.v0[0]+this.Base1der(u)*this.v1[0]+this.Base2der(u)*this.v2[0]+this.Base3der(u)*this.v3[0];
    pos[1] = this.Base0der(u)*this.v0[1]+this.Base1der(u)*this.v1[1]+this.Base2der(u)*this.v2[1]+this.Base3der(u)*this.v3[1];
    pos[2] = this.Base0der(u)*this.v0[2]+this.Base1der(u)*this.v1[2]+this.Base2der(u)*this.v2[2]+this.Base3der(u)*this.v3[2];

    vec3.normalize(pos,pos);
    return pos;
};

SplineCubica.prototype.getNormal = function(t) {
	var tan = this.getTangente(t);
	return [ tan[1], -tan[0], tan[2] ];
};

SplineCubica.prototype.getBiNormal = function(t) {
	var bin = vec3.create();
  return vec3.cross(bin,this.getTangente(t),this.getNormal(t));
};

SplineCubica.prototype.Base0=function(u) { return ((1-(3*u)+(3*u*u)-(u*u*u))/6);};  // (1 -3u +3u2 -u3)/6

SplineCubica.prototype.Base1=function(u) { return ((4-(6*u*u)+(3*u*u*u))/6); };  // (4  -6u2 +3u3)/6

SplineCubica.prototype.Base2=function(u) { return (1+(3*u)+(3*u*u)-(3*u*u*u))/6;}; // (1 +3u +3u2 -3u3)/6

SplineCubica.prototype.Base3=function(u) { return (u*u*u)/6; };  //    u3/6

SplineCubica.prototype.Base0der=function(u) { return (-3 +6*u -3*u*u)/6; };  // (-3 +6u -3u2)/6

SplineCubica.prototype.Base1der=function(u) { return (-12*u+9*u*u)/6; };   // (-12u +9u2)  /6

SplineCubica.prototype.Base2der=function(u) { return (3+6*u-9*u*u)/6;};    // (-3 +6u -9u2)/6

SplineCubica.prototype.Base3der=function(u) { return (3*u*u)*1/6; };
