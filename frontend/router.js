import Vue from 'vue'
import Router from 'vue-router'
import Index from '~/pages/index.vue'
import Index2 from '~/pages/index2.vue'
import Todos from '~/pages/todos.vue'
import Cadastro from '~/pages/cadastro.vue'
import Fatura from '~/pages/fatura.vue'

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  routes: [
    {path: '/', component: Index, name: 'index'},
    {path: '/todos', component: Todos, name: 'todos'},
    {path: '/cadastro', component: Cadastro, name: 'cadastro'},
    {path: '/fatura', component: Fatura, name: 'fatura'},
    {path: '/index', component: Index2, name: 'index2'}
  ]
}

export function createRouter (ctx) {
  return new Router(routerOptions)
}
