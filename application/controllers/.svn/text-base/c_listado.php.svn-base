<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class c_listado extends CI_Controller {


	function __construct()
	{
		parent::__construct();
	}	
	 
	function ListarNoticias(){
	    $cantidadXPagina = $this->input->post('cantXPag');
	    $posInicial = $this->input->post('inicio');
	    $atributo_ordenar = $this->input->post('ordX');
	    $direccion_orden = $this->input->post('dir');
		$noticias = $this->M_reutilizacion->ListarTabla('noticia', $cantidadXPagina, $posInicial, $atributo_ordenar, $direccion_orden);
		if(count($noticias) > 0)
		foreach($noticias as $noticia){
			$noticia->fecha = $this->M_reutilizacion->DesconvertirFecha($noticia->fecha);
			$noticia->fecha1 = $this->M_reutilizacion->DesconvertirFecha($noticia->fecha1);
		}		
		$result->total = count($this->M_reutilizacion->ListarTabla('noticia'));
		$result->datos = $noticias;
		echo(json_encode($result));
	}
	
	function EliminarNoticia(){
		$ids = $this->input->post('ids');
//		 print_r($ids);
		foreach($ids as $id){
			$this->M_reutilizacion->EliminarElementoDadoCampoValor('noticia', 'id_noticia', $id);
		}
		echo(json_encode(""));
	}
	  
	 
	
}