



var Model = function(geometry, material) {
	Transformable.call(this);
	this.geometry = geometry;
	this.gl = GLContext.getContext();

	// webgl buffers
	this.position_buffer = null;
	this.index_buffer = null;
     this.normal_buffer = null;

     this.text_coord_buffer = null;


     this.children = [];
     this.material = material;
	this.attributes = {};
     this._setupWebGLBuffers();
     

}

Utils.inheritPrototype(Model, Transformable);



// Seteo los buffers de webgl.
Model.prototype._setupWebGLBuffers= function(){


          if(Utils.isDefined(this.geometry)) {

                    this.geometry.fillAttributes(this.attributes);

                    if(Utils.isDefined(this.material)) {
                         this.material.fillAttributes(this.geometry.levels, this.geometry.faces, this.attributes);
                    };
          }
};


// Dibujamos la grilla de vertices
Model.prototype.draw= function(){
          // dibujo mi geometría
          //Model.prototype.contador++;
          if(Utils.isDefined(this.geometry)) {
                    var ctx = GLContext.getContext();
                    var shader = this.material.getShader();
                    if(Utils.isDefined(shader)) {
                         
                         shader.bind(this);
                         this.attributes.index_buffer.draw(GLContext.getDrawMode());
                    }
                    

           }
           //dibujo la de mis hijos.
           this._drawChildren();


	};

Model.prototype._drawChildren= function(){
     for(j in this.children) {
          this.children[j].draw();
     }


};

//Esto hace que una vez que agrego un objeto a un padre, no pueda modificarlo.

Model.prototype.add = function (child)  {
          this.children.push(child);
          child.setSuperMatrix(this.getMatrix());
}



Model.prototype.getMMatrix = function (){
     return this.getMatrix();
}

Model.prototype.getVMatrix = function (){
     return GLContext.getViewMatrix();
}


Model.prototype.getVertexAttributes = function () {
     return this.attributes;

}


Model.prototype.getPMatrix = function () {
     return GLContext.getProjectionMatrix();
}


Model.prototype.getNMatrix = function () {
     return this.getNormalMatrix();
}


Model.prototype.clear = function() {
     for(var a  in this.attributes) {
          this.attributes[a].destroy();
     }

     for(var i = 0; i < this.children.length ; i++) {
          this.children[i].clear();
     }
     this.children = [];
}


Model.prototype.setSuperMatrix = function(matrix, superRot) {
     Transformable.prototype.setSuperMatrix.call(this,matrix,superRot);
     for(j in this.children) {
          this.children[j].setSuperMatrix(this.getMatrix());
     }
}

Model.prototype.apply = function () {
     for(j in this.children) {
          this.children[j].setSuperMatrix(this.getMatrix());
     }
}

Model.prototype.getTime = function () {
     return GLContext.getTime();
}


Model.prototype.getMaterial = function() {
	return this.material;
}

//Model.prototype.contador = 0;
