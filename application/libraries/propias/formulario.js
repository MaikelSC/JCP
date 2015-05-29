$.JCP.formulario = {
	crear: function Formulario(arregloParametros){
		$.extend(this, $.JCP.formulario.opcionesDefecto, arregloParametros);
		
		
//-------------------------------construirFormulario--------------------------------------------------------
//Descripcion: es el metodo principal de este namespace, se encarga de crear la estructura que tendra el formulario y manda a ejecutar a los demas metodos que lo construyen. Crea la tabla padre de todas las demas, manda a crear las hijas y a llenarlas
//Parametros:
	//en este caso los parametros que utiliza son los de la clase formulario
//Retorno: vacio
        Formulario.prototype.construirFormulario = function(){
		    var objEnvio = $.extend({}, this.datosGenerales);
				objEnvio.hijos = this.hijos;
	        this.tabla = $.Elementos.crearTabla(objEnvio);
			this.filaBotones = $('<div id="filaBotones"></div>').appendTo(this.tabla.parent());
			 this.filaBotones.css({
			 	width:'100%',
				height:'40px'
			 });
			   this.crearBotonAdicionar();
		} 

//-----------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
		Formulario.prototype.crearBotonAdicionar = function(){
			var adicionar = $('<input id="adicionar" type="button" value="Adicionar"/>').appendTo(this.filaBotones);
			this.botonAdicionar = adicionar;
			var obj = this;
		 	adicionar.click(function(){ 
						var data = crearDatosEnvioDadoContenedor(obj.entidad, obj.tabla);
						$.consultaAjax.ejecutar({
									url: obj.datosGenerales.urls.adicionar,
									data: data,
									persistir: obj,
									accionCorrecta: obj.vistaMostrar						
									});
			});
		}
	
		Formulario.prototype.crearBotonCargarEditar = function(){
			var editar = $('<input id="editar" type="button" value="Editar"/>').appendTo(this.filaBotones);
			this.botonEditar = editar;
			var obj = this;
		 	editar.click(function(){ 
			            var data = {id: obj.tabla.find('#id').val()};
						$.consultaAjax.ejecutar({
									url: obj.datosGenerales.urls.cargarEditar,
									data: data,
									persistir: obj,
									accionCorrecta: obj.cargarEditar						
									});
			});
		}
	
		Formulario.prototype.crearBotonGuardar = function(){
			var guardar = $('<input id="guardar" type="button" value="Guardar"/>').appendTo(this.filaBotones);
			this.botonGuardar = guardar;
			var obj = this;
		 	guardar.click(function(){ 
			            var id = {id: obj.tabla.find('#id').val()};
			            if(obj.entidadGuardar != undefined)
						    	var data = crearDatosEnvioDadoContenedor(obj.entidadGuardar, obj.tabla, id);
						else		
								var data = crearDatosEnvioDadoContenedor(obj.entidad, obj.tabla, id);
						$.consultaAjax.ejecutar({
									url: obj.datosGenerales.urls.guardar,
									data: data,
									persistir: obj,
									accionCorrecta: obj.vistaMostrar						
									});
			});
		}
		
		Formulario.prototype.setEntidad = function(atributos){
			 this.entidad = new Entidad(atributos);
		}
		
		Formulario.prototype.setVistaMostrar = function(objMostrar){
		     this.objMostrar = $.extend({}, this.datosGenerales, objMostrar);
			 this.objMostrar.tabla = this.tabla;			 
			 this.objMostrar.deshabilitar = true;
			 this.objMostrar.hijos = Array();
			 if(objMostrar.hijos != undefined)
			 for(var i = 0; i< objMostrar.hijos.length; i++){
			      var hijo = $.extend({}, this.hijos[i]);
			 	if(objMostrar.hijos[i] != null){
					 $.extend(hijo, objMostrar.hijos[i]);
					 
				}
				this.objMostrar.hijos[i] = hijo;				
			 }
		}
		
		Formulario.prototype.setCargarEditar = function(objCargarEditar){
//		     var salvaHijos = this.hijos;
		     this.objCargarEditar = $.extend({}, this.datosGenerales, objCargarEditar);			 
			 this.objCargarEditar.tabla = this.tabla;
			 this.objCargarEditar.hijos = Array();
			 if(objCargarEditar.hijos != undefined)
			 for(var i = 0; i< objCargarEditar.hijos.length; i++){
			      var hijo = $.extend({}, this.hijos[i]);
			 	if(objCargarEditar.hijos[i] != null){
					 $.extend(hijo, objCargarEditar.hijos[i]);
				}
				this.objCargarEditar.hijos[i] = hijo;				
			 }
		}
		
		Formulario.prototype.vistaMostrar = function(data, obj){			 
			 obj.objMostrar.datos = data;
			 obj.objMostrar.recargar = true;
			 if(obj.objMostrar.titulo != undefined)
				 obj.tabla.parent().find('.titulo').text(obj.objMostrar.titulo);
			 obj.tabla = $.Elementos.crearTabla(obj.objMostrar);
			 $('<input type="hidden" id="id" value="'+data[obj.idObj]+'"/>').appendTo(obj.tabla);
			 obj.filaBotones.children().remove();
			 obj.crearBotonCargarEditar();			
		}
	
		Formulario.prototype.cargarEditar = function(data, obj){
			 obj.objCargarEditar.datos = data;
			 obj.objCargarEditar.recargar = true;
			 if(obj.objCargarEditar.titulo != undefined)
			 	obj.tabla.parent().find('.titulo').text(obj.objCargarEditar.titulo);
			 obj.tabla = $.Elementos.crearTabla(obj.objCargarEditar);
			 $('<input type="hidden" id="id" value="'+data[obj.idObj]+'"/>').appendTo(obj.tabla);
			 obj.botonEditar.remove();
			 obj.crearBotonGuardar();
		}
 	},
	opcionesDefecto: {
		recargar: false,
	}
}

var crearDatosEnvioDadoContenedor = function(entidad, contenedor, data){
        if(data == undefined)
	    	var data = {};
		for (i in entidad){
		        data[i] = contenedor.find('#'+i).val();
			}			
		return data
	}

