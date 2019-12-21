import '@babel/polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './view/App.vue'
import {router} from "@/view/router/routes";
import Vuetify from 'vuetify'

Vue.use(VueRouter);
Vue.use(Vuetify);

const vuetify = new Vuetify({});

document.addEventListener('DOMContentLoaded', () => {
    new Vue({
        router,
        vuetify,
        render: h => h(App),
    }).$mount('#vue-app');
});
