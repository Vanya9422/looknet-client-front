<template lang="pug">
b-modal#form-contact(
  ref="form-contact",
  size="form",
  modal-class="form-contact",
  body-class="form-contact__body",
  header-class="form-contact__header",
  footer-class="form-contact__footer",
  centered,
  :hide-footer="true",
  @show="openModal",
  @hide="closeModal"
)
  template(#modal-header="{ close }")
    button-close.modal__close(@click.native="closeModal")
  form(ref="send-form")
    h3.form-contact.h3 {{ POPUP_SUPPORT.title }}
    .form-contact__fields
      .form-contact__field
        .form-contact__label.h4 {{ POPUP_SUPPORT.name.label }}
        form-input.form-contact__input(
          :placeholder="POPUP_SUPPORT.name.placeholder",
          name="name",
          v-model="form.name",
          @input="$v.form.name.$touch()",
          :error="$v.form.name.$error"
        )
      .form-contact__field(v-if="!this.$auth.loggedIn")
        .form-contact__label.h4 {{ POPUP_SUPPORT.email.label }}
        form-input.form-contact__input(
          :placeholder="POPUP_SUPPORT.email.placeholder",
          name="email",
          type="email",
          v-model="form.email",
          @input="$v.form.email.$touch()",
          :error="$v.form.email.$error"
        )
      .form-contact__field
        .form-contact__label.h4 {{ POPUP_SUPPORT.theme.label }}
        form-select-themes.form-contact__select(
          @input="(val) => (form.theme = val)",
          v-model="form.theme",
          :items="themes",
          default
        )
      .form-contact__field
        .form-contact__label.h4 {{ POPUP_SUPPORT.question.label }}
        form-input.form-contact__input(
          :placeholder="POPUP_SUPPORT.question.placeholder",
          name="description",
          textarea,
          v-model="form.question",
          @input="$v.form.question.$touch()",
          :error="$v.form.question.$error"
        )
    ul.button-file__list(v-if="files.length > 0")
      li.button-file__item(v-for="(item, i) in files", :key="i")
        set-img(
          :src="item.file ? item.file : require('~/assets/img/file.svg')",
          :default-img="item.file ? item.file : require('~/assets/img/file.svg')"
        )
        span {{ item.name }}
        .button-file__delete(@click.prevent="deleteItem(i)")
          svg-icon(name="closeBig", viewBox="0 0 14 14")
    .button-file__error(v-if="files.length > 5") * {{ POPUP_SUPPORT.error }}
    .form-contact__bottom.flex.flex_vertical.flex_justify
      .form-contact__buttons.flex
        button-primary.form-contact__btn-send(
          blue,
          @click.prevent.native="sendForm",
          :loading="loading"
        ) {{ POPUP_SUPPORT.send }}
        button-file.form-contact__btn-file(
          name="files[]",
          @changeFiles="changeFilesHear()"
        )
      form-checkbox.form-contact__checkbox(
        :class="{ error: $v.form.remember.$error }",
        name="checkbox",
        :checked="form.remember",
        @change="form.remember = !form.remember",
        @input="$v.form.remember.$touch()",
        :error="$v.form.remember.$error"
      ) {{ POPUP_SUPPORT.checkbox }}
</template>
<script>
import { minLength, required, email } from "vuelidate/lib/validators";
import inputMultiple from "@/mixins/inputMultiple";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      themes: [],
      loading: false,
      form: {
        name: "",
        email: this.$auth.loggedIn ? this.$auth.user.email : "",
        theme: null,
        question: "",
        remember: false,
      },
      apiError: false,
    };
  },
  mixins: [inputMultiple],
  validations: {
    form: {
      name: { required, minLength: minLength(2) },
      email: { required, email },
      question: { required, minLength: minLength(8) },
      remember: { required },
    },
  },
  watch: {
    "$i18n.locale"(val) {
      this.getPage();
      this.getThemes();
    },
  },
  computed: {
    ...mapGetters({
      POPUP_SUPPORT: "popup/POPUP_SUPPORT",
    }),
  },
  created() {
    this.getPage();
    this.getThemes();
  },
  methods: {
    ...mapActions({
      SET_POPUP_SUPPORT: "popup/SET_POPUP_SUPPORT",
    }),
    openModal() {
      this.getThemes();
    },
    getPage() {
      this.SET_POPUP_SUPPORT(this.$i18n.locale);
    },
    getThemes() {
      this.$axios.$get("/supports/themes").then(({ data }) => {
        this.themes = data;
        this.form.theme = data[0];
      });
    },
    closeModal() {
      this.apiError = false;
      this.$v.form.$reset();
      this.form = {
        name: "",
        email: this.$auth.loggedIn ? this.$auth.user.email : "",
        theme: this.themes[0],
        question: "",
        remember: false,
      };
      this.$refs["form-contact"].hide();
      this.deleteItemAll();
    },
    changeFilesHear() {
      this.apiError = false;
      this.changeFiles();
    },
    sendForm() {
      this.$v.form.$touch();
      if (!this.$v.form.$error && !this.apiError) {
        this.loading = true;
        const form = this.$refs["send-form"];
        const formData = new FormData(form);
        formData.append(
          "support_theme_id",
          this.form.theme ? this.form.theme.id : 1
        );
        if (this.$auth.loggedIn)
          formData.append(
            "support_theme_id",
            this.form.theme ? this.form.theme.id : 1
          );
        if (this.$auth.loggedIn)
          this.$axios.setHeader(
            "Authorization",
            `Bearer ${this.$auth.strategy.token.get()}`
          );
          console.log(formData)
        this.$axios
          .$post(this.$api.support.add, formData)
          .then(() => {
            this.closeModal();
            this.$root.$emit("bv::show::modal", "modal-thank");
            if (this.$auth.loggedIn) {
              setTimeout(() => {
                this.$root.$emit("bv::hide::modal", "modal-thank");
                this.$router.push(this.$locationPath("/chat?tab=support"));
              }, 2000);
            }
          })
          .catch((e) => {
            this.apiError = true;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style lang="scss">
.form-contact {
  .form-contact__label {
    font-weight: 400;
  }

  @include large-mobile {
    padding-left: 15px !important;
    .modal-content {
      padding-bottom: 0rem;
      border-radius: 15rem;
    }
    .modal-form {
      align-items: flex-end;
    }
  }

  &__field {
    margin-top: 40rem;

    @include large-mobile {
      margin-top: 20rem;
    }
  }

  &__label {
    margin-bottom: 15rem;

    @include large-mobile {
      margin-bottom: 10rem;
    }
  }

  &__bottom {
    margin-top: 40rem;

    @include large-mobile {
      margin-top: 30rem;
    }
  }

  &__btn {
    &-send {
      font-size: 14rem;
      font-weight: 400;
      min-width: 190rem;
    }

    &-file {
      margin-left: 10rem;
    }

    @include large-mobile {
      &-send {
        min-width: 160rem;
      }
    }
  }

  &__checkbox {
    &.error {
      color: inherit;
      animation: my-animation 3s;
    }

    @include large-mobile {
      margin-top: 20rem;
      width: 100%;
    }
  }
}

@keyframes my-animation {
  0% {
    color: $red;
  }
  100% {
    color: $red;
  }
}
</style>
