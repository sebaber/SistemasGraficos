/*
 *  Buffer de webgl
 */
function Buffer(target) {
	this.glContext = GLContext.getContext();
	this.data; // datos que guarda el buffer
	this.glBuffer = this.glContext.createBuffer(); // referencia al buffer
	this.target = target; // tipo de buffer
	this.itemSize; // tamaño de los items del buffer
	this.numItems; // cantidad de items en el buffer
}

Buffer.prototype.bind = function () {
	this.glContext.bindBuffer(this.target, this.glBuffer);
};

Buffer.prototype.setData = function (size, data) {
	this.bind();
	this.glContext.bufferData(this.target, data, this.glContext.STATIC_DRAW);
	this.data = data;
	this.itemSize = size;
	this.numItems = data.length / size;
};

Buffer.prototype.getData = function () {
	return this.data;
};

Buffer.prototype.destroy = function (regenerate) {
	if(Utils.isDefined(this.glBuffer)) {
		this.glContext.deleteBuffer(this.glBuffer);
		if(regenerate) {
			this.glBuffer = this.glContext.createBuffer();
		} else {
			this.glBuffer = null;
		}
	}
}

/*
 * Buffer webgl de atributos
 */
function AttributeBuffer() {
	var gl = GLContext.getContext();
	Buffer.call(this, gl.ARRAY_BUFFER);
}

Utils.inheritPrototype(AttributeBuffer, Buffer);


AttributeBuffer.prototype.setData = function (size, data) {
	Buffer.prototype.setData.call(this, size, new Float32Array(data));
};

AttributeBuffer.prototype.associateAttrPointer = function (vertexAttr) {
	if (vertexAttr >= 0) {
		var gl = this.glContext;
		this.bind();
		gl.vertexAttribPointer(vertexAttr, this.itemSize, gl.FLOAT, false, 0, 0);
	}
};



/*
 *  Buffer webgl de indices.
 */
function IndexBuffer() {
	var gl = GLContext.getContext();
	Buffer.call(this, gl.ELEMENT_ARRAY_BUFFER);
}


Utils.inheritPrototype(IndexBuffer, Buffer);


IndexBuffer.prototype.setData = function (data) {
	Buffer.prototype.setData.call(this, 1, new Uint16Array(data));
};

IndexBuffer.prototype.draw = function (mode) {
	this.bind();
	this.glContext.drawElements(mode, this.numItems, this.glContext.UNSIGNED_SHORT, 0);
};