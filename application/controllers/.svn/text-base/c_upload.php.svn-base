<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class c_upload extends CI_Controller {


	function __construct()
	{
		parent::__construct();
		$this->load->model('M_autenticacion');///faltaba
	}
	
	function DevolverAlbums(){
		$imagenes = $this->M_reutilizacion->ListarTabla('album');
		$result->imagenes = array();
		foreach($imagenes as $img){
			$imagen = new stdClass();
			$imagen->src = 'conf/folder.gif';
			$imagen->titulo = $img->titulo;
			$imagen->id = $img->id_album;
			$result->imagenes[] = $imagen;
		}		
		echo(json_encode($result));
	}
	
	function DevolverImagenesAlbum1(){
		$idAlbum = $this->input->post('idAlbum');
		$imagenes = $this->M_reutilizacion->ListarElementosDadoCampoValor('imagen', 'id_album', $idAlbum);
		$result->imagenes = $imagenes;
		echo(json_encode($result));
	}
	
	function DevolverImagenesAlbum2(){
		$imagenes = $this->M_reutilizacion->ListarElementosDadoCampoValor('imagen', 'id_album', 1);
		$result->imagenes = $imagenes;
		echo(json_encode($result));
	}
	
	function Progreso(){
//	  echo "<script>$('<div>asdfasdf</div>').appendTo($('body'));</script>";
//	  print_r($session);
//      $j =  ini_set("session.upload_progress.name", "oculto");
//	  $j = "asdf";
//session_start();
//	   $clave = ini_get("session.upload_progress.prefix") . $_POST[ini_get("session.upload_progress.name")];
	  
//print_r($this->session);
//    echo "<div>asdf</div>";
		/*if(!$_GET['id']) die;
    $info = uploadprogress_get_info($_GET['id']);
    $kbytes_total = round($info['bytes_total'] / 1024);
    $kbytes_uploaded = round($info['bytes_uploaded'] / 1024);
    echo $kbytes_uploaded.'/'.$kbytes_total.' KB';*/
	
//	$clave = ini_get("session.upload_progress.enabled");
ini_set("session.upload_progress.prefix", "sdf");
var_dump(ini_get("session.upload_progress.prefix"));
//var_dump($_SESSION['name']);

//    print_r($_SESSION);
	}
	
	function GuardarFotoAlbum1(){
	    $direccion = 'application/imagenes/upload/album1';
		$name = 'oculto';
	    $retorno = $this->M_reutilizacion->GuardarFoto($direccion, $name);
		if(!isset($retorno->error)){
			$imagen->src = 'album1/'.$_FILES['oculto']['name'];
			$imagen->id_album = 1;
			$idImagen = $this->M_reutilizacion->AdicionarElementoDadoValor('imagen', $imagen); 
			$imagen = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('imagen', 'id_imagen', $idImagen);
			echo '<script> parent.$.JCP.upload.retorno('.json_encode($imagen).');</script>';
		}
		else{			
	    	echo '<script> parent.$.JCP.upload.retorno('+json_encode($retorno)+');</script>';
		}			    
	}
	
	function GuardarFotoAlbum2(){
	    $direccion = 'application/imagenes/upload/album2';
		$name = 'oculto';
	    $retorno = $this->M_reutilizacion->GuardarFoto($direccion, $name);
		if(!isset($retorno->error)){
			$imagen->src = 'album2/'.$_FILES['oculto']['name'];
			$imagen->id_album = 2;
			$idImagen = $this->M_reutilizacion->AdicionarElementoDadoValor('imagen', $imagen); 
			$imagen = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('imagen', 'id_imagen', $idImagen);
			echo '<script> parent.$.JCP.upload.retorno('.json_encode($imagen).');</script>';
		}
		else{			
	    	echo '<script> parent.$.JCP.upload.retorno('+json_encode($retorno)+');</script>';
		}			    
	}
	
	function EliminarFotoAlbum1(){
		$id = $this->input->post('id');
		$this->M_reutilizacion->EliminarElementoDadoCampoValor('imagen', 'id_imagen', $id);
		echo(json_encode($id));
	}
	
	function EliminarFotoAlbum2(){
		$id = $this->input->post('id');
		$this->M_reutilizacion->EliminarElementoDadoCampoValor('imagen', 'id_imagen', $id);
		echo(json_encode($id));
	}
}
?>