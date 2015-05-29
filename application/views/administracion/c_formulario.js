function MostrarFormulario(){

   $('#td_interior').children().remove();
   var tipos = Array(1,1.3,1,1); 
   var labels = Array('Titulo', 'Fecha', 'Comentario', 'Importancia');
   var expreg = Array(/\w/,/\w/,/\w/,/\w/);
   var ids = Array('titulo', 'fecha', 'contenido', 'importancia');
   var tipos1 = Array(1,1.3); 
   var labels1 = Array('Titulo1', 'Fecha1');
   var expreg1 = Array(/\w/, /\w/);
   var ids1 = Array('titulo1', 'fecha1');
   var urls = {
   		adicionar: 'c_noticia/AdicionarNoticia',
		cargarEditar: 'c_noticia/DevolverNoticia',
		guardar:'c_noticia/EditarNoticia'
   };
   
  var noticia = $.JCP.Crear('formulario', {
  										  datosGenerales: {	
	                                          padre : $('#td_interior'),
											  id : 'gestionarNoticia',
											  titulo : "Adicionar Noticia",
											  css : undefined,
											  tipos: Array('tabla','tabla'/*,'tabla','tabla'*/),
										      columnas : 2,
											  urls : urls,										  	
										  },
										  hijos:[{
										        fieldset:false,
												titulo:"Crear Noticia",
												id:'crearnoticia',
												align:'left',
												tipos : tipos,
												columnas : 1,
											    names : labels,
											    ids : ids,
												expreg: expreg
										        },{
												fieldset:true,
												titulo: "Crear1 Noticia1",
												id: 'crearnoticia1',
												align:'right',
												columnas :  1,
												tipos : tipos1,
											    names : labels1,
											    ids : ids1,
												expreg: expreg1	
												}]/*,{
												fieldset:true,
												titulo:"Crear2 Noticia2",
												id:'crearnoticia2',
												align:'right',
												columnas : 1,
												tipos : tipos1,
											    names : labels1,
											    ids : ids1	
												},{
										        fieldset:false,
												titulo:"Crear Noticia",
												id:'crearnoticia',
												align:'left',
												tipos : tipos,
												columnas :1,
											    names : labels,
											    ids : ids
										        }*/   
   										},
										NoticiaPosterior);
										
}
function NoticiaPosterior(noticia){
    noticia.idObj = 'id_noticia';
    noticia.setEntidad(Array('titulo', 'fecha', 'contenido', 'importancia', 'titulo1', 'fecha1'));
	
	noticia.construirFormulario();
	var datosMostrar = {
		titulo: 'Mostrar Noticia',
		hijos : Array({
		   			titulo: 'Mostrar Crear Noticia',
					tipos: Array(1,1.3,1,1,1.3),
					names: Array('Titulooo', 'Fecha', 'Comentario', 'Importancia', 'Fecha2'),
					ids: Array('titulo', 'fecha', 'contenido', 'importancia', 'fecha2'),
				}, null)
		
	};
	noticia.setVistaMostrar(datosMostrar);
	var datosCargarEditar = {
		titulo: 'Editar Noticia',
		hijos : Array({
		   			titulo: 'Editar Noticia555'
				}, null)
		
	};
	noticia.setCargarEditar(datosCargarEditar);
//	noticia.setEntidadCargarEditar(Array('titulo', 'fecha', 'contenido'));
//alert(noticia.aqui);
	
//	alert('asdf');
//	var textarea = $('<textarea>sdf</textarea>').appendTo($('body'));
	/*var a = $.JCP.Crear('cleditor',{
	                                      padre:$('body'),
										  tieneCss: true,
	                                      jquery:true,
		                                  width:300
	                                      }
	);*/
	
	/*var upload = $.JCP.Crear('upload', {
                                          padre : $('body'),
										  id : 'cargarImagenes',
										  titulo : "Cargar Imagenes",
										  css : undefined,
										  url : 'c_administrador/DevolverImagenes',
										  mensajeVacio: 'No hay imagenes para mostrar'  
   										},
										UploadPosterior);*/
										
}

function UploadPosterior(upload){
	upload.construirUpload();
}
