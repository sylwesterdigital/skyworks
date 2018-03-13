
/*

	Dev - Test animation for recruitment

	by Sylwester Mielniczuk
	https://mielniczuk.com/blog/me/
	flaboy.com@gmail.com
	
	SYLWESTER / DIGITAL SOLUTIONS / FLABOY.COM@GMAIL.COM / +44 7435095295 / 86-90 PAUL STREET, LONDON, EC2A 4NE
	

*/



"use strict"; 

var stage, queue, anim, tw, es, ticker;

function init() {
	
	console.log('init');
	
	tw = createjs.Tween;
	es = createjs.Ease;
	ticker = createjs.Ticker;
	
	// RAF true - is not working when window not active
	//ticker.useRAF = true;	
	stage = new createjs.Stage("anim");
	
	anim = {};

	ticker.setFPS(60);
	ticker.addEventListener("tick", stage);	
	
	loadImage();
	
	//
	setTimeout(stopAllAnims, 15000);
}

function stopAllAnims() {
	
	console.log('stop after 15 seconds');
	
	tw.removeAllTweens();
}

function attach(id) {
	var im = queue.getResult(id);
	var bm = new createjs.Bitmap(im);
	bm.name = 'id';
	stage.addChild(bm);
	bm.visible = false;
	anim[id] = bm;
	//return bm;
}

function fadeSet(set,cb) {
	var l = set.length;
	for(var i=0; i<l; i++) {
		var r = set[i];
		tw.get(r)
		.to({alpha:0},500)
	
	}
	
	tw.get()
		.wait(500)
		.call(function() {
		window[cb]();
	});	
	
}

function setStage(r) {
	
	for(var i=0; i<r.length; i++) {
		attach(r[i].id);
	}
	
	frame1();
	
}

var images = [
		{ id: "bg1", src: "images/bg1.png"},
/*		{ id: "bg2", src: "images/bg2.png"},*/
		{ id: "copy1a", src: "images/copy1a.png"},
		{ id: "copy1b", src: "images/copy1b.png"},
		{ id: "prod1", src: "images/prod1.png"},
		{ id: "prod2", src: "images/prod2.png"},
		{ id: "copy2a", src: "images/copy2a.png"},
		{ id: "copy2b_shadow", src: "images/copy2b_shadow.png"},
		{ id: "copy2b", src: "images/copy2b.png"},
		{ id: "copy2c", src: "images/copy2c.png"},
		{ id: "copy3a", src: "images/copy3a.png"},
		{ id: "copy3b", src: "images/copy3b.png"},
		{ id: "copy3c", src: "images/copy3c.png"},
		{ id: "copy3d", src: "images/copy3d.png"},
		{ id: "cta_shape", src: "images/cta_shape.png"},
		{ id: "cta_shine", src: "images/cta_shine.png"},
		{ id: "cta_copy", src: "images/cta_copy.png"},
		{ id: "sky", src: "images/sky.png"}	
]


function loadImage() {

	queue = new createjs.LoadQueue();
	queue.on("complete", function(e) {
		
		console.log('complete',e);
		
		setStage(images);
		
	});
	
	queue.loadManifest(images);

}


/*

	animation frames
	
*/

function frame1() {
	
	console.log('frame1',ticker.getTime());
	
	anim.bg1.visible = true;
	anim.sky.visible = true;
	anim.prod1.visible = true;
	anim.prod2.visible = true;
	
	tw.get(anim.copy1a)
		.wait(50)
		.to({alpha:0, visible:true},0)
		.to({alpha:1},1000)
	
	tw.get(anim.copy1b)
		.wait(1000)
		.to({alpha:0, visible:true},0)
		.to({alpha:1},1000)
		.wait(2300)
		.call(function() {
			fadeSet([anim.copy1a,anim.copy1b,anim.prod1,anim.prod2],'frame2');
		})
	
}




function frame2() {
	
	console.log('frame2',ticker.getTime());
	
	tw.get(anim.copy2a)
		.wait(100)
		.to({alpha:0, visible:true},0)
		.to({alpha:1},1000)

	tw.get(anim.copy2b)
		.to({y:-250,visible:true})
		.wait(400)
		.to({y:0},1000,es.bounceOut)

	tw.get(anim.copy2b_shadow)
		.to({alpha:0,visible:true})
		.wait(400)
		.to({alpha:1},1000,es.bounceOut)
	
	tw.get(anim.copy2c)
		.wait(600)
		.to({alpha:0, visible:true},0)
		.to({alpha:1},1000)
		.wait(2200)
		.call(function() {
			fadeSet([anim.copy2a,anim.copy2b,anim.copy2b_shadow,anim.copy2c],'frame3'); 
		})		
	
}




function frame3() {
	
	console.log('frame3', ticker.getTime());

	// this asset is in photoshop file
/*	tw.get(anim.bg2)
		.wait(10)
		.to({alpha:0, visible:true},0)
		.to({alpha:1},600)	*/
	
	tw.get(anim.cta_shape)
		.wait(10)
		.to({alpha:0, visible:true},0)
		.to({alpha:1},200)
	
	tw.get(anim.cta_copy)
		.wait(10)
		.to({alpha:0, visible:true},0)
		.to({alpha:1},200)
	
	tw.get(anim.copy3a)
		.wait(10)
		.to({alpha:0, visible:true},0)
		.to({alpha:1},1000)	

	tw.get(anim.copy3b)
		.wait(400)
		.to({alpha:0, visible:true},0)
		.to({alpha:1},1000)	

	tw.get(anim.copy3c)
		.wait(800)
		.to({alpha:0, visible:true},0)
		.to({alpha:1},1000)	

	tw.get(anim.copy3d)
		.wait(1200)
		.to({alpha:0, visible:true},0)
		.to({alpha:1},1000)	

	tw.get(anim.cta_shine)
		.wait(1600)
		.to({y:-20,alpha:0, visible:true},0)
		.to({y:0,alpha:1},1000,es.cubicInOut)
		.call(function() {
			console.log('End time: '+ticker.getTime());
		})
	
}



