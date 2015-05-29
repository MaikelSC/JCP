$(document).ready(function() { 
     $('body').css({
	 	backgroundColor:'blue'
	 });
    
    $('#contenedor').css({
		margin:'2.5%',
		backgroundColor:'red',
		height:'650px',
//		width:'1450px'
	});
	
	$('#cuerpo_pagina').css({
		margin:'2.5%',
		backgroundColor:'red',
		height:'650px',
		width:'95%',		
		position:'absolute'
	});
	
	$('#banner').css({
		backgroundColor:'yellow',
		height:100
	});
	
	$('#izq').css({
		backgroundColor:'white',
		height:'552px',
		width:'25%',
		float:'left'
	});
	
	$('#centro').css({
		backgroundColor:'green',
		height:'552px',
		width:'50%',
		float:'left'
	});
	
	$('#der').css({
		backgroundColor:'white',
		height:'552.5px',
		width:'25%',
		float:'right'
	});
	////Noticias
	var css = {
	        position:'absolute',
	  		backgroundColor:'orange',
//			backgroundImage:'url("/cantante/application/facebook_256.png")',
			backgroundRepeat:'no-repeat'
			}; 
	var noticias = new VentanaPopup($('#izq'), 'noticias', 'Noticias', 'asdfasd', css, 3, 60, 7, 25, 70);
	noticias.construir();
	//////Conciertos
	var css = {
	        position:'absolute',
	  		backgroundColor:'orange'
			};
	var conciertos = new VentanaPopup($('#izq'), 'conciertos', 'Conciertos', 'asdfaasdfsd', css, 8, 25, 8, 30, 72 );
	conciertos.construir();
	///Fans
	var css = {
	        position:'absolute',
	  		backgroundColor:'orange'
			}; 		
	var fans = new VentanaPopup($('#der'), 'clubFan', 'Club de Fans', 'asdfaasdfsd', css, 5, 25 , 75, 35, 83 );
	fans.construir();
});

