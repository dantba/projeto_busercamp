<template>
  <div class="flex">
    <div>
      <v-select
        :items="items"
        label="Mês"
        item-value="value"
        item-text="label"
        v-model="selectedMonth"
        filled
        color="#424242"
        @change="onChange()"
      />
    </div>
    <div>
      <loading v-if="loading" center />
      <v-list v-if="!loading">
        <template v-for="(operacao, index) in fatura.operacoes">
          <v-divider
            :key="index"
          />
          <v-list-item
            :key="operacao.loja"
          >
            <v-list-item-avatar>
              <v-icon>mdi-shopping-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{operacao.loja}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :key="operacao.data_operacao"
          >
            <v-list-item-avatar>
              <v-icon>mdi-calendar-range</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{operacao.data_operacao}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :key="operacao.valor"
          >
            <v-list-item-avatar>
              <v-icon>mdi-cash-multiple</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{operacao.valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :key="operacao.prestacao_total"
          >
            <v-list-item-avatar>
              <v-icon>mdi-chart-timeline-variant</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{operacao.prestacao_atual}}/{{operacao.prestacao_total}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </div>
  </div>
</template>

<script>
import api from '~api'
import loading from '~/components/loading'
import datehelper from '~/helpers/datehelper'

export default {
  layout: 'new',
  middleware: 'logged-user',
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
  },
  methods: {
    onChange () {
      this.loading = true
      api.get_fatura(new Date(this.selectedMonth.ano, this.selectedMonth.mes, 8).toISOString()).then(response => {
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
  min-height: 100%;
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
