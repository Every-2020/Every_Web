import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faExchangeAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)
