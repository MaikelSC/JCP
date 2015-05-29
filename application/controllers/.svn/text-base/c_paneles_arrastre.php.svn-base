<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class c_paneles_arrastre extends CI_Controller {


	function __construct()
	{
		parent::__construct();
	}	
	 
	function CargarDatosPanelIzq(){
	   $arreglo = $this->M_reutilizacion->ListarTabla('panel_izq');
	   $result = $this->PrepararArregloPaneles($arreglo, 'id_panel_izq');
	   echo(json_encode($result));
	}

	function CargarDatosPanelDer(){
	$arreglo = $arreglo = $this->M_reutilizacion->ListarTabla('panel_der');
	$result = $this->PrepararArregloPaneles($arreglo, 'id_panel_der');
	echo(json_encode($result));
	}
		
	function PrepararArregloPaneles($arreglo, $id_panel){
		$result = array();
	   foreach($arreglo as $panel){
	   	 $aux = new stdClass();
		 $aux->id = $panel->$id_panel;
		 $aux->valor = $panel->valor;
		 $result[] = $aux;
	   }
	   return $result;
	}
	
	function GuardarCambios(){
		
		echo(json_encode(""));
	}
}