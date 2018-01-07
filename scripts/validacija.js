var Validacija = (function(){
    var maxGrupa=7;
    var trenutniSemestar=0;//0 za zimski, 1 za ljetni semestar

    return  {

        validirajFakultetski: function(emailValue) {
            
            var fakultetskiMailExp = new RegExp('^[\w.]+@etf.unsa.ba$');
        
            return fakultetskiMailExp.test(emailValue);
        },

        validirajIndex: function(brojIndexa) {
            var validanIndexExp = new RegExp('^1[0-9]{4}$');
        
            return validanIndexExp.test(brojIndexa);
        },

        validirajGrupu: function(brojGrupe) {
    
            return !isNaN(brojGrupe) && Number.isInteger(brojGrupe) && brojGrupe > 0 && brojGrupe < maxGrupa;
        },

        validirajAkGod: function(akGodina) {
            
            var akGodExp = new RegExp('^[0-9]{4}\/[0-9]{4}$');

            //ako je input neispravan, zaustavi validiranje
            if(!akGodExp.test(akGodina)) {
                return false;
            }

            var godine = akGodina.split('/');
            return parseInt(godine[1]) - parseInt(godine[0]) == 1;
        },

        validirajPassword: function(passwordValue) {
            
            var passwordExp = new RegExp('^((?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])([a-zA-Z0-9]{7,20}))$')

            return passwordExp.test(passwordValue);
        },

        validirajPotvrdu: function(passwordValue1, passwordValue2) {
            
            return Validacija.validirajPassword(passwordValue1) && Validacija.validirajPassword(passwordValue2) && passwordValue1 == passwordValue2;
        },

        validirajBitbucketURL: function(urlValue) {

            var bitBucketURLExp = new RegExp('^https:\/\/(.+)@bitbucket\.org\/(.+)\/(wt[P,p]{1}rojekat1[0-9]{4})\.git$');

            return bitBucketURLExp.test(urlValue);
        },

        validirajBitbucketSSH: function(sshValue) {

            var bitBucketSSHExp = new RegExp('^git@bitbucket\.org:(.+)\/(wt[P,p]{1}rojekat1[0-9]{4})\.git$');

            return bitBucketSSHExp.test(sshValue);
        },

        validirajNazivRepozitorija: function(nazivRepozitorijaExp, nazivRepozitorijaValue) {

            if(!nazivRepozitorijaExp){
                nazivRepozitorijaExp = new RegExp('^wt[P,p]{1}rojekat1[0-9]{4}$');
            }

            return nazivRepozitorijaExp.test(nazivRepozitorijaValue);
        },

        validirajImeiPrezime: function(imeIPrezimeValue) {
            
            var imeIPrezExp = new RegExp('^([A-ZČĆĐŠŽ]{1}[A-ZČĆĐŠŽa-zčćđšž\\-\']{2,11})+([\s]([A-ZČĆĐŠŽ]{1}[A-ZČĆĐŠŽa-zčćđšž\\-\']*)*)*$')

            return imeIPrezExp.test(imeIPrezimeValue);
        },

        postaviMaxGrupa: function(maxGrupaValue) {

            maxGrupa = maxGrupaValue;
        },

        postaviTrenSemestar: function(trenutniSemestarValue) {
            trenutniSemestar = trenutniSemestarValue;
        }
    }
    }());