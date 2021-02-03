<template>
  <v-app light>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>
<script>

export default {
  components: {
  },
  data: () => ({
    layout: {
      drawer: true
    }
  }),
  computed: {
    snack () {
      return JSON.parse(JSON.stringify(this.$store.state.snack.snack))
    }
  },
  methods: {
    closeSnack () {
      this.$store.commit('snack/hide')
    }
  }
}
</script>
