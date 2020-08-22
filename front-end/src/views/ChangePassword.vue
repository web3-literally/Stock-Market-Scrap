<template>
  <div>
    <h2 class="py-2 mx-4">Change Password</h2>
    <v-card width="fit-content" max-width="400px" class="rounded-xl">
      <v-card-text>
        <v-form v-model="form_valid">
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="password.op" label="Old Password" type="password" outlined dense/>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="password.np" :rules="passwordRules" label="Password" type="password" outlined dense/>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="password.cp" :rules="c_passwordRules" label="Confirm Password" type="password" outlined dense/>
            </v-col>
            <v-col cols="12" style="text-align: center">
              <v-btn :disabled="!form_valid" color="primary" width="300px" class="align-center rounded-lg">Edit</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ChangePassword',
  data () {
    return {
      password: {
        op: '',
        np: '',
        cp: ''
      },
      form_valid:null,
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Name must be less than 8 characters'
      ],
      c_passwordRules: [
        v => !!v || 'Confirm Password is required',
        v => (v && v === this.password.np) || 'Does not matched confirm password}'
      ]
    }
  }
}
</script>

<style scoped>

</style>
