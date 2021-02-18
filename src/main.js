import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueMeta from 'vue-meta'
import { firestorePlugin } from 'vuefire'
import App from './App.vue'
import router from './router'
import store from './store/index'
import messagePlugin from '@/utils/message.plugin'
import AppLoader from '@/components/AppLoader'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(firestorePlugin);
Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.component('AppLoader', AppLoader)

firebase.initializeApp({
    apiKey: "AIzaSyAiaELYpi_AKbhVwE5AokhJVmUaB5veiL0",
    authDomain: "vue-test-todo-list.firebaseapp.com",
    databaseURL: "https://vue-test-todo-list.firebaseio.com",
    projectId: "vue-test-todo-list",
    storageBucket: "vue-test-todo-list.appspot.com",
    messagingSenderId: "662850996690",
    appId: "1:662850996690:web:865105fdccdc77d076e00b",
    measurementId: "G-BKFXNXHZHX"
})

export const db = firebase.firestore().settings({ experimentalForceLongPolling: true });

let app

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app')
    }
})