function VentanaPopup(padre, id, titulo, contenido, css, aumento, top, left , alto, ancho) {
    this.padre = padre;
    this.id = id;
    this.titulo = titulo;
    this.contenido = contenido;
    this.css = css;
	this.aumento = aumento;
	this.left = left;
	this.top = top;
	this.alto = alto*padre.height()/100;
	this.ancho = ancho*padre.width()/100;	
	VentanaPopup.prototype.objGuardado = null; 
	
	VentanaPopup.prototype.construir = function(){
        var popup = $('<div id="'+this.id+'"></div>').appendTo(this.padre);
		this.popup = popup;
		popup.css(css);
		popup.height(this.alto);
		popup.width(this.ancho);
		popup.css({
			left:this.left*$('html').width()/100,
			top:this.top*$('html').height()/100
		});
	    var titulo = $('<div class="tituloPopup">'+this.titulo+'</div>').appendTo(popup);
		titulo.css({
			width:'100%',
			height:'25px',
			backgroundColor:'blue'
		});
		var cerrar = $('<div class="cerrar">X</div>').appendTo(titulo);
		    cerrar.css({
				float:'right',
				display:'none'
			});
		var interior = $('<div >'+this.contenido+'</div>').appendTo(popup);	
		interior.css({
			width:'100%',
			height:'100px'
		});
		this.aumentoAlto = popup.parent().height()*aumento/100;
		this.aumentoAncho = popup.parent().width()*aumento/100;		
		this.declararHover();
		this.declararClick();
		
     }
	 
	VentanaPopup.prototype.declararHover = function(){
	   var popup = this.popup;
	   var left = this.left;
	   var top = this.top;
	   var aumentoAlto = this.aumentoAlto;
	   var aumentoAncho = this.aumentoAncho;
	   var ejecutarHover = this.ejecutarHover;
	   var obj = this;
       popup.hover(function(){
	      ejecutarHover(obj);
	 }, function(){
	    if(popup.hasClass('aumentada')){
			var nuevoAncho = $(this).width() - 2*aumentoAncho;
        	var nuevoAlto = $(this).height() - 2*aumentoAlto;
			$(this).css({width: nuevoAncho, height: nuevoAlto, left:left*$('html').width()/100, top: top*$('html').height()/100});
			popup.removeClass('aumentada');
		}	    
	 });
     }
	 
	 VentanaPopup.prototype.ejecutarHover = function(obj){
	 
	   var popup = obj.popup;
	   var left = obj.left;
	   var top = obj.top;
	   var aumentoAlto = obj.aumentoAlto;
	   var aumentoAncho = obj.aumentoAncho;
//	   alert('asdf');
	   if(!popup.hasClass('clickeada')){ 	   
		        var nuevoAncho = popup.width() + 2*aumentoAncho;
		        var nuevoAlto = popup.height() + 2*aumentoAlto;
				
			  	popup.css({width: nuevoAncho, height: nuevoAlto, left: popup.offset().left - aumentoAncho  , top: popup.offset().top - aumentoAlto});
		  		popup.addClass('aumentada');
			}
	 }
	 
	 VentanaPopup.prototype.declararClick = function(){
	   var popup = this.popup;
	   var left = this.left;
	   var top = this.top;
	   var alto = this.alto;
	   var ancho = this.ancho;
	   var aumentoAlto = this.aumentoAlto;
	   var aumentoAncho = this.aumentoAncho;
	   var cursorMinimizar;
	   var ejecutarHover = this.ejecutarHover;
	   var obj = this;
	   	   
       popup.click(function(){	 
	   var objGuardado = obj.objGuardado;  	        		  
          if(popup.hasClass('aumentada')){
		     var salvaPos = $('#salvaPos');
		     var posicionado = $('.posicionado');
			 if(posicionado.attr("id") != undefined){
			    posicionado.find('.cerrar').css({
			 		display:'none'
			    });
                 if(posicionado.attr("id") != undefined)
				 posicionado.parent().bind('mousemove',function(e){
		    					cursorMinimizar = e;
		  					});
				 posicionado.removeClass('clickeada');			
			 	 posicionado.animate({
		 		 width: salvaPos.width(),
				 height: salvaPos.height(),
		  		 left: salvaPos.offset().left,
		  		 top: salvaPos.offset().top, 				 
				 }, function(){				 			
				 			posicionado.removeClass('aumentada');
							if(cursorMinimizar != undefined){
//							alert('1');
								if(VerificarHoveriado(posicionado , cursorMinimizar)){
									ejecutarHover(objGuardado);
//									alert('2');
								}
								
							}
							
							posicionado.parent().unbind('mousemove');
					});
				salvaPos.remove();
				 
				
				posicionado.removeClass('posicionado');
			 }
		     var salvaPos = $('<div id="salvaPos"></div>').appendTo($('html'));// esto es para salvar la posicion del popup y el ancho cuando se mueve hacia el centro
			 	 salvaPos.css({
				 	position: 'absolute',
					zIndex:'2',
					left:left*$('html').width()/100,
					top:top*$('html').height()/100,
					width:ancho,
					height:alto,
					/*visibility:'hidden'*/
					backgroundColor:'black'
				 });
		  	 popup.animate({
		 		 width: $('#centro').width(),
				 height: $('#centro').height(),
		  		 left: $('#centro').offset().left ,
		  		 top: $('#centro').offset().top 				 
				 });
			 popup.find('.cerrar').css({
			 	display:'inherit'
			 });
		 	 popup.addClass('clickeada');
		 	 popup.addClass('posicionado');
			 popup.removeClass('aumentada');
			 if(posicionado.attr("id") != undefined)
		  VentanaPopup.prototype.objGuardado = obj;
		  }
		  	
//		  alert(this.objGuardado);	 	 
	   }); 
	    popup.find('.cerrar').click(function(e){
		       popup.parent().bind('mousemove',function(e){
		    		cursorMinimizar = e;
		  });
		      popup.find('.cerrar').css({
			 	display:'none'
			 });			 
		  	    popup.animate({
		 		 width: ancho,
				 height: alto,
		  		 left: left*$('html').width()/100 ,
		  		 top: top*$('html').height()/100 				 
				 }, function(){
				        popup.removeClass('aumentada');
						if(VerificarHoveriado(popup , cursorMinimizar))
							ejecutarHover(obj);
						popup.parent().unbind('mousemove');	
											 			   	
				 	});
			 $('#salvaPos').remove();
		 	 popup.removeClass('clickeada');
			 popup.removeClass('posicionado');
			 e.stopPropagation();
		  }); 
     }
}

function VerificarHoveriado(elemento, e){
	if(e.pageX > elemento.offset().left && e.pageX < elemento.offset().left + elemento.width() && e.pageY > elemento.offset().top && e.pageY < elemento.offset().top + elemento.height())
	return true;
	return false;
}
