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
              <v-list-item-subtitle>{{limiteTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</v-list-item-subtitle>
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
        <chart :chart-data="chartdata" style="width: 200px; height: 200px" />
      </div>
    </div>
    <div class="div-data-table">
      <div class="select">
        <v-select
          :items="items"
          label="Selecione um Mês"
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
          <p>Total: {{fatura.total ? fatura.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}): ''}}</p>
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
  layout: 'default',
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
      chartdata: null,
      dados: [],
      userData: {
        email: '',
        name: '',
        phone: '',
        cpf: '',
        income: '',
        username: '',
        password: ''
      },
      limiteTotal: '',
      fatura: [],
      items: [],
      headers: [
        {text: 'Tipo', value: 'tipo'},
        {text: 'Estabelecimento', value: 'estabelecimento'},
        {text: 'Data', value: 'data'},
        {text: 'Valor(R$)', value: 'valor'},
        {text: 'Valor Parcela(R$)', value: 'valor_parcela'},
        {text: 'Total Parcelas', value: 'prestacoes_total'},
        {text: 'Parcela Atual', value: 'prestacao_atual'}
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
  },
  mounted () {
    this.preencheGrafico()
  },
  methods: {
    onChange () {
      this.loading = true
      api.get_fatura(new Date(this.selectedMonth.ano, this.selectedMonth.mes - 1, 8).toISOString().split('T')[0]).then(response => {
        this.fatura = response.fatura
        if (response.status) {
          for (const o in response.fatura.operacoes) {
            if (response.fatura.operacoes[parseInt(o)].tipo === 'Compra') {
              let diff = 0
              diff += (this.selectedMonth.ano - parseInt(response.fatura.operacoes[parseInt(o)].data.split('-')[0])) * 12
              diff += this.selectedMonth.mes - parseInt(response.fatura.operacoes[parseInt(o)].data.split('-')[1])
              response.fatura.operacoes[parseInt(o)].prestacao_atual = diff
              response.fatura.operacoes[parseInt(o)].valor_parcela = response.fatura.operacoes[parseInt(o)].valor / response.fatura.operacoes[parseInt(o)].prestacoes_total
            }
          }
          this.fatura = response.fatura
        } else {
          this.fatura = ''
        }
        this.loading = false
      })
    },
    preencheGrafico () {
      api.get_limite().then(response => {
        this.limiteTotal = response.total
        this.dados[0] = response.utilizado
        this.dados[1] = response.disponivel
        this.chartdata = {
          labels: ['Utilizado(R$)', 'Disponível(R$)'],
          datasets: [{
            label: 'Limite',
            backgroundColor: ['#551118', '#288db5'],
            data: this.dados
          }
          ]
        }
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
