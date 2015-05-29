function ListadoEjemplo(){
    $('html').css({
		overflow:'hidden'
	});
	$('#td_interior').children().remove();
	var listado =	$.JCP.Crear('listado',{
								 padre : $('#td_interior'),
								 tituloTabla : 'Listado de Noticias',
								 idTabla : 'listado_noticias',
								 add : true,
								 urls:{
								 	listar:'c_listado/ListarNoticias',
									editar:'c_noticia/EditarNoticia',
									eliminar:'c_listado/EliminarNoticia'
								 },
								 redimencionar: true,
								 estructura: {
								    grupos : {
										names : Array('Basicas', 'Otras' , 'Otras2'),
										tipos: Array('label', 'label' , 'label'),
										colspan : Array(1, 3, 2),
										ids: Array('idBasicas', 'idOtras', 'idOtras2')
									},
									columnas : {
										names:  Array('Titulooo', 'Fecha', 'Comentario' , 'Importancia', 'titulo1', 'Fecha2'),
										/*tipos : Array('label', 'label', 'label', 'label', 'label'),
										ids: Array('titulo', 'fecha', 'comentario', 'importancia', 'fecha2')*/
									}								 	
								 },
								 cantXPag: {
								 	valores: Array("10","3","30","40")
								 },
								 consultaListar:{
								 		datosEnvio: {
										    cantXPag: 10,
										    inicio : 1,
											ordX : 'fecha',
											dir: 'asc'
										},
										datosRetorno: {
										campos : Array('id_noticia', 'titulo', 'fecha', 'contenido', 'importancia', 'titulo1', 'fecha1')
										}
								 },
								 consultaAdicionar:{
								 	    datosEnvio:{
											tipos: Array(1, 1.3, 1, 1, 1, 1.3),
											ids: Array( 'titulo', 'fecha', 'contenido', 'importancia', 'titulo1', 'fecha1'),
											names : Array('Titulooo', 'Fecha', 'Comentario' , 'Importancia', 'titulo1', 'Fecha2'), 
										},
										datosRetorno:{
											tipos:Array(1, 1.3, 1, 1, 1, 1.3),
											ids: Array( 'titulo', 'fecha', 'contenido', 'importancia', 'titulo1', 'fecha1')
										}	
								 },								 
								 vacio: {
								 	mensajeVacio: 'No hay noticias que listar'
								 },		 								
					});
}