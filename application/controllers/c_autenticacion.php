<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class c_autenticacion extends CI_Controller {


	function __construct()
	{
		parent::__construct();
		$this->load->model('M_autenticacion');///faltaba
	}	
	 
	 function index()
	{	
		$this->load->view('autenticacion');
	 	
	}
	function Autenticar(){
		$usuario = $this->input->post('usuario');
		$contra = $this->input->post('contra');		
		$resultUsuario = $this->M_autenticacion->Autenticar( 
		array("usuario" ,"contra")  , 
		array($usuario ,$contra)
		);	
		if($resultUsuario!= null){//usuario y contrasena correctos   
		   $Usuario->usuario = $resultUsuario->usuario;
				$Usuario->usuario = $resultUsuario->usuario;
				$this->session->set_userdata("usuario",$resultUsuario->usuario);
		}
		else{
			$Usuario->error = false;
		    $Usuario->mensaje = "Usuario o contraseña erroneas.";			
		}		
		echo(json_encode($Usuario));
	
	}
	function Salir(){
		$this->session->unset_userdata("usuario");
		$this->session->unset_userdata("privilegio");
		echo(json_encode(""));
	}
}
?>