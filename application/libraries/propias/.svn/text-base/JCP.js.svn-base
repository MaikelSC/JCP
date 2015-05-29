$.JCP = {
	Crear : function(NameSpace, arregloParametros, funcion){/*alert(NameSpace);*/	
		if($.JCP[NameSpace] == undefined){
		        if(arregloParametros.tieneCss)
					this.EstiloXDefecto(NameSpace, arregloParametros, funcion);
				else{
				    if(arregloParametros.sincrono)						
						$.ajaxSetup({
							async: false
						});					
					this.CargarArchivo(NameSpace, arregloParametros, funcion);
					if(arregloParametros.sincrono)
						$.ajaxSetup({
							async: true
						});
				}
		}
		else{
		    var objeto = new $.JCP[NameSpace].crear(arregloParametros);
				if(arregloParametros.persistirObj != undefined)
					arregloParametros.persistirObj[NameSpace] = objeto;					
			if(funcion)
				funcion(objeto);
			return objeto;
		}
	},
	CargarArchivo : function(NameSpace, arregloParametros, funcion){
		 if(arregloParametros.jquery == true)
		 	var url = $.urlServer+'/cantante/application/libraries/jquery/'+NameSpace+'/'+NameSpace+'.js';
		 else
		    var url = $.urlServer+'/cantante/application/libraries/propias/'+NameSpace+'.js';	
		$.getScript(url,
	    function() {
		   $.JCP.Crear(NameSpace, arregloParametros, funcion);
		});
	},
	EstiloXDefecto : function(NameSpace, arregloParametros, funcion){ 
		if(arregloParametros.jquery == true)
		 	var url = $.urlServer+'/cantante/application/libraries/jquery/'+NameSpace+'/'+NameSpace+'.css';
		 else
		    var url = $.urlServer+'/cantante/application/libraries/propias/css/'+NameSpace+'.css';	
		$('<link rel="stylesheet"  type="text/css" href="'+url+'" />')		
		.appendTo($('head'))
		.ready(function(){	
		 arregloParametros.tieneCss = false;		
		  	 $.JCP.Crear(NameSpace, arregloParametros, funcion);		  
		 });
	}
}