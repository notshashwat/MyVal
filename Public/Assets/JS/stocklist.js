let Stockcont=document.querySelector('#Stockcont');

function CreateListElement(Name,current,profit){
  let div = document.createElement('div');
  div.innerHTML = "Name: "+Name+"<br>Current Value: "+current+"<br>Unrealised G/L: "+profit+"<hr>";
  div.setAttribute('class','listStocks');
  Stockcont.appendChild(div);
}


setTimeout(function() {

  const loader = document.querySelector(".loader");
  loader.className += " hidden"; // class "loader hidden"
    var user = firebase.auth().currentUser;
    if (user) {
      db.collection('users').doc(user.uid).collection('Stocks').get().then(function(querySnapshot) {
            querySnapshot.forEach(async function(doc) {
              var NoofStocks= doc.data().NoStocks;
              var AmountInv = doc.data().AmountInv;
         
                var Stockcd = doc.data().StockCode;
                var urlStock = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='+Stockcd+'&apikey=%api_key_stock%';
                await  $.ajax({
                    dataType: "json",
                    url: urlStock,
                    success: async function(data){
                   
                    },
                    error: function(data) {
                        
                    }}).done(async function(data){
                      if (data) {
                        PriceStock = await data["Global Quote"]["05. price"];
                         console.log(PriceStock);
                         if(PriceStock){
                           var CurInv = PriceStock*NoofStocks;
                           var Profit = CurInv-AmountInv;
                           console.log(CurInv);
                           console.log(Profit);
                           doc.ref.update({
                               Profit: Profit,
                               CurrentInvestment:CurInv
                           });
                           console.log('success');
                         }
                         CreateListElement(
                          doc.data().NameStock,
                          doc.data().CurrentInvestment,
                          doc.data().Profit)
                       
                         }
                        
                          
                  })

                   
                    });
        });
      }
    else{

    }
}
, 5000);