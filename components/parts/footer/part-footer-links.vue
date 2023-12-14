<template>
  <div class="footer__list flex" v-if="FOOTER">
    <div class="footer__item small-tablet-hidden">
      <div class="footer__copyright">{{ FOOTER.сopyright }}</div>
    </div>
    <div class="footer__item small-tablet-hidden">
      <a
        class="footer__link footer__copyright"
        :href="$locationPath('/privacy-policy')"
        target="_blank"
      >
        {{ FOOTER.links.policy }}
      </a>
    </div>
    <div class="footer__item">
      <NuxtLink class="footer__link" :to="$locationPath('/contacts')">
        {{ FOOTER.links.contacts }}
      </NuxtLink>
    </div>
    <div class="footer__item">
      <NuxtLink class="footer__link" :to="$locationPath('/support')">
        {{ FOOTER.links.support }}
      </NuxtLink>
    </div>
    <div class="footer__item mobile-hidden" v-if="!loggedIn">
      <a class="footer__link footer__link_button" @click.prevent="$bvModal.show('modal-login')">
        {{ FOOTER.links.login }}
      </a>
    </div>
    <div class="footer__item mobile-hidden" v-if="!loggedIn">
      <NuxtLink class="footer__link" :to="$locationPath('/auth/registration')">
        {{ FOOTER.links.register }}
      </NuxtLink>
    </div>
    <div class="footer__item small-tablet-visible">
      <a
        class="footer__link footer__copyright"
        :href="$locationPath('/privacy-policy')"
        target="_blank"
      >
        {{ FOOTER.links.policy }}
      </a>
    </div>
    <div class="footer__item small-tablet-visible">
      <div class="footer__copyright">{{ FOOTER.сopyright }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      FOOTER: 'pages/FOOTER',
    }),
    loggedIn() {
      return this.$auth.loggedIn;
    },
  },
}
</script>
