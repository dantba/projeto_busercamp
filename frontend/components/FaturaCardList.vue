<template>
  <v-card color="red lighten-5" dark :to="{name:'fatura'}">
    <v-layout v-if="logged_user">
      <v-flex xs12>
        <v-card-title primary-title>
          <!-- ----------cores---------
              #757575 = grey darken-1
              #00B0FF = light-blue accent-3
              #00E676 = green accent-3
              https://vuetifyjs.com/en/styles/colors/#material-colors
             -->
          <div>
            <div style="color: #757575">Fatura Atual</div>
            <div style="color: #00B0FF">R$230,00</div>
            <row>
              <span style="color: #757575">Limite Disponível: </span><span style="color: #00E676">R$170,00</span>
            </row>
          </div>
        </v-card-title>
      </v-flex>
    </v-layout>
    <v-divider light />
  </v-card>
</template>

<script>

export default {

  computed: {
    logged_user () {
      return this.$store.state.auth.currentUser
    }
  }
}
</script>
