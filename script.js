var canvasWidth = 490;
var canvasHeight = 220;
var canvasDiv = document.getElementById('canvasDiv');
canvas = document.createElement('canvas');
canvas.setAttribute('width', canvasWidth);
canvas.setAttribute('height', canvasHeight);
canvas.setAttribute('id', 'canvas');
canvasDiv.appendChild(canvas);
context = canvas.getContext("2d");

if(typeof G_vmlCanvasManager != 'undefined') {
	canvas = G_vmlCanvasManager.initElement(canvas);
}
	// Records user position
	$('#canvas').mousedown(function(e){
		var mouseX = e.pageX - this.offsetLeft;
		var mouseY = e.pageY - this.offsetTop;

		paint = true;
		addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
		redraw();
	});

	// Records user drawing when mouse is clicked down
	$('#canvas').mousemove(function(e){
		if(paint){
			addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
			redraw();
		}
	});

	// Records user stop drawing when mouse is clicked off
	$('#canvas').mouseup(function(e){
		paint = false;
	});

	// Records nothing when mouse leaves canvas area
	$('#canvas').mouseleave(function(e){
		paint = false;
	});

	// saves the click position
	var clickX = [];
	var clickY = [];
	var clickDrag = [];
	var paint;

	function addClick(x, y, dragging)
	{
		clickX.push(x);
		clickY.push(y);
		clickDrag.push(dragging);
	}

	// clears canvas for new redraw
	function redraw(){
	  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
	  context.strokeStyle = "#df4b26";
	  context.lineJoin = "round";
	  context.lineWidth = 5;

	  for(var i=0; i < clickX.length; i++) {		
	    context.beginPath();
	    if(clickDrag[i] && i){
	      context.moveTo(clickX[i-1], clickY[i-1]);
	     }else{
	       context.moveTo(clickX[i]-1, clickY[i]);
	     }
	     context.lineTo(clickX[i], clickY[i]);
	     context.closePath();
	     context.stroke();
	  }
	}

// bind event handler to clear button
  document.getElementById('clear').addEventListener('click', function() {
  	context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  	clickX.length = 0;
	clickY.length = 0;
	clickDrag.length = 0;
  });

