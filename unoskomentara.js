var UnosKomentara = (function(){
    

    var rowBackup = {
        sifra: null,
        repo: null,
        komentar: null,
        bodovi: null
    };

    return {
        moveUp: function(index) {

            var upvotedRow = document.getElementById(index);
            var downgradedRow = document.getElementById(index-1);
            UnosKomentara.backupRow(downgradedRow);

            UnosKomentara.setSifra(downgradedRow, UnosKomentara.getSifra(upvotedRow));
            UnosKomentara.setRepo(downgradedRow, UnosKomentara.getRepo(upvotedRow));
            UnosKomentara.setKomentar(downgradedRow, UnosKomentara.getKomentar(upvotedRow));
            UnosKomentara.setBodovi(downgradedRow, UnosKomentara.getBodovi(upvotedRow));

            UnosKomentara.setSifra(upvotedRow, rowBackup.sifra);
            UnosKomentara.setRepo(upvotedRow, rowBackup.repo);
            UnosKomentara.setKomentar(upvotedRow, rowBackup.komentar);
            UnosKomentara.setBodovi(upvotedRow, rowBackup.bodovi);
        },
        moveDown: function(index) {
            
            var downvotedRow = document.getElementById(index);
            var upgradedRow = document.getElementById(index+1);
            UnosKomentara.backupRow(upgradedRow);

            UnosKomentara.setSifra(upgradedRow, UnosKomentara.getSifra(downvotedRow));
            UnosKomentara.setRepo(upgradedRow, UnosKomentara.getRepo(downvotedRow));
            UnosKomentara.setKomentar(upgradedRow, UnosKomentara.getKomentar(downvotedRow));
            UnosKomentara.setBodovi(upgradedRow, UnosKomentara.getBodovi(downvotedRow));

            UnosKomentara.setSifra(downvotedRow, rowBackup.sifra);
            UnosKomentara.setRepo(downvotedRow, rowBackup.repo);
            UnosKomentara.setKomentar(downvotedRow, rowBackup.komentar);
            UnosKomentara.setBodovi(downvotedRow, rowBackup.bodovi);
        },

        backupRow: function(removedRow) {
            rowBackup.sifra = UnosKomentara.getSifra(removedRow);
            rowBackup.repo = UnosKomentara.getRepo(removedRow);
            rowBackup.komentar = UnosKomentara.getKomentar(removedRow);
            rowBackup.bodovi = UnosKomentara.getBodovi(removedRow);
        },

        getSifra: function(removedRow) {
            return removedRow.getElementsByTagName('td')[0].innerText;
        },
        setSifra: function(modifiedRow, newValue) {
            modifiedRow.getElementsByTagName('td')[0].innerText = newValue;
        },

        getRepo: function(removedRow) {
            return removedRow.getElementsByTagName('td')[1].getElementsByTagName('a')[0].innerHTML;
        },
        setRepo: function(modifiedRow, newValue) {
            modifiedRow.getElementsByTagName('td')[1].getElementsByTagName('a')[0].innerHTML = newValue;
        },

        getKomentar: function(removedRow) {
            return removedRow.getElementsByTagName('td')[2].getElementsByTagName('input')[0].value;
        },
        setKomentar: function(modifiedRow, newValue) {
            modifiedRow.getElementsByTagName('td')[2].getElementsByTagName('input')[0].value = newValue;
        },

        getBodovi: function(removedRow) {
            return removedRow.getElementsByTagName('td')[3].getElementsByTagName('input')[0].value;
        },
        setBodovi: function(modifiedRow, newValue) {
            modifiedRow.getElementsByTagName('td')[3].getElementsByTagName('input')[0].value = newValue;
        }
    }
    }());