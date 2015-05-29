$.JCP.scroll = {
	crear : function Scroll(arregloParametros){	
	    $.extend(this, $.JCP.scroll.opcionesDefecto, arregloParametros);
		Scroll.prototype.mostrarScroll = function(){
            this.calcularAnchoHijos();
            this.calcularAltoHijos();	
            var estadoX = this.estadoX();
            var estadoY = this.estadoY();
            var obj = this;
            if(estadoX || estadoY){
				if(this.contenedor == undefined){
					this.contenedor = $('<div class="contendorScroll"></div>').appendTo(this.elemento);
					this.contenedor.css({
						overflow:'hidden',
						height:this.elemento.height(),
						width:this.elemento.width()
					});
					this.intermedio = $('<div class="intermedioScroll"></div>');
					this.elemento.children().not('.contendorScroll').not('.intermedioScroll').each(function(){
						$(this).appendTo(obj.intermedio);
					});
					this.intermedio.width(this.anchoHijos);
					this.intermedio.height(this.altoHijos);
					this.intermedio.appendTo(this.contenedor);
					this.intermedio.css({
						position:'relative'
					});
				}
				else{		
				this.intermedio.width(this.finX - this.inicioX);
				this.intermedio.height(this.finY - this.inicioY);
				}
			}				
			if(!this.reScrollX){
				if(estadoX == 1){
					this.contruirScrollAncho(estadoY);
					this.reScrollX = true;					
				}
			}
			else{
				if(estadoX == 3)
					this.eliminarScrollAncho();	
				else 
					this.recargarScrollAncho();						
			}			
			if(!this.reScrollY){
				if(estadoY == 1){
					this.contruirScrollAlto(estadoX);
					this.reScrollY = true;					
				}
			}
			else{
				if(estadoY == 3)
					this.eliminarScrollAlto();	
				else
					this.recargarScrollAlto();					
			}					     	
		}
		
		Scroll.prototype.calcularAnchoHijos = function(ancho){
		    var obj = this;
			var restoAncho = 0;
			 if(this.intermedio == undefined){				
			   var elemento  = this.elemento;
			   if(ancho)
			   		restoAncho = 25;
			}  
			 else{	
			 	var elemento = this.intermedio;
			 }	
			this.inicioX = 	elemento.offset().left;
			this.finX = elemento.offset().left + elemento.width() - restoAncho;
			finXMenor = elemento.offset().left + elemento.width() - restoAncho;
			finXMayor = elemento.offset().left + elemento.width() - restoAncho;          
			var obj = this;   
			elemento.children().each(function(){			
				if(finXMayor < $(this).offset().left + $(this).width()){				
					finXMayor = $(this).offset().left + $(this).width();
//					$('#td_header').text($('#td_header').text()+'1');
				}
				/*else if(finXMayor == obj.finX && obj.reScrollX){
					if(finXMenor > $(this).offset().left + $(this).width()){					
						finXMenor = $(this).offset().left + $(this).width();
//						$('#td_header').text($('#td_header').text()+'2');
					}
				}*/
			});
			if(finXMayor == obj.finX && obj.reScrollX){
			    var finXMenor = 0;
				elemento.children().each(function(){
					if(finXMenor < $(this).offset().left + $(this).width())
						finXMenor = $(this).offset().left +  $(this).width();
				});
			}
			
			/*var mayor = -9999; 
			elemento.children().each(function(){			
				if(mayor < $(this).offset().left + $(this).width()){				
					mayor = $(this).offset().left + $(this).width();
//					$('#td_header').text($('#td_header').text()+'1');
				}
				
			});*/
			if(finXMayor != this.finX)
				this.finX = finXMayor;
			else if(finXMenor != 0)	
				this.finX = finXMenor;
			this.anchoHijos = this.finX - this.inicioX;
//			$('#td_header').text(this.finX+'---'+finXMayor);	
//			$('#td_header').text(this.anchoHijos);	
		}
		
		Scroll.prototype.estadoX = function(){	
			if(this.intermedio == undefined)
				var elemento = this.elemento;
			else
				var elemento = this.intermedio;
			if(elemento.width() < this.anchoHijos)
				return 1;
			else if(elemento.width() > this.anchoHijos){
				if(this.anchoHijos <= this.contenedor.width())
					return 3;
				return 2;
			}
						
		}
		
		Scroll.prototype.calcularAltoHijos = function(ancho){	   
			var bool = false;
			var restoAncho = 0;			
			 if(this.intermedio == undefined){		 	
			    var elemento  = this.elemento;
			    if(ancho)
				restoAncho = 25;
			 }
			 else
			 	var elemento = this.intermedio;
			this.inicioY = 	elemento.offset().top;
			this.finY = elemento.offset().top + elemento.height() - restoAncho;
			finYMenor = elemento.offset().top + elemento.height() - restoAncho;
			finYMayor = elemento.offset().top + elemento.height() - restoAncho;          
			var obj = this;   
			elemento.children().each(function(){			
				if(finYMayor < $(this).offset().top + $(this).height()){				
					finYMayor = $(this).offset().top + $(this).height();
				}
			});
			if(finYMayor == obj.finY && obj.reScrollY){
			    var finYMenor = 0;
				elemento.children().each(function(){
					if(finYMenor < $(this).offset().top + $(this).height())
						finYMenor = $(this).offset().top +  $(this).height();
				});
			}
			if(finYMayor != this.finY)
				this.finY = finYMayor;
			else if(finYMenor != 0)	
				this.finY = finYMenor;
			this.altoHijos = this.finY - this.inicioY;
		}
		
		Scroll.prototype.estadoY = function(){
			if(this.intermedio == undefined)
				var elemento = this.elemento;
			else
				var elemento = this.intermedio;
			if(elemento.height() < this.altoHijos)
				return 1;
			else if(elemento.height() > this.altoHijos){
				if(this.altoHijos < this.contenedor.height())
					return 3;
				return 2;
			}			
		}
		
		Scroll.prototype.contruirScrollAncho = function(estadoY){
		    var obj = this;
			this.elemento.css({
				overflow: 'hidden',
			});
			var restoAncho = 0;
			var scroll = $('<div class="contScrollX"></div>').appendTo(this.elemento);
				scroll.css({
					height:25,
					width:obj.contenedor.width() - restoAncho,
					backgroundColor:'white'
				});
			if(this.reScrollY){			    
			    this.scrollY.cuerpo.height(this.scrollY.cuerpo.height()- 25);
			    this.scrollY.scroll.height(this.scrollY.scroll.height()- 25);
				this.recargarScrollAlto();
			}				
			obj.contenedor.height(obj.elemento.height()- scroll.height());
			this.scrollX = new Object();
			this.scrollX.scroll = scroll;
			var izq = $('<div class="izqScrollX"></div>').appendTo(scroll);
				izq.css({
					height:25,
					width:25,
//					borderWidth: 1,
//					borderColor:'#c7c7c7',
//					borderStyle:'solid',
//					border:'1px',
//					border:'1px solid #c7c7c7',
//					border:'1px solid #c7c7c7',
					backgroundImage:'url("/cantante/application/imagenes/utiles/scroll/izq.png")',
					backgroundRepeat:'no-repeat',
					backgroundPosition:'center',
					backgroundColor:'#dfdfdf',
					display:'inline-block'
//					color:'white',
//					float:'left'
				})
				.hover(function(){
					$(this).css({
//						border:'1px solid #909090',
					});
				}, function(){
					$(this).css({
//						border:'1px solid #c7c7c7',
					});
				})
				
			this.scrollX.izq = izq;	
//			alert(izq.width());
//			alert(parseInt(obj.dimencionesScroll/25*23));
			var cuerpo = $('<div class="cuerpoScrollX">').appendTo(scroll);	
				cuerpo.css({
					height:25,
//					marginTop:1,
//					marginBottom:1,
//					borderTop:'1px solid #c7c7c7',
//					borderBottom:'1px solid #c7c7c7',
					width:scroll.width()-50,
					backgroundColor:'#dfdfdf',
					display:'inline-block'
//					float:'left'
				});
			this.scrollX.cuerpo = cuerpo;		
			var desplazamiento = $('<div class="desplazamientoX"></div>').appendTo(cuerpo);
				desplazamiento.css({
					width:(this.contenedor.width()-restoAncho)*this.scrollX.cuerpo.width()/this.intermedio.width(),
					height:21,
					marginTop:1,
					backgroundColor:'#b1b1b1',
					border:'1px solid black',
					position:'relative'
				});
				
			this.scrollX.desp = desplazamiento;	
			var der = $('<div class="derScroll"></div>').appendTo(scroll);
				der.css({
					height:25,
					width:25,
//					borderWidth: 1,
//					borderColor:'#c7c7c7',
//					borderStyle:'solid',
					backgroundImage:'url("/cantante/application/imagenes/utiles/scroll/der.png")',
					backgroundRepeat:'no-repeat',
					backgroundPosition:'center',
					backgroundColor:'#dfdfdf',
					display:'inline-block'
//					float:'right'
				})
				.hover(function(){
					$(this).css({
//						border:'1px solid #909090',
					});
				}, function(){
					$(this).css({
//						border:'1px solid #c7c7c7',
					});
				});
			this.scrollX.der = der;	
//			alert(this.scrollX.scroll.width());	
//			alert(this.scrollX.cuerpo.width());	
//			alert(this.scrollX.izq.width());	
//			alert(this.scrollX.der.width());	
							
			izq.mousedown(function(e){
			        if(obj.eliminarAdemas !=null)
			   			$(obj.eliminarAdemas).remove();
				    obj.scrollX.activado = true;
					var moverScroll = setInterval(function(){
					                if(obj.scrollX.activado)
										obj.moverIzquierda();
									else{
										clearInterval(moverScroll);
									}
								}, 150);
			});			
			izq.mouseup(function(){
				obj.scrollX.activado = false;				
			});			
			izq.click(function(){
			 	obj.moverIzquierda();				
			});	
							
		    Scroll.prototype.moverIzquierda = function(saltoBase){
			    if(saltoBase == undefined)
					saltoBase = this.saltoBase;
			    var posicion = this.intermedio.offset().left - this.contenedor.offset().left;
				var posicionDes = this.scrollX.desp.offset().left - this.scrollX.cuerpo.offset().left;
				if(this.intermedio.offset().left < this.contenedor.offset().left - this.saltoBase*this.contenedor.width()/100){
					this.intermedio.css({
						left:posicion + saltoBase*(this.contenedor.width())/100
					});
				 	this.scrollX.desp.css({
				  		left: posicionDes - saltoBase*this.scrollX.desp.width()/100
				  });	
				}
				else{
					this.intermedio.css({
						left:0
					});
					this.scrollX.desp.css({
				  		left:0
				  	});
				}
			}				
			der.mousedown(function(){
			    if(obj.eliminarAdemas !=null)
			   		$(obj.eliminarAdemas).remove();
			    obj.scrollX.activado = true;
				var moverScroll = setInterval(function(){
				                if(obj.scrollX.activado)
									obj.moverDerecha();
								else{
									clearInterval(moverScroll);
								}
							}, 150);
			});
			der.mouseup(function(){
				obj.scrollX.activado = false;				
			});
			der.click(function(){
			 	obj.moverDerecha();				
			});				
			desplazamiento.bind('mousedown', function(e){
			   if(obj.eliminarAdemas !=null)
			   		$(obj.eliminarAdemas).remove();
			   e.stopPropagation();
			   var posDown = e.pageX;
			   $(this).mousedown(function(e){
					e.preventDefault();
					e.stopPropagation();
			   });
				$('html').bind('mousemove',function(e){
				    var posInicial = desplazamiento.offset().left - desplazamiento.parent().offset().left;
					var posInicialIntermendio = obj.intermedio.offset().left - obj.intermedio.parent().offset().left;					
					desplazamiento.css({
						left:posInicial + e.pageX-posDown
					});					
					obj.intermedio.css({
							left: posInicialIntermendio - (e.pageX-posDown)*100/obj.scrollX.cuerpo.width() * obj.intermedio.width()/100
						});					
					posDown += e.pageX - posDown;
					if(desplazamiento.offset().left < obj.scrollX.cuerpo.offset().left)    
					{
						desplazamiento.css({
						  	left: 0
						});	
						obj.intermedio.css({
							left: 0
						});
					}					
					else if(desplazamiento.offset().left + desplazamiento.width() >= obj.scrollX.der.offset().left)      {
						desplazamiento.css({
					  		left: obj.scrollX.cuerpo.width() - desplazamiento.width()
						});
						obj.intermedio.css({
					  		left: obj.contenedor.width() - obj.intermedio.width()
						});
					}				
				});
				$('html').bind('mouseup', function(e){
				 e.preventDefault();
					$('html').unbind('mousemove');
					$('html').unbind('mouseup');
				});
			});			
		}
		
		Scroll.prototype.moverDerecha = function(saltoBase){
			if(saltoBase == undefined)
				saltoBase = this.saltoBase;
			var posicion = this.intermedio.offset().left - this.contenedor.offset().left;
					 var posicionDes = this.scrollX.desp.offset().left - this.scrollX.cuerpo.offset().left;
					 if(this.intermedio.offset().left + this.intermedio.width() > this.contenedor.offset().left + this.contenedor.width() + this.saltoBase*this.contenedor.width()/100){
					    this.intermedio.css({
							left:posicion - saltoBase*this.contenedor.width()/100
						});
					 	this.scrollX.desp.css({
					  		left: posicionDes + saltoBase*this.scrollX.desp.width()/100
					  	});
					 }
					 else{
					 	this.intermedio.css({
							left:this.contenedor.width() - this.intermedio.width()
						});
						this.scrollX.desp.css({
					  		left: this.scrollX.cuerpo.width() - this.scrollX.desp.width()
					  	});
					 }
		}
		
		Scroll.prototype.contruirScrollAlto = function(estadoX){ 
		    var obj = this;
			this.elemento.css({
				overflow: 'hidden',
			});
			var resto = 0;
			if(obj.scrollX != undefined)
				var resto = obj.scrollX.scroll.height();
				
			var scroll = $('<div class="contScrollY"></div>').prependTo(this.elemento);
				scroll.css({
					height:obj.elemento.height()-resto,
					width:25,					
//					backgroundColor:'#c7c7c7',
					float:'right'
				});	
			obj.contenedor.width(obj.contenedor.width()- scroll.width());				
			if(this.reScrollX){			    
			    this.scrollX.cuerpo.width(this.scrollX.cuerpo.width()- 25);
			    this.scrollX.scroll.width(this.scrollX.scroll.width()- 25);
				this.recargarScrollAncho();
			}	
			this.scrollY = new Object();
			this.scrollY.scroll = scroll;	
			var arr = $('<div class="arrScroll"></div>').appendTo(scroll);
				arr.css({
					height:25,
					width:25,
//					margin:1,
//					border:'1px solid #c7c7c7',
					backgroundImage:'url("/cantante/application/imagenes/utiles/scroll/arr.png")',
					backgroundRepeat:'no-repeat',
					backgroundPosition:'center',
					backgroundColor:'#dfdfdf',
				})
				.hover(function(){
					$(this).css({
//						border:'1px solid #909090',
					});
				}, function(){
					$(this).css({
//						border:'1px solid #c7c7c7',
					});
				});
			this.scrollY.arr = arr;				
			var cuerpo = $('<div class="cuerpoScrollY">').appendTo(scroll);	
				cuerpo.css({
//					borderLeft:'1px solid #c7c7c7',
//					borderRight:'1px solid #c7c7c7',
//					marginLeft:1,
//					marginRight:1,
					backgroundColor:'#dfdfdf',				
					height:scroll.height()-50,
					width:25,
				});
				
			this.scrollY.cuerpo = cuerpo;		
			var desplazamiento = $('<div class="desplazamientoY"></div>').appendTo(cuerpo);	
				desplazamiento.css({
					width:21,
					marginLeft:1,
//					marginRight:1,
					height:obj.contenedor.height()*obj.scrollY.cuerpo.height()/obj.intermedio.height(),
					backgroundColor:'#b1b1b1',
					border:'1px solid black',
					position:'relative'
				});
			this.scrollY.desp = desplazamiento;				
			var abj = $('<div class="abjScroll"></div>').appendTo(scroll);
				abj.css({
					height:25,
					width:25,
//					margin:1,
//					border:'1px solid #c7c7c7',
					backgroundImage:'url("/cantante/application/imagenes/utiles/scroll/abj.png")',
					backgroundRepeat:'no-repeat',
					backgroundPosition:'center',
					backgroundColor:'#dfdfdf',
//					float:'right'
				})
				.hover(function(){
					$(this).css({
						border:'1px solid #909090',
					});
				}, function(){
					$(this).css({
						border:'1px solid #c7c7c7',
					});
				});				
			this.scrollY.abj = abj;						
			arr.mousedown(function(){
			        if(obj.eliminarAdemas !=null)
			   			$(obj.eliminarAdemas).remove();
				    obj.scrollY.activado = true;
					var moverScroll = setInterval(function(){
					                if(obj.scrollY.activado)
										obj.moverArriba();
									else{
										clearInterval(moverScroll);
									}
								}, 150);
			});			
			arr.mouseup(function(){
				obj.scrollY.activado = false;				
			});			
			arr.click(function(){
			 	obj.moverArriba();				
			});			
			Scroll.prototype.moverArriba = function(saltoBase){
				if(saltoBase == undefined)
					saltoBase = this.saltoBase;
				var posicion = this.intermedio.offset().top - this.contenedor.offset().top;
					 var posicionDes = this.scrollY.desp.offset().top - this.scrollY.cuerpo.offset().top;
					if(this.intermedio.offset().top < this.contenedor.offset().top - this.saltoBase*this.contenedor.height()/100){
						this.intermedio.css({
							top:posicion + saltoBase*this.contenedor.height()/100
						});
					 	this.scrollY.desp.css({
					  		top: posicionDes - saltoBase*this.scrollY.desp.height()/100
					  });	
					}
					else{
						this.intermedio.css({
							top:0
						});
						this.scrollY.desp.css({
					  		top:0
					  	});
					}
			} 			
			abj.mousedown(function(){
			        if(obj.eliminarAdemas !=null)
			   			$(obj.eliminarAdemas).remove();
				    obj.scrollY.activado = true;
					var moverScroll = setInterval(function(){
					                if(obj.scrollY.activado)
										obj.moverAbajo();
									else{
										clearInterval(moverScroll);
									}
								}, 150);
			});			
			abj.mouseup(function(){
				obj.scrollY.activado = false;				
			});			
			abj.click(function(){
			 	obj.moverAbajo();				
			});			
			Scroll.prototype.moverAbajo = function(saltoBase){
				 if(saltoBase == undefined)
				 	saltoBase = this.saltoBase;
				 var posicion = this.intermedio.offset().top - this.contenedor.offset().top;
					 var posicionDes = this.scrollY.desp.offset().top - this.scrollY.cuerpo.offset().top;			 
					 if(this.intermedio.offset().top + this.intermedio.height() > this.contenedor.offset().top + this.contenedor.height() + this.saltoBase*this.contenedor.height()/100){
					 	this.intermedio.css({
							top:posicion - saltoBase*this.contenedor.height()/100
						});
						this.scrollY.desp.css({
					  		top: posicionDes + saltoBase*this.scrollY.desp.height()/100
					  	});
					 }
					 else{
					 	this.intermedio.css({
							top:this.contenedor.height()- this.intermedio.height()
						});
						this.scrollY.desp.css({
					  		top: this.scrollY.cuerpo.height() - this.scrollY.desp.height()
					  	});
					 }
			}			
			desplazamiento.bind('mousedown', function(e){
			    if(obj.eliminarAdemas !=null)
			   		$(obj.eliminarAdemas).remove();
				e.stopPropagation();
			   var posDown = e.pageY;
			   $(this).mousedown(function(e){
					e.preventDefault();
			   });
				$('html').bind('mousemove',function(e){
				    var posInicial = desplazamiento.offset().top - desplazamiento.parent().offset().top;
					var posInicialIntermendio = obj.intermedio.offset().top - obj.intermedio.parent().offset().top;					
					desplazamiento.css({
						top:posInicial + e.pageY-posDown
					});					
					obj.intermedio.css({
							top: posInicialIntermendio - (e.pageY-posDown)*100/obj.scrollY.cuerpo.height() * obj.intermedio.height()/100
						});					
					posDown += e.pageY - posDown;
					if(desplazamiento.offset().top < obj.scrollY.cuerpo.offset().top)    
					{
						desplazamiento.css({
						  	top: 0
						});	
						obj.intermedio.css({
							top: 0
						});
					}					
					else if(desplazamiento.offset().top + desplazamiento.height() >= obj.scrollY.abj.offset().top)      {
						desplazamiento.css({
					  		top: obj.scrollY.cuerpo.height() - desplazamiento.height()
						});
						obj.intermedio.css({
					  		top: obj.contenedor.height() - obj.intermedio.height()
						});
					}				
				});
				desplazamiento.bind('mouseup', function(e){
				 e.preventDefault();
					$('html').unbind('mousemove');
					$(this).unbind('mouseup');
				});
				$('html').bind('mouseup', function(e){
				 e.preventDefault();
					$('html').unbind('mousemove');
					$('html').unbind('mouseup');
				});
			});			
		}
		
		Scroll.prototype.recargarScrollAncho = function(){		    
				var nuevaD = this.contenedor.width()*this.scrollX.cuerpo.width()/this.intermedio.width();
				this.scrollX.desp.css({
					    height:'100%',
						width:nuevaD
					});
				if(this.intermedio.offset().left + this.intermedio.width() < this.contenedor.offset().left + this.contenedor.width()){
						this.scrollX.desp.css({
							left:this.scrollX.cuerpo.width() - nuevaD
						});
						
						this.intermedio.css({
							left:this.contenedor.width()- this.intermedio.width()
						});
						
					}					
					this.scrollX.desp.css({
							left:-(this.intermedio.offset().left - this.contenedor.offset().left)*this.scrollX.cuerpo.width()/this.intermedio.width()
						});	
			}
			
			Scroll.prototype.recargarScrollAlto = function(){			    
				var nuevaH = this.contenedor.height()*this.scrollY.cuerpo.height()/this.intermedio.height();
				this.scrollY.desp.css({
					    width:'100%',
						height:nuevaH
					});
				if(this.intermedio.offset().top + this.intermedio.height() < this.contenedor.offset().top + this.contenedor.height()){
						this.scrollY.desp.css({
							top:this.scrollY.cuerpo.height() - nuevaH
						});						
						this.intermedio.css({
							top:this.contenedor.height()- this.intermedio.height()
						});						
					}					
					this.scrollY.desp.css({
							top:-(this.intermedio.offset().top - this.contenedor.offset().top)*this.scrollY.cuerpo.height()/this.intermedio.height()
						});			
		}			
		Scroll.prototype.eliminarScrollAncho = function(){
					this.scrollX.scroll.remove();	
					this.scrollX = undefined;
					this.reScrollX = false;
					this.contenedor.css({
							height:this.contenedor.height()+ 25
						});
					this.intermedio.css({
							left:0,	
							width:this.contenedor.width()				
					});
					if(this.reScrollY){
						this.scrollY.scroll.height(this.scrollY.scroll.height()+ 25);
						this.scrollY.cuerpo.height(this.scrollY.cuerpo.height()+ 25);
						this.recargarScrollAlto();
					}	
		}
		
		Scroll.prototype.eliminarScrollAlto = function(){
			this.scrollY.scroll.remove();	
					this.scrollY = undefined;
					this.reScrollY = false;
					this.contenedor.css({
							width:this.contenedor.width()+ 25
						});
					this.intermedio.css({
							top:0,	
							height:this.contenedor.height()				
					});
					if(this.reScrollX){
						this.scrollX.scroll.width(this.scrollX.scroll.width()+ 25);
						this.scrollX.cuerpo.width(this.scrollX.cuerpo.width()+ 25);
						this.recargarScrollAncho();
					}	
		}
				
		this.mostrarScroll();
	},
	opcionesDefecto : {
		reScrollX : false,
		reScrollY : false,
		saltoBase : 15,
		eliminarAdemas: null
	}
}