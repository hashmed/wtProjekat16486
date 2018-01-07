const express = require('express');
const fs = require('fs');
const os = require("os");
const router = express.Router();

const indexToCodeMap = {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5: 'E'
}

/* GET login page by default */
router.get('/', (req, res, next) => {
  res.render('login', { title: 'Login' });
});

router.post('/komentar', (req, res, next) => {

    getRequestBody(req, (body) => {
        try {
            var reqObj = JSON.parse(body);

            if(!reqObj.spirala || !reqObj.index || !reqObj.sadrzaj) {
                res.status(500).json({
                    message: "Podaci nisu u traženom formatu!",
                    data: null
                  });
            }
            else {
                fs.writeFile(__dirname + '/markS' + reqObj.spirala + reqObj.index + '.json', JSON.stringify(reqObj.sadrzaj));
    
                res.status(200).json({
                    message: "Uspješno kreirana datoteka!",
                    data: reqObj.sadrzaj
                  });
            }
            
        }
        catch(e){
            res.status(500).json({
                message: "Neocekivana greska!",
                data: null
              });
        }
    });
    
});

router.post('/lista', (req, res, next) => {

    getRequestBody(req, (body) => {
        try {
            var reqObj = JSON.parse(body);

            if(!reqObj.godina || !reqObj.nizRepozitorija) {
                res.status(500).json({
                    message: "Podaci nisu u traženom formatu!",
                    data: null
                  });
            }
            else {

                var repozitoriji = reqObj.nizRepozitorija;

                if(repozitoriji.length > 0) {
                    var filename = 'spisak' + reqObj.godina + '.txt';
                    var counter = 0;

                    fs.writeFile(__dirname + '/' + filename, '');

                    for(var i=0;i<repozitoriji.length;i++) {
                        if(repozitoriji[i].includes(reqObj.godina)){
                            fs.appendFile(__dirname + '/' + filename, repozitoriji[i]+os.EOL);
                            counter++;
                        }
                    }
                }

                res.status(200).json({
                    message: "Lista uspjesno kreirana!",
                    data: counter
                  });
            }
            
        }
        catch(e){
            res.status(500).json({
                message: "Neocekivana greska!",
                data: null
              });
        }
    });
});

router.post('/izvjestaj', (req, res, next) => {

    getRequestBody(req, (body) => {
        try {
            var reqObj = JSON.parse(body);

            if(!reqObj.spirala || !reqObj.index) {
                res.status(500).json({
                    message: "Podaci nisu u traženom formatu!",
                    data: null
                  });
            }
            else {

                var indexiObj = require('./spisakS' + reqObj.spirala + '.json');

                var fajloviSaKomentarima = [];

                //pronadji fajlove koje je potrebno otvoriti,
                //te ih upari sa studentom ciji komentar treba procitati
                for (var i = 0; i < indexiObj.length; i++) {

                    var redniBrojIndexa = indexiObj[i].indexOf(reqObj.index);

                    if (redniBrojIndexa > 0)

                    fajloviSaKomentarima.push({
                        fajl: 'markS' + reqObj.spirala + indexiObj[i][0] + '.json',
                        sifra: indexToCodeMap[redniBrojIndexa]
                      });
                  }
                  
                //upisi novi prazan fajl (ocisti prethodni, ako je postojao)  
                var filename = 'izvjestajS' + reqObj.spirala + reqObj.index + '.txt';
                fs.writeFile(__dirname + '/' + filename, '');

                fs.readdir(__dirname, (err, fajlovi) => {

                    if(err) {
                        res.status(500).json({
                            message: "Neuspjesno ucitavanje fajlova!",
                            data: err
                          });
                    }

                    //iteriranje kroz niz fajlova za citanje
                    for(var i=0;i<fajloviSaKomentarima.length;i++) {

                        //ako fajl postoji u ovom folderu...
                        if(fajlovi.indexOf(fajloviSaKomentarima[i].fajl) != -1) {
                            var fajl = require(__dirname + '/' + fajloviSaKomentarima[i].fajl);

                            //...provjeri postoji li student sa kodom u tom fajlu
                            //i upisi njegov komentar u izvjestaj
                            for(var j=0;j<fajl.length;j++){
                                if(fajl[j].sifra_studenta == fajloviSaKomentarima[i].sifra){
                                    fs.appendFile(__dirname + '/' + filename, (fajl[j].tekst || ' ') + os.EOL + '##########' + os.EOL);
                                }
                            }
                        }
                    }

                    res.status(200).json({
                        message: "Uspjesno!",
                        data: null
                      });
                });
            }
            
        }
        catch(e){
            res.status(500).json({
                message: "Neocekivana greska!",
                data: null
              });
        }
    });
});

router.post('/bodovi', (req, res, next) => {
    
    getRequestBody(req, (body) => {
        try {
            var reqObj = JSON.parse(body);

            if(!reqObj.spirala || !reqObj.index) {
                res.status(500).json({
                    message: "Podaci nisu u traženom formatu!",
                    data: null
                  });
            }
            else {

                var indexiObj = require('./spisakS' + reqObj.spirala + '.json');

                var studentiKojiSuPregledali = [];

                //pronadji indekse studenata koji su pregledali rad datog studenta
                for (var i = 0; i < indexiObj.length; i++) {

                    if(indexiObj[i][0] == reqObj.index) {
                        for(var j=1;j<indexiObj[i].length;j++){
                            studentiKojiSuPregledali.push({
                                fajl: 'markS' + reqObj.spirala + indexiObj[i][j] + '.json',
                                sifra: indexToCodeMap[j]
                            });
                        }
                    }
                  }
                  
                var prosjek = 0;
                var brojac = 0;
                 
                fs.readdir(__dirname, (err, fajlovi) => {

                    if(err) {
                        res.status(500).json({
                            message: "Neuspjesno ucitavanje fajlova!",
                            data: err
                          });
                    }

                    //iteriranje kroz niz fajlova za citanje
                    for(var i=0;i<studentiKojiSuPregledali.length;i++) {

                        //ako fajl postoji u ovom folderu...
                        if(fajlovi.indexOf(studentiKojiSuPregledali[i].fajl) != -1) {
                            var fajl = require(__dirname + '/' + studentiKojiSuPregledali[i].fajl);

                            //dodaj ocjenu i povecaj brojac
                            for(var j=0;j<fajl.length;j++){
                                if(fajl[j].sifra_studenta == studentiKojiSuPregledali[i].sifra){
                                    prosjek += fajl[j].ocjena;
                                    brojac++;
                                }
                            }
                        }
                    }

                    var response = 'Student' + req.index + 'je ostvario u prosjeku ' + prosjek/brojac + 1 + 'mjesto.'
                    res.status(200).json({
                        poruka: response
                      });
                });
            }
            
        }
        catch(e){
            res.status(500).json({
                message: "Neocekivana greska!",
                data: null
              });
        }
    });
});

//nakon što je request body kompletano pročitan,
//odradi potrebno procesiranje u callback-u
function getRequestBody(req, responseHandlerCb) {

    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      responseHandlerCb(body);
    });
}

module.exports = router;