<template>
  <main class="main login-page">
    <div class="loading-block">
      <loader class="white big"></loader>
    </div>
  </main>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  middleware: ['ghost'],
  computed: {
    ...mapGetters({
      USER: 'user/USER',
      LOCATION: 'location/LOCATION',
    })
  },
  async mounted() {
    const locale = process.client ? localStorage.getItem('locale') || this.$i18n.locale : this.$i18n.locale;
    try {
      const token = this.$route.query.token;
      if (!token) {
        throw new Error('No token');
      }
      await this.SET_USER_LOCAL(token);
      if (this.USER?.city) {
        await this.SET_USER_LOCATION(this.USER);
      } else {
        let city = process.client ? localStorage.getItem('city') : $cookies.get('city');
        if (typeof city === 'string') {
          city = JSON.parse(city);
        }
        await this.SET_LOCATION({ city });
      }
      await this.SET_LOCATION_STATE(this.LOCATION);
      const res = await this.$axios.$get(this.$api.user.favorites);
      if (process.client) {
        localStorage.setItem('favourites', res.data.favorites);
      }
      this.$i18n.setLocale(locale);
      this.$nextTick(() => {
        this.$router.push(this.$locationPath('/announcements'));
      });
    } catch (error) {
      console.error(error);
      this.$auth.logout();
      this.$i18n.setLocale(locale);
      this.$nextTick(() => {
        this.$router.push(this.$locationPath('/'));
      });
    }
  },
  methods: {
    ...mapActions({
      SET_USER_LOCAL: 'user/SET_USER_LOCAL',
      SET_USER_LOCATION: 'location/SET_USER_LOCATION',
      SET_LOCATION: 'location/SET_LOCATION',
      SET_LOCATION_STATE: 'location/SET_LOCATION_STATE',
    })
  },
}
</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;;
}
</style>
