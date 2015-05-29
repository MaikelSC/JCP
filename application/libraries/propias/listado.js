$.JCP.listado = {
    objTemp : null,
	crear : function Listado(arregloParametros){
		$.extend(this, $.JCP.listado.opcionesDefecto, arregloParametros, $.Elementos);
		var obj = this;		
		Listado.prototype.construirTabla = function(){
			if($('#'+this.idTabla).attr("id") == undefined){
				this.contenedorTabla = $('<div class="contTablaListar" id="cont'+this.idTabla+'"></div>').appendTo(this.padre);
				this.contenedorTabla.css({
//				marginTop:200
			});
				if(this.tituloTabla != false){
					this.divTituloTabla = $('<div class="tituloTablaListar">'+this.tituloTabla+'</div>').appendTo(this.contenedorTabla);
					this.divTituloTabla.css({
						backgroundColor:'red'
					});
				}				
				if(this.botones)
					this.cargarBotones();
				this.cargarCantXPagina();	
				this.cargarEstructura();
				this.cargarContenido();					
			}
			else{
				this.tabla = $('#'+this.idTabla);
				this.contenedorTabla = this.tabla.parent().parent();
				this.tituloTabla = this.tabla.find('.tituloTablaListar');
				this.estructura = this.tabla.find('estruc'+this.idTabla);
				this.filaColumnas = this.tabla.parent().parent().find('#filaColumnas');
			}			
			this.pedirDatos();
		}
		
		Listado.prototype.cargarCantXPagina = function(){
		    if(this.cantXPag.padre == undefined)
				this.cantXPag.padre = this.divTituloTabla;
			this.contCantXPag = $('<div></div>').appendTo(this.cantXPag.padre);
			this.contCantXPag.css({
				float:'right'
			});
			this.selectCantXPag = $('<select id="cantXPag'+this.idTabla+'"/>').appendTo(this.contCantXPag);
			for(var i = 0; i < this.cantXPag.valores.length; i++){
				var option = $('<option value="'+this.cantXPag.valores[i]+'">'+this.cantXPag.valores[i]+'</option>').appendTo(this.selectCantXPag);
			}
			var obj = this;	
			this.selectCantXPag.change(function(){
				obj.consultaListar.datosEnvio.inicio = 1;
				obj.pedirDatos();
			});		
		}
		
		Listado.prototype.cargarBotones = function(){
		    if(this.contenedorTabla.find('#contBotones'+this.idTabla).attr("id") == undefined)
				this.contBotones = $('<div id="contBotones'+this.idTabla+'"></div>').appendTo(this.contenedorTabla);
			else
				this.contBotones = this.contenedorTabla.find('.contBotonesListar');
				this.contBotones.css({
					backgroundColor:'blue'
				});
			if(this.btnAdicionar){
				var btnAdicionar =  $.Elementos.crearBoton('', 'Adicionar' );
					btnAdicionar
					.appendTo(this.contBotones)
					.click(function(){
					   obj.filaGrupos.fadeIn(0);
					   if(obj.contenido.find('filaVacia').length > 0)
					   obj.vacia.remove();
					    if(obj.contenido.find('.guiaEditar').length == 0){
							var guiaEditar = $('<div class="guiaEditar"></div>')
							.prependTo(obj.contenido)
							.css({
								height:20,
								border:'1px solid black',
								borderBottom:0,
								backgroundColor:'yellow',
							});
							var claseGrupos = 0;
					if(obj.estructura.grupos == undefined){
						var colspan = Array();
							colspan.push(obj.estructura.columnas.names.length);
					}
					else
						var colspan = obj.estructura.grupos.colspan;		
					var numFila = obj.numFila.clone();
						numFila.height(20);
						numFila.text('1');
						numFila.appendTo(guiaEditar);				
					for(var k =0 ; k< colspan.length;k++){
						var contenedorColumna = $('<div class="grupos'+(claseGrupos)+'"></div>').appendTo(guiaEditar);
							    contenedorColumna.css({
									display:'inline-block',
									height:20,
								});
						if(!obj.filaGrupos.find('.'+contenedorColumna.attr("class")).is(':visible'))	
							contenedorColumna.fadeOut(0);	
						for(var j =claseGrupos+1; j<claseGrupos+ 1+ colspan[k]; j++){ 					    
							var columna = $('<div class="'+j+'"></div>').appendTo(contenedorColumna);
							   columna.css({
									display:'inline-block',
									height:20,			
								 });
								if(!obj.filaGrupos.find('.'+contenedorColumna.attr("class")).find('.'+j).is(':visible'))
										columna.fadeOut(0);
								var label = $('<div class="label"></div>').appendTo(columna);
								 	columna.css({
										borderRight:'1px solid black',					
									 });
								label.css({
								overflow: 'hidden',
	           					whiteSpace: 'nowrap',
								 	width:obj.tabla.find('.filaColumnas >div.'+j+' .label').width()
								 });											
						    }
						    claseGrupos += colspan[k];
					      }
						  obj.construirFilaEditar(guiaEditar);
						}
						if(obj.contenido.find('#filaVacia'+obj.idTabla).length > 0)
					      obj.vacia.remove();					
					    obj.scroll.mostrarScroll();								
					});				
					obj.objEnvioAdicionar = new Entidad(obj.consultaAdicionar.datosEnvio.ids);// crea el obj para enviar
			}	
			if(this.btnEliminar){
				var btnEliminar =  $.Elementos.crearBoton('', 'Eliminar' );
					btnEliminar.appendTo(this.contBotones);
					btnEliminar.click(function(){
					 	var seleccionados = obj.contenido.find('>.seleccionado');
						var arreglo = Array();
						seleccionados.each(function(){ 
							arreglo.push($(this).attr("id"));
						});
						var data = {};
						data.ids = arreglo;
						$.consultaAjax.ejecutar({
									url: obj.urls.eliminar,
									data: data,
									persistir: obj,
									accionCorrecta: obj.filasEliminadas						
									});
					});
			}
		}
		
		Listado.prototype.filasEliminadas = function(data, obj){
			obj.pedirDatos();
		}
		
		Listado.prototype.construirFilaEditar = function(guiaEditar){
			obj.guiaEditar = guiaEditar;
		    if(obj.contenido.find('.filaEditar').length == 0 ){
				obj.filaEditar = $('<div class="filaEditar"></div>')
				.css({
					backgroundColor:'green',					
					position:'absolute',
					zIndex:'2',
					height:26,
//					width:obj.contenido.width(),
					top:guiaEditar.offset().top - obj.contenido.offset().top-3
				})
				.mousedown(function(e){
					e.stopPropagation();
				})				
			    .prependTo(obj.contenido);
				
				var claseGrupos = 0;
					var numFila = obj.numFila.clone();
						numFila.height(25);
//						numFila.text(i+1);
						numFila.appendTo(obj.filaEditar);
						numFila.css({
							backgroundColor:'pink'
						});
				for(var k =0 ; k< obj.estructura.grupos.colspan.length;k++){
						var contenedorColumna = $('<div class="grupos'+(claseGrupos)+'"></div>').appendTo(obj.filaEditar);
							    contenedorColumna.css({
									display:'inline-block',
									height:25,
								});
						if(!obj.filaGrupos.find('.'+contenedorColumna.attr("class")).is(':visible'))	
							contenedorColumna.fadeOut(0);	
						for(var j =claseGrupos+1; j<claseGrupos+ 1+ obj.estructura.grupos.colspan[k]; j++){					    
							var columna = $('<div class="'+j+'"></div>').appendTo(contenedorColumna);
							   columna.css({
									display:'inline-block',
									height:25,	
	//								backgroundColor:'green'				
								 });
								if(!obj.filaGrupos.find('.'+contenedorColumna.attr("class")).find('.'+j).is(':visible'))
										columna.fadeOut(0);
								var label = $('<div class="label"></div>').appendTo(columna);
//								label.text(data.datos[i][campos[j]]);
//								if(j < campos.length-1){
								 	columna.css({
										borderRight:'1px solid black',	
		//								backgroundColor:'red'				
									 });
//								 }
								label.css({
								overflow: 'hidden',
	           					whiteSpace: 'nowrap',
								 	width:obj.tabla.find('.filaColumnas >div.'+j+' .label').width()
	//								width:((obj.filaGrupos.width()-21)/obj.estructura.columnas.names.length-1),
								 });
//								 alert(guiaEditar.find('.'+j).text());
							var attr = {
								value: guiaEditar.find('.'+j).text()
							};	 
							var elemento = $.Elementos.crearElemento(obj.consultaAdicionar.datosEnvio.tipos[(j-1)], obj.consultaAdicionar.datosEnvio.ids[(j-1)], obj.consultaAdicionar.datosEnvio.names[(j-1)], attr);
							        elemento.appendTo(label);											
						}
						claseGrupos += obj.estructura.grupos.colspan[k]	
					}
					obj.filaBotonesEditar = $('<div class="filaBotonesEditar"></div>')
//					.insertAfter(obj.filaEditar)
					.prependTo(obj.contenedorTabla)
					.css({
						backgroundColor:'orange',
						width:200,
						height:30,
						zIndex:'2',
						position:'absolute',
						left:obj.tabla.width()/2 - 100,
//						top:guiaEditar.offset().top - obj.contenido.offset().top-3 + obj.filaEditar.height()
						top:guiaEditar.offset().top + guiaEditar.height()
					});
					var enviarEditar = $.Elementos.crearBoton('enviarEdi', 'Guardar', obj.adicionarAlListado);
						enviarEditar.appendTo(obj.filaBotonesEditar);
					var cancelarEditar = $.Elementos.crearBoton('eliminarEdi', 'Cancelar', function(){
						 obj.filaEditar.remove();
						 obj.filaBotonesEditar.remove();
						 obj.contenido.children('.guiaEditar').remove();
						 if(obj.contenido.children().length == 0)
						 	obj.mensajeVacio();
						 obj.scroll.mostrarScroll();		
					});
						cancelarEditar.appendTo(obj.filaBotonesEditar);	
			}
			else{
			     if(!guiaEditar.hasClass('guiaEditar')){
				 		obj.contenido.children('.guiaEditar').remove();
				 }
				 obj.filaEditar.desplazarA({
				 						referencia : {
												elemento : guiaEditar,
													y :- obj.contenido.offset().top -3,									
												},
												x :0		
				   					    });
				 obj.filaBotonesEditar.desplazarA({
				 						referencia : {
												elemento : guiaEditar,
													y : obj.filaEditar.height() -3				
												},
												x :obj.tabla.width()/2 - 100		
				   					    });
				for(var k =0; k< obj.consultaAdicionar.datosEnvio.ids.length; k++){
				    var campoAEditar = $('#'+obj.consultaAdicionar.datosEnvio.ids[k]);
					campoAEditar.val(obj.guiaEditar.find('.'+campoAEditar.parent().parent().attr("class")).text());
				}												
			}			
		}
		
		Listado.prototype.adicionarAlListado = function(){
			obj.entidadAdicionar = new Entidad(obj.consultaAdicionar.datosEnvio.ids);
			var data = crearDatosEnvioDadoContenedor(obj.entidadAdicionar, obj.filaEditar);
			if(!obj.guiaEditar.hasClass('guiaEditar')){
				data.id = obj.guiaEditar.attr("id"); 
			}
			$.consultaAjax.ejecutar({
							url: obj.urls.editar,
							data: data,
							persistir: obj,
							accionCorrecta: obj.actualizarFila						
						});
		}
		
		Listado.prototype.actualizarFila = function(data, obj){
//			var guiaEditar = obj.contenido.find('.guiaEditar');
			var guiaEditar = obj.guiaEditar;
			for(var i =0; i< obj.consultaAdicionar.datosRetorno.ids.length; i++){
				guiaEditar.find('.'+(i+1)+'>div').text(data[obj.consultaAdicionar.datosRetorno.ids[i]]);
			}
			if(guiaEditar.hasClass('guiaEditar')){
				guiaEditar.attr('id', data[obj.consultaListar.datosRetorno.campos[0]]);
				obj.contenido.find('>div:not(.guiaEditar)').find('.numFila:first').each(function(){
					$(this).text(parseInt($(this).text())+1);
				});
			}
			if(obj.seleccionar != undefined)
				obj.seleccionar.adicionarElemento(obj.guiaEditar, true);
			else
				obj.declararSeleccionar();			
			guiaEditar.removeClass('guiaEditar');
			obj.filaEditar.remove();
			obj.filaBotonesEditar.remove();
		}
		
		Listado.prototype.cargarEstructura = function(){		    
			 this.contenedorInterno = $('<div id="interno'+this.idTabla+'"/>').appendTo(this.contenedorTabla);
			 this.contenedorInterno.css({
//			 	border:'1px solid brown',
				width:this.contenedorTabla.width(),
				height:300,
//				display:'block',
				overflow: 'hidden',
           		whiteSpace: 'nowrap',
			 });
			 $.JCP.Crear('scroll', {elemento: this.contenedorInterno,
			 						sincrono: true,
									persistirObj: this,
									eliminarAdemas : '.divPropCol,.propAct'						
   									});			
		   
			this.tabla = $('<div id="estruc'+this.idTabla+'"/>').appendTo(this.contenedorInterno);
			this.tabla.css({
				backgroundColor:'yellow',
			});	
			
			var claseGrupos = 0;
			this.filaGrupos= $('<div id="grupos'+this.idTabla+'"></div>').appendTo(this.tabla);	
			this.filaGrupos.css({
				borderLeft:'1px solid black'
			});
			this.numFila = $('<div class="numFila"></td>').appendTo(this.filaGrupos);
							this.numFila.css({								
								width:20,
								float:'left',
								borderRight:'1px solid black'
							});
			this.anchoFilaGrupos = 21;				
			if(this.estructura.grupos != undefined){
				 this.filaGrupos.css({
				 	height:50,
				 });
				 for(var i =0; i< this.estructura.grupos.names.length; i++){
				 	var grupo = $('<div class="grupos'+claseGrupos+'" ></div>').appendTo(this.filaGrupos);
						grupo.css({
							display:'inline-block',
							height:'100%',
							backgroundColor:'white'
						});
					var labelGrupo = $('<div  >'+this.estructura.grupos.names[i]+'</div>').appendTo(grupo);
						labelGrupo.css({
							height:25,
							borderRight:'1px solid black'
						});
						this.crearFilaColumnas(grupo, claseGrupos, this.estructura.grupos.colspan[i] );				
					claseGrupos= (claseGrupos + this.estructura.grupos.colspan[i]);	
				 }
//				 alert(this.filaGrupos.find('>div[class^="grupos"]').length);
				 /*if(this.redimencionar){
							var parametros = {
			                elementos : this.filaGrupos.find('div[class^="grupos"]').find('>div:first'),
							incluido: true,
							sincrono: true,
							scroll: {
								ejecutar : true,
								funcion : this.scroll	
							},
							ademas: {
							     dinamico : Array({	
								 	cadenaBase: '.valor1 div.label',
									valores: {
										valor1 : Array('padre' , 'clase')
									}, 
								 },{
								 	cadenaBase:'#grupos'+this.idTabla+'>div.valor1>div:first',
									valores:{
										valor1: Array('padre', 'clase')
									}
								 }),
//								 fijo : this.tabla 
							},
//							ademas: $('#contenido'+this.idTabla+' div.grupos0'),
							dir : {
								der: true,
								},
							}
							$.JCP.Crear('redimencionar', parametros);
						}*/
				 
			}
			else{
				var grupo = $('<div id="grupos0"  ></div>').appendTo(this.filaGrupos);
					grupo.css({						
						border:'1px solid black',
					});
				this.filaGrupos.css({
//				 	height:25,
//					display:'block',
				 });
				this.crearFilaColumnas(grupo, claseGrupos, this.estructura.columnas.names.length );
			}
			var anchoFilaGrupos = 21;
			this.filaGrupos.width(this.anchoFilaGrupos);
			this.tabla.css({
				backgroundColor:'yellow',
				width:this.filaGrupos.width()
			});
			this.numFila.css({
				height:this.filaGrupos.height()
			});
			if(this.redimencionar){
							var parametros = {
			                elementos : this.tabla.find('.filaColumnas').find('>div .label'),
//							incluido: true,
							sincrono: true,
							scroll: {
								ejecutar : true,
								funcion : this.scroll	
							},
							ademas: {
							     dinamico : Array(/*{	
								 	cadenaBase: '#grupos'+this.idTabla+' div .valor1 .label',
									valores: {
										valor1 : Array('padre','clase')
									} 
								 },*/{	
								 	cadenaBase: '#contenido'+this.idTabla+' div .valor1 .label',
									valores: {
										valor1 : Array('padre','clase')
									} 
								 }),
								 fijo : this.tabla
							},
							dir : {
								der: true,
							},
							eliminarAdemas : '.divPropCol,.propAct'		
							}
							if(this.estructura.grupos != undefined){
								parametros.ademas.dinamico.push({
								 	cadenaBase :'#grupos'+this.idTabla+'>div.valor1>div:first',
									valores: {
										valor1 : Array('padre', 'padre', 'padre', 'clase')
									}
								 });
							}
							$.JCP.Crear('redimencionar', parametros);
						}				
//			this.scroll.mostrarScroll();			  
		}
		
		Listado.prototype.crearFilaColumnas = function(grupo, claseGrupos, colspan){
			var obj = this;
			var filaColumnas = $('<div class="filaColumnas"></div>').appendTo(grupo);
				filaColumnas.css({
				borderTop:'1px solid black'
				});
					for(var j = claseGrupos; j< claseGrupos + colspan; j++){
						var columna = $('<div class="'+(j+1)+'"></div>').appendTo(filaColumnas);
						var label = $('<div class="label"></div>').appendTo(columna);
						var texto = $('<span>'+this.estructura.columnas.names[j]+'</span>').appendTo(label);
							texto.css({				
								overflow: 'hidden',
	           					whiteSpace: 'nowrap',
							});
						columna.css({
							display:'inline-block',
							backgroundColor:'orange',
							height:23					
						 });
					 	 columna.css({
							borderRight:'1px solid black',				
						 });
						 var anchoLabel = ((this.filaGrupos.width()-21)/this.estructura.columnas.names.length-1);
						 var restoLabel = ((this.filaGrupos.width()-21)%this.estructura.columnas.names.length);
						 if(restoLabel != 0)
							anchoLabel = anchoLabel - restoLabel/this.estructura.columnas.names.length; 
						 label.css({
						 	width:anchoLabel
						 });
						 this.anchoFilaGrupos += anchoLabel+1;
						 label.click(function(){
						      if($(this).find('.flechaOrd').length == 0){
							      var cont = $(this).parent().attr("class");
								  obj.consultaListar.datosEnvio.ordX = obj.consultaListar.datosRetorno.campos[(parseInt(cont))];
								  obj.consultaListar.datosEnvio.dir = 'asc';
								  obj.pedirDatos();
								  var l = $(this);
								  if(obj.flechaOrd == undefined){
								  	     obj.flechaOrd = $('<img class="flechaOrd" src="http://localhost/cantante/application/libraries/propias/imagenes/arr.png")" ></img>').insertAfter(l.find('span'));
								  }
								  else{
								  	obj.flechaOrd.insertAfter(l.find('span'));
									obj.flechaOrd.attr("src", "http://localhost/cantante/application/libraries/propias/imagenes/arr.png");
								  }		 	 								  	
							  }
						      else{
						   	     if(obj.consultaListar.datosEnvio.dir == 'asc'){
								 	obj.consultaListar.datosEnvio.dir = 'desc';
									obj.flechaOrd.attr("src", "http://localhost/cantante/application/libraries/propias/imagenes/abj.png");									
								 }
								 else{
								 	obj.consultaListar.datosEnvio.dir = 'asc';
									obj.flechaOrd.attr("src", "http://localhost/cantante/application/libraries/propias/imagenes/arr.png");
								 }
								 obj.pedirDatos();								 	
						      } 	
						 });
						 label.hover(function(){
						    var salvaLabel = $(this);
							if($(this).children('.confColumna').length == 0)
						    $('<div class="confColumna"></div>')
								.css({
									width:20,
									height:25,
									borderLeft:'1px solid black',							
									backgroundImage:$.urlIconos+'abj.png")',
									backgroundRepeat: 'no-repeat',
									backgroundPosition:'center',
									position:'relative',
									float:'right'
								})	
								.prependTo($(this))
								.mousedown(function(e){
									e.stopPropagation()
								})	
								.click(function(e){
								    var confColumna = $(this);
									e.stopPropagation();
								    $('html').bind('mousedown', function(){
										$('.divPropCol').remove();
										$('.propAct').remove();
										$(this).unbind('mousedown');
									});							    
								  	if(!$(this).hasClass('propAct')){
									    $(this).css({
											backgroundImage:$.urlIconos+'arr.png")',
											backgroundColor:'#5a96a9'
										});
										var activo = $(this);
										$('.propAct').remove();
									    $(this).addClass('propAct');
										if($('.divPropCol').length == 0){
											var divPropCol = $('<div class="divPropCol"></div>')
											.appendTo(obj.contenedorTabla)
											.css({										   
												width:180,
												height:100,
												display:'none',
												position:'absolute',
												backgroundColor:'#5a96a9',	
												border:'1px solid black'
											})
											.slideDown();
											var direccion = 'asc';
											var ordenar = $('<div class="asc">Ordenar Ascendentemente</div>')
											.css({
//												width:'100%',
												height:25,
												backgroundColor:'yellow',
												margin:2
											})
											.hover(function(){
												$(this).css({
													backgroundColor:'red'
												});
											},function(){
												$(this).css({
													backgroundColor:'yellow'
												});
											})
											.mousedown(function(e){
												e.stopPropagation();
											})											
											.appendTo(divPropCol);
											direccion = 'desc';
											var ordenar1 = ordenar.clone(true);
											var mostrarCol = ordenar.clone(true);
											ordenar.click(function(e){
											     if(obj.flechaOrd == undefined){
												  	 obj.flechaOrd = $('<img class="flechaOrd" src="http://localhost/cantante/application/libraries/propias/imagenes/arr.png")" ></img>').insertAfter(obj.filaGrupos.find('.confColumna').next());
												 }
												 else{
												  	 obj.flechaOrd.insertAfter(obj.filaGrupos.find('.confColumna').next());
													 obj.flechaOrd.attr("src", "http://localhost/cantante/application/libraries/propias/imagenes/arr.png");
											    }	
											    var cont = obj.filaGrupos.find('.confColumna').parent().parent().attr("class");
												obj.consultaListar.datosEnvio.ordX = obj.consultaListar.datosRetorno.campos[(parseInt(cont))];
												obj.consultaListar.datosEnvio.dir = 'asc';
												obj.pedirDatos();												
											});
											ordenar1
											.attr("class", "desc")
											.appendTo(divPropCol)
											.text('Ordenar Descendentemente')
											.click(function(e){
											    if(obj.flechaOrd == undefined){
												  	 obj.flechaOrd = $('<img class="flechaOrd" src="http://localhost/cantante/application/libraries/propias/imagenes/abj.png")" ></img>').insertAfter(obj.filaGrupos.find('.confColumna').next());
												 }
												 else{
												  	 obj.flechaOrd.insertAfter(obj.filaGrupos.find('.confColumna').next());
													 obj.flechaOrd.attr("src", "http://localhost/cantante/application/libraries/propias/imagenes/abj.png");
											    }
											    var cont = obj.filaGrupos.find('.confColumna').parent().parent().attr("class");
												obj.consultaListar.datosEnvio.ordX = obj.consultaListar.datosRetorno.campos[(parseInt(cont))];
												obj.consultaListar.datosEnvio.dir = 'desc';
												obj.pedirDatos();												
											});
											mostrarCol
										   	.appendTo(divPropCol)
											.text('Columnas')
											.attr("id", "mostrarCol")
											.hover(function(){// hover de las columnasal
													$(this).addClass('hoveriado');
													$(this).css({
														backgroundColor:'red'
													});
                                                    if($('#todasColumnas').length == 0){
														var todasColumnas = $('<div id="todasColumnas"></div>')
														.appendTo($('html'))
														.css({
															position:'absolute',
//															left:$(this).offset().left + $('.divPropCol').width()-1,
															top: $(this).offset().top,
															backgroundColor:'brown',
														})
														.hover(function(){//hover de todas las columnas
															$(this).addClass('hoveriado');
														}, function(){// salida hover todas las columnas
														     $(this).removeClass('hoveriado');
														    setTimeout(function(){
															    if(!$('#mostrarCol').hasClass('hoveriado')){;
																    $('#todasColumnas').remove();				
																}														
															}, 100);	
														});
														
														for(var o =0; o<obj.estructura.columnas.names.length; o++){
															var colInd = $('<div class="'+o+'"></div>')
															.css({
																margin:2,
																height:20,
																backgroundColor:'pink',
															})
															.hover(function(){
																$(this).css({
																	backgroundColor:'red'
																})
															}, function(){
																$(this).css({
																	backgroundColor:'pink'
																})
															})
															.appendTo($('#todasColumnas'));
															var check = $('<div><input class="'+(o+1)+'" type="checkbox"/></div>').appendTo(colInd);
																check.css({
																	margin:2,
																	display:'inline'
																});
															if(obj.filaGrupos.find('.filaColumnas').find('.'+(o+1)).is(':visible')){													
															    check.children(':first').attr("checked","checked");
															}
															check.children(':first')
															.mousedown(function(e){
																e.stopPropagation();
															})
															.click(function(){	
																var columna1= obj.filaGrupos.find('.'+$(this).attr("class"));
															    var label1 = columna1.find('.label');
																var grupo1 = columna1.parent().parent();				
																if(!$(this).is(':checked')){	
																   obj.tabla.width(obj.tabla.width() - columna1.width());  
																   if(columna1.siblings(':visible').length==0){
																      columna1.fadeOut(0);grupo1.fadeOut(0);
																	  columna1.parent().parent().children(':first').width(0);
																   }
																   else{
																	   columna1.parent().parent().children(':first').width(columna1.parent().parent().children(':first').width() - columna1.width()-1);
																   columna1.fadeOut(0);
																   }
																   obj.contenido.find('.'+columna1.attr("class")).fadeOut(0);
																   if(obj.scroll != undefined)
																	   obj.scroll.mostrarScroll();
																   if(label1.find('.confColumna').length > 0){
																   	   $('.divPropCol').remove();
										                               label1.find('.confColumna').remove();
																	   $(this).closest('#todasColumnas').remove();
																   }
																   /*else
																   $('.divPropCol').desplazarA({
											   								referencia : {
																					elemento : confColumna,
																					y : confColumna.height()
																			}		
											   					   });*/
																   /*$('#todasColumnas').desplazarA({
											   								referencia : {
																					elemento : confColumna,
																					x : confColumna.width()
																			}		
											   					   });*/	   						
																}
																else{
																   columna1.fadeIn(0);
																   if(columna1.siblings(':visible').length==0){	       
																	  grupo1.fadeIn(0);
																	  obj.contenido.find('.'+grupo1.attr("class")).fadeIn(0);
																   }
																   columna1.parent().parent().children(':first').width(columna1.parent().parent().children(':first').width() + columna1.width() + 1);
																   obj.contenido.find('.'+columna1.attr("class")).fadeIn(0);
																   obj.tabla.width(obj.tabla.width() + columna1.width());
																	   obj.scroll.mostrarScroll();
																   /*$('.divPropCol').desplazarA({
											   								referencia : {
																					elemento : confColumna,
																					y : confColumna.height()
																			}		
											   					   });*/	   
																}														
															});	
															var nombre = $('<div><label>'+obj.estructura.columnas.names[o]+'</albel></div>').appendTo(colInd);
																nombre.css({
																	paddingRight:10,
																	display:'inline'
																	});	
														}
														if($('html').width() < $('.divPropCol').offset().left + $('.divPropCol').width() + todasColumnas.width()){
															todasColumnas.css({
																left: $('.divPropCol').offset().left - todasColumnas.width()
															});					
														}
														else
														todasColumnas.css({
																left:$(this).offset().left + $('.divPropCol').width()-1,
															});	
													}
																											
											},function(){// salida hover de columnas
											    $(this).removeClass('hoveriado');
												$(this).css({
													backgroundColor:'yellow'
												}); 
											    setTimeout(function(){
															if(!$('#todasColumnas').hasClass('hoveriado'))
															$('#todasColumnas').remove();
															}, 100);
											});	
											var img = $('<img src="http://localhost/cantante/application/libraries/propias/imagenes/der.png")">')
											.appendTo(mostrarCol)
											.css({
												marginRight:5,
												marginTop:4,
												float:'right'
											});
											
										}
										if(activo.offset().left + $('.divPropCol').width()>= $('html').width() -3){
											$('.divPropCol').css({
												left:$('html').width() -3 - $('.divPropCol').width(),
												top:activo.offset().top + activo.height(),
										    });
										}
											
										else{
											$('.divPropCol').css({
												left:activo.offset().left,
												top:activo.offset().top + activo.height(),
											});
										}	
											
								  	}
									else{
										$('.divPropCol').remove();
										$(this).removeClass('propAct');
										$(this).css({
											backgroundImage:$.urlIconos+'abj.png")',
											backgroundColor:'orange'
										});
									}
								});
						 }, function(){
							if(!$(this).children('.confColumna').hasClass('propAct'))
								$(this).children('.confColumna').remove();
						 });
					}
		}
		
		Listado.prototype.cargarContenido = function(){
			 this.contenido = $('<div id="contenido'+this.idTabla+'"></div>').appendTo(this.tabla);
			 this.contenido.css({
			 	borderBottom:'1px solid black',
				position:'relative'
//				backgroundColor:'white',
//				height:200,
//				margin:2
//				border:'2px solid black'	
//				width:0
			 });
			 
		}
		
		Listado.prototype.pedirDatos = function(obj){
		    if(obj == undefined)
				var obj = this;	
			if(obj.selectCantXPag!= undefined)
				obj.consultaListar.datosEnvio.cantXPag = obj.selectCantXPag.val();
			$.consultaAjax.ejecutar({
									url: obj.urls.listar,
									data: obj.consultaListar.datosEnvio,
									persistir: obj,
									accionCorrecta: obj.llenarTabla						
									});
//			this.ponerCargador();						
		}
		
		Listado.prototype.llenarTabla = function(data, obj){
		    if(data.datos != null){
				obj.contenido.empty();				
			    if(obj.contenedorTabla.find('.filaBotonesEditar:first').length > 0)
				  obj.filaBotonesEditar.remove();
				  
				if(obj.estructura.grupos == undefined){
						var colspan = Array();
							colspan.push(obj.estructura.columnas.names.length);
					}
				else
					var colspan = obj.estructura.grupos.colspan;	
				for(var i =0; i< data.datos.length; i++){
				    var campos = obj.consultaListar.datosRetorno.campos;
					var fila = $('<div id="'+data.datos[i][campos[0]]+'" class="fila"></div>').appendTo(obj.contenido);	
						fila.css({
							border:'1px solid black',
							borderBottom:0,
							backgroundColor:'#c8dfe8',
							height:20,
						})
						.dblclick(function(){
							obj.construirFilaEditar($(this));
						})
					/*if(i == 0){alert('asdf');
						fila.css({
							borderTop:'1px solid black'
						});
					}*/	
					var claseGrupos = 0;
					var numFila = obj.numFila.clone();
						numFila.height(20);
						numFila.text(i+1);
						numFila.appendTo(fila);				
					for(var k =0 ; k< colspan.length;k++){
						var contenedorColumna = $('<div class="grupos'+(claseGrupos)+'"></div>').appendTo(fila);
							    contenedorColumna.css({
									display:'inline-block',
									height:20,
	//								width:obj.filaGrupos.find('div .grupos'+claseGrupos).width()
	//								backgroundColor:'green'
								});
						if(!obj.filaGrupos.find('.'+contenedorColumna.attr("class")).is(':visible'))	
							contenedorColumna.fadeOut(0);	
						for(var j =claseGrupos+1; j<claseGrupos+ 1+ colspan[k]; j++){					    
							var columna = $('<div class="'+j+'"></div>').appendTo(contenedorColumna);
							   columna.css({
									display:'inline-block',
									height:20,	
	//								backgroundColor:'green'				
								 });
								if(!obj.filaGrupos.find('.'+contenedorColumna.attr("class")).find('.'+j).is(':visible'))
										columna.fadeOut(0);
								var label = $('<div class="label"></div>').appendTo(columna);
	//							var label = obj.tabla.find('.filaColumnas >div.'+j+' .label').clone();
								label.text(data.datos[i][campos[j]]);
								if(j < campos.length-1){
								 	columna.css({
										borderRight:'1px solid black',	
		//								backgroundColor:'red'				
									 });
								 }
								label.css({
								overflow: 'hidden',
	           					whiteSpace: 'nowrap',
								 	width:obj.tabla.find('.filaColumnas >div.'+j+' .label').width()
	//								width:((obj.filaGrupos.width()-21)/obj.estructura.columnas.names.length-1),
								 });											
						}
						claseGrupos += colspan[k];
					}
				}
				if(data.total > obj.consultaListar.datosEnvio.cantXPag){
					obj.mostrarPaginacion(data.total);
				}
				else{
				  if(obj.contPaginacion != undefined){
					obj.contPaginacion.remove();
					obj.contPaginacion= undefined;			  	
				  }
				}	
				obj.scroll.mostrarScroll();
				obj.declararSeleccionar();
			}
			else
				obj.mensajeVacio();		    
														
		}
		
		Listado.prototype.declararSeleccionar = function(){
			$.JCP.Crear('seleccionar',{elementos :obj.contenido.find('.fila'),
											mostrarDivSeleccion: false,
											elementoContenedor: obj.tabla,
											elementoMouseDown: obj.contenedorInterno,
											persistirObj : obj,
											eliminarAdemas : '.divPropCol,.propAct'
//											activarSiempre: true
//											tieneCss: true
   											});
		}
		
		Listado.prototype.mostrarPaginacion = function(total){
			var obj = this;
			var cantPaginas = total/this.consultaListar.datosEnvio.cantXPag - total%this.consultaListar.datosEnvio.cantXPag/this.consultaListar.datosEnvio.cantXPag;
			if(total%this.consultaListar.datosEnvio.cantXPag != 0)
	 			cantPaginas++;
			if(this.contPaginacion == undefined){
				this.contPaginacion = $('<div></div>').appendTo(this.contenedorTabla);
				this.contPaginacion.css({
					width:'100%',
					height:25,
					backgroundColor:'white'
				})			
				this.paginacion =  $('<div></div>').appendTo(this.contPaginacion);
				this.paginacion.css({
					display:'inline'
				});
			}	
			this.paginacion.empty();
			if(this.consultaListar.datosEnvio.inicio > 1){
				var anterior = $('<label class = "Fila_Paginacion_Siguiente">Anterior</label>').appendTo(this.paginacion);
				anterior.click(function(){
				    obj.consultaListar.datosEnvio.inicio--;
				    obj.pedirDatos();
				});
			}
			for(var i = 0; i< cantPaginas; i++){
			    var numero = i+1;
			 	var elemento = $('<label id="'+numero+'" class = "Fila_Paginacion_Numeros">'+numero+'</label>').appendTo(this.paginacion);
				if(i+1 == obj.consultaListar.datosEnvio.inicio){
					elemento.css({fontWeight: "bold",backgroundColor:'red'});
				}
				elemento.click(function(){
				    obj.consultaListar.datosEnvio.inicio = $(this).attr("id");
				    obj.pedirDatos();
				});
		   }
			if(this.consultaListar.datosEnvio.inicio < cantPaginas){
			 	var siguiente = $('<label class = "Fila_Paginacion_Siguiente">Siguiente</label>').appendTo(this.paginacion);
				siguiente.click(function(){
				    obj.consultaListar.datosEnvio.inicio++;
				    obj.pedirDatos();
				});
		    }
			this.paginacion.centrar();
		}
		
		Listado.prototype.ponerCargador = function(){
			obj.contenido.empty();
		}
		
		Listado.prototype.mensajeVacio = function(){
			this.filaGrupos.fadeOut(0);
			this.contenido.empty();
			this.vacia  = $('<div id="filaVacia'+this.idTabla+'"></div>').appendTo(this.contenido);
			var columnaVacia = $('<span>'+this.vacio.mensajeVacio+'</span>').appendTo(this.vacia);
		}
		
		this.construirTabla();
	},
	opcionesDefecto : {
		tituloTabla : false,
		botones: true,
		btnAdicionar : true,
		btnEliminar : true,
	    cantXPag: {
	 	   valores: Array("10","20","50","100")
	    }
	} 
}