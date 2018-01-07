var Login = (function(){
        
        return {
            setupPage: function(isNastavnik) {
                
                document.getElementById("nastavnik-form").style.display = isNastavnik ? 'block' : 'none';
                document.getElementById("student-form").style.display = !isNastavnik ? 'block' : 'none';
            }
        }
        }());