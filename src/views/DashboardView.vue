<template>
  <v-app
    id="dashboard-view"
    dark>
    <core-toolbar />

    <core-drawer />

    <v-content>
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-content>

    <core-footer v-if="$route.meta.name !== 'Maps'" />

  </v-app>
</template>

<script>
export default {
  name: 'DashboardView',
  metaInfo () {
    return {
      title: 'Stocks Portfolio Manager'
    }
  }
}
</script>
