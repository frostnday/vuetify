<template>
  <div>
    <div class="text-xs-left">
      <v-btn color="primary" class="mb-3 ml-0" @click="$router.push('/user/add')">ユーザーを追加する</v-btn>
    </div>
    <v-dialog v-model="editDialog" max-width="350px">
      <v-card>
        <v-card-title primary-title>
          <div>
            <h1 class="headline mb-0">ユーザー編集</h1>
          </div>
        </v-card-title>
        <v-card-text class="text-xs-left">
          <v-text-field
            label="名前"
            v-model="editData.name"
            required
          ></v-text-field>
          <p>{{ formError }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="info" @click="editItem()">送信</v-btn>
          <v-btn color="blue darken-1" flat @click.native="closeEditDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteDialog" max-width="350px">
      <v-card>
        <v-card-title primary-title>
          <div>
            <h1 class="headline mb-0">ユーザー削除</h1>
          </div>
        </v-card-title>
        <v-card-text class="text-xs-left">{{deleteData.name}}を削除しますか？</v-card-text>
        <v-card-actions>
          <v-btn color="error" @click="deleteItem()">削除</v-btn>
          <v-btn color="blue darken-1" flat @click.native="closeDeleteDialog">閉じる</v-btn>
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
    <div class="text-xs-center" v-if="isLoading" style="width: 100%;">
      <v-progress-circular indeterminate :size="50" color="primary"></v-progress-circular>
    </div>
    <v-data-table
      :headers="headers"
      v-else
      :items="userData"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.id }}</td>
        <td class="text-xs-left">
          {{props.item.name}}
        </td>
        <td class="text-xs-left px-0">
          <v-btn icon class="mx-0" @click="openEditDialog(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="openDeleteDialog(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        まだユーザーはいません
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios'
import delay from 'delay'

export default {
  data () {
    return {
      userData: [],
      dialog: false,
      editDialog: false,
      deleteDialog: false,
      headers: [
        {
          text: 'id',
          value: 'id',
          align: 'left'
        }, {
          text: 'name',
          value: 'name',
          align: 'left'
        }, {
          text: 'actions',
          value: 'actions',
          align: 'left'
        }
      ],
      formError: '',
      deleteData: {},
      editData: {},
      isLoading: false,
      snackbar: false,
      color: '',
      text: ''
    }
  },
  created () {
    this.isLoading = true
    this.initialize()
  },
  methods: {
    async initialize () {
      await delay(2000)
      axios.get('http://localhost:3000/user').then(res => {
        console.log(res)
        this.userData = Object.assign([], res.data)
        this.isLoading = false
      }).catch(err => {
        console.log(err)
      })
    },
    async deleteItem () {
      this.isLoading = true
      this.deleteDialog = false
      await delay(2000)
      axios.delete(`http://localhost:3000/user/${this.deleteData.id}`).then(res => {
        console.log(res)
        this.initialize()
        this.color = 'success'
        this.text = '削除に成功しました'
        this.snackbar = true
      }).catch(err => {
        console.log(err)
        this.color = 'error'
        this.text = '削除に失敗しました'
        this.snackbar = true
      })
    },
    async editItem () {
      if (!this.editData.name) {
        this.formError = '名前を入力してください'
        return
      }
      this.isLoading = true
      this.editDialog = false
      await delay(2000)
      axios.put(`http://localhost:3000/user/${this.editData.id}`, this.editData).then(res => {
        this.initialize()
        this.color = 'success'
        this.text = '編集に成功しました'
        this.snackbar = true
        console.log(res)
      }).catch(err => {
        console.log(err)
        this.color = 'error'
        this.text = '編集に失敗しました'
        this.snackbar = true
      })
    },
    openDeleteDialog (item) {
      this.deleteDialog = true
      this.deleteData = item
    },
    openEditDialog (item) {
      this.editDialog = true
      this.editData = item
    },
    closeDeleteDialog () {
      this.deleteDialog = false
    },
    closeEditDialog () {
      this.editDialog = false
    }
  }
}
</script>
