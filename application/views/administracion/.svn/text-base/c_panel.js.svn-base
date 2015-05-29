function MostrarPanelArrastre(){
$('#td_interior').children().remove();
var panel =	$.JCP.Crear('panelesArrastre',{
								 padre : $('#td_interior'),
								 titulo : 'Muestra de paneles de Arrastre',
								 id : 'idpanel',
								 css : undefined,
								 desplazamiento:'sencillo',
								 add : true,
								 salvar:true,
							     izq :{
								      titulo:'Panel Izquierdo',
									  ancho:200,
									  alto:200,
									  url:'c_paneles_arrastre/CargarDatosPanelIzq'
								 	 },
							     der :{
								      titulo:'Panel Derecho',
									  ancho:200,
									  alto:200,
									  url:'c_paneles_arrastre/CargarDatosPanelDer'
								 	 },
								 
								 url : 'c_paneles_arrastre/GuardarCambios'
								
								})
}
