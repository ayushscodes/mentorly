import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import HelloWorld from './components/HelloWorld.vue'
import MatchTest from './components/MatchTest.vue'

export default new Router({
    routes: [
        {
            path: '/',
            name: 'MatchTest',
            component: MatchTest
        },
        {
            path: '/test',
            name: 'HelloWorld',
            component: HelloWorld
        }
    ]
})
