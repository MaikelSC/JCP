$.JCP.tabPanel = {
    objTemp : null,
	crear: function TabPanel(arregloParametros){
	$.extend(this, $.JCP.tabPanel.opcionesDefecto, arregloParametros);
	TabPanel.prototype.construirTabPanel = function(){
		var obj = this;
		this.contenedor = $('<div id = "'+this.id+'"></div>').appendTo(this.padre)
		  .css({
			 width: this.ancho,
			 height: this.alto,
			 backgroundColor:'#e9efee',
			 border:'1px solid green',
		  });
		if(this.titulo != undefined){
		    $('<div id = "titulo"></div>').appendTo(this.contenedor)
			 .text(this.titulo)
			 .css({
			    border:'1px solid red',
				backgroundColor:'#a6caf0'
			 });
		}
		if(this.add){
			this.contBotones = $('<div id = "contbotones"></div>').appendTo(this.contenedor)
								.css({
									//border:'1px solid blue'
								});
			var funcAdicionar = function(){
				if($('#vtn_add_tab').length > 0){
					$('#vtn_add_tab').show();
				}
				else{
					var cont = $('<div></div>');
					var label = $.Elementos.crearLabel('lb_nombreTab','Nombre:')
								  .appendTo(cont)
								  .css({display:'inline'});
					var text = $('<div></div>')
								.appendTo(cont)
								.css({display:'inline'});
					var botones = $('<div align = "center"></div>').appendTo(cont);
					$.Elementos.crearText(1, 'tb_nombreTab', 'nombre').appendTo(text);
					cont.css({
						width:'100%',
						height:'100%',
						//border:'1px solid white',
					});
					var funcAceptar = function(){
					//alert(text.val());
						obj.tabs++;
						var nuevaPestanna = {
									      titulo:$('#tb_nombreTab').val(),
										  ancho:75,
										  id:'tab'+obj.tabs,
										  cerrable: true,
										  hijos:[{}]
									 	 };
						obj.Pestannas(nuevaPestanna, obj.tabs);
						if($('#'+obj.tabs).siblings('div').length <= 1){
							$('#'+obj.tabs).siblings('div').find('#cerrar').css({
								backgroundImage:'url("/cantante/application/libraries/Propias/imagenes/cross_tab.gif")'
							});
						}
						$('#vtn_add_tab').hide();
					}
					var btnAceptar = $.Elementos.crearBoton('id_btn_acept', 'Aceptar',funcAceptar).appendTo(botones);
					botones.css({
						position:'relative',
						top:cont.offset().top + cont.height() - $(this).height(),
						//border:'1px solid red',
					});
					var ventana = $.JCP.Crear('ventana',{
										id :'vtn_add_tab',
										padre : obj.contenedor,
										titulo : 'Adicionar Pestana',
										hijos:[cont],
										css : undefined,
										anclar: false,
										btncerrar:true,
										fondoblq: false,
										 });
			    }   
			}
			$.Elementos.crearBoton('id_btn_add', 'Adicionar', funcAdicionar).appendTo(this.contBotones);
		}
		this.contPestannas = $('<div id = "contPest"></div>').appendTo(this.contenedor)
								.css({									
									whiteSpace:'nowrap',
									//border:'1px solid blue',
								 });
		$('<div id = "separador"></div>').appendTo(this.contenedor)
		 .css({
		  border: '1px solid black',
		  marginTop:'1px',
		  height:5
		  });
		  if(this.hijos.length > 0){
			  this.crearPestannas();	
			  this.contPestannas.css({
			     height:this.contPestannas.children().height()
			 });
		  }
		 
	}
	TabPanel.prototype.crearPestannas = function(){
	    var obj = this;
		this.tabs = this.hijos.length;
		for(var i = 0; i < this.hijos.length; i++){
		   this.Pestannas(this.hijos[i], i + 1);
		}
	}
	TabPanel.prototype.Pestannas = function(tab, id){
		var obj = this;
		var div = $('<div id = "'+id+'" class = "tab"></div>')
			 .appendTo(this.contPestannas)
			 .css({
			   width : tab.ancho,
			   height : tab.alto,
			   margin: '0.5px',
			   cursor:'pointer',
			   display:'inline-block',
//			   float : 'left',			   
			   border : '1px solid black',
			   borderRadius : '4px 4px 0 0'
			 });
			var label = $('<div>'+tab.titulo+'</div>')
			.css({
				width:'80%',
				 display:'inline-block',
			})
			.appendTo(div);			 
			if(tab.cerrable){
				this.btnCerrarTab(div);
			}
			this.cargarPaneles(div);
			if(tab.activo){
			    div.ready(function(){
					 obj.activarPestanna($('#panel_'+div.attr('id')));
				});
			}
			div.click(function(e){
			e.stopPropagation();
					if($('#panel_'+$(this).attr('id')).attr('id') != obj.panelAnterior.attr('id'))
					 obj.activarPestanna($('#panel_'+$(this).attr('id')));
			});
	}
	TabPanel.prototype.cargarPaneles = function(tab){
	 	$('<div id = "panel_'+tab.attr('id')+'" class = "panel">'+tab.text()+'</div>').appendTo(this.contenedor)
	  	 .css({
	     	border: '1px solid green',
	     	height:200,	
			backgroundColor:'#dbe0e8'
	  	  })
		 .hide();		
	}
	TabPanel.prototype.activarPestanna = function(panel){//alert(panel.attr('id'));
	    if(this.panelAnterior != undefined){
			this.panelAnterior.hide();
	    }
		this.panelAnterior = panel;
		panel.show();
	}
	TabPanel.prototype.btnCerrarTab = function(tab){
		var obj = this;
		var contCerrar = $('<div id = "cerrar"></div>')
				 .appendTo(tab)
				 .css({
				 	 //border: '1px solid red',
					 cursor:'pointer',
					 display:'inline-block',
//					 float:'right',
					 margin:'3px',
					 width:10,
					 height:10,
					 backgroundImage:'url("/cantante/application/libraries/Propias/imagenes/cross_tab.gif")'
				  })
				 .click(function(e){
					e.stopPropagation();
					var tabs = tab.siblings('div').length;
					if(tabs > 0){	// si hay mas de un tab.				
						if($('#panel_'+tab.attr('id')).attr('id') == obj.panelAnterior.attr('id')){ // para ver si el que se va a eliminar es el que esta activo, porque si no esta activo no hace falta activar ninguno nuevo
							if( tab.next().length > 0){
								obj.activarPestanna($('#panel_'+ tab.next().attr('id')));
							}
							else
							    obj.activarPestanna($('#panel_'+ tab.prev().attr('id')));
						}
						if(tabs <= 1){// si es el ultimo cambiar icono
							tab.siblings('div').find('#cerrar').css({
								backgroundImage:'url("/cantante/application/libraries/Propias/imagenes/cross_tab_disab.gif")'
							});
						}					
						$('#panel_'+tab.attr('id')).remove();
						//obj.tabs--;
						tab.hide(200, function(){
							$(this).remove();
						});
				    }
				 });  
	}
	TabPanel.prototype.actualizarIds = function(){		
		
	}
	this.construirTabPanel();
	},
	opcionesDefecto:{
	 alto:400,
	 ancho:450,
	 
	}
	}