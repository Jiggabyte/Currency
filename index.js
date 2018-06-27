window.onload = function() {


    function convertCurrency(amount, fromCurrency, toCurrency) {
        var apiKey = '';

        fromCurrency = encodeURIComponent(fromCurrency);
        toCurrency = encodeURIComponent(toCurrency);
        var query = fromCurrency + '_' + toCurrency;

        var url = 'https://free.currencyconverterapi.com/api/v5/convert?q=' +
            query + '&compact=ultra&apiKey=' + apiKey;

        fetch(url).then(function(resData) {
            return resData.json();
        }).then(function(RSD) {
            console.log(RSD);
        })

    }

    let fromCurrency, toCurrency, amount, retvalor, numb;


    document.getElementById('conv').onclick = function() {
        froCur = document.getElementById('fromCurr');
        fromCurrency = froCur.value;

        console.log(fromCurrency);

        toCur = document.getElementById('toCurr');
        toCurrency = toCur.value;

        console.log(toCurrency);

        theAmnt = document.getElementById('curr');
        amount = theAmnt.value;

        var apiKey = '';

        fromCurrency = encodeURIComponent(fromCurrency);
        toCurrency = encodeURIComponent(toCurrency);
        var query = fromCurrency + '_' + toCurrency;

        var url = 'https://free.currencyconverterapi.com/api/v5/convert?q=' +
            query + '&compact=ultra&apiKey=' + apiKey;

        fetch(url).then(function(resData) {
            return resData.json();
        }).then(function(RSD) {
            retvalor = RSD;
            console.log(RSD);
            numb = retvalor[query] * amount;
            document.getElementById('shower').innerHTML = numb.toFixed(2);
            console.log(retvalor[query]);
        })


    }





    //uncomment to test
    /*
    convertCurrency(10, 'USD', 'PHP', function(err, amount) {
      console.log(amount);
    });
    */

};