function CrearMenu(padreMenu , arregloItmes , arregloSubItmes , arregloHrefSubItems){
	var menu = $('<div id="menu"></div>').appendTo(padreMenu);
	var contenedorMenu = $('<ul class="menu" ></ul>').appendTo(menu);

	for(var i =0; i<arregloItmes.length;i++){
		CrearItem(contenedorMenu , arregloItmes[i] , arregloSubItmes , arregloHrefSubItems);
	}
	
	
/*var parche =$('<div id="copyright">asdfasdfasd<a href="http://apycom.com/"></a></div>').appendTo(padreMenu);
parche.fadeOut();*/
   
//   $('a').attr("href")	
}

function CrearItem(contenedorMenu , nombreItem, arregloSubItmes , arregloHrefSubItems ){
	 var itemmenu = $('<li class="padreI"><a class="item" ><span >'+nombreItem+'</span></a></li>').appendTo(contenedorMenu); 
	  
     var contenenedorSubMenu = $('<div class="divCont"></div>').appendTo(itemmenu);       	 
//	 var contenedorSubItem = 	$('<ul   ></ul>').appendTo(itemmenu);	
//	 var contenedorSubItem = 	$('<ul   ></ul>').appendTo(contenenedorSubMenu);	
	 var cantidad = 0;
	 for(var j =0; j<arregloSubItmes.length;j++){
	   var valor = arregloSubItmes[j];
	   var href = arregloHrefSubItems[j];
	   	   
	   arregloSubItmes.shift();
	   arregloHrefSubItems.shift();
	   j--;
	   		
		if(valor != "-"){
			CrearSubItem(contenenedorSubMenu, valor , href);
			cantidad++;
		}		
		else			    
			break;		
	}		
}
function CrearSubItem(contenedorSubItem , nombreSubItem , hrefSubItem){
//	 var subItemmenu = $('<li  ></li>').appendTo(contenedorSubItem);
	 var hrefSubItemMenu = $('<a class="subItem" ><span>'+nombreSubItem+'</span></a>').appendTo(contenedorSubItem);
	 hrefSubItemMenu.click(function(){hrefSubItem()});	  	 
}