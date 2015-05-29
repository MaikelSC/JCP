<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class c_noticia extends CI_Controller {


	function __construct()
	{
		parent::__construct();
	}	
	 
	 function AdicionarNoticia($Param = null)
	{	
		if($Param == null){			
			$noticia = new stdClass();
			foreach($_POST as $key=>$value){			
				$noticia->$key = $value;
			}
		}
		else	
			$noticia = $Param;
		$noticia->fecha = $this->M_reutilizacion->ConvertirFecha($noticia->fecha);
		$noticia->fecha1 = $this->M_reutilizacion->ConvertirFecha($noticia->fecha1);
		$idNoticia = $this->M_reutilizacion->AdicionarElementoDadoValor('noticia', $noticia);
		$noticia = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('noticia', 'id_noticia', $idNoticia);
		$noticia->fecha = $this->M_reutilizacion->DesconvertirFecha($noticia->fecha);
		$noticia->fecha1 = $this->M_reutilizacion->DesconvertirFecha($noticia->fecha1);
		$noticia->fecha2 = $noticia->fecha;
		if($Param != null)
			return $noticia;
		else	
			echo(json_encode($noticia));
	}
	
	function EditarNoticia(){
	    $id = $this->input->post('id');
		$noticia = new stdClass();
			foreach($_POST as $key=>$value){
		   	 if($key != 'id')			
				$noticia->$key = $value;
			}
		if($id != false){			
			$noticia->fecha = $this->M_reutilizacion->ConvertirFecha($noticia->fecha);
			$noticia->fecha1 = $this->M_reutilizacion->ConvertirFecha($noticia->fecha1);
			$idNoticia = $this->M_reutilizacion->EditarElementoDadoCampoValor($id, 'noticia', 'id_noticia', $noticia);
			$noticia = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('noticia', 'id_noticia', $id);
			$noticia->fecha = $this->M_reutilizacion->DesconvertirFecha($noticia->fecha);
			$noticia->fecha1 = $this->M_reutilizacion->DesconvertirFecha($noticia->fecha1);
		}
		else 
			$noticia = $this->AdicionarNoticia($noticia);
		echo(json_encode($noticia));
		
	}
	
	function DevolverNoticia(){
		$id = $this->input->post('id');$noticia = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('noticia', 'id_noticia', $id);
		$noticia->fecha = $this->M_reutilizacion->DesconvertirFecha($noticia->fecha);
		$noticia->fecha1 = $this->M_reutilizacion->DesconvertirFecha($noticia->fecha1);
		echo(json_encode($noticia));		
	}
	 
	
}