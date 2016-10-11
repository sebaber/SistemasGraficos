/**
 * Clase de utilidades con métodos estáticos
 */

function Utils() {}

// Métodos estáticos

Utils.isDefined = function (val) {
	return typeof val !== 'undefined' && val !== null;
};

Utils.getRandomBetweenMaxMin = function(min,max){
  return (Math.random() * (max - min + 1)) + min;
};

Utils.getRandomBetweenTwoMaxMin = function(min1,max1,min2,max2){
	var numero = Math.random();
	if (numero < 0.5){
		return (Math.random() * (max1 - min1 + 1)) + min1;
	} else {
		return (Math.random() * (max2 - min2 + 1)) + min2;
	}
}

Utils.getMatrizRotacion = function(t,n,bn){
	// console.log("tangente: "+t);
	// console.log("normal: "+n);
	// console.log("binormal: "+bn);
	var matrizRotacion = mat4.create();
	matrizRotacion[0] = n[0];
	matrizRotacion[1] = n[1];
	matrizRotacion[2] = n[2];
	matrizRotacion[4] = bn[0];
	matrizRotacion[5] = bn[1];
	matrizRotacion[6] = bn[2];
	matrizRotacion[8] = t[0];
	matrizRotacion[9] = t[1];
	matrizRotacion[10] = t[2];
	return matrizRotacion;
};

Utils.getMatrizRotacionTraslacion = function(t,n,bn,pos){
	var matrizRotacion = mat4.create();
	matrizRotacion[0] = n[0];
	matrizRotacion[1] = n[1];
	matrizRotacion[2] = n[2];
	matrizRotacion[3] = 0.0;
	matrizRotacion[4] = bn[0];
	matrizRotacion[5] = bn[1];
	matrizRotacion[6] = bn[2];
	matrizRotacion[7] = 0.0;
	matrizRotacion[8] = -1*t[0];
	matrizRotacion[9] = -1*t[1];
	matrizRotacion[10] = -1*t[2];
	matrizRotacion[11] = 0.0;
	matrizRotacion[12] = -1*pos[0];
	matrizRotacion[13] = -1*pos[1];
	matrizRotacion[14] = -1*pos[2];
	matrizRotacion[15] = 1.0;
	return matrizRotacion;
};

/**
 * Verifica si el valor es potencia de 2.
 *
 * @param {Number} value valor numero a verificar
 * @returns {bool} true si el número es potencia de 2
 */
Utils.isPowerOf2 = function (value) {
	return (value & (value - 1)) === 0;
};

Utils.degToRad = function (rad) {
	return rad * (Math.PI / 180);
};

/**
 * Calcula el ángulo entre 2 vectores de 3 dimensiones
 *
 * @param {vec3} a vector de 3 dimensiones
 * @param {vec3} b vector de 3 dimensiones
 * @returns {Number} angulo entre los 2 vectores
 */
Utils.angleBetweenVectors = function (a, b) {
	var normalizedA = vec3.create();
	vec3.normalize(normalizedA, a);

	var normalizedB = vec3.create();
	vec3.normalize(normalizedB, b);

	var dotProduct = vec3.dot(normalizedA, normalizedB);
	var angle = Math.acos(dotProduct);
	return angle;
};

Utils.distanceBetween = function (x1,y1,x2,y2) {
	var distance;
	var p1 = x1 - x2;
	var p2 = y1 - y2;
	distance = Math.sqrt(p1*p1 + p2*p2);
	return distance;
};

function makeLookAt(cameraPosition, target, up) {
	var zAxis = normalize(
	subtractVectors(cameraPosition,target));
	var xAxis = normalize(cross(up, zAxis));
	var yAxis = normalize(cross(zAxis, xAxis));
	return [				
     xAxis[0], yAxis[0], zAxis[0], 0.0,
     xAxis[1], yAxis[1], zAxis[1], 0.0,
     xAxis[2], yAxis[2], zAxis[2], 0.0,
     0.0,
     0.0,
     0.0,
     1.0];
  
}

function normalize(v) {
  var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  // make sure we don't divide by 0.
  if (length > 0.00001) {
    return [v[0] / length, v[1] / length, v[2] / length];
  } else {
    return [0, 0, 0];
  }
}

function subtractVectors(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function negativeVector(b) {
  return [- b[0], - b[1], - b[2]];
}

function cross(a, b) {
  return [a[1] * b[2] - a[2] * b[1],
          a[2] * b[0] - a[0] * b[2],
          a[0] * b[1] - a[1] * b[0]];
}

function norma(a) {
  return Math.sqrt(a[0]*a[0] + a[1]*a[1] + a[2]*a[2]);
}


function vecFrom(a) {
  return vec3.fromValues(a[0],a[1],[2]);
}
