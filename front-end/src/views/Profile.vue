<template>
  <div>
    <h2 class="py-2 mx-4">General Profile</h2>
    <v-card width="fit-content" class="rounded-xl" max-width="600px">
      <v-card-text>
        <form>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field label="First Name" outlined dense/>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Last Name" outlined dense/>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field label="Email" outlined dense type="email"/>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Mobile" outlined dense/>
            </v-col>

            <!--<v-col cols="12">
              <v-text-field label="Wallet" prefix="$" outlined dense/>
            </v-col>-->
            <v-col cols="12" style="text-align: center">
              <v-btn color="primary" width="300px" class="align-center rounded-lg">Edit</v-btn>
            </v-col>
          </v-row>
        </form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: "Profile",

  }
</script>

<style scoped>

</style>
