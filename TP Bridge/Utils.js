/**
 * Clase de utilidades con métodos estáticos
 */

function Utils() {}

// Métodos estáticos

Utils.isDefined = function (val) {
	return typeof val !== 'undefined' && val !== null;
};

Utils.getRandomBetweenMaxMin = function(min,max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

Utils.getMatrizRotacion = function(t,n,bn){
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
