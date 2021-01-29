<template>
  <v-app>
    <toolbar :state="layout" />
    <sidenav-left :state="layout" />
    <sidenav-left-temp :state="layout" />
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import toolbar from '~/components/toolbar.vue'
import sidenavLeft from '~/components/sidenav-left.vue'
import sidenavLeftTemp from '~/components/sidenav-left-temp.vue'
export default {
  components: {
    toolbar,
    sidenavLeft,
    sidenavLeftTemp
  },
  data: () => ({
    layout: {
      drawer: true,
      drawerRight: true,
      right: null,
      left: null
    }
  })
}
</script>
