<template>
  <v-app>
    <html lang="en" dir="ltr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Responsive Website Landing Page Design</title>
      </head>
      <body>
        <section>
          <header>
            <h2><a href="#" class="logo">Brennercard</a></h2>
            <div class="navigation">
              <v-btn text dark ripple :to="{name:'index'}"> Home </v-btn>
              <v-btn text dark ripple> Sobre </v-btn>
              <v-btn v-if="!logged_user" text dark ripple @click="open_login_dialog($event)">Login</v-btn>

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
                        <v-list-item-title>Log out</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-menu>
              <login-dialog ref="login_dialog" />
            </div>
          </header>
          <v-content>
            <v-container fluid>
              <nuxt />
            </v-container>
          </v-content>
        </section>
      </body>
    </html>
  </v-app>
</template>

<script>
import loginDialog from '~/components/login-dialog.vue'
import Snacks from '~/helpers/Snacks.js'
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
      Snacks.show(this.$store, {text: 'Até logo!'})
      this.$router.push('/index')
    }
  }
}

</script>

<style>

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

html{
  width: 100%;
}
body{
  width: 100%;
}
section{
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: url("../static/morumbi.jpg")  no-repeat;
  background-size: cover;
  background-position: center;
}

header{
  position: relative;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header .logo{
  position: relative;
  color: #000;
  font-size: 30px;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 1px;
}

header .navigation a{
  color: #000;
  text-decoration: none;
  font-weight: 500;
  letter-spacing: 1px;
  padding: 2px 15px;
  border-radius: 20px;
  transition: 0.3s;
  transition-property: background;
}

header .navigation a:not(:last-child){
  margin-right: 30px;
}

#check{
  z-index: 3;
  display: none;
}

/* Responsive styles */

</style>
