/** @format */

import axios from 'axios';

const TEMPLATE_API_BASE_URL =
  'http://localhost:8082/api/v1/sms/template/smstype';

class smsTemplate {
  getAllTemplateSmsType() {
    return axios.get(TEMPLATE_API_BASE_URL);
  }}
export default new smsTemplate();
