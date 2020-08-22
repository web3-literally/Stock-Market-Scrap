<template>
  <v-img
    :src="require('@/assets/img/back.jpg')"
  >
    <div class="fill-height v-overlay--absolute" style="width: 100%;background: #0007;z-index: -1"></div>
    <v-container dark
    >
      <h1 class="py-3 text-no-wrap" style="text-align: left;color: white">{{$store.state.settings.text_logo}}</h1>
      <div
        style="display: flex;flex-wrap: wrap;justify-content: center;
        overflow-y: auto;height: calc(100vh - 150px)
        ">
        <!--<div style="flex: 1;align-self: center;color: white;min-width: 300px">
          <div style="font-size: 40px;font-weight: 300">
            <strong style="font-weight: 500">{{$store.state.settings.text_logo}}</strong> need partners like
            you.
          </div>
        </div>-->
        <div style="align-self: center;">
          <v-card class="rounded-xl ma-2 pa-4" width="350px">
            <v-card-title>
              <h2 class="py-2">Welcome!</h2>
            </v-card-title>
            <v-card-subtitle>
              <div class="py-2">
                sign in to continue
              </div>
            </v-card-subtitle>
            <v-card-text>
              <v-form @submit.prevent="Login" v-model="form_valid">
                <div>
                  <v-text-field v-model="form_data.email" dense label="Email" outlined type="email" :rules="emailRules"/>
                  <v-text-field v-model="form_data.password" dense label="Password" outlined type="password"
                                :rules="passwordRules"/>
                </div>
                <!--<div class="my-2">
                  <a @click="ResetPassword">
                    Forgot password?
                  </a>
                </div>-->
                <v-alert type="error" v-if="error">
                  {{error}}
                </v-alert>
                <v-btn type="submit" :disabled="!form_valid" class="align-center rounded-lg my-2" color="primary"
                       width="100%"
                >
                  Login
                </v-btn>
                <v-btn @click="Register" class="align-center rounded-lg my-2"
                       outlined
                       width="100%"
                >
                  Create an account
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </div>
      </div>
      <p style="color: white">@2020 SAT v1.0</p>
    </v-container>
  </v-img>

</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Name must be less than 8 characters'
      ],
      form_data: {
        email: '',
        password: ''
      },
      form_valid: null,
      error:''

    }
  },
  methods: {
    Login () {
      console.log(this.form_data)
      window.axios.post('/signin', this.form_data).then(({ data }) => {
        if (data.state < 0) {
          this.error = data.error
        } else {
          this.$store.state.userData = data.data
          localStorage.uid = this.$store.state.userData.auth.uid
          localStorage.apiToken = this.$store.state.userData.auth.apiToken
          this.$router.push('/')
        }
      })
      // this.$router.push('/')
    },
    Register () {
      this.$router.push('/register')
    },
    ResetPassword () {

    }
  }
}
</script>

<style scoped>

</style>
