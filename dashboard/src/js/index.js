const firebase = require("firebase");

firebase.initializeApp({
  apiKey: '### FIREBASE API KEY ###',
  authDomain: '### FIREBASE AUTH DOMAIN ###',
  projectId: 'trading-bot-challenge'
});

const db = firebase.firestore();
const portfolios = document.querySelector('.js-portfolios');

db.collection("portfolios").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(doc.id, doc.data());
    let portfolioNode = document.createElement('p');
    portfolioNode.innerHTML = `${doc.id} - ${doc.data().value}`;
    portfolios.appendChild(portfolioNode);
  });
});
