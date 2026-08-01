const axios = require('axios');
const qs = require('qs');
const paymentData = {
  store_id: 'xyzco6a4e05b427541',
  store_passwd: 'xyzco6a4e05b427541@ssl',
  total_amount: '500',
  currency: 'BDT',
  tran_id: 'TRNX_ID_' + Date.now(),
  success_url: 'https://fixitnow-backend-hi9a.onrender.com/api/payments/success',
  fail_url: 'https://fixitnow-backend-hi9a.onrender.com/api/payments/fail',
  cancel_url: 'https://fixitnow-backend-hi9a.onrender.com/api/payments/cancel',
  ipn_url: 'https://fixitnow-backend-hi9a.onrender.com/api/payments/success',
  cus_name: 'Test User',
  cus_email: 'test@example.com',
  cus_add1: 'Dhaka',
  cus_add2: 'N/A',
  cus_city: 'Dhaka',
  cus_state: 'Dhaka',
  cus_postcode: '1200',
  cus_country: 'Bangladesh',
  cus_phone: '01711111111',
  cus_fax: 'N/A',
  shipping_method: 'NO',
  product_name: 'FixItNow Home Service',
  product_category: 'Home Service',
  product_profile: 'general'
};
axios.post('https://sandbox.sslcommerz.com/gwprocess/v4/api.php', qs.stringify(paymentData), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => console.log('RESPONSE:', res.data)).catch(err => console.error(err.message));
