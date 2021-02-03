<template>
  <v-app-bar>
    <v-toolbar-title>Bem-vindo(a), {{logged_user.name.split(" ", 1)[0]}}</v-toolbar-title>
    <v-spacer />

    <!-- <template v-slot:activator="{ on }"><v-btn v-on="on"> -->
    <v-menu v-if="logged_user" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" class="ma-0 ml-5">
          <v-avatar size="36px">
            <img src="https://graph.facebook.com/4/picture?width=300&height=300">
          </v-avatar>
        </v-btn>
      </template>
      <v-card class="no-padding">
        <v-list two-line>
          <v-list-item>
            <v-list-item-avatar>
              <v-avatar>
                <img src="https://graph.facebook.com/4/picture?width=300&height=300">
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{logged_user.first_name}} {{logged_user.last_name}}</v-list-item-title>
              <v-list-item-subtitle>{{logged_user.email}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider />
        <v-list>
          <v-list-item @click="logout()">
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
    <login-dialog ref="login_dialog" />
  </v-app-bar>
</template>

<script>
import loginDialog from '~/components/login-dialog.vue'
import api from '~api'

export default {
  components: {
    loginDialog
  },
  props: ['state'],
  computed: {
    logged_user () {
      return this.$store.state.auth.currentUser
    }
  },
  methods: {
    open_login_dialog (evt) {
      this.$refs.login_dialog.open()
      evt.stopPropagation()
    },
    async logout () {
      await api.logout()
      this.$store.commit('auth/setCurrentUser', null)
      this.$router.push('/')
    }
  }
}
</script>
