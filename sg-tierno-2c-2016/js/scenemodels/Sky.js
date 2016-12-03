
function Sky() {
	var sp = new Sphere(30,new TextureGenerator(-1,1,true));
	Model.call(this, sp, new TexturedMaterial({texture:"sky.jpg", enableLight: false}));
	

}


Utils.inheritPrototype(Sky, Model);