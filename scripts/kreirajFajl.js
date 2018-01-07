var KreirajFajl=(function(){

    return {
        kreirajKomentar: function(spirala, index, sadrzaj, fnCallback){

            //provjeri parametre
            if(!spirala || !index || !sadrzaj || ((sadrzaj) => {

                try {
                    var jsonObj = JSON.parse(sadrzaj);

                    //provjeri niz objekata
                    if(!jsonObj.length) {
                        return false;
                    }

                    //provjeri atribute svakog objekta
                    for(var i=0;i<jsonObj.length;i++) {
                        if(!jsonObj[i].sifra_studenta || !jsonObj[i].text || !jsonObj[i].ocjena) {
                            return false;
                        }
                    }

                    return true;
                } catch (e) {
                    return false;
                }
                })())
            {
                fnCallback(-1, 'Neispravni parametri');
            }

            var request = {spirala, index, sadrzaj};

            KreirajFajl.PosaljiRequest('http://localhost:3000/komentar', request, fnCallback);
        },
        kreirajListu: function(godina, nizRepozitorija, fnCallback){

            //provjeri parametre
            if(!godina || !nizRepozitorija || ((nizRepozitorija) => {
                
                try {
                    var jsonObj = JSON.parse(nizRepozitorija);

                    //provjeri niz objekata
                    if(!jsonObj.length) {
                        return false;
                    }

                    return true;
                } catch (e) {
                    return false;
                }
                })())
            {
                fnCallback(-1, 'Neispravni parametri');
            }

            var request = {godina, nizRepozitorija};

            KreirajFajl.PosaljiRequest('http://localhost:3000/lista', request, fnCallback);
        },
        kreirajIzvjestaj: function(spirala, index, fnCallback){

            //provjeri parametre
            if(!spirala || !index)
            {
                fnCallback(-1, 'Neispravni parametri');
            }

            var request = {spirala, index};

            KreirajFajl.PosaljiRequest('http://localhost:3000/izvjestaj', request, fnCallback);
        },
        kreirajBodove: function(spirala, index, fnCallback){

            //provjeri parametre
            if(!spirala || !index)
            {
                fnCallback(-1, 'Neispravni parametri');
            }

            var request = {spirala, index};

            KreirajFajl.PosaljiRequest('http://localhost:3000/bodovi', request, fnCallback);
        },
        PosaljiRequest: (url, request, fnCallback) => {
            var xhr = new XMlHttpRequest();
            xhr.onreadystatechange = () => {

                if(xhr.readyState == 4 && ajax.status == 200) {
                    fnCallback(null, xhr.responseText)
                }
                else if (xhr.readyState == 4) { 
                    fnCallback(xhr.status, xhr.responseText)
                }
            };
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(request));
        }
    }
})();
