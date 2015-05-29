<?php
class M_autenticacion extends CI_Model {

    function M_autenticacion()
    {
        parent::__construct();       
    }	
	
	function Autenticar($campos, $valores){
		$Usuario = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('usuario' , 
		$campos  , 
		$valores
		);
		/*if($Usuario!= null)	
		$Usuario->privilegio = $this->M_reutilizacion->ObtenerElementoDadoCamposValores(
		'nom_privilegio', 'id_privilegio' , $Usuario->id_privilegio)->valor;*/	
		return $Usuario;
	}
}
?>