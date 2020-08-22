<template>
  <div>Coming Soon</div>
</template>

<script>
export default {
  name: 'Logout',
  created () {
    localStorage.removeItem('uid')
    localStorage.removeItem('apiToken')
    this.$router.push('/login')
  }
}
</script>

<style scoped>

</style>
