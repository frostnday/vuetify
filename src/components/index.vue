<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h1 class="headline mb-0">勤怠</h1>
        </div>
      </v-card-title>
      <v-card-actions>
        <div class="text-xs-center" v-if="isLoading" style="width: 100%;">
          <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
        </div>
        <div v-else class="text-xs-left">
          <div style="width: 400px;">
            <v-select
              :items="userData"
              v-model="selectUser"
              label="user"
              item-text="name"
            ></v-select>
          </div>
          <p class="err">{{formError}}</p>
          <v-btn color="info" @click="onSubmit()">{{ status }}</v-btn>
        </div>
      </v-card-actions>
    </v-card>
    <v-snackbar
      :timeout="3000"
      :color="color"
      :top="true"
      :right="true"
      v-model="snackbar"
    >
      {{ text }}
    </v-snackbar>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  data () {
    return {
      selectUser: '',
      userData: [],
      statusData: [
        { status: '出勤' },
        { status: '退勤' }
      ],
      status: '送信',
      formData: {},
      snackbar: false,
      color: '',
      text: '',
      isLoading: false,
      formError: ''
    }
  },
  watch: {
    'selectUser': function (val) {
      if (!val.attendance.length) {
        this.status = '出勤'
      } else if (val.attendance[val.attendance.length - 1].end) {
        this.status = '出勤'
        console.log('start', val)
      } else {
        this.status = '退勤'
        console.log('end', val)
      }
    }
  },
  created () {
    this.isLoading = true
    axios.get('http://localhost:3000/user').then(res => {
      console.log(res)
      this.userData = Object.assign([], res.data)
      this.isLoading = false
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    onSubmit () {
      if (this.status === '送信') {
        this.formError = 'ユーザーを選択してください'
        return
      }
      this.formError = ''
      this.isLoading = true
      if (this.status === '出勤') {
        if (!this.selectUser.attendance.length) {
          this.selectUser.attendance.unshift({ start: moment().format('YYYY-MM-DD HH:mm:ss'), end: '' })
        } else {
          this.selectUser.attendance.push({ start: moment().format('YYYY-MM-DD HH:mm:ss'), end: '' })
        }
      } else {
        this.selectUser.attendance[this.selectUser.attendance.length - 1].end = moment().format('YYYY-MM-DD HH:mm:ss')
      }
      axios.put(`http://localhost:3000/user/${this.selectUser.id}`, this.selectUser).then(res => {
        this.color = 'success'
        this.text = '送信に成功しました'
        this.snackbar = true
        for (let key in this.userData) {
          if (this.userData[key].name === this.selectUser.name) {
            this.$router.push(`/attendance#tab-${key}`)
          }
        }
        this.isLoading = false
      }).catch(err => {
        this.text = '送信に失敗しました'
        this.color = 'error'
        this.snackbar = true
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
</style>
