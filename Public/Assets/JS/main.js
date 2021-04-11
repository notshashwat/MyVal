


let HeadName = document.getElementById('HeadName');
let total = document.getElementById('total');
    setTimeout(function() {
        const loader = document.querySelector(".loader");
  loader.className += " hidden"; // class "loader hidden"
        var user = firebase.auth().currentUser;
        console.log('first 10 secs');
    console.log('page loaded');
function verify(){
    console.log('called');
    if (user) {
        let HeadName = document.querySelector('#HeadName');
        var docRef =     db.collection('users').doc(user.uid).collection('PersonalDetails').doc(user.uid);
                docRef.get().then((doc) => {
            if (doc.exists) {
                console.log(doc.data().Name);
                HeadName.innerHTML=''+doc.data().Name;
                total.innerHTML='₹'+doc.data().NetVal;

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });   
    } 
    
    else {
       
    }
  
}

verify();
}, 1000);
