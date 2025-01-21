import DataTable from './components/DataTable.vue';

const Plugin = {
  install(Vue) {
    Vue.component('DataTable', DataTable);
  }
};

let GlobalVue = null;

if (typeof window !== 'undefined' && window.Vue) {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined' && global.Vue) {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(Plugin);
}

export default Plugin;
export { DataTable };
