$.JCP.arrastrarSoltar = {
	objTemp : null,
	crear: function ArrastrarSoltar(arregloParametros){
	$.extend(this, $.JCP.arrastrarSoltar.opcionesDefecto, arregloParametros);	 
//-----------------------------------------------------------------------------------------------
	
	var obj = this;
	this.seleccionNueva = this.elemento.each(function(){
		if(obj.seleccionNueva == undefined)
			obj.seleccionNueva = $(this);
		else	
			obj.seleccionNueva.add($(this));	
	}); 
	 this.obj_selecc = $.JCP.Crear('seleccionar', {
													elementos : this.elementosSeleccionar,
												    elementoContenedor: this.padre,				
													sincrono:true,
													elementoMouseDown: this.padre.parent(),
													mostrarDivSeleccion : true,
													persistirObj : this
												   });	
	 ArrastrarSoltar.prototype.declarar = function(seleccion){
	 var obj = this;
	 if(seleccion == undefined)
	 	var arreglo = this.elemento;
	else	
		var arreglo = seleccion;	
	 arreglo.each(function(){
	    $(this).hover(function(ev){
		   	obj.Arrastrar($(this));
		
		}, function(){
		});	   
	  });
	 this.PadresUp();
	 }
	 

//-----------------------------------------------------------------------------------------------
   ArrastrarSoltar.prototype.Arrastrar = function(elemento){
    var obj= this;
   	elemento.bind('mousedown', function(e){
	     e.stopPropagation();
		 e.preventDefault();
		 obj.siSeleccionados =  obj.elemento.filter('.seleccionado');
		 obj.noSeleccionados =  obj.elemento.filter(':not(.seleccionado)');
		 if(!e.ctrlKey && !e.shiftKey && $(this).hasClass('seleccionado')){
		   obj.padreAnterior = $(this).parent().attr('id');
			$(this).one('mousemove', function(e){
			  obj.div_selec = obj.DivSeleccion(e, obj.siSeleccionados, elemento);	
			  $.JCP.arrastrarSoltar.objTemp = obj;
			  e.stopPropagation();
			  e.preventDefault();
			});
		 }		
	   });
	   elemento.bind('mouseup', function(e){
	   	 $(this).unbind('mousemove');
	   });
   }
   
   ArrastrarSoltar.prototype.PadresUp = function(){
	var obj = this;
   	this.padre.parent().bind('mouseup',function(e){
	//alert($(this).attr('id'));
	 if($.JCP.arrastrarSoltar.objTemp != null)
	  if($.JCP.arrastrarSoltar.objTemp.padreAnterior != obj.padre.attr('id')&& $('#div_seleccion').length > 0){
	  	
		$.JCP.arrastrarSoltar.objTemp.seleccionClonada.each(function(){       
			    $(this).appendTo(obj.padre);
				$(this).removeClass('shiftInicio');
				$(this).removeClass('shiftFin');
				$(this).css({backgroundColor:''});
			    $(this).removeClass('seleccionado');
			    $(this).addClass('seleccionable');
                obj.seleccionar.declararEventosElemento($(this));
				obj.declarar($(this));
				obj.elemento = $.merge(obj.elemento, $(this));
		   });
		   if(obj.scroll != undefined)
		   		obj.scroll.mostrarScroll();
		   $.JCP.arrastrarSoltar.objTemp.siSeleccionados.remove(); 
		   $.JCP.arrastrarSoltar.objTemp.elemento = $.JCP.arrastrarSoltar.objTemp.noSeleccionados;
		   if($.JCP.arrastrarSoltar.objTemp.scroll != undefined)
		   		$.JCP.arrastrarSoltar.objTemp.scroll.mostrarScroll();
		   $.JCP.arrastrarSoltar.objTemp.seleccionar.elementos = $.JCP.arrastrarSoltar.objTemp.noSeleccionados;
		   $.JCP.arrastrarSoltar.objTemp.div_selec.remove();
		   $.JCP.arrastrarSoltar.objTemp.padreAnterior = null; 		 
	     }
	  });
   }
   ArrastrarSoltar.prototype.DivSeleccion = function(e, seleccion, elemento){
   	  var div_selec = $('<div id="div_seleccion"></div>').appendTo($('html'));
	  this.seleccionClonada = seleccion.clone().appendTo(div_selec)
	  .css({
	    backgroundColor:''
		});
	  
	  div_selec.css({
	            width: elemento.width(),
				height: seleccion.length*elemento.height(),
				border: '1px solid #226175', 
				position:'absolute',
				top: e.pageY + 10,
				left: e.pageX + 10,
				zIndex: 2,
				opacity: 0.5,
				backgroundColor:'#c6e2ff',
				boxShadow: '0 0 10px #000000',
	   			borderRadius:'4px 4px 4px 4px'
		});
	  $('html').bind('mousemove',function(e){
	   div_selec.css({
	            top: e.pageY + 10,
				left: e.pageX + 10
	            });
	  })
	  .bind('mouseup', function(ev){
	    $(this).unbind('mousemove');
		div_selec.animate({
		  top: e.pageY,
		  left: e.pageX
		},500,"linear",
		function(){
		 div_selec.remove();
		});		
	  });
	  return div_selec;
    }
	ArrastrarSoltar.prototype.adicionarElemento = function(elemento){
		var obj= this;
		elemento.removeClass('shiftInicio');
		elemento.removeClass('shiftFin');
			
		this.seleccionar.declararEventosElemento(elemento);
		this.declarar();
		this.elemento = $.merge(this.elemento, elemento);
	}
   this.declarar();
   },
	 opcionesDefecto:{
   }
   
}