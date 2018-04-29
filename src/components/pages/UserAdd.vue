<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h1 class="headline mb-0">ユーザー追加</h1>
        </div>
      </v-card-title>
      <v-card-text class="text-xs-left">
        <v-text-field
          label="名前"
          v-model="formData.name"
          required
        ></v-text-field>
        <p class="err" v-if="formError">{{ formError }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="info" @click="openDialog()">送信</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" max-width="350px">
      <v-card>
        <v-card-title primary-title>
          <div>
            <h1 class="headline mb-0">ユーザー追加</h1>
          </div>
        </v-card-title>
        <v-card-text class="text-xs-left">
          <p>ユーザーを追加しますか？</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="info" @click="onSubmit()">送信</v-btn>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
import uuid from 'uuid/v4'

export default {
  data () {
    return {
      formData: {
        id: uuid(),
        name: '',
        attendance: []
      },
      formError: '',
      dialog: false,
      snackbar: false,
      color: '',
      text: ''
    }
  },
  methods: {
    openDialog () {
      if (!this.formData.name) {
        this.formError = '名前を入力してください'
        return
      }
      this.formError = ''
      this.dialog = true
    },
    close () {
      this.dialog = false
    },
    onSubmit () {
      axios.post(`http://localhost:3000/user`, this.formData).then(res => {
        console.log(res)
        this.color = 'success'
        this.text = 'ユーザーの追加に成功しました'
        this.snackbar = true
        this.formData.name = ''
        this.dialog = false
        this.$router.push('/user')
      }).catch(err => {
        console.log(err)
        this.text = 'ユーザーの追加に失敗しました'
        this.color = 'error'
        this.snackbar = true
      })
    }
  }
}
</script>
