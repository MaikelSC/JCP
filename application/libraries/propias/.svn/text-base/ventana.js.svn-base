$.JCP.ventana = {
 crear: function Ventana(arregloParametros){
  this.id = arregloParametros.id;
  this.fondoblq = arregloParametros.fondoblq;
  this.btncerrar = arregloParametros.btncerrar;
  this.anclar = arregloParametros.anclar;
  this.padre = arregloParametros.padre;
  this.hijos = arregloParametros.hijos;
  this.titulo = arregloParametros.titulo;
  this.css = arregloParametros.css;

//---------------------------BloquearFondo---------------------------------------------------------------------
//Descripcion: utiliza un div del tamaño del html de la pagina ubicado por encima de los elementos de la pagina y por debajo del elemento que se va a mover, para bloquear el fondo 
//Parametros:
	//ninguno
//Retorno: vacio
		Ventana.prototype.BloquearFondo = function(contenedor){		
		var bloqueador = $('<div id="bloq"></div>').prependTo($('html'));
	    bloqueador.css({
				     position:'absolute',
				     width:$('html').width(),
				     height:$('html').height(),
				     zIndex:'2'
				    });
		contenedor.css({position:'relative', zIndex:'3'});
		}
//------------------------------------------------------------------------------------------------------------
//-------------------------------mostrarVentana---------------------------------------------------------------
//Descripcion: crea el div contenedor de la ventana, el titulo y los botones correspondientes, luego utiliza el plugging para darle movimiento.
//Parametros:
	//en este caso los parametros que utiliza son los de la clase ventana.
//Retorno: vacio
	  Ventana.prototype.mostrarVentana = function(){
	   this.contenedor = $('<div id="'+this.id+'"></div>').appendTo(this.padre);
	   var titulo = $('<div id="titulo_'+this.id+'">'+this.titulo+'</div>').prependTo(this.contenedor);
	   if(this.btncerrar){
	   	var cerrar = $('<div id="btn_cerrar">X</div>').appendTo(titulo);
		cerrar.css({float: 'right', cursor:'pointer', border: '1px solid blue', backgroundColor: 'yellow'});
		ClickCerrar(cerrar, this.contenedor, titulo);
	   }
	   if(this.fondoblq){
	   	this.BloquearFondo(this.contenedor);
	   }
	   if(this.hijos.length > 0){
	   	for(var i = 0; i < this.hijos.length; i++)
	   		this.hijos[i].appendTo(this.contenedor);
	   }
	   //this.hijos.appendTo(this.contenedor);
	   this.contenedor.css({
	   border:'1px solid blue',
	   width:'250px', height:'200',
	   backgroundColor:'green',
	   marginLeft:'250px',
	   boxShadow: '0 0 10px #000000',
	   borderRadius:'1px 1px 1px 1px'
	   
	   });
	   titulo.css({border:'1px solid black', backgroundColor:'white'});
	   if(!this.anclar){
	   	 var ventana = $.JCP.Crear('mover',{
									elementoEntrada :titulo,
									elementoAccion: this.contenedor,
									eventoEntrada : 'mousedown',
									eventoSalida : 'mouseup',
									blqFondo:false,
									persistirObj: this
									});
	     var parametros = {
	                elementos : this.contenedor,
					dir : {
//						izq : true,
						der: true,
//						arr: true,
						abj: true
					},
				}
				$.JCP.Crear('redimencionar', parametros);								
	   }
	  									 

}
//------------------------------------------------------------------------------------------------------------
   
	var EjecutarMovimiento = function(ventana){
		ventana.definirEvento();
		
	}
	var ClickCerrar = function(cerrar, contenedor, titulo){
		cerrar.bind('mousedown', function(e){
		contenedor.remove();
		e.stopPropagation();
		$('#bloq').remove();
		});
    }
	this.mostrarVentana();
 }
}