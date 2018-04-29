<template>
  <div>
    <div class="text-xs-center" v-if="isLoading" style="width: 100%;">
      <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
    </div>
    <v-tabs
      v-else
      show-arrows
    >
      <v-tabs-slider></v-tabs-slider>
      <v-tab
        v-for="(value, key) in attendanceData"
        :key="key"
        :to="'#tab-' + key"
      >
        {{ value.name }}
      </v-tab>
      <v-tabs-items>
        <v-tab-item
          v-for="(value, key) in attendanceData"
          :key="key"
          :id="'tab-' + key"
        >
          <v-data-table
            :headers="headers"
            :items="value.attendance"
            hide-actions
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-left">{{ props.item.start }}</td>
              <td class="text-xs-left">{{ props.item.end }}</td>
            </template>
            <template slot="no-data">
              <p>まだ勤怠は行われていません</p>
            </template>
          </v-data-table>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>

<script>
import axios from 'axios'
import delay from 'delay'

export default {
  data () {
    return {
      attendanceData: [],
      dialog: false,
      headers: [
        {
          text: '出勤',
          value: 'start-time',
          align: 'left',
          sortable: false
        }, {
          text: '退勤',
          value: 'end-time',
          align: 'left',
          sortable: false
        }
      ],
      isLoading: false
    }
  },
  async created () {
    this.isLoading = true
    await delay(2000)
    axios.get('http://localhost:3000/user').then(res => {
      console.log(res)
      this.attendanceData = Object.assign([], res.data)
      this.isLoading = false
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="css">
</style>
