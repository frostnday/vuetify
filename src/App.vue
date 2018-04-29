<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer
        fixed
        app
        :clipped="$vuetify.breakpoint.mdAndUp"
        v-model="drawer"
      >
        <v-list dense>
          <v-list-group
            v-for="item in items"
            :key="item.title"
            no-action
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="subItem in item.items" :key="subItem.title" :to="subItem.url" exact>
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar
        app
        color="darken-3"
        :clipped-left="$vuetify.breakpoint.mdAndUp"
        dark
      >
        <v-toolbar-title class="ml-0 pl-3">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <span class="hidden-sm-and-down">JSLounge</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      drawer: null,
      items: [
        {
          title: '勤怠',
          items: [
            {
              title: '出退勤',
              url: '/'
            },
            {
              title: '勤怠一覧',
              url: '/attendance'
            }
          ]
        },
        {
          title: 'ユーザー',
          items: [
            {
              title: 'ユーザー一覧',
              url: '/user'
            },
            {
              title: 'ユーザー追加',
              url: '/user/add'
            }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="stylus">
  @import './stylus/main'
</style>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.list>.list__group:before, .list>.list__group:after {
  left: 0;
}

.content {
  padding: 30px 0px 0px 300px !important;
}

.err {
  color: red;
}
</style>
