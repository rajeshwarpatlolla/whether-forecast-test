import Vue from 'vue';
import { API_ROOT } from './urls';

const whetherResource = Vue.resource(`${API_ROOT}`);

function getWhetherReportApi(data) {
  return whetherResource.get(data);
}

module.exports = {
  getWhetherReportApi,
};
