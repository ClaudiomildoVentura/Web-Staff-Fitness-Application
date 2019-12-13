const buyer = require('mercadopago')

const settings = {
    access_token: 'TEST-7967185249180987-092900-196f2e4207b7600598278927cd7bc0e9-210538680', 
    sandbox: true,
// public_key: 'TEST-111d8351-96c7-4554-9886-c00d41b69823'
  }

buyer.configure(settings)

let preference = {
  items: [
    {
      title: 'Meu produto 2',
      unit_price: 100,
      quantity: 1,
    }
  ]
};

buyer.payment.create({
  description: 'Buying a PS4',
  transaction_amount: 10500,
  payment_method_id: 'visa',
  payer: {
    email: 'test_user_3931694@testuser.com',
    identification: {
      type: 'DNI',
      number: '34123123'
    }
  }
}).then(function (mpResponse) {
  console.log(mpResponse);
}).catch(function (mpError) {
  console.log(mpError);
});
/*buyer.preferences.create(preference)
.then(function(response){
// Este valor substituirá a string "$$init_point$$" no seu HTML
  global.init_point = response.body.init_point;
}).catch(function(error){
  console.log(error);
});*/

export default buyer
//export default mercadopago