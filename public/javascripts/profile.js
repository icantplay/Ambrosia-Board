var idEmp=localStorage.getItem("idEmp");
var orgId=localStorage.getItem("orgid");
var empregados=[];
var evento;
var empregadoType = localStorage.getItem("empType");

window.onload = function(){
    var colaboradores=document.getElementById("colaboradores");
    var empregadoType = localStorage.getItem("empType");
    var removes=document.getElementById("remove-btns");


    
    var str="";
    var str1="";
$.ajax({
    url: "/api/has",
    method: "get",
    success: function(result, status) {
      for (i in result) {
        if (result[i].idEmployee == idEmp){ 
            localStorage.setItem('evento',result[i].idEvent);
            evento=localStorage.getItem('evento');
            $.ajax({
                url: "/api/empregados/"+evento,
                method: "get",                
                success: function(result, status) {
                    for(i in result){
                    str+="<div class='emp-card'>";
                    str+="<img id='emp-img'src='https://cdn2.iconfinder.com/data/icons/office-and-business-special-set-1/260/21-512.png'>";
                    str+="<h2>"+result[i].empName+"</h2>";
                    str+="<h2>"+result[i].empType+"</h2>";
                    str+="</div>";} if(empregadoType=="gestor"){
                        for(i in result){
                            str1+="<button class='emp-remove'id="+result[i].idEmp+">Remover"+result[i].empName+"</button>";
                            
                        }
                        
                        
                    }
                    colaboradores.innerHTML=str+colaboradores.innerHTML;             
                    removes.innerHTML=str1+removes.innerHTML;      
                        
               },
                error: function() {
                  console.log("Error");
                }
              });
    } 
      }
    },
    error: function() {
      console.log("Error");
    }
  });
  
  

  
  








}


