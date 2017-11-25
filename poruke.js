var Poruke = (function(){

    var idDivaPoruka;
    var mogucePoruke = [
        'Ime i prezime je neispravno',
        'Indeks kojeg ste napisali nije validan',
        'Nastavna grupa koju ste napisali nije validna',
        'Akademska godina nije validna',
        'Email koji ste napisali nije validan fakultetski email',
        'Password ne sadrzi barem jedno veliko slovo, malo slovo i broj',
        'Potvrdjeni password ne odgovara originalnom',
        'Bitbucket URL nije ispravan',
        'Bitbucket SSH nije ispravan',
        'Naziv repozitorija nije ispravan'];

    var porukeZaIspis = new Array(10).fill(null);

    return {
        ispisiGreske: function() {
            
            var errorMsgContainer = document.getElementById("register-form-errors");

            errorMsgContainer.innerHTML = ''; //reset messages first

            for(var i=0;i<porukeZaIspis.length;i++){
                if(!porukeZaIspis[i]) {
                    continue;
                }
                
                var errorMsgDiv = document.createElement('div');
                errorMsgDiv.innerText = porukeZaIspis[i];

                errorMsgContainer.appendChild(errorMsgDiv);
            }

        },
        postaviIdDiva: function() {
            //… funkcija koja postavlja id diva
        },
        dodajPoruku: function(index) {
            porukeZaIspis[index] = mogucePoruke[index];
            Poruke.ispisiGreske();
        },
        ocistiGresku: function(index) {
           porukeZaIspis[index]='';
           Poruke.ispisiGreske();
        }
    }
    }());