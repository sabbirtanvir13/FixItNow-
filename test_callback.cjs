const axios = require('axios');
axios.post('https://fixitnow-backend-hi9a.onrender.com/api/payments/success', 'tran_id=test_tran_id', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, maxRedirects: 0 })
  .then(res => console.log('STATUS:', res.status, 'HEADERS:', res.headers))
  .catch(err => console.log('ERROR STATUS:', err.response ? err.response.status : err.message, 'HEADERS:', err.response ? err.response.headers : ''));
