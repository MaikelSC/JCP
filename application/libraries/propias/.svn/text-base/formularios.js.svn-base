$.JCP.formulario = {
	crear: function Formulario(arregloParametros){
	    this.padre = arregloParametros.padre;
	    this.id = arregloParametros.id;
	    this.titulo = arregloParametros.titulo;
	    this.css = arregloParametros.css;
		this.columnas = arregloParametros.columnas;
		this.tipos = arregloParametros.tipos;
		this.names = arregloParametros.names;
		this.ids = arregloParametros.ids;
		this.urls = arregloParametros.urls;
		this.hijos = arregloParametros.hijos;
		
//-------------------------------construirFormulario--------------------------------------------------------
//Descripcion: es el metodo principal de este namespace, se encarga de crear la estructura que tendra el formulario y manda a ejecutar a los demas metodos que lo construyen. Crea la tabla padre de todas las demas, manda a crear las hijas y a llenarlas
//Parametros:
	//en este caso los parametros que utiliza son los de la clase formulario
//Retorno: vacio
		Formulario.prototype.construirFormulario = function(){
	         if(this.formulario == undefined){
			 	this.contenedor = $('<div id="Cont_'+this.id+'"></div>').appendTo(this.padre);
			 	if(this.titulo != undefined){
			 		var titulo = $('<div class="titulo">'+this.titulo+'</div>').appendTo(this.contenedor);
					     titulo.css({
						 	width:'100%',
							height:'25px'
						 });
				 }			 
	        	 var formulario = $('<table id="'+this.id+'" />').appendTo(this.contenedor);
				 this.formulario = formulario;
			 }
			 else{
			 	this.formulario.children().remove();
			 }
			 if(this.hijos != undefined){
			 	for(var i = 0; i < this.hijos.length; i++){
				  var tablahijos = $.Elementos.crearTablaFormulario(this.formulario, this.hijos[i], this.columnas);					
				   this.llenarFormulario(this.hijos[i], tablahijos);
			 	    }
			}
			  else
			   alert('Formulario sin hijos');
			              
			 this.filaBotones = $('<div id="filaBotones"></div>').appendTo(this.contenedor);
			 this.filaBotones.css({
			 	width:'100%',
				height:'40px'
			 });
			   this.crearBotonAdicionar();	   
		}
//----------------------------------------------------------------------------------------------------------

//------------------------------------------llenarFormulario------------------------------------------------
//Descripcion: este metodo se encarga de llenar todas las tablas hijas de la padre principal
//Parametros:
	//hijo: objeto que contiene los elementos de cada tabla hija para llenarla 
	//tablahijos: es cada tabla hija de la tabla principal
//Retorno: vacio
		Formulario.prototype.llenarFormulario = function(hijo, tablahijos){ 
		    var cantFilas = 0;	
			for(var i =0; i< hijo.tipos.length; i+=hijo.columnas){			        
			  $.Elementos.crearFila(tablahijos, cantFilas-1, hijo.columnas, hijo.tipos.slice(i, (i+hijo.columnas)), hijo.names.slice(i, i+hijo.columnas), hijo.ids.slice(i, i+hijo.columnas));
						cantFilas++;
				 }	
		}
//-----------------------------------------------------------------------------------------------------------


		Formulario.prototype.crearBotonAdicionar = function(){
			var adicionar = $('<input id="adicionar" type="button" value="Adicionar"/>').appendTo(this.filaBotones);
			this.botonAdicionar = adicionar;
			var obj = this;
		 	adicionar.click(function(){ 
						var data = crearDatosEnvioDadoContenedor(obj.entidad, obj.formulario);
						ConsultaAjax(obj.urls.adicionar, data, obj.vistaMostrar, undefined, obj );
			});
		}
	
		Formulario.prototype.crearBotonCargarEditar = function(){
			var editar = $('<input id="editar" type="button" value="Editar"/>').appendTo(this.filaBotones);
			this.botonEditar = editar;
			var obj = this;
		 	editar.click(function(){ 
	                    var data = {id: obj.formulario.find('#id').val()};
						ConsultaAjax(obj.urls.cargarEditar, data, obj.cargarEditar, undefined, obj );
			});
		}
	
		Formulario.prototype.crearBotonGuardar = function(){
			var guardar = $('<input id="guardar" type="button" value="Guardar"/>').appendTo(this.filaBotones);
			this.botonGuardar = guardar;
			var obj = this;
		 	guardar.click(function(){ 
			            var id = {id: obj.formulario.find('#id').val()};
			            if(obj.entidadGuardar != undefined)
						    	var data = crearDatosEnvioDadoContenedor(obj.entidadGuardar, obj.formulario, id);
						else		
								var data = crearDatosEnvioDadoContenedor(obj.entidad, obj.formulario, id);
						ConsultaAjax(obj.urls.guardar, data, obj.vistaMostrar, undefined, obj );
			});
		}
		
		Formulario.prototype.setEntidad = function(atributos){
			 this.entidad = new Entidad(atributos);
		}
	
		Formulario.prototype.setEntidadMostrar = function(atributos, idsMostrar, tiposMostrar){
			 this.entidadMostrar = new Entidad(atributos);
			 this.idsMostrar = idsMostrar;
			 this.tiposMostrar = tiposMostrar;
		}
		
		Formulario.prototype.setEntidadEditar = function(atributos, idsEditar, tiposEditar){
			 this.entidadEditar = new Entidad(atributos);
			 this.idsEditar = idsEditar;
			 this.tiposEditar = tiposEditar;
		}
		
		Formulario.prototype.vistaMostrar = function(data, obj){
		     if(obj.entidadMostrar != undefined){
			 	var ids = obj.idsMostrar;
				var tipos = obj.tiposMostrar;
			 }
			 else{
			 	var ids = obj.ids;
				var tipos = obj.tipos;
			 }
		     for(var i = 0; i< ids.length; i++){
			 	var campo = obj.formulario.find('#'+ids[i]);
				    campo.attr("disabled", "disabled");
					if(tipos[i] == 2){
						var option = $('<option value="'+data[ids[i].id]+'">'+data[ids[i].valor]+'</option>');         
						campo.children().remove();
						option.appendTo(campo);
					}
					else if(tipos[i] == 1){
						campo.val(data[ids[i]]);
					}
			 }
			 $('<input type="hidden" id="id" value="'+data[obj.idObj]+'"/>').appendTo(obj.formulario);
			 obj.filaBotones.children().remove();
			 obj.crearBotonCargarEditar();
			
		}
	
		Formulario.prototype.cargarEditar = function(data, obj){
			$.Elementos.data = data;	
			obj.formulario.children().remove();		   
			obj.llenarFormulario(data);
			$('<input type="hidden" id="id" value="'+data[obj.idObj]+'"/>').appendTo(obj.formulario);
			$.Elementos.data = null;
			obj.botonEditar.remove();
			obj.crearBotonGuardar();
		}
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

function Entidad(atributos) {
    for(var i = 0; i< atributos.length; i++){
		this[atributos[i]] = "";
	}
}