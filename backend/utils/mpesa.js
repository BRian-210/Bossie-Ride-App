// Safaricom Daraja API logicconst axios = require('axios');
const moment = require('moment');
require('dotenv').config();

const mpesa = async (phone, amount) => {
  const timestamp = moment().format('YYYYMMDDHHmmss');
  const password = Buffer.from(
    process.env.MPESA_SHORTCODE + process.env.MPESA_PASSKEY + timestamp
  ).toString('base64');

  const tokenResponse = await axios.get(
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    {
      auth: {
        username: process.env.MPESA_CONSUMER_KEY,
        password: process.env.MPESA_CONSUMER_SECRET
      }
    }
  );

  const accessToken = tokenResponse.data.access_token;

  const stkPushResponse = await axios.post(
    'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
    {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: 'BossieRide',
      TransactionDesc: 'Ride payment'
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  return stkPushResponse.data;
};

module.exports = mpesa;
