
jQuery.fn.Desenhar = function(idCanvas,Width,Height) {
	if(!Width)
		Width = this.width();
	if(!Height)
		Height = this.height();

	var canvas;
	var context;
	var padding = 25;
	var lineWidth = 8;
	var clickX = new Array();
	var clickY = new Array();
	var clickColor = new Array();
	var clickTool = new Array();
	var clickSize = new Array();
	var clickDrag = new Array();
	var paint = false;
	var curColor = '#000';
	var curTool = "marker";
	var curSize = "normal";
	var drawingAreaX = 0;
	var drawingAreaY = 0;

	
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', Width);
	canvas.setAttribute('height', Height);
	canvas.setAttribute('id', idCanvas);
	this.append(canvas);
	$('#'+idCanvas).css('border','1px solid #000');
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}
	context = canvas.getContext("2d"); 

	$('#'+idCanvas).mousedown(function(e)
	{
		// Mouse down location
		var mouseX = e.pageX - this.offsetLeft;
		var mouseY = e.pageY - this.offsetTop;
		paint = true;
		addClick(mouseX, mouseY, false);
		redraw();
	});

	$('#'+idCanvas).mousemove(function(e){
		if(paint==true){
			addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
			redraw();
		}
	});
	
	$('#'+idCanvas).mouseup(function(e){
		paint = false;
	  	redraw();
	});
	
	$('#'+idCanvas).mouseleave(function(e){
		paint = false;
		redraw();
	});
	function addClick(x, y, dragging)
	{
		clickX.push(x);
		clickY.push(y);
		clickTool.push(curTool);
		clickColor.push(curColor);
		clickSize.push(curSize);
		clickDrag.push(dragging);
	}


	function clearCanvas()
	{
		context.clearRect(0, 0, Width, Height);
	}


	function redraw()
	{
		var locX;
		var locY;

		if(curSize == "small"){
			locX = 467;
		}else if(curSize == "normal"){
			locX = 450;
		}else if(curSize == "large"){
			locX = 428;
		}else if(curSize == "huge"){
			locX = 399;
		}
		locY = 189;
		context.beginPath();
		context.rect(locX, locY, 2, 12);
		context.closePath();
		context.fillStyle = '#333333';
		context.fill();	
		context.save();
		context.beginPath();
		context.rect(drawingAreaX, drawingAreaY, Width, Height);
		context.clip();
			
		var radius;
		var i = 0;
		for(; i < clickX.length; i++)
		{		
			if(clickSize[i] == "small"){
				radius = 2;
			}else if(clickSize[i] == "normal"){
				radius = 5;
			}else if(clickSize[i] == "large"){
				radius = 10;
			}else if(clickSize[i] == "huge"){
				radius = 20;
			}else{
				alert("Error: Radius is zero for click " + i);
				radius = 0;	
			}
			
			context.beginPath();
			if(clickDrag[i] && i){
				context.moveTo(clickX[i-1], clickY[i-1]);
			}else{
				context.moveTo(clickX[i], clickY[i]);
			}
			context.lineTo(clickX[i], clickY[i]);
			context.closePath();
			
			if(clickTool[i] == "eraser"){
				context.globalCompositeOperation = "destination-out"; // To erase instead of draw over with white
			}else{
				context.globalCompositeOperation = "source-over";	// To erase instead of draw over with white
				context.strokeStyle = clickColor[i];
			}
			context.lineJoin = "round";
			context.lineWidth = radius;
			context.stroke();
			
		}
		context.globalCompositeOperation = "source-over";// To erase instead of draw over with white
		context.restore();
	}
	redraw();

	html = '<div id="'+idCanvas+'-acoes">'+
	'<div class="form-group" style="width:45px">'+
                        '<label>Cor</label>'+
                       ' <div class="input-group my-colorpicker2">'+
                           '<input type="text" class="form-control color-input" style="display: none" value="#000">'+
                            '<div class="input-group-addon" style="border:1px solid #000"><i></i></div>'+
                       ' </div>'+
                    '</div>'+
                    '<button type="button" class="btn btn-success btn-ferramentas" data-tool="marker">Pincel</button>'+
                    '<button type="button" class="btn btn-infor btn-ferramentas" data-tool="eraser">Borracha</button><br>'+
                    '<button type="button" class="btn btn-infor btn-tamanho" data-tool="huge">Enorme</button>'+
                    '<button type="button" class="btn btn-infor btn-tamanho" data-tool="large">Grade</button>'+
                   ' <button type="button" class="btn btn-success btn-tamanho" data-tool="normal">Normal</button>'+
                    '<button type="button" class="btn btn-infor btn-tamanho" data-tool="small">Pequeno</button>'+
                    '<button type="button" class="btn btn-infor btn-teste" data-tool="small">Pequeno</button>'+
                   '</div>';
      this.before(html);

	$('#'+idCanvas+'-acoes .btn-ferramentas').click(function() {
        $('#'+idCanvas+'-acoes .btn-ferramentas').removeClass('btn-success').addClass('btn-infor');
        $(this).removeClass('btn-infor').addClass('btn-success');
        curTool = $(this).attr('data-tool');
    });

    $('#'+idCanvas+'-acoes .btn-tamanho').click(function() {
        $('#'+idCanvas+'-acoes .btn-tamanho').removeClass('btn-success').addClass('btn-infor');
        $(this).removeClass('btn-infor').addClass('btn-success');
        curSize = $(this).attr('data-tool');
    });
    $('#'+idCanvas+'-acoes .my-colorpicker2').colorpicker().on('changeColor',
            function(ev) {
                curColor = $('#'+idCanvas+'-acoes .color-input').val();
            });

}
