//esta función se encargará de la data que queremos a través de un callback
var getDataFromDataset= function(query, callback) {
    // Estás dos constantes nos permitiran accesar a nuestra tabla
    /*-apiUrl: donde se aloja la api que administrará las tablas y nos
      proporcionará los resultados.
      -key: es la llave que nos autorizará usar el api ya que somos usuario
      de google.
    */
    var apiUrl = 'https://www.googleapis.com/fusiontables/v2/query?sql=';
    var key = '&key=AIzaSyCAI2GoGWfLBvgygLKQp5suUk3RCG7r_ME';    

    //Armamos la estructura que conformará la url donde ejecutaremos un request
    var queryurl = encodeURI(apiUrl + query + key);
  

    //Ejecutamos la query haciendo el request y esperamos para esperar la data
    $.ajax({
      url:queryurl,
      method:'get',
      dataType:'jsonp',
      success:function(data){
        callback(data);
      }
    });
    
};
//esta función nos permitirá agregar la data en un panel visible en el 
//contenedor
var addPanel=function (parentId ,title,date, content){
    var parent= $(parentId);
    var prevElements;
    //estructura (en notación html) del panel
    var card="<div class='panel panel-default'>"+
              "<div class='panel-heading'>"+
                "<h5 class='panel-title'>"+title+"</h5>"+
              "</div>"+
              "<div class='panel-body'>"+
                "<p>"+content+"</p>"+
              "<span class='badge'>"+date+"</span>"+
              "</div>"+
            "</div>"
            ;
    
    var prevElements= parent.html();
    parent.html(
        prevElements+card
    );
};


//---------MAIN---------------
$(function(){
    var tabla='1X7LJvGcwmnAllc5QAt9kvp-FgI56K_kdG854EA2y';
    var column1='Título';
    var column2='Fecha';
    var column3='Resumen';
    getDataFromDataset("SELECT '"+column1+"' , '"+column2+"' , '"+column3+"' FROM "+tabla ,function(data){                     
             for (var i in data.rows)
                addPanel('.panel-container',data.rows[i][0],data.rows[i][1] ,data.rows[i][2]);
    });
});