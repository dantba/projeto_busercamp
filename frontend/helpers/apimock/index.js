import { zuck } from './db_people'
import { todos } from './db_todos'
import { mockasync } from './mockutils'

const keepLoggedIn = true
// const users = [zuck]
const users = []

users.push(zuck)

const api = {
  login (username, password) {
    return mockasync(zuck)
  },
  logout () {
    return mockasync({})
  },
  whoami () {
    const iam = { authenticated: !keepLoggedIn }
    if (iam.authenticated) {
      iam.user = zuck
    }
    return mockasync(iam)
  },
  settings () {
    return mockasync({
      SENTRY_DSN_FRONT: ''
      // SENTRY_DSN_FRONT: 'https://abcd1234@sentry.example.com/10'
    })
  },
  list_todos () {
    return mockasync(todos)
  },
  add_todo (newtask) {
    return mockasync({ description: newtask, done: false })
  },
  save_user (userData) {
    // this.users.push(userData)
    users.push(userData)
    return mockasync(userData)
  },
  solicita_cartao (userData) {
    // eslint-disable-next-line no-undef
    this.save_user(userData)
    return mockasync({
      accepted: true,
      user: {
        ...JSON.parse(JSON.stringify(userData))
        // travel_to_rate: travels[0]
      }
    })
  },
  get_fatura (mes, ano, logged_user) {
    return mockasync({
      data: {
        operacoes: [
          {
            'tipo': 'Compra',
            'loja': 'Mike',
            'data_operacao': '12/12/2020',
            'valor': 45.00,
            'prestacao_atual': 3,
            'prestacao_total': 4
          },
          {
            'tipo': 'Compra',
            'loja': 'Ardidas',
            'data_operacao': '18/12/2021',
            'valor': 45.89,
            'prestacao_atual': 5,
            'prestacao_total': 7
          },
          {
            'tipo': 'Pagamento',
            'data_operacao': '07/01/2021',
            'valor': 90.91
          }
        ],
        totalFatura: 90.89,
        pago: true
      }
    })
  }

}
export default api
