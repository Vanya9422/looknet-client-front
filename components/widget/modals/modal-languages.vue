<template>
  <b-modal
    id="modal-languages"
    ref="modal-languages"
    size="languages"
    modal-class="modal-languages"
    body-class="modal-languages__body"
    header-class="modal-languages__header"
    footer-class="modal-languages__footer"
    @hide="closeModal"
    @show="openModal"
    centered
  >
    <template #modal-header="{ close }">
      <button-close class="modal__close" @click.native="closeModal()"></button-close>
    </template>
    <h3 class="modal-languages__title h3">{{ POPUP_LANG.title }}</h3>
    <div class="modal-languages__list flex">
      <div
        class="modal-languages__item"
        v-for="item in $i18n.locales"
        :key="item.id"
        :class="{ active: item.code === lang }"
        @click="changeLanguage(item.code)"
      >
        <div class="modal-languages__lang">{{ item.name }}</div>
        <div class="modal-languages__lang-small">{{ item.native }}</div>
      </div>
    </div>
    <template #modal-footer="{ close }">
      <div class="modal-languages__buttons flex">
        <div></div>
        <div></div>
        <button-primary class="modal-languages__btn" small blue @click.native="save()">
          {{ POPUP_GLOBAL.save }}
        </button-primary>
      </div>
    </template>
  </b-modal>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    title: {
      type: String,
      default: "Language and region",
    },
  },
  data() {
    return {
      translateGoogle: process.client
        ? +localStorage.getItem("translate") || 0
        : null,
      lang: this.$i18n.locale,
    };
  },
  beforeMount() {
    if (!process.client) return;
    const currentLang = this.lang;
    if (this.$auth.user) {
      this.lang = localStorage.getItem("lang");
    } else {
      this.lang = this.$i18n.locale;
    }
    if (this.lang !== currentLang) {
      this.save();
    }
  },
  computed: {
    ...mapGetters({
      POPUP_GLOBAL: "popup/POPUP_GLOBAL",
      POPUP_LANG: "popup/POPUP_LANG",
    }),
  },
  watch: {
    "$i18n.locale"(val) {
      this.SET_POPUP_LANG(this.$i18n.locale);
      this.lang = val;
      // localStorage.setItem("lang", currentLocale);
    },
  },
  methods: {
    ...mapActions({
      SET_TRANSLATE: "user/SET_TRANSLATE",
      SET_POPUP_LANG: "popup/SET_POPUP_LANG",
    }),
    openModal() {
      this.SET_POPUP_LANG(this.$i18n.locale);
    },
    changeLanguage(code) {
      this.lang = code;
    },
    changeTranslate() {
      this.translateGoogle = !this.translateGoogle ? 1 : 0;
    },
    closeModal() {
      this.translateGoogle = process.client
        ? +localStorage.getItem("translate") || 0
        : null;
      this.$refs["modal-languages"].hide();
    },
    save() {
      this.SET_TRANSLATE(this.translateGoogle);
      this.$i18n.setLocale(this.lang);
      if (process.client) {
        localStorage.setItem("lang", this.lang);
      }
      if (this.$refs["modal-languages"]) {
        this.$refs["modal-languages"].hide();
      }
    },
  },
};
</script>
<style lang="scss">
.modal-languages {
  padding: 0;

  &.modal-dialog {
    max-width: 632px;
    width: 100%;
  }

  .modal-content {
    padding: 50rem;
    @include large-mobile {
      padding: 30rem 20rem;
    }
  }

  .modal__close {
    width: 34rem;
    height: 34rem;
  }

  &__title {
    font-weight: 500;
    font-family: "Atyp Display";
  }

  &__footer {
    padding: 0;
    border: 0;
    margin-top: 20rem;
    display: block;
  }

  &__buttons {
    @include items(3, 1);
  }

  &__info {
    background: #f4f3f4;
    border-radius: 10rem;
    padding: 18rem 20rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 22rem 0 25rem;

    &-title {
      font-weight: 600;
      font-size: 17rem;
      line-height: 100%;
      color: $default;
      margin-bottom: 7rem;
    }

    &-desc {
      font-weight: 500;
      font-size: 14px;
      line-height: 100%;
      color: $gray;
    }
  }

  &__list {
    @include items(3, 8);
    @include large-mobile {
      @include items(2, 4);
    }

    padding-top: 30px;
  }

  &__item {
    padding: 20px;
    border: 1px solid #f4f3f4;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.3s;
    @include large-mobile {
      padding: 14px;
    }

    &:hover,
    &.active {
      border-color: #556dee;
    }
  }

  &__lang {
    font-weight: 600;
    font-size: 17rem;
    line-height: 100%;
    color: #062439;
    margin-bottom: 5rem;

    &-small {
      font-weight: 500;
      font-size: 14rem;
      line-height: 70%;
      color: #6e6e73;
    }
  }
}
</style>
