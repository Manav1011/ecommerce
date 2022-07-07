function refresh_page(){
    window.location.reload();
    DarkModeOnOff();
    
  }
    function loading(){
      
    var darkcheck=document.getElementById("darkmode");    
    if(sessionStorage.getItem('default_theme') == 'true'){
    darkcheck.checked=true
    }
    else{
      darkcheck.checked=false 
    }
   DarkModeOnOff();
    }              
    function DarkModeOnOff(){

      var darkcheck=document.getElementById("darkmode");
      if (darkcheck.checked==true){
        sessionStorage.setItem('default_theme','true');
        document.getElementById('content').classList.remove('bg-light','text-dark');
        document.getElementById("nav").classList.remove('navbar-light');
        document.getElementById('content').classList.add('bg-dark','text-light');
        document.getElementById("nav").classList.add('navbar-dark');
        var cards=document.querySelectorAll('#other-components')
        for(var i = 0; i < cards.length; i++) {
          cards[i].classList.add('bg-dark','text-light');
            cards[i].classList.remove('bg-light','text-dark');
            
          }
          document.getElementById("table").classList.add('table-dark');
          
      }
      else{
        sessionStorage.setItem('default_theme','false');
        document.getElementById('content').classList.remove('bg-dark','text-light');
        document.getElementById("nav").classList.remove('navbar-dark');
        document.getElementById("nav").classList.add('navbar-light');
        document.getElementById('content').classList.add('bg-light','text-dark');
        var cards=document.querySelectorAll('#other-components')
        
        for(var i = 0; i < cards.length; i++) {
          cards[i].classList.remove('bg-dark','text-light');                        
          cards[i].classList.add('bg-light','text-dark');
            
          }
          document.getElementById("table").classList.remove('table-dark');
      }                   
    }