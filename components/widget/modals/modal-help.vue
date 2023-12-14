<template lang="pug">
b-modal#modal-help(
  ref="modal-help",
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
      <!--.form-contact__field(v-if="$auth.user.loggedIn")-->
        <!--.form-contact__label.h4 Email-->
        <!--form-input.form-contact__input(-->
          <!--:placeholder="'Email'" name="email" type="email" v-model="form.email"-->
          <!--@input="$v.form.email.$touch()"-->
          <!--:error="$v.form.email.$error"-->
        <!--)-->
      .form-contact__field
        .form-contact__label.h4 {{ POPUP_SUPPORT.theme.label }}
        form-select-themes.form-contact__select(
          @input="(val) => (theme = val)",
          v-model="theme",
          :items="themes",
          default
        )
      .form-contact__field
        .form-contact__label.h4 {{ POPUP_SUPPORT.question.label }}
        form-input.form-contact__input(
          :placeholder="POPUP_SUPPORT.question.placeholder",
          name="description",
          textarea,
          v-model="form.description",
          @input="$v.form.description.$touch()",
          :error="$v.form.description.$error"
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
        ) Send
        button-file.form-contact__btn-file(
          name="files[]",
          accept="image/jpeg, image/png, image/webp, image/jpg",
          @changeFiles="changeFilesHear()"
        )
</template>
<script>
import { minLength, required, email } from "vuelidate/lib/validators";
import inputMultiple from "@/mixins/inputMultiple";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      files: [],
      theme: null,
      themes: [],
      loading: false,
      form: {
        email: "",
        name: "",
        description: "",
        remember: false,
      },
      apiError: false,
    };
  },
  mixins: [inputMultiple],
  validations: {
    form: {
      // email: {required, email},
      name: { required },
      description: { required, minLength: minLength(8) },
    },
  },
  watch: {
    "$i18n.locale"(val) {
      this.getPage();
    },
  },
  computed: {
    ...mapGetters({
      POPUP_SUPPORT: "popup/POPUP_SUPPORT",
      ACTIVE_CONVERSATION_ID: "chat/GET_ACTIVE_CONVERSATION_ID",
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
    getPage() {
      this.SET_POPUP_SUPPORT(this.$i18n.locale);
    },
    getThemes() {
      this.$axios.$get(this.$chat.getThemes).then(({ data }) => {
        this.themes = data;
      });
    },
    openModal() {
      this.getThemes();
    },
    closeModal() {
      this.apiError = false;
      this.$v.form.$reset();
      this.form = {
        name: "",
        // email: '',
        description: "",
        remember: false,
      };
      this.$refs["modal-help"].hide();
      this.deleteItemAll();
    },
    changeFilesHear() {
      this.apiError = false;
      this.changeFiles();
    },
    sendForm() {
      this.$v.form.$touch();
      if (!this.$v.form.$error && !this.apiError) {
        const form = this.$refs["send-form"];
        const formData = new FormData(form);
        this.loading = true;
        formData.append("support_theme_id", this.theme.id);
        formData.append("email", this.$auth.user.email);
        this.$axios.setHeader(
          "Authorization",
          `Bearer ${this.$auth.strategy.token.get()}`
        );
        this.$axios
          .$post(this.$chat.addTicket, formData)
          .then((res) => {
            this.form = {
              // email: '',
              description: "",
            };
            this.$root.$emit("bv::show::modal", "modal-thank");
            this.$refs["modal-help"].hide();
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
    padding-left: 0 !important;
    .modal-content {
      padding-bottom: 20rem;
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
