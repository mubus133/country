const paymentForm = document.getElementById('paymentForm');
paymentForm.addEventListener("submit", payWithPaystack, false);
function payWithPaystack(e) {
  e.preventDefault();

  let handler = PaystackPop.setup({
    key: 'pk_test_0cf8361c95babd1b8d52443e6a99b62540237e68',
    email: document.getElementById("email-address").value,
    amount: document.getElementById("amount").value * 100,
    currency: 'NGN',
    ref: ''+Math.floor((Math.random() * 1000000000) + 1), 
    // label: "Optional string that replaces customer email"
    onClose: function(){
      alert('Window closed.');
    },
    callback: function(response){
      let message = 'Payment complete! Reference: ' + response.reference;
      alert(message);
    }
  });

  handler.openIframe();
}