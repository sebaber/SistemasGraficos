
var Water = function (width,  length) {
		var seg = new Segment(0,width);
		//seg.rotateX(90);
		var seg2 = new Segment(0,length);
		seg.rotateY(-90);
		var wgeom = new SweptSurface(50, 50,seg,seg2,false, new GrassTextureGenerator());
		//Model.call(this, wgeom,new WaterMaterial([0,0,1,0.9]));
		Model.call(this, wgeom, new WaterMaterial());

}

Utils.inheritPrototype(Water, Model);

// Dibujamos la grilla de vertices
Water.prototype.draw= function(){
		var gl = GLContext.getContext();
		gl.enable( gl.BLEND );
		gl.blendEquation( gl.FUNC_ADD );
		gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
        Model.prototype.draw.call(this);
        gl.disable(gl.BLEND);

	};
