<template>
  <v-layout class="flex">
    <div>
      <v-select
        :items="items"
        label="Mês"
        item-value="value"
        item-text="label"
        v-model="selectedMonth"
        filled
        @change="onChange()"
      />
    </div>
    <div>
      <loading v-if="loading" center />
      <v-list :items="fatura" v-if="!loading">
        <template v-for="(operacao, index) in fatura.operacoes">
          <v-card color="red lighten-5" dark :key="index">
            <v-layout v-if="logged_user">
              <v-flex xs12>
                <v-card-title primary-title>
                  <!-- ----------cores---------
              #757575 = grey darken-1
              #00B0FF = light-blue accent-3
              #00E676 = green accent-3
              #D32F2F = red darken-2
              https://vuetifyjs.com/en/styles/colors/#material-colors
             -->
                  <div class="compra" v-if="operacao.tipo==='Compra'">
                    <div>
                      <row class="titulo-card">
                        <div>
                          <span style="color: #757575">Tipo: </span><span style="color: #00B0FF">{{operacao.tipo}}</span>
                        </div>
                      </row>
                      <row class="linha">
                        <div>
                          <span style="color: #757575">Estabelecimento: </span><span style="color: #00B0FF">{{operacao.loja}}</span>
                        </div>
                        <div>
                          <span style="color: #757575">Data: </span><span style="color: #00B0FF">{{operacao.data_operacao}}</span>
                        </div>
                      </row>
                    </div>
                    <row class="linha">
                      <div>
                        <span style="color: #757575">Valor: </span><span style="color: #D32F2F">{{operacao.valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</span>
                      </div>
                      <div>
                        <span style="color: #757575">Parcelas: </span><span style="color: #00B0FF">{{operacao.prestacao_atual}}/{{operacao.prestacao_total}}</span>
                      </div>
                    </row>
                  </div>
                  <div class="pagamento" v-else>
                    <row class="titulo-card">
                      <div>
                        <span style="color: #757575">Tipo: </span><span style="color: #00B0FF">{{operacao.tipo}}</span>
                      </div>
                    </row>
                    <row class="linha">
                      <div>
                        <span style="color: #757575">Valor: </span><span style="color: #00E676">{{operacao.valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</span>
                      </div>
                      <div>
                        <span style="color: #757575">Data: </span><span style="color: #00B0FF">{{operacao.data_operacao}}</span>
                      </div>
                    </row>
                  </div>
                </v-card-title>
              </v-flex>
            </v-layout>
            <v-divider light />
          </v-card>
        </template>
      </v-list>
    </div>
  </v-layout>
</template>
<script>
import api from '~api'
import loading from '~/components/loading'
import datehelper from '~/helpers/datehelper'

export default {
  components: {
    loading
  },
  data () {
    return {
      fatura: [],
      items: [],
      loading: true,
      selectedMonth: ''
    }
  },
  computed: {
    logged_user () {
      return this.$store.state.auth.currentUser
    }
  },
  created () {
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
<style scoped>
.flex{
  display: flex;
  flex-direction: column;
}
.linha{
  display: flex;
  justify-content: space-between;
}
.compra{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.pagamento{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.titulo-card{
  display: flex;
  justify-content: center;
}
</style>
