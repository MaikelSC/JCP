<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class c_administrador extends CI_Controller {


	function __construct()
	{
		parent::__construct();
		$this->load->model('M_autenticacion');///faltaba
	}	
	 
	 function index()
	{	
		$this->load->view('administrador');
	}
	 
	function Autenticar(){
//	print_r("asdf");
		/*$usuario = $this->input->post('usuario');
		$contra = $this->input->post('contra');		
		$resultUsuario = $this->M_autenticacion->Autenticar( 
		array("usuario" ,"contra")  , 
		array($usuario ,$contra)
		);		
		//print_r($resultUsuario);
		if($resultUsuario!= null){//usuario y contrasena correctos   
		   $Usuario->usuario = $resultUsuario->usuario;*/
		   /* if($resultUsuario->activo == 0){//usuario activo
				$Usuario = new stdClass();
				$Usuario->usuario = $resultUsuario->usuario;
				$Usuario->privilegio = $resultUsuario->privilegio;
				$this->session->set_userdata("usuario",$resultUsuario->usuario);
		        $this->session->set_userdata("privilegio",$resultUsuario->privilegio);
			}
			else{
				$Usuario->error = false;
		        $Usuario->mensaje = "Usuario desactivado.";
			}*/
//			echo(json_encode(""));
			redirect('c_administrador/CargarPaginaAdmin/');
		/*	
		}
		else{
			$Usuario->error = false;
		    $Usuario->mensaje = "Usuario o contraseña erroneas.";
			echo(json_encode($Usuario));
		}	*/	
		

	}
	
	function DevolverImagenes(){
		$imagenes = $this->M_reutilizacion->ListarTabla('foto');
//		if($imagenes == null){
//			$result->vacio = "No hay imagenes que mostrar";
//		}
//		else{
			$result->imagenes = $imagenes;
//		}
//		print_r($result);
		echo(json_encode($result));
	}
	
	function CargarPaginaAdmin(){
		$this->load->view('aqui');
	}
	
	function Salir(){
		$this->session->unset_userdata("usuario");
		$this->session->unset_userdata("privilegio");
		echo(json_encode(""));
	}
	function Adicionar(){
//		print_r($_POST);
	}
}
?>