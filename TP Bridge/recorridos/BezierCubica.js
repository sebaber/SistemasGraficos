function calcularPuntoSiguiente(anteultimo,ultimo){
    var vec3ault = vec3.create(anteultimo);
    var vec3ult = vec3.create(ultimo);
    var aux = vec3.create();
    vec3.subtract(vec3ult,vec3ault,aux);
    vec3.add(vec3ult,aux,aux);
    var sig = [aux[0],aux[1],aux[2]];
    return sig;
}

function BezierCubica (v0,v1,v2,v3) {
    /* Devuelve el punto correspondiente para la curva de Bezier con los puntos de control
        recibidos para el t especificado.*/
    this.v0 = v0;
    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;
}
BezierCubica.prototype.getPosition = function(u) {
    /* Devuelve el vector tangente a la curva en el punto.*/
    var pos = vec3.create();
    var b0 = base0(u);
    var b1 = base1(u);
    var b2 = base2(u);
    var b3 = base3(u);
    pos[0] = b0*this.v0[0] + b1*this.v1[0] + b2*this.v2[0] + b3*this.v3[0];
    pos[1] = b0*this.v0[1] + b1*this.v1[1] + b2*this.v2[1] + b3*this.v3[1];
    pos[2] = b0*this.v0[2] + b1*this.v1[2] + b2*this.v2[2] + b3*this.v3[2];
    return pos;
};

BezierCubica.prototype.getTangente = function (u){
    /* Devuelve el vector tangente a la curva en el punto.*/
    var pos = vec3.create();
    var b0 = base0tan(u);
    var b1 = base1tan(u);
    var b2 = base2tan(u);
    pos[0] = b0*(this.v1[0]-this.v0[0]) + b1*(this.v2[0]-this.v1[0]) + b2*(this.v3[0]-this.v2[0]);
    pos[1] = b0*(this.v1[1]-this.v0[1]) + b1*(this.v2[1]-this.v1[1]) + b2*(this.v3[1]-this.v2[1]);
    pos[2] = b0*(this.v1[2]-this.v0[2]) + b1*(this.v2[2]-this.v1[2]) + b2*(this.v3[2]-this.v2[2]);

    vec3.normalize(pos,pos);
    console.log("pos: "+pos);
    return pos;
};

BezierCubica.prototype.getNormal = function(t) {
	var tan = this.getTangente(t);
	return [ tan[1], -tan[0], tan[2] ];
};

BezierCubica.prototype.getBiNormal = function(t) {
	var bin = vec3.create();
  return vec3.cross(bin,this.getTangente(t),this.getNormal(t));
};


function base0(u){
    return (1-u)*(1-u)*(1-u);
}
function base1(u){
    return 3*(1-u)*(1-u)*u;
}
function base2(u){
    return 3*(1-u)*u*u;
}
function base3(u){
    return u*u*u;
}
function base0tan(u){
    return 3*(1-u)*(1-u);
}
function base1tan(u){
    return 6*(1-u)*u;
}
function base2tan(u){
    return 3*u*u;
}
// function base0tan(u){
//     return -3*(1-u)*(1-u);
// }
// function base1tan(u){
//     return -6*(1-u)*u + 3*(1-u)*(1-u);
// }
// function base2tan(u){
//     return -3*u*u + 6*(1-u)*u;
// }
// function base3tan(u){
//     return 3*u*u;
// }
