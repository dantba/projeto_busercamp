<template>
  <v-layout justify-center align-center>
    <v-btn v-if="!currentUser" flat dark color="gray darken-3" :to="{name: 'cadastro'}">Solicitar Cartão</v-btn>
    <card-fatura :currentUser="currentUser" />
  </v-layout>
</template>

<script>
import cardFatura from '~/components/FaturaCard.vue'
export default {
  middleware: 'logged-user',
  components: {
    cardFatura
  },
  data () {
    return {}
  },
  computed: {
    currentUser () {
      return this.$store.state.auth.currentUser
    }
  }
}
</script>

<style>
</style>
