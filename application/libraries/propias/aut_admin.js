$(document).ready(function(){
$.urlServer = "http://localhost";
$('<div id="d_autenticacion" align="center" class = "contenedor"><div id="id_titulo" class="aut"><table align="left" width="99%"><tr><td id="icono_titulo"></td><td>Autenticaci&oacute;n</td></tr></table></div><table width="300"><tr><td width="83" id="l_nombre" class="label">Nombre</td><td width="150"><input id="usuario" name="usuario" type="text" class="campos_texto"/></td></tr><tr><td id="l_contrasena" class="label">Contrase&ntilde;a </td><td><input id="contra" name="contrase&ntilde;a" type="password"  class="campos_texto"/></td></tr><tr height="23"><td colspan="2" align="left" id="e_autenticacion" class="error">&nbsp;</td></tr><tr><td colspan="2" align="center"><input class="boton" name="button" type="button" id="entrar"  onclick="Autenticar()" value="Aceptar"/><input class="boton" name="button" type="button" id="cancelar" onclick="Cancelar()" value="Cancelar"/></td></tr></table></div>').appendTo($('body'));
 
 EstiloVentana();
 OnFocus();
});
function Autenticar(){
    if($('#usuario').val()!= "" && $('#contra').val()!=""){
		var url = "c_autenticacion/Autenticar";
	    var data = {usuario : $('#usuario').val(), contra: $('#contra').val()};	
	    ConsultaAjax(url, data, Autenticado , NoAutenticado);
	}
	else{
	    var div = $('#e_autenticacion');
		div.css('backgroundImage','url("/Gemoplasma/application/libraries/Propias/imagenes/autenticacion-error.gif")');
	    div.html("Debe introducir usuario y contrase&#241;a");
		//div.fadeIn();
	}
	
}
function EstiloVentana(){
	var div_autenticacion = $('#d_autenticacion');
	var html = $('html');
	html.css({width:'100%', height:'100%'});
	div_autenticacion.css({width:325, height:150, marginLeft: (html.width()/2 - div_autenticacion.width()/2), marginTop: (html.height()/2 - div_autenticacion.height()/2)});
	$('#id_titulo').css({margin:'3px',height:'23px'});
	$('#id_titulo').css('backgroundImage','url("/cantante/application/libraries/propias/imagenes/fondoTituloTabla.png")');
	$('#icono_titulo').css('backgroundImage','url("/cantante/application/libraries/propias/imagenes/user_suit.gif")');
	$('#entrar').css('backgroundImage','url("/cantante/application/libraries/propias/imagenes/aceptar.gif")');
	$('#cancelar').css('backgroundImage','url("/cantante/application/libraries/propias/imagenes/cross.gif")');
	$('#e_autenticacion').css({color:'red'});
	div_autenticacion.fadeIn(3000);
}
function OnFocus(){
    $('#usuario').focus(); 
	$('#usuario').focus(function(){
       $('#e_autenticacion').text('');
	   $('#e_autenticacion').css('backgroundImage','');
	   $('#l_nombre').css({color:'#13340a'});
	   $('#l_contrasena').css({color:'#a8c7a3'});
	 });
  $('#contra').focus(function(){
	   $('#e_autenticacion').text('');
	   $('#e_autenticacion').css('backgroundImage','');
	   $('#l_contrasena').css({color:'#13340a'});
	   $('#l_nombre').css({color:'#a8c7a3'});
	 });
}
function Cancelar(){
	$('#usuario').val('');
	$('#contra').val('');
	$('#e_autenticacion').text('');
	$('#e_autenticacion').css('backgroundImage','');
	$('#l_contrasena').css({color:'#7C97B8'});
	$('#l_nombre').css({color:'#7C97B8'});
}

function Autenticado(data){
    /*var div = $('#e_autenticacion');
	div.text('');
	$('#usuario').val('');
	$('#contra').val('');
	var aut = $('#aut');
//	var user_aut = $('#user_aut').text(data.usuario);
//	var separador = $('#separador').text('|');
//	var priv_aut = $('#priv_aut').text(data.privilegio);
	var salir = $('<div id = "salir" align="center" class="oculto" onclick="Salir()">Salir</div>').appendTo(aut);
	user_aut.css({display:'inline'});
	priv_aut.css({display:'inline'});
	salir.css({display:'inline'});
	$('#cont_autentic').slideUp();
	$('#cnt_pestana_autentic').animate({top:'10px'});
	$('#btn_pestana_autentic').css({backgroundImage:'url("/Gemoplasma/application/libraries/Propias/imagenes/abajo_disabled.png")', backgroundRepeat:'no-repeat', color:'#4f5a43'});
	$('#btn_pestana_autentic').attr('disabled','disabled');
	//div.fadeOut();
	//$('#d_autenticacion').fadeOut();
	//MostrarPlantilla();
	$('#menu').remove();
	EjecutarMenu(priv_aut.text());
	$('#col_cuerpo').children().remove();*/
	document.location.href="c_administrador";
	/*$('#col_cuerpo').children().remove();*/
}

function NoAutenticado(data){
	var div = $('#e_autenticacion');
	div.text(data.mensaje);
	div.css('backgroundImage','url("/Gemoplasma/application/libraries/propias/imagenes/autenticacion-error.gif")');
	$('#contra').attr("value", "");
}
/*	
//  document.location.href="http://10.0.0.230/Gemoplasma/index.php/plantilla/c_plantilla/cargarPlantilla";
  EjecutarMenu();
}


 function incluir(direccion, funcion){
		$.getScript('http://localhost/Gemoplasma/application/'+direccion, function() {
		if(funcion != undefined)
			funcion();
		});
	}*/