$.JCP.upload = {
    objTem: null,
	crear : function Upload(arregloParametros){	
	    $.extend(this, $.JCP.upload.opcionesDefecto, arregloParametros);
		Upload.prototype.construirUpload = function(){
		    if($('#'+this.id).attr("id") == undefined){
				this.contenedor = $('<div class="contUpload" id="'+this.id+'">').appendTo(this.padre);
			    this.contenedor.css({
					borderRadius: '5px',
				});
				if(this.css != undefined)
					this.contenedor.css(this.css);
			if(this.titulo != undefined){
				this.titulo = $('<div clas="titulo">'+this.titulo+'</div>').appendTo(this.contenedor);
				this.titulo.css({
						width:'100%',
						height:'7%',
						backgroundColor:'red',
						textAlign:'center',
						height:'7%'
					});
			}			
			var iframe = $('<iframe name="iframe" width="600" height="400" >Texto alternativo para navegadores que no aceptan iframes</iframe>').appendTo($('body'));
				iframe.css({
					 display:'none'
				});
				
//			var progreso =  $('<iframe id="progress_iframe" src=""  scrolling="no" frameborder="0"></iframe>').appendTo(this.contenedor);
			   /*progreso.css({
			       float:'right',
				   height:2000,
				   border:'2px solid red',
				   position:'relative',
				   top:50
			   });*/
							
			var formulario = $('<form enctype="multipart/form-data"  method="POST" action="'+this.urls.adicionar+'" target="iframe"/>').appendTo(this.contenedor);
				formulario.css({
					width:200,
					height:60,
					padding:10,
					paddingLeft:0
				});
			   formulario.centrar(true, false);
			var boton = $('<input name="oculto" id="oculto" type="file"/>').appendTo(formulario);
				boton.css({
					display:'none'
				});
				var obj = this;
		        boton.change(function(){
//				alert(obj.cantidadXfila);
				    $.JCP.upload.objTemp = obj;
					formulario.submit();
//					obj.rastrear();
					
//					setTimeout(boton.change());
				});
			var subir = $('<input type="button" value="Subir Foto"/>').appendTo(formulario);
				subir.css({
					height:'70%',
					width:'100%',
					color:'#3366CC',
					fontWeight:'bold',
					font:'bold 12px Arial,Helvetica,sans-serif',
					backgroundColor:'#F2F2F2',
					border:'1px solid #CCCCCC',
					borderRadius: '5px 5px 5px 5px'
				});
				subir.hover(function(){$(this).css({cursor:'pointer'});},function(){$(this).css({cursor:'none'})});
				subir.mousedown(function(e){e.stopPropagation();});
				subir.mouseup(function(e){e.stopPropagation();});
				subir.click(function(e){boton.click()});
			this.contImagenes = $('<div class="contImgsUpload"></div>').appendTo(this.contenedor);
			this.contImagenes.css({
					height:'77%',
					overflow:'hidden',
				});				
			this.contImagenesFinal = $('<div id="mio" class="finalImagenes"></div>').appendTo(this.contImagenes);
			this.contImagenesFinal.css({//						
					width:this.contImagenes.width()-20,
					paddingRight:0,
//					backgroundColor:'green'
					});				
			var cantidad = 	((this.contImagenes.width() - 20)/(this.anchoImag + 10));
			this.cantidadXFila = parseInt(cantidad);
			this.contImagenesFinal.width(this.cantidadXFila*(this.anchoImag+17));
			this.contImagenesFinal.centrar(true, false);
			}
			else{
				this.contenedor = $('#'+this.id);
				this.contenedorImagenes = this.contenedor.find('.contImgsUpload');
				this.contImagenesFinal = this.contenedor.find('.finalImagenes');
			}
		
			this.Esperar();												
			$.JCP.upload.objTemp = obj;
			this.pedirImagenes();
		}
		
		/*Upload.prototype.rastrear = function(){
		   
		    var f = $('#progress_iframe');
			setInterval(function(){f.attr("src", "c_upload/Progreso");}, 1000);
			 	
		}*/
		
		Upload.prototype.pedirImagenes = function(){
		    $.consultaAjax.ejecutar({
									url: this.urls.listar,
									persistir: this,
									accionCorrecta: this.mostrarImagenes						
									});	
		}
		Upload.prototype.mostrarImagenes = function(data, obj){
		    obj.esperador.remove();	
		    if(data.imagenes != null){				
				for(var i = 0; i < data.imagenes.length; i++){
						obj.crearImagen(data.imagenes[i], obj);						
				}
				if(obj.scrollizable)
				obj.mostrarScroll();
				if(obj.seleccionable)
				obj.definirSeleccionar();				
			}
			else{
				obj.mostrarMensajeVacio();
				if(obj.seleccionable)
				obj.definirSeleccionar();
			}	   		
		}
		
		Upload.prototype.mostrarScroll = function(){
		    if(this.scroll != undefined){
				this.scroll.mostrarScroll();
			}				
			else{
			 	$.JCP.Crear('scroll', {elemento: this.contImagenes,
   										}, this.guardarObjScroll);
			}			
		}
				
		Upload.prototype.guardarObjScroll = function(scroll){
           if(scroll.scrollY != undefined){		   		
				scroll.scrollY.scroll.mousedown(function(e){e.stopPropagation();});
				scroll.scrollY.scroll.mouseup(function(e){e.stopPropagation();});
		   }
		   $.JCP.upload.objTemp.scroll = scroll;
			
		}
		
		Upload.prototype.definirSeleccionar = function(){
		    /*if(this.seleccionar != undefined){
				this.seleccionar.mostrarScroll();
			}				
			else{*/
			 	$.JCP.Crear('seleccionar',{elementos :this.contImagenesFinal.find('.contImgUpload'),
											elementoContenedor: this.contImagenesFinal,
											elementoMouseDown: this.contenedor,
											persistirObj : this
   										});
//			}			
		}
		
		Upload.prototype.guardarSeleccionar = function(seleccionar){
			$.JCP.upload.objTemp.seleccionar = seleccionar;
//			$.JCP.upload.objTemp = null;
		}		
		
		Upload.prototype.crearImagen = function(imagen, obj, efecto){	
		            if(obj.vacio != undefined){
						obj.vacio.remove();
						obj.vacio = undefined;
						this.contImagenesFinal.height(0);	
					}	 
		             if(obj.contImagenesFinal.find('.contImgUpload').length%obj.cantidadXFila == 0)
						obj.contImagenesFinal.height(obj.contImagenesFinal.height() + obj.altoImag+13);				
					 	  	  
					 var contImag = $('<div class="contImgUpload"></div>').prependTo(obj.contImagenesFinal);
					 if(efecto){
						contImag.css({
							height:0,
							width:0
						});
				    }
					 	contImag.attr("id", imagen.id_imagen);			   	   					
					var imagenDiv = $('<img src="'+$.urlServer+'/cantante/application/imagenes/upload/'+imagen.src+'">').appendTo(contImag);
						imagenDiv.bloqSeleccionNav();
						imagenDiv.css({
							width:120,
							height:120,
							margin:5
						});
										
					var titulo = $('<div class="tituloImgUpload"></div>').appendTo(contImag);
					if(imagen.titulo != null)
					    titulo.text(imagen.titulo);								
				    var eliminar = $('<div class="eliminarImgUpload"></div>').prependTo(contImag);
						eliminar.css({
							position:'absolute',
							zIndex:'2',							
							left:imagenDiv.width()-25,
							top:10,
							height:25,
							width:25,							
							cursor:'pointer'
						});
						var obj = this;
						eliminar.mousedown(function(e){//para bloquear el pluggin seleccionar
						 	e.stopPropagation();	
							e.preventDefault();					
						});
						eliminar.click(function(){
							$.consultaAjax.ejecutar({
									url: obj.urls.eliminar,
									persistir: obj,
									accionCorrecta: obj.FotoEliminada,
									accionError: obj.FotoNoEliminada,
									data:{
										id : contImag.attr("id")
									}									
							});
						});								
				 if(efecto){				 
				 	contImag.animate({height:obj.altoImag, width:obj.anchoImag}, function(){
					    obj.mostrarScroll();
					});		
				 	obj.seleccionar.adicionarElemento(contImag, true);				
				 }		
		}
		
		Upload.prototype.mostrarMensajeVacio = function(){
			var vacio = this.vacio = $('<div class="vacio">'+this.mensajeVacio+'</div>').appendTo(this.contImagenesFinal);		
					this.vacio.css({
						height:30,
						width:'50%',
						fontSize:18,
						border:'1px solid red',
						padding:5
					});
					this.contImagenesFinal.height(50);					
					this.vacio.centrar(true, false);			
		}		
		Upload.prototype.FotoEliminada = function(data, obj){
			var imagen = $('#'+data);
				imagen.animate({height:0, width:0}, function(){
					$(this).remove();
					if(obj.contImagenesFinal.find('.contImgUpload').length%obj.cantidadXFila == 0){	
					 	  obj.contImagenesFinal.height(obj.contImagenesFinal.height() - obj.altoImag-10);
						  obj.mostrarScroll();
					}
					if(obj.contImagenes.find('.contImgUpload').length == 0)
						obj.mostrarMensajeVacio();								
      			});								
		}
		Upload.prototype.FotoNoEliminada = function(data){
			
		}
		Upload.prototype.Esperar = function(){ 
			this.contImagenesFinal.children().remove();
			this.esperador = $('<div></div>').appendTo(this.contImagenesFinal);
			this.esperador.css({
				    zIndex: '2',
				 	height : this.contenedor.height(),
					width : this.contenedor.width()
				 });
				 var img = $('<img src="/cantante/application/libraries/Propias/imagenes/cargandoUpload.gif">').appendTo(this.esperador);
				 img.css({height:this.contImagenesFinal.height()/3, width:this.contImagenesFinal.height()/3});
				 img.centrar(true, true, this.contenedor);					 	
		}
		this.construirUpload();
	},
	retorno: function(retorno){
	    var obj = $.JCP.upload.objTemp;
		if(retorno.error != undefined){
			switch(retorno.error){
				case 1:
				alert('No se ha podido realizar la operaci&oacute;n');break;
				case 2:
				alert('El archivo selecciona no tiene un formato v&aacute;lido para '+retorno.tipo);break;
				case 3:
				alert('El tama&ntilde;o m&aacute;ximo no puede exceder de '+retorno.tamano);break;
				case 4:
				alert('No se ha podido subir el archivo. Posible error de permisos');break
			}
		}
		else{
			obj.crearImagen(retorno, obj, true);		
		}
	},
	opcionesDefecto :{
	 	anchoImag: 130,
		altoImag:155,
		titulo : "Cargar Imagenes",
		mensajeVacio: 'No hay imagenes para mostrar',
		scrollizable : true,
		seleccionable : true
	}	
}