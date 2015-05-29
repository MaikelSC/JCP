function DesplazarA(){
	$('#td_interior').children().remove();
	var elemento = $('<div id="elemento"></div>').appendTo($('#td_interior'));
		elemento.css({
			width:200,
			height: 300,
			backgroundColor:'red',
			float:'left'
		});
	
	var referencia = $('<div id="referencia"></div>').appendTo($('#td_interior'));
	referencia.css({
			width:400,
			height: 700,
			backgroundColor:'yellow',
			float:'right'
		});
	var boton = $('<input type="button" value="desplazar">').appendTo($('#td_interior'));
		boton.click(function(){
				var parametros = {
					referencia : {
						elemento : referencia,
						redimencionar: true,
//						ancho:20
					},
//					redimencionar:true,
//					ancho:500,
//					x:200
				}	
				elemento.desplazarA(parametros);
		});	
		
		
}


function Redimencionar(){
	$('#td_interior').children().remove();
	
	var izq = $('<div  style="overflow: hidden; white-space: nowrap;" ></div>').appendTo($('#td_interior'));
	$('#td_interior').css({
		height: 1000,
		verticalAlign:'top'
	});
	izq.css({
		width:600,
		height: '100%',
		float:'left',
//		backgroundColor:'red'
	});
	
	var cont = $('<div  style="overflow: hidden; white-space: nowrap;" ></div>').appendTo(izq);
	cont.css({
		width:200,
		height: 300,
		left:200,
		top:100,
		backgroundColor:'green'
	});
	
	var der = $('<div  style="overflow: hidden; white-space: nowrap;" ></div>').appendTo($('#td_interior'));
	der.css({
		width:600,
		height: '100%',
		backgroundColor:'red',
		position:'relative',
//		left:800,
		float:'right'
	});
	
	var cont2 = $('<div  style="overflow: hidden; white-space: nowrap;" ></div>').appendTo(der);
	
		cont2.css({
		width:200,
		height: 300,
		position:'relative',
		left:200,
		top:100,
		backgroundColor:'white'
	});	
	
	var elemento = $('<div id="elemento"></div>').appendTo(cont);
		elemento.css({
			width:600,
			height: 600,
			backgroundColor:'white',
		});
		
		var elemento1 = $('<div id="elemento1"></div>').appendTo(cont);
		elemento1.css({
			width:200,
			height: 300,
			backgroundColor:'black',
		});
		
	var parametros = {
	                elementos : cont,
					ademas: cont2,
					dir : {
						izq : true,
						der: true,
						arr: true,
						abj: true
					},
				}
				$.JCP.Crear('redimencionar', parametros);
				
	var parametros = {
	                elementos : cont2,
					ademas: cont,
					dir : {
						izq : true,
						der: true,
						arr: true,
						abj: true
					},
				}
				$.JCP.Crear('redimencionar', parametros);			
}