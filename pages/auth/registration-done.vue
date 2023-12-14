<template>
  <section-registration class="done-page" v-if="PAGE_REGISTER_DONE" :title="`${PAGE_REGISTER_DONE.welcome} ${$auth.user.first_name}! ${PAGE_REGISTER_DONE.welcome2}`" ref="registrationForm" :img="{left:'done1.png',right:'done2.png'}">
    <div class="registration-form__desc p color-gray">{{PAGE_REGISTER_DONE.desc}}</div>
    <modal-avatar-user :img="img" @change="changeAvatar"></modal-avatar-user>
    <module-add-avatar class="registration-form__add-avatar" :img="img" :error="errorFile" @click.native.prevent="$bvModal.show('modal-avatar-user')" :title="PAGE_REGISTER_DONE.avatar.title" name="file-no-go">{{PAGE_REGISTER_DONE.avatar.desc}}</module-add-avatar><input type="hidden" name="_method" value="PUT" />
    <div class="alert-error" v-if="error">{{error[0]}}</div>
    <div class="registration-form__field"><label class="registration-form__label p b">{{PAGE_REGISTER_DONE.where}}</label>
      <form-input class="no-disabled" :value="LOCATION ? LOCATION.name || PAGE_HOME.search.city : POPUP_LOCAL.title" @click.prevent.native="openLocationModal" :error="cityError" disabled="disabled" name="first_name">
        <div class="input__edit p color-blue" v-b-modal.modal-location>{{PAGE_REGISTER_DONE.edit}}</div>
      </form-input>
    </div><template v-slot:bottom>
    <div class="registration-form__buttons flex flex_justify">
      <button-primary class="registration-form__btn" blue="blue" @click.prevent.native="next" :loading="loadingBtn">{{PAGE_REGISTER_DONE.next}}</button-primary>
      <button-primary class="registration-form__btn" gray="gray" @click.prevent.native="skip">{{PAGE_REGISTER_DONE.skip}}</button-primary>
    </div>
  </template>
  </section-registration>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  layout: 'default_small',
  data() {
    return {
      img: '',
      loadingBtn: false,
      error: null,
      cityError: null,
      errorFile: false,
      blob: ''
    }
  },
  middleware: ['auth-user'],
  mounted() {
    this.sendFavorite()
  },
  watch: {
    LOCATION() {
      this.cityError = false
    }
  },
  computed: {
    ...mapGetters({
      FAVOURITES: 'favourites/FAVOURITES',
      POPUP_LOCAL: 'popup/POPUP_LOCAL',
      LOCATION: 'location/LOCATION',
      PAGE_REGISTER_DONE: 'pages/PAGE_REGISTER_DONE',
      PAGE_HOME: "pages/PAGE_HOME",
    })
  },
  created() {
    this.getPage()
  },
  methods: {
    ...mapActions({
      SET_ADD_FAVOURITE: 'favourites/SET_ADD_FAVOURITE',
      SET_PAGE_DONE: 'pages/SET_PAGE_DONE',
      SET_USER_LOCATION:'location/SET_USER_LOCATION',
    }),
    openLocationModal(){
      this.$bvModal.show('modal-location')
    },
    changeAvatar(val) {
      this.errorFile = null
      if (!process.client) return;
      let urlCreator = window.URL || window.webkitURL;
      this.img = urlCreator.createObjectURL(val);
      this.blob = val
    },
    getPage() {
      this.SET_PAGE_DONE(this.$i18n.locale)
    },
    next() {
      if (!this.errorFile && !this.loadingBtn && !this.cityError) {
        this.loadingBtn = true
        const currentLocale = this.$i18n.locale;
        if (process.client) {
          localStorage.setItem("lang", currentLocale);
        }
        const form = new FormData(this.$refs.registrationForm.$el.querySelector('form'));
        if (this.blob) {
          form.append(
              "file",
              this.blob,
              "myImageName.png"
          );
        }
        this.$axios.$post(this.$authApi.settings, form)
          .then(async () => {
            this.error = false;
            try {
              await this.$auth.fetchUser();
              this.SET_USER_LOCATION(this.$auth.user);
              this.$router.push(this.$locationPath('/announcements', currentLocale));
              this.$i18n.setLocale(currentLocale); // почему-то не применяется язык. пришлось вписать сюда.
            } catch (error) {
              this.$auth.logout();
            }
          })
          .catch(({response}) => this.error = response.data.errors.file)
          .finally(() => this.loadingBtn = false)
      }
    },
    skip() {
      if (process.client) {
        const currentLocale = this.$i18n.locale;
        localStorage.setItem("lang", currentLocale);
      }
      this.$router.push(this.$locationPath('/announcements'));
    },
    sendFavorite() {
      this.SET_ADD_FAVOURITE({id: null, to: null, auth: this.$auth.loggedIn});
    }
  }
}
</script>


<style lang="scss">
.no-disabled {
  input:disabled {
    border: 1px solid $light-gray;
    background: #fff;
    color: #062439;

    &::placeholder {
      color: #062439;
    }

    &.input_error {
      border: 1px solid $red;
    }
  }
}

.registration {
  .alert-error {
    margin-top: 20px;
  }
}
</style>
