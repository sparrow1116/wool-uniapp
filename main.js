import Vue from 'vue'
import App from './App'

import {dateFormat} from './util/tool.js'

dateFormat()

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
