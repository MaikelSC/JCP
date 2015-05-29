var scroll;
var a ={}; 
function MostrarScroll(){
   
    
	 
	$('#td_interior').children().remove();
	var conte = $('<div id="conte"></div>').appendTo($('#td_interior'));
		conte.css({
			height:700,
			width:200,
			backgroundColor:'yellow'
		});
	var intt = $('<table ><tr><td id="interior"></td></tr></table>').appendTo(conte);
		intt.css({
		    /*width:'auto',/*
			height:'auto',*/
			backgroundColor:'brown',
//			overflow:'hidden'
		});	
	$.JCP.Crear('scroll', {
					elemento: conte,
					}, Guardar);		
	var adicionar = $('<input type="button" value="Adicionar Hijo"/>').appendTo($('#td_interior'));
	var adicionar2 = $('<input type="button" value="Adicionar Derecha"/>').appendTo($('#td_interior'));
	var eliminar  = $('<input type="button" value="Eliminar Hijo"/>').appendTo($('#td_interior'));
	adicionar.click(function(){
//	alert($('#interior').width());
	      var elemento = $('<table border="1"><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr></table>').appendTo($('#interior'));
//		  alert($('#interior').width());
		elemento.css({
		  	width:600,
			height:200,
			backgroundColor:'green',
			/*float:'left'*/
		});
//		alert($('#interior').width());
		a.scroll.mostrarScroll();
	});
	
	adicionar2.click(function(){
	      var elemento = $('<table border="1"><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr></table>').appendTo($('#interior'));
		  /*$('#interior').css({
             width:4000
		  });*/
		elemento.css({
		  	width:800,
			height:200,
			backgroundColor:'green',
			/*float:'left'*/
		});
//		alert($('#interior').width());
		a.scroll.mostrarScroll();
	});
	
	eliminar.click(function(){
	 $('#interior').children(':last').remove();
	 a.scroll.mostrarScroll();
	});
	
		
	/*var elemento = $('<table border="1"><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr></table>').appendTo(conte);
		elemento.css({
		  	width:1000,
			height:1000,
			backgroundColor:'green'
		});	*/
	
		
}
function Guardar(scroll){
	a.scroll = scroll;
}