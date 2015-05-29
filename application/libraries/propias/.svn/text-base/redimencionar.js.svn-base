$.JCP.redimencionar = {
    crear : function Redimencionar(arregloParametros){
	    $.extend(this, $.JCP.redimencionar.opcionesDefecto, arregloParametros);
		var obj = this;
		Redimencionar.prototype.declarar = function(){
		         var obj = this;
		         this.elementos.each(function(){
				    $(this).addClass('redimencionable');
				 	$(this).css({
				 		position:'relative'
				 	});
				 	$(this).parent().css({
				 		position:'relative'
				 	});
					obj.calcular($(this));
				 });				 
		}
		
		Redimencionar.prototype.calcular = function(elemento){
		       //Redimencionar Izquierda
		       if(this.dir.izq){
			   		this.izq = $('<div class="izqRed"></div>')
							   .css({
							   		position:'absolute',
//									zIndex:800,
									height:elemento.height(),
									width:obj.AnchoLim,
									top:0,
//									opacity:'0',
									backgroundColor:'blue'

							   })
							   .appendTo(elemento)
							   .hover(function(){
							   		$(this).css({
										cursor:'e-resize',
										display:'block'
									});
							   },function(){
							   		cursor: 'normal'
							   })
							   .bind('mousedown', function(e){
							        if(obj.eliminarAdemas !=null)
			   							$(obj.eliminarAdemas).remove();
							   		e.preventDefault();									
		        					if(obj.ademas != undefined)
										var ademas = {};
							   		var salvaE = e;
										salvaE.salvaUltimoX = e.pageX;
									var salvaDiv = $(this);
									var salvaAncho = elemento.width();
									var salvaLeft = elemento.position().left;
									$('html').bind('mousemove', function(e){
									    e.preventDefault();
										var ancho = salvaAncho + salvaE.pageX - e.pageX;
										if(ancho >= obj.minAncho){
										var css = 	{
										    left:salvaLeft - ancho + salvaAncho,
											width: ancho
										};
										var cssBorde = {	
											left: 0
										};
										if(obj.ademas != undefined){
											    ademas.ancho = salvaE.salvaUltimoX - e.pageX;
												ademas.left =  salvaE.salvaUltimoX - e.pageX;
										}
										obj.redimencionar(elemento, css , $(this), cssBorde, ademas);
										salvaE.salvaUltimoX = e.pageX;
										}
									});
									$('html').bind('mouseup', function(){
										$(this).unbind('mousemove');
										$(this).unbind('mouseup');
									});
							   })	 
			   }
			   //Redimencionar Derecha
			   if(this.dir.der){
			   		this.der = $('<div class="derRed"></div>')
							   .css({
							   		position:'absolute',
									height:elemento.height(),
									width:obj.AnchoLim,
									display:'block',
									left:elemento.width() -obj.AnchoLim,
									top:0,
									opacity:'0',
									backgroundColor:'black'

							   })
							   .appendTo(elemento)
							   .hover(function(){
							   		$(this).css({
										cursor:'w-resize'
									});									
							   },function(){
							   		cursor: 'normal'
							   })
							   .click(function(e){
							   		e.stopPropagation();
							   })
							   .bind('mousedown', function(e){
							        if(obj.eliminarAdemas !=null)
			   							$(obj.eliminarAdemas).remove();
							   		e.preventDefault();
									$(this).attr("id", "ultRed");
									var elementoTemp = $(this);
		        					if(obj.ademas != undefined)
										var ademas = {};
							   		var salvaE = e;
										salvaE.salvaUltimoX = e.pageX;
									var salvaAncho = elemento.width();
									$('html').bind('mousemove', function(e){
									    e.preventDefault();
										var ancho = salvaAncho + e.pageX - salvaE.pageX;
										if(ancho >= obj.minAncho){
										var css = {
											width: ancho
										}; 	
										var cssBorde = {
											left:elemento.width()-obj.AnchoLim
										};
										if(obj.ademas != undefined){
											ademas.ancho = e.pageX - salvaE.salvaUltimoX;
										}
										obj.redimencionar(elemento, css, $(this), cssBorde, ademas);
										salvaE.salvaUltimoX = e.pageX;
										}
									});
									$('html').bind('mouseup', function(e){
									    $('#ultRed').css({
											left: $('#ultRed').parent().width()-obj.AnchoLim 
										});
										$('#ultRed').removeAttr("id");
										$(this).unbind('mousemove');
										$(this).unbind('mouseup');
									});
							   })	 
			   }
			   //Redimencionar Arriba
			   if(this.dir.arr){
			   		this.arr = $('<div class="arrRed"></div>')
							   .css({
							   		position:'absolute',
//									zIndex:801,
									height:obj.AnchoLim,
									width:elemento.width(),
									top:0,
//									opacity:'0',
									backgroundColor:'green'

							   })
							   .appendTo(elemento)
							   .hover(function(e){
							   		$(this).css({
										cursor:'n-resize'
									});
							   },function(){
							   		cursor: 'normal'
							   })
							   .bind('mousedown', function(e){
							   		if(obj.eliminarAdemas !=null)
			   							$(obj.eliminarAdemas).remove();
							   		e.preventDefault();									
		        					if(obj.ademas != undefined)
										var ademas = {};
							   		var salvaE = e;
										salvaE.salvaUltimoY = e.pageY;
									var salvaDiv = $(this);
									var salvaAlto = elemento.height();
									var salvaTop = elemento.position().top;
									$('html').bind('mousemove', function(e){
									    e.preventDefault();
										var alto = salvaAlto + salvaE.pageY - e.pageY;
										if(alto >= obj.minAlto){
										var css = {
										    top:salvaTop - alto + salvaAlto,
											height: alto
										};
										var cssBorde = {	
											top: 0
										};
										if(obj.ademas != undefined){
											    ademas.alto = salvaE.salvaUltimoY - e.pageY;
												ademas.top =  salvaE.salvaUltimoY - e.pageY;
										}
										obj.redimencionar(elemento, css , $(this), cssBorde, ademas);
										salvaE.salvaUltimoY = e.pageY;
									   }	
									});
									$('html').bind('mouseup', function(){
										$(this).unbind('mousemove');
										$(this).unbind('mouseup');
									});
							   });
						//Redimencionar Arriba y Derecha	   
						if(this.dir.der){
							this.arrDer = $('<div class="arrDerRed"></div>')
										  .css({
										  	width: obj.AnchoLim,
											height: obj.AnchoLim,
											backgroundColor:'yellow',
						                    float:'right'
										  })
										  .appendTo(this.arr)
										  .hover(function(e){
										      e.stopPropagation();
											  $(this).css({
											  	cursor:'ne-resize' 
											  });
										  },function(e){
										  	  $(this).css({
											  	cursor:'normal'
											  });	
										  }) 
										  .bind('mousedown', function(e){
										  		if(obj.eliminarAdemas !=null)
			   										$(obj.eliminarAdemas).remove();
										   		e.preventDefault();								
					        					if(obj.ademas != undefined)
													var ademas = {};
												e.stopPropagation();
										   		var salvaE = e;
													salvaE.salvaUltimoX = e.pageX;
													salvaE.salvaUltimoY = e.pageY;
												var salvaDiv = $(this);
												var salvaAlto = elemento.height();
												var salvaTop = elemento.position().top;
												var salvaAncho = elemento.width();
												$('html').bind('mousemove', function(e){
												    e.preventDefault();
													var alto = salvaAlto + salvaE.pageY - e.pageY;
													var css = {};
													if(alto >= obj.minAlto){
														css.top = salvaTop - alto + salvaAlto;
														css.height = alto;
														if(obj.ademas != undefined){
														ademas.alto = salvaE.salvaUltimoY - e.pageY;
														ademas.top =  salvaE.salvaUltimoY - e.pageY;
														}
														salvaE.salvaUltimoY = e.pageY;
													}
													else{
														ademas.alto = undefined;
														ademas.top = undefined;
													}
													var ancho = salvaAncho + e.pageX - salvaE.pageX;
													if(ancho >= obj.minAncho){
														css.width = ancho;
														if(obj.ademas != undefined){
														ademas.ancho =  e.pageX - salvaE.salvaUltimoX ;
														}
														salvaE.salvaUltimoX = e.pageX;
													}
													else{
														ademas.ancho = undefined;
													}
													var cssBorde = {	
														top: 0
													};											
													obj.redimencionar(elemento, css, $(this), cssBorde, ademas);												
													
												});
												$('html').bind('mouseup', function(){
													$(this).unbind('mousemove');
													$(this).unbind('mouseup');
												});
							  			 	});
									
						}
						//Redimencionar Arriba e Izquierda
						if(this.dir.izq){
							this.arrIzq = $('<div class="arrIzqRed"></div>')
										  .css({
										  	width: obj.AnchoLim,
											height: obj.AnchoLim,
											backgroundColor:'yellow',
										  })
										  .appendTo(this.arr)
									      .hover(function(e){
										      e.stopPropagation();
											  $(this).css({
											  	cursor:'nw-resize' 
											  });
										  },function(e){
										  	  $(this).css({
											  	cursor:'normal'
											  });	
										  })
										  .bind('mousedown', function(e){
										  		if(obj.eliminarAdemas !=null)
			   										$(obj.eliminarAdemas).remove();
										   		e.preventDefault();
												e.stopPropagation();						
					        					if(obj.ademas != undefined)
													var ademas = {};
										   		var salvaE = e;
													salvaE.salvaUltimoX = e.pageX;
													salvaE.salvaUltimoY = e.pageY;
												var salvaDiv = $(this);
												var salvaAlto = elemento.height();
												var salvaTop = elemento.position().top;
												var salvaAncho = elemento.width();
												var salvaLeft = elemento.position().left;
												$('html').bind('mousemove', function(e){
												    e.preventDefault();
													var css = {};
													var alto = salvaAlto + salvaE.pageY - e.pageY;
													if(alto >= obj.minAlto){
														css.top = salvaTop - alto + salvaAlto;
														css.height = alto;
														if(obj.ademas != undefined){
														ademas.alto = salvaE.salvaUltimoY- e.pageY;
														ademas.top =  salvaE.salvaUltimoY- e.pageY;
														}
													}
													else{
														ademas.alto = undefined;
														ademas.top = undefined;
													}
													var ancho = salvaAncho + salvaE.pageX - e.pageX;
													if(ancho >= obj.minAncho){
														css.left = salvaLeft - ancho + salvaAncho;
														css.width = ancho;
														if(obj.ademas != undefined){
														ademas.ancho = salvaE.salvaUltimoX- e.pageX;
														ademas.left = salvaE.salvaUltimoX - e.pageX;
														}
													}
													else{
														ademas.left = undefined;
														ademas.ancho = undefined;
													}
													var cssBorde = {	
														top: 0
													};
													obj.redimencionar(elemento, css, $(this), cssBorde, ademas);
													salvaE.salvaUltimoY = e.pageY;
													salvaE.salvaUltimoX = e.pageX;
												});
												$('html').bind('mouseup', function(){
													$(this).unbind('mousemove');
													$(this).unbind('mouseup');
												});
							  			 	}); 
						}	   	 	 
			   }
			   //Redimencionar Abajo
			   if(this.dir.abj){
			   		this.abj = $('<div class="abjRed"></div>')
							   .css({
							   		position:'absolute',
									zIndex:806,
									height:obj.AnchoLim,
									width:elemento.width(),
									top:elemento.height()-obj.AnchoLim,
									backgroundColor:'brown'

							   })
							   .appendTo(elemento)
							   .hover(function(){
							   		$(this).css({
										cursor:'s-resize'
									});
							   },function(){
							   		cursor: 'normal'
							   })
							   .bind('mousedown', function(e){
							   		if(obj.eliminarAdemas !=null)
			   							$(obj.eliminarAdemas).remove();
							   		e.preventDefault();											
		        					if(obj.ademas != undefined)
										var ademas = {};
							   		var salvaE = e;
										salvaE.pageY = e.pageY;
									var salvaDiv = $(this);
									var salvaAlto = elemento.height();
									$('html').bind('mousemove', function(e){
									    e.preventDefault();
										var alto = salvaAlto + e.pageY - salvaE.pageY;
										if(alto >= obj.minAlto){
										var css = {
											height: alto
										}; 	
										var cssBorde = {
											top:elemento.height()-obj.AnchoLim
										};
										if(obj.ademas != undefined){
											ademas.alto = e.pageY - salvaE.salvaUltimoY;
										}
										obj.redimencionar(elemento, css, $(this), cssBorde, ademas);
										salvaE.salvaUltimoY = e.pageY;
										};
									});
									$('html').bind('mouseup', function(){
										$(this).unbind('mousemove');
										$(this).unbind('mouseup');
									});
							   });
					//Redimencionar Abajo y Derecha		   
					if(this.dir.der){
							this.abjDer = $('<div class="abjDerRed"></div>')
										  .css({
										  	width: obj.AnchoLim,
											height: obj.AnchoLim,
											backgroundColor:'yellow',
//											position:'relative',
//											left:
						                    float:'right'
										  })
										  .appendTo(this.abj)
										  .hover(function(e){
										      e.stopPropagation();
											  $(this).css({
											  	cursor:'se-resize' 
											  });
										  },function(e){
										  	  $(this).css({
											  	cursor:'normal'
											  });	
										  }) 
										  .bind('mousedown', function(e){
										  		if(obj.eliminarAdemas !=null)
			   										$(obj.eliminarAdemas).remove();
										   		e.preventDefault();
												e.stopPropagation();						
					        					if(obj.ademas != undefined)
													var ademas = {};
										   		var salvaE = e;
													salvaE.salvaUltimoX = e.pageX;
													salvaE.salvaUltimoY = e.pageY;
												var salvaDiv = $(this);
												var salvaAlto = elemento.height();
												var salvaAncho = elemento.width();
												$('html').bind('mousemove', function(e){
												    e.preventDefault();
													var css = {};
													var alto = salvaAlto + e.pageY - salvaE.pageY;
													if(alto >= obj.minAlto){
														css.height = alto;
														if(obj.ademas != undefined){
														ademas.alto = e.pageY - salvaE.salvaUltimoY;
														}
													}
													else{
														ademas.alto = undefined;
													}
													var ancho = salvaAncho + e.pageX - salvaE.pageX;
													if(ancho >= obj.minAncho){
														css.width = ancho;
														if(obj.ademas != undefined){
														ademas.ancho = e.pageX -salvaE.salvaUltimoX;
														}
													}
													else{
														ademas.ancho = undefined;
													}
													var cssBorde = {};
													obj.redimencionar(elemento, css, $(this), cssBorde, ademas);
													salvaE.salvaUltimoX = e.pageX;
													salvaE.salvaUltimoY = e.pageY;
												});
												$('html').bind('mouseup', function(){
													$(this).unbind('mousemove');
													$(this).unbind('mouseup');
												});
							  			 	});
									
						}
						//Redimencionar Abajo e Izquierda	   
					if(this.dir.der){
							this.abjIzq = $('<div class="abjIzqRed"></div>')
										  .css({
										  	width: obj.AnchoLim,
											height: obj.AnchoLim,
											backgroundColor:'yellow',
//											position:'relative',
//											left:
										  })
										  .appendTo(this.abj)
										  .hover(function(e){
										      e.stopPropagation();
											  $(this).css({
											  	cursor:'sw-resize' 
											  });
										  },function(e){
										  	  $(this).css({
											  	cursor:'normal'
											  });	
										  }) 
										  .bind('mousedown', function(e){
										  		if(obj.eliminarAdemas !=null)
			   										$(obj.eliminarAdemas).remove();
										   		e.preventDefault();
												e.stopPropagation();						
					        					if(obj.ademas != undefined)
													var ademas = {};
										   		var salvaE = e;
												var salvaDiv = $(this);
												var salvaAlto = elemento.height();
												var salvaLeft = elemento.position().left;
												var salvaAncho = elemento.width();
												$('html').bind('mousemove', function(e){
												    e.preventDefault();
													var css = {};
													var alto = salvaAlto + e.pageY - salvaE.pageY;
													if(alto >= obj.minAlto){
														css.height = alto;
														if(obj.ademas != undefined){
														ademas.alto = e.pageY - salvaE.salvaUltimoY;
														}
													}
													else{
														ademas.alto = undefined;
													}
													var ancho = salvaAncho + salvaE.pageX - e.pageX;
													if(ancho >= obj.minAncho){
														css.left = salvaLeft - ancho + salvaAncho;
														css.width = ancho;
														if(obj.ademas != undefined){
														ademas.ancho = salvaE.salvaUltimoX- e.pageX;
														ademas.left = salvaE.salvaUltimoX - e.pageX;
														}
													}
													else{
														ademas.left = undefined;
														ademas.ancho = undefined;
													}
													var cssBorde= {
														
													};
													obj.redimencionar(elemento, css, $(this), cssBorde, ademas);
													salvaE.salvaUltimoX = e.pageX;
													salvaE.salvaUltimoY = e.pageY;
												});
												$('html').bind('mouseup', function(){
													$(this).unbind('mousemove');
													$(this).unbind('mouseup');
												});
							  			 	});									
						}							   	 
			   }
		}
		
	    Redimencionar.prototype.redimencionar = function(elemento, css, borde, cssBorde, ademas){
		    if(!this.incluido)   
				elemento.css(css);
			
			borde.css(cssBorde);
			if(elemento.find('.derRed') != undefined)
				elemento.find('.derRed').css({
					left: elemento.width()-obj.AnchoLim,
					height:elemento.height()
				});
			if(elemento.find('.arrRed') != undefined)
				elemento.find('.arrRed').css({
					width:elemento.width()
				});
			if(elemento.find('.abjRed') != undefined)
				elemento.find('.abjRed').css({
					width:elemento.width(),
					top: elemento.height()-obj.AnchoLim
			});	
			if(elemento.find('.izqRed') != undefined)
				elemento.find('.izqRed').css({
					height:elemento.height()
				});
				
			if(this.ademas != false){
//			    var aux = $.makeArray();
                var arregloAux = Array();
			    if(this.ademas.dinamico != undefined){
					for(var i = 0; i< this.ademas.dinamico.length; i++){
						if(this.ademas.dinamico[i].cadenaBase != undefined)
							var cadenaBase = this.ademas.dinamico[i].cadenaBase;
						for(atributo in this.ademas.dinamico[i].valores){
							var valor = this.calcularValoresBaseElemento(elemento, this.ademas.dinamico[i].valores[atributo]);
							if(cadenaBase != undefined)
								cadenaBase = this.convertirCadena(cadenaBase , atributo, valor)
						}
//						alert(cadenaBase);
						var auxTemp = new Object();
							auxTemp.entre = 1;
						if(cadenaBase != undefined)
					   	 	auxTemp.aux = $(cadenaBase);
						else	
							auxTemp.aux = valor;
						if(this.ademas.dinamico[i].noReajustar){
							auxTemp.noReajustar = true;
						}	
//						alert(auxTemp.aux.length);	
						if(this.ademas.dinamico[i].entreFijo != undefined){
							auxTemp.entre = this.ademas.dinamico[i].entreFijo;
						}	
						else if(this.ademas.dinamico[i].entre != undefined){
							var cadenaBase = this.ademas.dinamico[i].entre.cadenaBase;
//							alert(cadenaBase);
							for(attrEntre in this.ademas.dinamico[i].entre.valores){
								var valorEntre = this.calcularValoresBaseElemento(elemento, this.ademas.dinamico[i].entre.valores[atributo]);
								if(cadenaBase != undefined)
								cadenaBase= this.convertirCadena(cadenaBase , attrEntre, valorEntre);
//								alert(cadenaBase);
							}
//							alert(cadenaBase);
							var retorno = $(cadenaBase);
							if(this.ademas.dinamico[i].entre.cantidad)
								retorno = retorno.length;
							if(this.ademas.dinamico[i].entre.fijo != undefined)
								retorno+= this.ademas.dinamico[i].entre.fijo;			 
							auxTemp.entre = retorno;
						}
						arregloAux.push(auxTemp);	
					}				    
					if(this.ademas.fijo != undefined){
                        var auxTemp = new Object();
							auxTemp.entre =1;
							auxTemp.aux = this.ademas.fijo;	
						arregloAux.push(auxTemp);
					}				
				}
				else {
					 var auxTemp = new Object();
							auxTemp.entre =1;
							auxTemp.aux = this.ademas;	
						arregloAux.push(auxTemp);
				}  
              for(var i=0 ; i< arregloAux.length; i++ ){
			  	var aux = arregloAux[i].aux;  
				var entre = arregloAux[i].entre;       
				aux.each(function(){
				    $(this).css({
						position:'relative',
//						backgroundColor:'green'
					});
					if(arregloAux[i].noReajustar != true){
						var salvaLeft = $(this).offset().left -$(this).parent().offset().left;
						var salvaTop = $(this).offset().top -$(this).parent().offset().top;
						if(ademas.ancho)
							$(this).width($(this).width() + ademas.ancho/entre);
						if(ademas.alto)
							$(this).height($(this).height() + ademas.alto/entre);
						if(ademas.left)
							$(this).css({
								left: salvaLeft -  ademas.left
							});	
						if(ademas.top)
							$(this).css({
								top: salvaTop -  ademas.top
							});
					}
							
					if($(this).hasClass('redimencionable')){
						$(this).find('.derRed').css({
							left: $(this).width() - $(this).find('.derRed').width(),
							height: $(this).height()
						});
						$(this).find('.izqRed').css({
							left: 0,
							height: $(this).height()
						});
						$(this).find('.arrRed').css({
							top: 0,
							width: $(this).width()
						})
						$(this).find('.abjRed').css({
							top: $(this).height() - $(this).find('.abjRed').height(),
							width: $(this).width()
						});
					}
				});
			   }	
			}	
			if(this.scroll.ejecutar){
				this.scroll.funcion.mostrarScroll();
			}
		}	
		
		Redimencionar.prototype.calcularValoresBaseElemento = function(elemento, arreglo){
			var result = elemento;
			for(var i = 0; i < arreglo.length; i++){
				if(arreglo[i] == 'padre')	
					result = result.parent();
				else if(arreglo[i] == 'clase')
					result = result.attr("class");
				else if(arreglo[i] == 'sig')
					result = result.next();		
			}
			return result;
		}
		
		Redimencionar.prototype.convertirCadena = function(cadena, patron , nuevoValor){
			var busqueda = cadena.indexOf(patron);
			var result = cadena.slice(0, busqueda)+nuevoValor+cadena.slice(busqueda+patron.length, cadena.length);
			return result;			
		}			
		this.declarar();
		
	},
	opcionesDefecto : {
		arregloFinal: null,
		minAncho : 50,
		minAlto : 50,
		AnchoLim: 5,
		incluido: false,
		ademas: false,
		scroll : {
			ejecutar: false,
			elemento: false
		},
		eliminarAdemas: false
		
	}	
}