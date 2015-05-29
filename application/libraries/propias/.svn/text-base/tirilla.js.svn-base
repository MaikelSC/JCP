$.JCP.tirilla = {
	crear : function Tirilla(arregloParametros){
		$.extend(this, $.JCP.tirilla.opcionesDefecto, arregloParametros);
		var obj = this;
		
		Tirilla.prototype.cargaInicial = function(){
			this.bloquedor = $('<div id="bloqueador"></div>')
			.css({
				backgroundColor:'black',
				position:'absolute',
				width:$.estilo.width,
				height:$.estilo.height,
				zIndex:'600',
				opacity:'0.5'
				
			})
			.prependTo($('html'));
			
			this.construirEstructura();
			
			$('html').declararEvento(Array("keypress"), Array("37", "39", "27", "13"), Array(obj.retroceder, obj.avanzar, obj.cerrarVista, obj.mostrarVistaEnter));	
		}
		
		
		Tirilla.prototype.construirEstructura = function(){			
			if(this.pos.arr || this.pos.abj){
				if(this.pos.abj){
					var topBloqParcial = $.estilo.height - 20*$.estilo.height/100;
				}
				else{
					var topBloqParcial = 0;
				}
				var anchoBloqParcial = $.estilo.width;
				var altoBloqParcial = parseInt(25*$.estilo.height/100);
				
				var infoAlto = parseInt(4*$.estilo.height/100);
				var infoAncho = $.estilo.width - parseInt(12*$.estilo.height/100);
				
				var padreAlto = parseInt(25*$.estilo.height/100) - parseInt(4*$.estilo.height/100);
				var padreAncho = $.estilo.width - parseInt(12*$.estilo.height/100)-1;
				var padreTop = infoAlto;
				
				var propAlto = '100%';
				var propAncho = parseInt(12*$.estilo.height/100);
				var leftConf = padreAncho;
				var topConf = 0;
				
				var cssDivBotones = {
					display:'block',
					marginTop:parseInt(8*$.estilo.height/100)
				};
				
				this.displayImg = 'inline-block';
				
				var displayBot = 'default';
			}
			else{
				var topBloqParcial = 0;
				if(this.pos.der){
					var leftBloqParcial = $.estilo.width - 20*$.estilo.height/100;
				}
				else{
					var leftBloqParcial = 0;
				}
				var anchoBloqParcial = parseInt(25*$.estilo.height/100);
				var altoBloqParcial = $.estilo.height;
				
				var infoAncho= '100%';
				var infoAlto = 8*$.estilo.height/100;
				
				var padreAncho = parseInt(25*$.estilo.height/100);
				var padreAlto = $.estilo.height - parseInt(12*$.estilo.height/100) -parseInt(8*$.estilo.height/100);
				var padreTop = infoAlto + 12*$.estilo.height/100;
				
				var propAncho = '100%';
				var propAlto = parseInt(12*$.estilo.height/100);	
				var leftConf = 0;
				var topConf = parseInt(8*$.estilo.height/100);			
				
				var cssDivBotones = {
					width:parseInt(12*$.estilo.height/100),
					marginLeft:parseInt(2*$.estilo.height/100)
				};
				
				this.displayImg = 'default';
				
				var displayBot = 'inline-block';
			}
			
			if($('#bloqueadorParcial').length == 0)
			this.bloquedorParcial = $('<div id="bloqueadorParcial"></div>')
			.css({
				backgroundColor:'black',
				position:'absolute',
				width:anchoBloqParcial,
				height:altoBloqParcial,
				top: topBloqParcial,
				left: leftBloqParcial,
				zIndex:'601',
				opacity:'0.6'				
			})
			.appendTo($('html'));
			
			if($('#contenedorTir').length == 0)	{
				this.contenedor = this.bloquedorParcial.clone()
				.attr("id", "contenedorTir")
				.css({
					zIndex:'603',
					backgroundColor:'transparent',
					opacity:1,
					display:'inline-block',				
				})
				.prependTo($('html'));
				
				this.info = $('<div ></div>')
				.css({
					position:'relative',
					width:infoAncho,
					height:infoAlto,
					backgroundColor:'black',
				})			
				.appendTo(this.contenedor);	
				
				this.labelInfo = $('<label></label>')
				.appendTo(this.info);
				
				this.padreTirilla = this.contenedor.clone()
				.css({
					position:'absolute',
					top:padreTop,	
					left:0,
					width:padreAncho,
					height:padreAlto,		
				})
				.attr("id", "padreTirilla")
				.appendTo(this.contenedor);						
					
				this.verConf = $('<div></div>')
				.css({
					position:'absolute',
					left: leftConf,
					top: topConf,
					width:propAncho,
					height:propAlto,
					backgroundColor:'black',
					zIndex:'605',
					display:'inline-block'
				});
				if(obj.pos.arr || obj.pos.abj)								
					this.verConf.appendTo(this.contenedor);	
				else	
					this.verConf.insertBefore(this.padreTirilla);
				
				this.crearBotonConf('utiles/cerrar.png', this.cerrarPluggin , 'utiles/cerrarHover.png', {float:'right', margin:2}, false, this.verConf);	
				
				this.divBotones = $('<div></div>')
				.css(cssDivBotones)			
				.appendTo(this.verConf);
				
				this.crearBotonConf('utiles/arr.png', this.ponerArriba , 'utiles/arrHover.png' , {display:'block'}, true);				
				this.crearBotonConf('utiles/izq.png', this.ponerIzq , 'utiles/izqHover.png' , {display:'inline-block', width:'50%'});
				this.crearBotonConf('utiles/der.png', this.ponerDer ,'utiles/derHover.png' , {display:'inline-block', width:'50%'});				
				this.crearBotonConf('utiles/abj.png', this.ponerAbajo , 'utiles/abjHover.png' , {display:'block'}, true);
				
			}
			this.padreTirilla.empty();
			
			this.Tirilla = $('<div></div>')
			.attr("id", "tirilla")
			.css({
				zIndex:'605',
				opacity:0,
				whiteSpace:'nowrap',
				display:'inline-block',
			})	
			.appendTo(this.padreTirilla);
					
				this.labelInfo.empty();
				if(this.mostrarAlbums){
					$('<div>'+this.tituloAlbums+'</div>')
						.css({
							display:'inline-block',
							fontSize:'20px',
							paddingLeft:5,
							color:'white',
						})
						.appendTo(this.labelInfo);
				}
				else{
					if(this.idAlbum != null){					    
						this.atras = $('<a href="#">Albums/</a>')
						.css({
							display:'inline-block',
							fontSize:'20px',
							paddingLeft:5,
							color:'white',
							fontWeight:'bold'
						})
						.click(function(e){
							e.preventDefault();
							obj.mostrarAlbums = true;
							obj.idAlbum = null;
							obj.construirEstructura();
//							obj.scroll.mostrarScroll();
						})
						.appendTo(this.labelInfo);
						$('<div>'+this.tituloAlbum+'</div>')
						.css({
							display:'inline-block',
							fontSize:'20px',
							paddingLeft:5,
							color:'white',
						})
						.appendTo(this.labelInfo);
					}
				}
			if(this.mostrarAlbums)	
				this.pedirAlbums();
			else		
				this.pedirImagenes();
					
		}
		
		Tirilla.prototype.crearBotonConf = function(src , metodo,  srcHover, cssCont, centrar, padre){
			if(padre == undefined)
				padre = this.divBotones;
			var contImg = $('<div></div>')
			.css(cssCont)
			.appendTo(padre);
			var img = $('<img src="'+$.urlServer+'/cantante/application/imagenes/'+src+'"/>')
			.click(function(){
				metodo();
			})
			.appendTo(contImg);
			if(centrar)
				img.centrar();
			if(srcHover!= undefined){
				img.hover(function(){
					$(this).attr("src", $.urlServer+"/cantante/application/imagenes/"+srcHover);
				},function(){
					$(this).attr("src", $.urlServer+"/cantante/application/imagenes/"+src);
				});
			}
		}
		
		Tirilla.prototype.retroceder = function(){
			if(obj.seleccionado != null)
			if(obj.seleccionado.prev().length > 0){
				obj.seleccionado
				.css({
					border:'4px solid'
				})
				.removeClass('seleccionado')
				.removeClass('mostrado')
				.find('img')
				.css({
					opacity:'0.7'
				});
				obj.seleccionado = obj.seleccionado.prev();
				obj.seleccionado
				.css({
					border: '4px solid red'
				})
				.find('img')
				.css({
					opacity:'1'
				});
				if($('#interiorTirilla').length > 0){
					var original = $('#interiorTirilla').find('img');
					var copia  = $('#interiorTirilla').find('img')
					.clone()
					.css({
						position:'absolute',
						left:original.offset().left,
						top:original.offset().top,
					})
					.appendTo($('html'));
					original.attr("src", obj.seleccionado.find('img').attr("src"));
					copia.desbaratar();
//					$('#interiorTirilla').find('img').desbaratar();
//					obj.seleccionado.trigger('click');
				}
					obj.correrScroll(obj.seleccionado);	
				obj.seleccionado.addClass('seleccionado');
			}			
		}	
		
		Tirilla.prototype.avanzar = function(){
			
			if(obj.seleccionado != null)
			if(obj.seleccionado.next().length > 0){
				obj.seleccionado
				.css({
					border:'4px solid'
				})
				.removeClass('seleccionado')
				.removeClass('mostrado')
				.find('img')
				.css({
					opacity:'0.7'
				});
				obj.seleccionado = obj.seleccionado.next();
				obj.seleccionado
				.css({
					border: '4px solid red'
				})
				.find('img')
				.css({
					opacity:'1'
				});				
				if($('#interiorTirilla').length > 0){
					var original = $('#interiorTirilla').find('img');
					var copia  = $('#interiorTirilla').find('img')
					.clone()
					.css({
						position:'absolute',
						left:original.offset().left,
						top:original.offset().top,
					})
					.appendTo($('html'));
					original.attr("src", obj.seleccionado.find('img').attr("src"));
					copia.desbaratar();
//					$('#interiorTirilla').find('img').desbaratar();
//					obj.seleccionado.trigger('click');
				}
//				else
					obj.correrScroll(obj.seleccionado);	
				obj.seleccionado.addClass('seleccionado');
			}			
		}
		
		Tirilla.prototype.cerrarVista = function(){
			if($('#vistaTirilla').find('img').length > 0){
				obj.correrScroll(obj.seleccionado);
//				alert($('#vistaTirilla').find('img').offset().left);
				$('#vistaTirilla').find('img')
				.clone()
				.css({
//					left : $('#vistaTirilla').find('img').offset().left,
					left :$('#interiorTirilla').offset().left,
//					top : $('#vistaTirilla').find('img').offset().top,
					top : $('#interiorTirilla').offset().top,
					position:'absolute',
					zIndex:'620'
				})
				.appendTo($('html'))				
//				.centrar(true,false)
				.desplazarA({
										referencia:{
											elemento:obj.seleccionado.find('img'),
											redimencionar:true,
										},
										callback: obj.EliminarVista
						});	
				$('#vistaTirilla').remove();
			}	
			/*$('#vistaTirilla').animate({height:0, top:$('#vistaTirilla').offset().top+$('#vistaTirilla').height()/2},'normal', function(){$('#vistaTirilla').remove();});*/
			
			/*$('#vistaTirilla').animate({height:0, width:0},'slow', function(){obj.EliminarVista();$('#vistaTirilla').remove();});	*/
			
//			$('#vistaTirilla').animate({height:0},'normal', function(){$('#vistaTirilla').remove();});
	
			/*$('#vistaTirilla').animate({height:$('#vistaTirilla').height()/2-20},'slow', function(){
				$('#vistaTirilla').animate({width:0},'slow', function(){
					obj.EliminarVista();
					$('#vistaTirilla').remove();
				});
			});*/	
			
			
				
		}
		
		Tirilla.prototype.ponerArriba = function(){
			if(!obj.pos.arr){
				obj.cambiarPosicion();
				obj.pos.arr = true;
				obj.pos.abj = false;
				obj.pos.izq = false;
				obj.pos.der = false;			
				obj.construirEstructura();
			}
		}
		
		Tirilla.prototype.ponerAbajo = function(){
			if(!obj.pos.abj){
				obj.cambiarPosicion();
				obj.pos.arr = false;
				obj.pos.abj = true;
				obj.pos.izq = false;
				obj.pos.der = false;								
				obj.construirEstructura();
			}
		}
		
		Tirilla.prototype.ponerIzq = function(){
			if(!obj.pos.izq){
				obj.cambiarPosicion();
				obj.pos.arr = false;
				obj.pos.abj = false;
				obj.pos.izq = true;
				obj.pos.der = false;			
				obj.construirEstructura();
			}
		}
		
		Tirilla.prototype.ponerDer = function(){
			if(!obj.pos.der){
				obj.cambiarPosicion();
				obj.pos.arr = false;
				obj.pos.abj = false;
				obj.pos.izq = false;
				obj.pos.der = true;				
				obj.construirEstructura();
			}
		}
		
		Tirilla.prototype.EliminarVista = function(elemento){
			
			if(elemento != undefined)
			elemento.remove();
			clearInterval(obj.pelicula);
			obj.seleccionado.addClass('seleccionado');
			obj.seleccionado.removeClass('mostrado');
		}
		
		Tirilla.prototype.mostrarVistaEnter = function(){
			if(obj.seleccionado != undefined){
				obj.mostrarVista(obj.seleccionado);
			}
				
		}
		
		Tirilla.prototype.pedirAlbums = function(){
		    $.consultaAjax.ejecutar({
									url: this.urls.listarAlbums,
									persistir: this,
									accionCorrecta: this.guardarDatosAlbums						
									});	
		}
		
		Tirilla.prototype.pedirImagenes = function(){
			var parametros = {url: this.urls.listar,
							persistir: this,
							accionCorrecta: this.guardarDatos						
			};
			
			if(obj.idAlbum != null){
				parametros.data = {};
				parametros.data.idAlbum = obj.idAlbum;
			}
		    $.consultaAjax.ejecutar(parametros);	
		}
		
		Tirilla.prototype.guardarDatos = function(data, obj){
			obj.datos = data.imagenes;
			obj.llenarTirilla(obj.datos);
		}
		
		Tirilla.prototype.guardarDatosAlbums = function(data, obj){
			if(data.imagenes.length != null){				
				obj.datosAlbums = data.imagenes;
				obj.llenarTirilla(obj.datosAlbums, true);
			}
			else
				obj.mostrarMensajeVacio();
		}
		
		Tirilla.prototype.mostrarMensajeVacio = function(){
			obj.vacio = $('<div></div>')
			.css({
			})
		}
		
		Tirilla.prototype.llenarTirilla = function(datos, album){
			 obj.Tirilla.empty();
			 if(datos != null){	
			 	if(album)
					for(var i = 0; i < datos.length; i++){
						var imagen = obj.crearAlbum(datos[i], obj);			
					}	
				else						 				
					for(var i = 0; i < datos.length; i++){
							var imagen = obj.crearImagen(datos[i], obj);			
					}
				$.JCP.Crear('scroll', {elemento: obj.padreTirilla,
										sincrono: true,
										persistirObj: obj
										});
				obj.Tirilla.css({
					opacity:1
				});						
			 }
		}
		
		Tirilla.prototype.crearAlbum = function(imagen, obj){
			var obj = this;
			if(obj.pos.arr || obj.pos.abj){
				var prop = 'inline-block';
				var dimension = parseInt(50*obj.padreTirilla.height()/100);
				var anchoTit =  dimension;
				var altoTit = parseInt(10*obj.padreTirilla.height()/100);
			}
			else{
				var prop = 'block';
				var dimension = parseInt(50*obj.padreTirilla.width()/100);
				var anchoTit =  parseInt(10*obj.padreTirilla.height()/100);
				var altoTit = dimension;
			}
			var contImag = $('<div id="'+imagen.id+'" class="ContImg"></div>')
			.css({
				height:dimension,
				width:dimension,
				margin:dimension/4,
				backgroundColor:'white',
				padding:2,
				display:prop,
				border:'4px solid'
			})
			.bind('mouseover', function(){
				$(this).css({
					border:'4px solid red'
				});
			})
			.bind('mouseout', function(){
				if(!$(this).hasClass('seleccionado'))
				$(this).css({
					border:'4px solid'
				});
			})
			.bind('dblclick', function(){
				 obj.mostrarAlbums = false;
				 obj.idAlbum = $(this).attr("id");
				 obj.tituloAlbum = $(this).find('div').text();
				 obj.construirEstructura();
			})
			.appendTo(this.Tirilla);
	        $('<img src="'+$.urlServer+'/cantante/application/imagenes/upload/'+imagen.src+'">')
			.css({
				width:dimension,
				height:dimension,
			})
			.appendTo(contImag);
			var titulo = $('<div>'+imagen.titulo+'</div>')
			.css({
				width: anchoTit,
				height:altoTit,
				color:'white',
				padding:5
			})
			.appendTo(contImag);
			return contImag;			
		}		
		
		Tirilla.prototype.crearImagen = function(imagen, obj){
			var obj = this;
			if(obj.pos.arr || obj.pos.abj){
				var prop = 'inline-block';
				var dimension = parseInt(55*obj.padreTirilla.height()/100);
			}
			else{
				var prop = 'block';
				var dimension = parseInt(50*obj.padreTirilla.width()/100);
			}
			var contImag = $('<div class="ContImg"></div>')
			.css({
				height:dimension,
				width:dimension,
				margin:dimension/6,
				backgroundColor:'white',
				padding:2,
				display:prop,
				border:'4px solid',
				position:'relative',
			})
			.bind('mouseover', function(){
				$(this).css({
					border:'4px solid red'
				})
				.find('img')
				.css({
					opacity:'1'
				});
			})
			.bind('mouseout', function(){
				if(!$(this).hasClass('seleccionado'))
				$(this).css({
					border:'4px solid'
				})
				.find('img')
				.css({
					opacity:'0.7'
				});
			})
			.bind('click', function(){
				 obj.mostrarVista($(this));
			})
			.appendTo(this.Tirilla);
	        $('<img src="'+$.urlServer+'/cantante/application/imagenes/upload/'+imagen.src+'">')
			.css({
				width:dimension,
				height:dimension,				
				opacity:'0.7'
			})
			.appendTo(contImag);
			return contImag;			
		}
		
		Tirilla.prototype.correrScroll =  function(elemento){
			if(obj.pos.arr || obj.pos.abj){
	                var margenImg = 55*obj.padreTirilla.height()/600+1;
					if(elemento.offset().left < 0)
						obj.scroll.moverIzquierda((elemento.offset().left-margenImg)*100/obj.padreTirilla.width()*-1);
					else if(elemento.offset().left + elemento.width() > obj.padreTirilla.offset().left + obj.padreTirilla.width())
						obj.scroll.moverDerecha((elemento.offset().left + elemento.width() - obj.padreTirilla.width()+2*margenImg)*100/obj.padreTirilla.width());
			}
	  		else{
					var margenImg = 50*obj.padreTirilla.width()/600+1;
					if(elemento.offset().top < parseInt(8*$.estilo.height/100) + parseInt(12*$.estilo.height/100))
						obj.scroll.moverArriba((elemento.offset().top - obj.padreTirilla.offset().top -margenImg)*100/obj.padreTirilla.height()*-1);								
					else if(elemento.offset().top + elemento.height() > obj.padreTirilla.offset().top + obj.padreTirilla.height()){
						obj.scroll.moverAbajo((elemento.offset().top + elemento.height() - (obj.padreTirilla.offset().top + obj.padreTirilla.height()) + 2*margenImg)*100/obj.padreTirilla.height());
							}
								
			}
		}
		
		Tirilla.prototype.mostrarVista =  function(elemento){
				if(!elemento.hasClass('mostrado')){
					if(obj.seleccionado != null){
						obj.correrScroll(elemento);		
						obj.seleccionado.removeClass('seleccionado');
						obj.seleccionado.removeClass('mostrado');
						obj.seleccionado.css({
							border:'4px solid'
						})
						.find('img')
						.css({
							opacity:'0.7'
						});
					}									
					elemento.css({
						border:'4px solid red'
					})
					.find('img')
					.css({
						opacity:'1'
					});
					obj.seleccionado = elemento;
					elemento.addClass('seleccionado');
					elemento.addClass('mostrado');
					if($('#vistaTirilla').length == 0){						
						if(obj.pos.arr)
							var topVista = 60;
						else if(obj.pos.abj)
							var topVista = -60;	
						else var topVista = 0;	
						$('<div id="vistaTirilla"></div>')
						.css({
							position:'absolute',
							top: $.estilo.height/2 - parseInt(obj.dimensionVista*$.estilo.height/100/2) + topVista,
							zIndex:'609',
							left:$.estilo.width/2 - parseInt(obj.dimensionVista*$.estilo.height/100/2),
							width: parseInt(obj.dimensionVista*$.estilo.height/100),
							height: parseInt(obj.dimensionVista*$.estilo.height/100),
							padding: parseInt(3*obj.dimensionVista*$.estilo.height/100/100),
							opacity:0,
							backgroundColor:'#b5b5b5'
//							backgroundColor:'black'
						})
						.appendTo($('html'));						
						$('<div id="interiorTirilla"></div>')				
						.css({
							width:'100%',
							height:'90%',
							position:'relative',
//							top:-6*obj.dimensionVista*$.estilo.height/100/100
						})
						.appendTo($('#vistaTirilla'))						
						.centrar(true, false);
						//FilaBotones
						var botones = $('<div id="botonesTirilla"></div>')				
						.css({
							width:'100%',
							height:'9%',
//							backgroundColor:'red',
							position:'relative',
							top: parseInt(obj.dimensionVista*$.estilo.height/100/100)
//							top:-6*obj.dimensionVista*$.estilo.height/100/100 + obj.dimensionVista*$.estilo.height/100/100
						})
						.appendTo($('#vistaTirilla'));
						var IntBot = $('<div id="IntBotTirilla"></div>')
						.css({
//							backgroundColor:'blue',
							width:'49%',
							height:'55%'
						})
						.appendTo(botones);
						
						
						
						$('<div id="parar">S</div>')
						.appendTo(IntBot)
						.css({
							width:IntBot.height(),
							height:'100%',
							backgroundColor:'white',
							display:'inline-block',
							marginLeft:'12%'
						})
						.click(function(){
							if(obj.peliculando){							
								clearInterval(obj.pelicula);
								obj.peliculando = false;
							}
						});
						$('<div id="play">P</div>')
						.appendTo(IntBot)
						.css({
							width:IntBot.height(),
							height:'100%',
							backgroundColor:'white',
							display:'inline-block',
							marginLeft:'12%'
						})
						.click(function(){
							if(obj.seleccionado == undefined)
								var inicio = obj.Tirilla.find('.ContImg:first');
							else
								var inicio = obj.seleccionado;	
							if(obj.peliculando != true){
								obj.peliculando = true;	
								obj.pelicula =  setInterval(function(){		
									inicio = inicio.next();				
	//								inicio.trigger('click');
									obj.avanzar();
									if(inicio.length == 0){
										obj.peliculando = false;			
										clearInterval(obj.pelicula);
									}
								},2000);
							}
						});
						$('<div id="anterior">A</div>')
						.appendTo(IntBot)
						.css({
							width:IntBot.height(),
							height:'100%',
							backgroundColor:'white',
							display:'inline-block',
							marginLeft:'12%'
						})
						.click(function(){
							obj.retroceder();
//							obj.seleccionado.prev().trigger('click');
						});
						$('<div id="sig">N</div>')
						.appendTo(IntBot)
						.css({
							width:IntBot.height(),
							height:'100%',
							backgroundColor:'white',
							display:'inline-block',
							marginLeft:'12%'
						})
						.click(function(){
//							obj.seleccionado.next().trigger('click');
							obj.avanzar();
						})
						IntBot.centrar();
						
						$.JCP.Crear('mover',{
									elementoAccion: $('#vistaTirilla'),
									eventoEntrada : 'mousedown',
									eventoSalida : 'mouseup',
									blqFondo:false,
									persistirObj: obj
									});						
					}			
					elemento.find('img')
					.clone()
					.appendTo($('html'))
					.css({
						zIndex:'611',
						top:elemento.find('img').offset().top,
						left:elemento.find('img').offset().left,
					})
					.desplazarA({
									referencia:{
										elemento:$('#interiorTirilla'),
										redimencionar:true,
									},
									callback: obj.mostrarDiv
					});
				}				
			
		}	
		
		Tirilla.prototype.mostrarDiv = function(elemento, referencia){
			referencia.empty();
			elemento.clone().css({top:0,left:0}).appendTo(referencia);
			elemento.remove();
			referencia.parent().css({
				opacity:1
			});
			var divCerrar = $('<div id="cerrarTirilla"></div>')
						.css({
							width:9*$('#vistaTirilla').width()/100,
							height:9*$('#vistaTirilla').height()/100,
							position:'absolute',
							zIndex:'612',
							left:$('#vistaTirilla').width() - 9*$('#vistaTirilla').width()/100,
							top:9*$('#vistaTirilla').width()/200
						})						
						.prependTo($('#vistaTirilla'));
						$('<img src="'+$.urlServer+'/cantante/application/imagenes/utiles/btn_cerrar_foto.png"/>')
						.click(function(){
							obj.cerrarVista();
						})
						.hover(function(){
							$(this).attr("src", $.urlServer+"/cantante/application/imagenes/utiles/btn_cerrar_foto_hover.png");
						}, function(){
							$(this).attr("src", $.urlServer+"/cantante/application/imagenes/utiles/btn_cerrar_foto.png");
						})
						.appendTo(divCerrar);
		}
		
		Tirilla.prototype.cambiarPosicion = function(){
			$('#vistaTirilla').remove();
			obj.bloquedorParcial.remove();
			obj.contenedor.remove();
			obj.seleccionado = null;
		}
		
		Tirilla.prototype.cerrarPluggin = function(){
			obj.cambiarPosicion();
			obj.bloquedor.remove();
		}
		
		this.cargaInicial();
	}, 
	opcionesDefecto : {
		seleccionado : null,
		dimensionVista : 60,
		mostrarAlbums : true,
		idAlbum: null,
		tituloAlbums: 'Listado de Albums'
	}
}