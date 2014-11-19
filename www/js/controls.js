var leftPressed = false;
var rightPressed = false;
var upPressed = false;

function update() {
	var p = $("#player1");
	
	var transRegExp = /translate\((-?[0-9\.]+),(-?[0-9\.]+)\)/;
	var trans = transRegExp.exec(p.attr("transform"));
	var ox = Number(trans[1]);
	var oy = Number(trans[2]);
	
	var sumX = 0;
	var sumY = 0;
	
	$('g.forces line').each(function() {
		sumX += Number($(this).attr("x2"));
		sumY += Number($(this).attr("y2"));
	});
	
	var groundY = $('svg').get(0).viewBox.baseVal.height - 200;
	var sceneWidth = $('svg').get(0).viewBox.baseVal.width;

	if(Math.abs(sumX) <= 1) sumX = 0;
	if(Math.abs(sumY) <= 1) sumY = 0;
	$('line.acceleration').attr("x2",sumX);
	$('line.acceleration').attr("y2",sumY);

	var speedX = Number($('line.speed').attr("x2")) + sumX;
	var speedY = Number($('line.speed').attr("y2")) + sumY;
	if(Math.abs(speedX) <= 10) speedX = 0;
	if(Math.abs(speedY) <= 10) speedY = 0;
	
	$('line.speed').attr("x2",speedX);
	$('line.speed').attr("y2",speedY);
	
	var pWidth = Number(p.find("image").attr("width"));
	var nx = ox + speedX;
	if(nx > sceneWidth) {
		nx = - pWidth;
	} else if (nx < - pWidth) {
		nx = sceneWidth;
	}
	var ny = oy + speedY;
	
	// Update forces for next round
	$('g.forces line.horizontal').attr("x2", 0);
	$('g.forces line.vertical').attr("y2", 0);
	if(ny >= groundY) {
		// We're on the ground
		ny = groundY;
		$('g.forces line.reaction').attr("y2", - Number($('g.forces line.gravity').attr("y2")));
		$('g.forces line.friction').attr("y2", 0);
		$('line.speed').attr("y2",0);
		if(leftPressed && !rightPressed) {
			$('g.forces line.horizontal').attr("x2",-60);	
		}
		if(!leftPressed && rightPressed) {
			$('g.forces line.horizontal').attr("x2",60);	
		}
		if(upPressed) {
			$('g.forces line.vertical').attr("y2",-150);
		}
		$('g.forces line.friction').attr("x2", 0.01 * (speedX * speedX) * (speedX > 0 ? -1 : 1));
	} else {
		// We're in the air
		$('g.forces line.reaction').attr("y2", 0);
		$('g.forces line.friction').attr("y2", 0.01 * (speedY * speedY) * (speedY > 0 ? -1 : 1));
		$('g.forces line.friction').attr("x2", 0.001 * (speedX * speedX) * (speedX > 0 ? -1 : 1));
	}
	console.log("translate("+nx+","+ny+")");
	p.attr("transform","translate("+nx+","+ny+")");
}

$(function(){
	$('body').on('keydown',function(evt) {
		if(evt.keyCode == 37) {
			leftPressed = true;
		} else if(evt.keyCode == 38) {
			upPressed = true;
		} else if(evt.keyCode == 39) {
			rightPressed = true;
		} else if(evt.keyCode == 40) {
			downPressed = true;
		}
	});
	$('body').on('keyup',function(evt) {
		if(evt.keyCode == 37) {
			leftPressed = false;
		} else if(evt.keyCode == 38) {
			upPressed = false;
		} else if(evt.keyCode == 39) {
			rightPressed = false;
		} else if(evt.keyCode == 40) {
			downPressed = false;
		}
	});
	
	setInterval(update,100);
});


