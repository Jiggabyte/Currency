window.onload = function() {

    let froCur, toCur, theAmt, fromCurrency, toCurrency, amount, valor, numb;


    document.getElementById('conv').onclick = function() {
        froCur = document.getElementById('fromCurr');
        fromCurrency = froCur.value;

        console.log(fromCurrency);

        toCur = document.getElementById('toCurr');
        toCurrency = toCur.value;

        console.log(toCurrency);

        theAmt = document.getElementById('curr');
        amount = theAmt.value;

        let apiKey = '';

        fromCurrency = encodeURIComponent(fromCurrency);
        toCurrency = encodeURIComponent(toCurrency);
        let query = fromCurrency + '_' + toCurrency;

        let url = 'https://free.currencyconverterapi.com/api/v5/convert?q=' +
            query + '&compact=ultra&apiKey=' + apiKey;

        fetch(url).then(function(resData) {
            return resData.json();
        }).then(function(RSD) {
            valor = RSD;
            console.log(RSD);
            numb = valor[query] * amount;
            document.getElementById('shower').innerHTML = numb.toFixed(2);
            console.log(valor[query]);

            let dbx = idb.open('currDb', 3, function(upgradeDb) {
                switch(upgradeDb.oldVersion) {

                    case 0:
                        upgradeDb.createObjectStore('currSt', { keyPath: 'pair' });
                    case 1:
                        let currStore = upgradeDb.transaction.objectStore('currSt');
                        currStore.createIndex('1', 'mony');
                    case 2:
                        currStore = upgradeDb.transaction.objectStore('currSt');
                        currStore.createIndex('5', 'monies');

                }

            });

            dbx.then(function(db) {
                let tx = db.transaction('currSt', 'readwrite');
                let currStore = tx.objectStore('currSt');
                currStore.put({
                    pair: query,
                    value: valor[query],
                    mony: valor[query],
                    monies: valor[query] * 5

                });
                return tx.complete;
            }).then(function() {
                console.log('Added ' +  valor[query] + '  to CurrSt');
            });



        });



            /*
            const dbx = window.indexedDB.open('currDb');


            dbx.onupgradeneeded = function(event) {
                let db = event.target.result;

                db.onerror = function(e) {
                    console.log('Error loading database.');
                };

                // Create an objectStore for this database

                let currStore = db.createObjectStore("currSt", { keyPath: "id" });

                // define what data items the objectStore will contain

                currStore.createIndex("pair", "sum");


                console.log('CurrStore created.');
            };

            dbx.onsuccess = function(evt) {

                db = dbx.result;

                db.onsuccess = function(s){

                };
                let tx = db.transaction(["currSt"],'readwrite');
                const currStore = tx.objectStore('currSt');
                currStore.put(query,valor[query]);
                tx.oncomplete = function (evt) {
                    console.log('Transaction Completed.');

                };
            };


            // people by age
            dbx.onsuccess = function(db) {
                const tx = db.transaction('currSt');
                const currStore = tx.objectStore('currSt');
                const pairIndex = currStore.index('pair');

                return pairIndex.getAll();
            };

            dbx.onsuccess = function(data) {
                console.log('Pair by Sum:', data);
            };
            // Using cursors
            dbPromise.then(function(db) {
                var tx = db.transaction('people');
                var peopleStore = tx.objectStore('people');
                var ageIndex = peopleStore.index('age');

                return ageIndex.openCursor();
            }).then(function(cursor) {
                if (!cursor) return;
                return cursor.advance(2);
            }).then(function logPerson(cursor) {
                if (!cursor) return;
                console.log("Cursored at:", cursor.value.name);
                // I could also do things like:
                // cursor.update(newValue) to change the value, or
                // cursor.delete() to delete this entry
                return cursor.continue().then(logPerson);
            }).then(function() {
                console.log('Done cursoring');
            });
            */



    };





    //uncomment to test
    /*
    convertCurrency(10, 'USD', 'PHP', function(err, amount) {
      console.log(amount);
    });
    */




};