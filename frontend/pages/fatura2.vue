<template>
  <div class="main-container">
    <toolbar :state="layout" />
    <div class="top-page">
      <div class="greetings">
        <v-card
          class="mx-auto"
          max-width="344"
          max-height="180"
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">
                Limite
              </div>
              <v-list-item-title class="headline mb-1">
                Limite Total
              </v-list-item-title>
              <v-list-item-subtitle>R$500,00</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="40"
              color="white"
            >
              <v-icon>mdi-cash-multiple</v-icon>
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn
              :to="{name:'aumentar'}"
              color="#551118"
              medium
              dark
            >
              Como Aumentar?
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div class="graphs">
        <h2>Limite</h2>
        <chart style="width: 200px; height: 200px" />
      </div>
    </div>
    <div class="div-data-table">
      <div class="select">
        <v-select
          :items="items"
          label="Mês"
          item-value="value"
          item-text="label"
          v-model="selectedMonth"
          @change="onChange()"
        />
      </div>
      <loading v-if="loading" center />
      <div v-if="!loading" class="dtable80">
        <v-data-table
          :headers="headers"
          :items="fatura.operacoes"
          :items-per-page="5"
          class="elevation-1"
          light
        />
        <div class="p-valor" v-if="!loading">
          <p>Total: {{fatura.totalFatura}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '~api'
import chart from '~/components/Chart.vue'
import datehelper from '~/helpers/datehelper'
import toolbar from '~/components/toolbar.vue'
import loading from '~/components/loading'
export default {
  middleware: 'logged-user',
  components: {
    chart,
    toolbar,
    loading
  },
  data () {
    return {
      def: {
        type: 'pie'
      },
      dados: [
        {label: 'Utilizado', value: '330'},
        {label: 'Disponível', value: '170'}
      ],
      userData: {
        email: '',
        name: '',
        phone: '',
        cpf: '',
        income: '',
        username: '',
        password: ''
      },
      fatura: [],
      items: [],
      headers: [
        {text: 'Tipo', value: 'tipo'},
        {text: 'Loja', value: 'loja'},
        {text: 'Data', value: 'data_operacao'},
        {text: 'Valor', value: 'valor'},
        {text: 'Total Parcelas', value: 'prestacao_atual'},
        {text: 'Parcela Atual', value: 'prestacao_total'}
      ],
      selectedMonth: '',
      loading: false

    }
  },
  computed: {
    currentUser () {
      return this.$store.state.auth.currentUser
    }
  },
  created () {
    this.userData.name = this.currentUser.name
    this.userData.phone = this.currentUser.phone
    this.userData.email = this.currentUser.email
    this.userData.cpf = this.currentUser.cpf

    datehelper.lastsixmonths().then(response => {
      this.items = response
    })
    this.loading = true
    api.get_fatura('01', '21', this.logged_user).then(response => {
      this.fatura = response.data
      this.loading = false
    })
  },
  methods: {
    onChange () {
      this.loading = true
      api.get_fatura(this.selectedMonth.mes, this.selectedMonth.ano, this.logged_user).then(response => {
        this.loading = false
        this.fatura = response.data
      })
    }
  }
}

</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');

.main-container{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}
.greetings{
    display: flex;
    flex-grow: 1;
    align-items: center;
    width: 50%;
    justify-content: center;
}
.div-data-table{
    flex-direction: column;
    display: flex;
    margin-top: 50px;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
}

.top-page{
    display: flex;
    margin-top: 25px;
}

.graphs{
    display: flex;
    width: 50%;
    max-height: 300px;
    flex-direction: column;
    align-items: center;
}

.text{
  display: flex;
  justify-content: flex-start;
  margin-top: 25px;
}

.p-valor{
  display: flex;
}

.select{
  display: flex;
  width: 40%;
}
.dtable80{
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
