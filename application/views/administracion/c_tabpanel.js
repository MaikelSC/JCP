function MostrarTabPanels(){
$('#td_interior').children().remove();
//alert('aqui van los tabs');
var panel =	$.JCP.Crear('tabPanel',{
								 padre : $('#td_interior'),
								 titulo : 'Muestra de tabs panel',
								 id : 'idtabpanel',
								 css : undefined,
								 ancho:600,
								 alto:300,
								 add:true,
							     hijos :[{
								      titulo:'Tab 1',
									  ancho:75,
									  id:'tab1',
									  cerrable: false,
									  //alto:50,
									  //url:'c_paneles_arrastre/CargarDatosPanelIzq'
									  hijos:[{}]
								 	 },{
								      titulo:'Tab 2',
									  ancho:75,
									  activo: true,
									  id:'tab2',
									  cerrable: true,
									  //alto:50,
									  //url:'c_paneles_arrastre/CargarDatosPanelDer'
									  hijos:[{}]
								 	 },{
								      titulo:'Tab 3',
									  ancho:75,
									  id:'tab3',
									  cerrable: false,
									  //alto:50,
									  //url:'c_paneles_arrastre/CargarDatosPanelDer'
									  hijos:[{}]
								 	 },{
								      titulo:'Tab 4',
									  ancho:75,
									  id:'tab4',
									  cerrable: true,
									  //alto:50,
									  //url:'c_paneles_arrastre/CargarDatosPanelDer'
									  hijos:[{}]
								 	 },{
								      titulo:'Tab 1',
									  ancho:75,
									  id:'tab1',
									  cerrable: false,
									  //alto:50,
									  //url:'c_paneles_arrastre/CargarDatosPanelIzq'
									  hijos:[{}]
								 	 },{
								      titulo:'Tab 2',
									  ancho:75,
									  activo: true,
									  id:'tab2',
									  cerrable: true,
									  //alto:50,
									  //url:'c_paneles_arrastre/CargarDatosPanelDer'
									  hijos:[{}]
								 	 },{
								      titulo:'Tab 3',
									  ancho:75,
									  id:'tab3',
									  cerrable: false,
									  //alto:50,
									  //url:'c_paneles_arrastre/CargarDatosPanelDer'
									  hijos:[{}]
								 	 },{
								      titulo:'Tab 4',
									  ancho:75,
									  id:'tab4',
									  cerrable: true,
									  //alto:50,
									  //url:'c_paneles_arrastre/CargarDatosPanelDer'
									  hijos:[{}]
								 	 },{
								      titulo:'Tab 1',
									  ancho:75,
									  id:'tab1',
									  cerrable: false,
									  //alto:50,
									  //url:'c_paneles_arrastre/CargarDatosPanelIzq'
									  hijos:[{}]
								 	 },{
								      titulo:'Tab 2',
									  ancho:75,
									  activo: true,
									  id:'tab2',
									  cerrable: true,
									  //alto:50,
									  //url:'c_paneles_arrastre/CargarDatosPanelDer'
									  hijos:[{}]
								 	 },{
								      titulo:'Tab 3',
									  ancho:75,
									  id:'tab3',
									  cerrable: false,
									  //alto:50,
									  //url:'c_paneles_arrastre/CargarDatosPanelDer'
									  hijos:[{}]
								 	 },{
								      titulo:'Tab 4',
									  ancho:75,
									  id:'tab4',
									  cerrable: true,
									  //alto:50,
									  //url:'c_paneles_arrastre/CargarDatosPanelDer'
									  hijos:[{}]
								 	 }],
								 
								 //url : 'c_paneles_arrastre/GuardarCambios'
								
								})
}