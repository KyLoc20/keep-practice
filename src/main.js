import Vue from 'vue'
import App from './App.vue'
import './assets/style.css'
import './assets/typography.css'
import './assets/layout.less'
import './assets/legacy.less'
Vue.config.productionTip = false
import _ from 'lodash'
Vue.prototype._ = _
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')