var Geometry = function(levels, faces, textGenerator) {



	// buffers
	this.position_buffer = [];
    this.normal_buffer = [];
    this.textGenerator = textGenerator;

	this.index_buffer = [];
    this.levels = levels;
    this.faces = faces;
    this.init();

}

Geometry.prototype.init = function(){
		this.createGrid();
		this.createIndexBuffer();
	};

//Creates the geometry.
Geometry.prototype.createGrid =  function(){
		// must be implemented by derivated classes
		throw new Error('Not implemented');
	};


// Creo el index buffer
Geometry.prototype.createIndexBuffer = function () {
                    var col = 0;
                    var row = 0;
                    var index = 0;
                    var derecho = false;
                    this.index_buffer = [];
                    for(var i=0; i< this.levels-1; i++) {
                        derecho = !derecho;
                        for(var j = 0; j < this.faces; j++) {
                            this.index_buffer.push(index);
                            this.index_buffer.push(index + this.faces);
                            if(derecho) index++;
                            else index--;
                        }
                        if (derecho) index--;
                        else index++;
                        index += this.faces;
                    }
}


Geometry.prototype.fillAttributes = function(container) {
                        // 1. Creamos un buffer para las posicioens dentro del pipeline.
    container.position_buffer = new AttributeBuffer();
                    // 2. Cargamos la data al buffer.
    container.position_buffer.setData(3,this.position_buffer);

    container.normal_buffer =new AttributeBuffer();

    container.normal_buffer.setData(3,this.normal_buffer);
    if(Utils.isDefined(this.textGenerator)){
        container.texture_buffer = new AttributeBuffer();
        container.texture_buffer.setData(2,this.textGenerator.getTextureCoord());
    }

    if(Utils.isDefined(this.binormal_buffer)) {
        container.binormal_buffer = new AttributeBuffer();
        container.binormal_buffer.setData(3,this.binormal_buffer);
    }

    if(Utils.isDefined(this.tangent_buffer)) {
        container.tangent_buffer = new AttributeBuffer();
        container.tangent_buffer.setData(3,this.tangent_buffer);
    }
    if(Utils.isDefined(this.textGenerator)) {
        container.texture_buffer = new AttributeBuffer();
        container.texture_buffer.setData(2,this.textGenerator.getTextureCoord());
    }

    container.index_buffer = new IndexBuffer();
    container.index_buffer.setData(this.index_buffer);


                        
};

Geometry.prototype.setPositions = function(positions) {
    this.position_buffer = positions;
}

Geometry.prototype.setNormals = function(normals) {
    this.normal_buffer= normals;
}


Geometry.prototype.setTangents = function(tangents) {
    this.tangent_buffer = tangents;
}

Geometry.prototype.setBinormals = function(binormals) {
    this.binormal_buffer= binormals;
}

Geometry.prototype.getTextureBuffer = function () {
		return this.textGenerator.getTextureCoord();
}



Geometry.prototype.getTextureGenerator = function () {
		return this.textGenerator;
}
