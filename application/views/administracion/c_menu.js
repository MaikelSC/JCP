$(document).ready(function() { 
   $.urlServer = "http://10.0.0.2:5900";
   $('html').css({
		height:'100%'
	});
    var boton = $.Elementos.crearBoton('idprueba', "aceptar");
//    $.Elementos.crearFieldSet("idfield", $('#td_interior'), boton, "Esto es una prueba", "center");
    var arregloItmes = new Array("Contenedores" , "Paneles", "Carga", "Scroll", "Efectos","Imagenes");
    var arregloSubItmes = new Array("Formulario" , "Ventana", "Listado", "-" , "Arrastre" , "Tabs", "-" , "Album1", "Album2", "-" , "Ejemplo Scroll", "-", "Desplazar A", "Redimencionar", "-", "Tirilla Imagenes");   
    var arregloHrefSubItems = new Array(MostrarFormulario , MostrarVentana,  ListadoEjemplo, "-" , MostrarPanelArrastre, MostrarTabPanels, "-", GestionarAlbum1, GestionarAlbum2, "-", MostrarScroll, "-", DesplazarA, Redimencionar, "-", EjecutarTirilla);
	var padreMenu = $('#td_menu'); 
             CrearMenu(padreMenu , arregloItmes , arregloSubItmes , arregloHrefSubItems);
//	
$('#menu').children().find('.divCont').fadeOut(0);
$('#menu').css({
   backgroundImage:'url("/cantante/application/libraries/Propias/imagenes/fondoMenu.png")'
});
//	$('ul').fadeOut();	
   $('#menu ul').css({
	    listStyle: 'none',
		padding:'0px',
    });
	
	$('.item').css({
         backgroundImage:'url("/cantante/application/libraries/Propias/imagenes/fondoMenu.png")',
		 float:'left', 
		 padding:'8px',
		 paddingRight:'20px',
		 width:'80px',
		 fontSize:'18px',
		 fontWidth:'bold'
		 
	});
		
	$('.padreI').parent().css({
	    position:'relative'
	}); 
	
	$('.divCont').css({
	     backgroundColor:'white',
	    position:'absolute',
		zIndex:'2',
		border:'1px solid #DADADA',
		borderTop:'none',
		width:'200px',
		paddingTop:'20px',
		paddingBottom:'10px',
	});
	
	$('.subItem').css({   
	    fontSize:'18px',
		 fontWidth:'bold',
		 padding:'7px',	
		paddingRight:'20px',
        backgroundColor:'white',		
        display:'block'
	});
	
	$('.subItem').hover(function(){
		$(this).css({
			backgroundColor:'#e5e5e5'
		});
	}, function(){
	    $(this).css({
			backgroundColor:'white'
		});
	}); 
	 
	$('.padreI').hover(function(){
	     $(this).find('.divCont').addClass("mostrar");
		 $(this).css({
		     cursor:'pointer'
		 });
	     var referencia = $(this).find('.item');
		 var contDiv = $(this).find('.divCont');
	     setTimeout(function(){
           if(contDiv.hasClass("mostrar")){		   	  
			referencia.css({
			    backgroundPosition:'left center'
			});
			     contDiv.css({
				      position:'absolute',
					  zIndex:'2',
					  top:referencia.height()+14,
					  left:referencia.offset().left-23
				 });
			     contDiv.slideDown('slow');
		   }
          }, 500);  
	}, function(){	        
	         $(this).find('.divCont').removeClass("mostrar");
			 $(this).css({
		     	cursor:'normal'
		     });
	         var referencia = $(this).find('.item');
			 
			var contDiv = $(this).find('.divCont');
			 contDiv.slideUp('fast', function(){
			 								referencia.css({
			    backgroundPosition:'left top'
			});
			 						 });			
	});
});

function ListarNoticias(){
//	alert('asdf');
}