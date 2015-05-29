$.JCP.panelesArrastre = {
    objTemp : null,
	crear: function PanelesArrastre(arregloParametros){
	$.extend(this, $.JCP.panelesArrastre.opcionesDefecto, arregloParametros);	 
//-----------------------------------------construirPanel-----------------------------------------------------
	 PanelesArrastre.prototype.construirPanel = function(){
	 var obj = this;
	 $.JCP.panelesArrastre.objTemp = null;
	 this.panel = $('<div id="'+this.id+'"></div>').appendTo(this.padre);	 
     var titulo = $('<div id="titulo_'+this.id+'">'+this.titulo+'</div>').prependTo(this.panel);
	 if(this.add){
	 	var fila_add = $('<div id="id_add"></div>').appendTo(this.panel); 
		var text = $.Elementos.crearText(1, 'id_add_pan', 'add_pan').appendTo(fila_add).css({margin:5, width:this.izq.ancho*0.55});
		var ejecfunc = function(){
		                if(text.val() != ''){
						var elemento = $('<div id="'+obj.div_izq.find('div').length+'" class = "elementos" >'+text.val()+'</div>').appendTo(obj.div_izq);
						elemento.css({width:'55%', marginLeft:5});
						$.JCP.arrastrarSoltar.objTemp.adicionarElemento(elemento);
						}
					 }
		var boton = $.Elementos.crearBoton('id_btn_add', 'Adicionar', ejecfunc).appendTo(fila_add);
	}
	 var tab_paneles = $('<table id="tab_'+this.id+'_paneles"></table>').appendTo(this.panel);
	 var fila_paneles = $('<tr></tr>').appendTo(tab_paneles);
	 var col_pan_izq = $('<td></td>').appendTo(fila_paneles); 
	 var col_pan_btns = $('<td align ="center"></td>').appendTo(fila_paneles); 
	 var col_pan_der = $('<td align = "right"></td>').appendTo(fila_paneles); 
	 var div_btns = $('<div id="div_'+this.id+'_btns"></div>').appendTo(col_pan_btns);
	 var div_titulo_izq = $('<div id="Tit_div_'+this.id+'_izq">'+this.izq.titulo+'</div>').appendTo(col_pan_izq);
	 div_titulo_izq.css({
	        width: this.izq.ancho,
	 });
	 this.div_padre_izq = $('<div id="panel_izq" class = "panelPadre"></div>').appendTo(col_pan_izq);
	 this.div_padre_izq.css({
		 	width: this.izq.ancho,
			height:this.izq.alto
		 });
	 this.div_izq = $('<div id="div_'+this.id+'_izq" class = "panelDatos"></div>')
	 .appendTo(this.div_padre_izq)
	 .css({
	 		width: '98%',
			//height:'99%'
	 });
	 
	 $.consultaAjax.ejecutar({
				url: this.izq.url,
				persistir: obj,
				async:false,
				accionCorrecta: obj.llenarPanelIzq						
				});
	
	 var div_titulo_der = $('<div id="div_'+this.id+'_der" align = "left">'+this.der.titulo+'</div>').appendTo(col_pan_der);
	 div_titulo_der.css({
	        width: this.der.ancho,
			align:'left'
	 });
	 this.div_padre_der = $('<div id="panel_der" class = "panelPadre" align = "left"></div>').appendTo(col_pan_der);
	 this.div_padre_der.css({
		 	width: this.der.ancho,
			height:this.der.alto,
//			backgroundColor:'red'
		 });
	 this.div_der = $('<div id="div_'+this.id+'_der" class = "panelDatos" align = "left"></div>')
	 .appendTo(this.div_padre_der)
	 .css({
	 	width: '98%',
		//height:'99%'
	 })
	 
	$.consultaAjax.ejecutar({
				url: this.der.url,
				async:false,
				persistir: obj,
				async:false,
				accionCorrecta: obj.llenarPanelDer					
				});
	
	 var func_btn_der = function(){
	   //alert($(this));
//	   $(this).attr({disabled:'disabled'});
	   obj.func_btns(obj.arrastrarSoltar, $.JCP.panelesArrastre.objTemp,  obj.div_izq, obj.div_der, $(this));
	 }
	 var func_btn_izq = function(){
//	   $(this).attr({disabled:'disabled'});
	   obj.func_btns($.JCP.panelesArrastre.objTemp, obj.arrastrarSoltar, obj.div_der, obj.div_izq, $(this));
	 }
	 var btn_der = $.Elementos.crearBoton("der"," >> ", func_btn_der).appendTo(div_btns);
	 var btn_izq = $.Elementos.crearBoton("izq"," << ", func_btn_izq).appendTo(div_btns);
	 this.panel.css({border:'1px solid black', height: '99%', width : '50%'});
	 btn_der.css({marginBottom:10});
	 tab_paneles.css({height: '100%', width : '100%'});
	 titulo.css({border:'1px solid red'});
	 div_btns.css({height: '99%', width : '25%'});
	 //this.div_izq.css({border:'1px solid red'});
	 this.div_padre_izq.css({border:'1px solid green'});
	 //this.div_der.css({border:'1px solid red'});
	 this.div_padre_der.css({border:'1px solid green'});
	 if(this.salvar){
		var fila_salvar = $('<div id="idsalvar" align = "right"></div>').appendTo(this.panel);
		var ejecfunc = function(){
		arr_izq = Array();
		arr_der = Array();
		obj.div_izq.children().each(function(){
			arr_izq.push($(this).attr("id"));
		});
		obj.div_der.children().each(function(){
		arr_der.push($(this).attr("id"));
		});
		var data = {};
		data.ids_izq = arr_izq;
		data.ids_der = arr_der;
		$.consultaAjax.ejecutar({
			data: data,
			url: obj.url,
			persistir: obj,
			accionCorrecta: obj.guardado					
			});
		 
		};
		var boton = $.Elementos.crearBoton('id_btn_salvar', 'Guardar', ejecfunc).appendTo(fila_salvar)
		.css({margin:5});
		
	}
  }
	//----------------------------------------------------------------------------------------------------
  PanelesArrastre.prototype.func_btns = function(objNuevo, objViejo, padreActual, padreNuevo, boton){
        var obj = this;
		
	 	var selecc = padreActual.find('.seleccionado');
	 	var noSelecc = padreActual.find(':not(.seleccionado)');
		if(selecc.length > 0){
			boton.attr({disabled:'disabled'});
			if(this.desplazamiento == 'ninguno'|| this.desplazamiento == undefined){
				selecc.each(function(){
					obj.cambiarPadre(objNuevo, $(this), padreNuevo);
				});
			}
			else{
			    if(this.desplazamiento == 'sencillo'){
					this.conDesplazamiento(objNuevo, objViejo, padreNuevo, padreActual, selecc, false, boton);
				}
				else if(this.desplazamiento == 'multiple'){
					this.conDesplazamiento(objNuevo, objViejo, padreNuevo, padreActual, selecc, true, boton);			
				}
			}
			objViejo.elemento = noSelecc;	
			objViejo.seleccionar.elementos = noSelecc;
			if(this.desplazamiento == 'ninguno'|| this.desplazamiento == undefined){			
				objViejo.scroll.mostrarScroll();
				objNuevo.scroll.mostrarScroll();
			}
	   }
  }
  PanelesArrastre.prototype.conDesplazamiento = function(objNuevo, objViejo, padreNuevo, padreActual, selecc, multiple, boton){
  		var obj = this;
	  	var top;
	  	var topDivselecc;
	  	var pos;
		var left;
		var incremento;
		var countAnimate = 1;
		var countSetTimeout = 1;
		var pNuevo = padreNuevo.closest('.panelPadre');
		var pActual = padreActual.closest('.panelPadre');
				
		if(padreNuevo.children().length > 0){
			incremento = padreNuevo.find(':last-child').height();
			pos = padreNuevo.find(':last-child').offset().top;
			left = padreNuevo.find(':last-child').offset().left;
		}			
		else{
			pos = padreNuevo.offset().top;
			left = padreNuevo.offset().left;
			incremento = selecc.height();
		}
		var countElem = 1;
		selecc.each(function(){	
		  var elem = $(this);
		  var divselecc = $('<div id="div_seleccion"></div>');
		  setTimeout(function(){
			  top = pos + incremento*countAnimate;
			  topDivselecc = elem.offset().top;
			  divselecc.appendTo('html');
			  if(top > (pNuevo.offset().top + pNuevo.height())){
				top = pNuevo.offset().top + pNuevo.height();
			  }
			  if(elem.offset().top > (pActual.offset().top + pActual.height())){
				topDivselecc = pActual.offset().top + pActual.height();
			  }
			  if(elem.offset().top < pActual.offset().top){
				topDivselecc = pActual.offset().top;
			  }
			  elem.clone().appendTo(divselecc).css({backgroundColor:''});
			  	
				divselecc.css({
		            width: elem.width(),
					height: elem.height(),
					border: '1px solid #226175', 
					position:'absolute',
					top: topDivselecc,
					left: elem.offset().left,
					zIndex: 2,
					opacity: 0.5,
					backgroundColor:'#c6e2ff',
					boxShadow: '0 0 6px #000000',
		   			borderRadius:'4px 4px 4px 4px'
				})
				.animate({
				  top: top,
				  left: left
				},500,"linear",
				function(){
				  obj.cambiarPadre(objNuevo, elem, padreNuevo);
				  divselecc.remove();
				  objNuevo.scroll.mostrarScroll();	
				  objViejo.scroll.mostrarScroll();
				  if($(this).hasClass('ultimo')){
				  	boton.removeAttr('disabled');
				  }			  	
				});
				countAnimate++;
				
			}, 
		 	150*countSetTimeout
		  );
		  if(!multiple)
			 countSetTimeout++;
		  if(countElem == selecc.length)
				 divselecc.addClass('ultimo');
		  countElem++;		  	
		});
  }
  PanelesArrastre.prototype.cambiarPadre = function(objNuevo, elemento, padreNuevo){
	  elemento.css({backgroundColor:''});
	  elemento.removeClass('seleccionado');
	  elemento.addClass('seleccionable');
	  var clon = elemento.clone();
	  clon.appendTo(padreNuevo);
	  clon.removeClass('shiftInicio');
	  clon.removeClass('shiftFin');
	  objNuevo.seleccionar.declararEventosElemento(clon);
	  objNuevo.declarar(clon);
	  objNuevo.elemento = $.merge(objNuevo.elemento, clon);			  
	  elemento.remove();
  }
  PanelesArrastre.prototype.guardado = function(datos, obj){
		 alert(obj.msgSalvar);
  }
  PanelesArrastre.prototype.llenarPanelIzq = function(datos, obj){
		obj.llenarPaneles(obj.div_izq, datos);
	}
  PanelesArrastre.prototype.llenarPanelDer = function(datos, obj){
		obj.llenarPaneles(obj.div_der, datos);
	}
//------------------------------------------------------------------------------------------------------------
//--------------------llenarPaneles---------------------------------------------------------------------------
	 PanelesArrastre.prototype.llenarPaneles = function(panel, arreglo){
	 	for(var i = 0 ; i < arreglo.length; i++ ){
		  var element =  $('<div id="'+arreglo[i].id+'" class = "elementos">'+arreglo[i].valor+'</div>').appendTo(panel);
		  		element.css({
					width:'55%',
					marginLeft:5,
//					backgroundColor:'yellow'
				});		 
	   }
	   this.lanzarEventos(panel,panel.find('.elementos'));	 
	 }
//-------------------------------------------------------------------------------------------------------------
    PanelesArrastre.prototype.lanzarEventos = function(padre, elementos){
		$.JCP.Crear('arrastrarSoltar',{
									elemento : elementos,
									elementosSeleccionar: elementos,
									padre: padre,
									sincrono:true,
									persistirObj : this
   								   });
		//alert(padre.parent().attr('id'));
		$.JCP.Crear('scroll', {
					elemento: padre.parent(),
					sincrono: true,
					persistirObj : this.arrastrarSoltar
					});
		if($.JCP.panelesArrastre.objTemp == null){
			$.JCP.panelesArrastre.objTemp = this.arrastrarSoltar;
			
		}						   
		
	 }
   this.construirPanel(); 
   },
	 opcionesDefecto:{
	 	add:false,
		div_izq:null,
		div_padre_izq:null,
		div_der:null,
		div_padre_der:null,
		salvar:true,
		msgSalvar: "Datos guardados con exito"
   }
   
}