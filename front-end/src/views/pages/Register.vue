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
            <strong style="font-weight: 500">Create your </strong>account<br>and get moving<br>
            <strong style="font-weight: 500">in
              minutes</strong>
          </div>
        </div>-->
        <div style="align-self: center;">
          <v-card class="rounded-xl ma-2 pa-4" max-width="450px">
            <v-card-title>
              <h2 class="py-2">Register</h2>
            </v-card-title>
            <v-card-subtitle>
              <div class="py-2">
                Sign up here
              </div>
            </v-card-subtitle>
            <v-card-text>
              <v-form @submit.prevent="Register" v-model="form_valid1" v-if="form_state==0">
                <v-row>
                  <!--<v-col cols="12" sm="6">
                    <v-text-field v-model="form_data.first_name" dense label="First Name" outlined type="text"
                                  :rules="nameRules"/>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="form_data.last_name" dense label="Last Name" outlined type="text"
                                  :rules="nameRules"/>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="form_data.phone" dense label="Phone" outlined type="text"/>
                  </v-col>-->
                  <v-col cols="12" sm="12">
                    <v-text-field v-model="form_data.email" dense label="Email" outlined type="email"
                                  :rules="emailRules"/>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-text-field v-model="form_data.password" dense label="Password" outlined type="password"
                                  :rules="passwordRules"/>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-text-field v-model="form_data.c_password" dense label="Re-Password" outlined type="password"
                                  :rules="c_passwordRules"/>
                  </v-col>
                </v-row>

                <div style="width: 350px;margin: auto">
                  <v-btn type="submit" class="align-center rounded-lg my-2" color="primary"
                         width="100%"
                         :disabled="!form_valid1"
                  >
                    Sign Up
                  </v-btn>
                  <v-btn @click="$router.push('/login')" class="align-center rounded-lg my-2"
                         outlined
                         width="100%"
                  >
                    Already registered?
                  </v-btn>
                </div>
              </v-form>
              <v-form @submit.prevent="Register" v-model="form_valid2" v-if="form_state==1">
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="form_data.address" dense label="Address" outlined type="text"/>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="form_data.city" dense label="City" outlined type="text"/>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="form_data.password" dense label="Password" outlined type="password"
                                  :rules="passwordRules"/>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="form_data.c_password" dense label="Re-Password" outlined type="password"
                                  :rules="c_passwordRules"/>
                  </v-col>
                </v-row>
                <v-alert type="error" v-if="error">
                  {{error}}
                </v-alert>
                <div style="width: 350px;margin: auto">
                  <v-btn type="submit" class="align-center rounded-lg my-2" color="primary"
                         width="100%"
                         :disabled="!form_valid2"
                  >
                    Sign Up
                  </v-btn>
                  <v-btn @click="form_state=0" class="align-center rounded-lg my-2"
                         outlined
                         width="100%"
                  >
                    Back
                  </v-btn>
                </div>
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
      form_valid1: null,
      form_valid2: null,
      form_state: 0,
      form_data: {
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        password: '',
        c_password: ''
      },
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Name must be less than 8 characters'
      ],
      c_passwordRules: [
        v => !!v || 'Confirm Password is required',
        v => (v && v === this.form_data.password) || 'Does not matched confirm password}'
      ],
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 50 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      error: ''
    }
  },
  methods: {
    Register () {
      console.log(this.form_data)
      // this.$router.push('/')
      window.axios.post('/signup', this.form_data).then(({ data }) => {
        if (data.state < 0) {
          this.error = data.error
        }
        this.$store.state.userData = data.result
        this.$router.push('/')
      })
    }

  }
}
</script>

<style scoped>

</style>
