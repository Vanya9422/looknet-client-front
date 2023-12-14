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
  @hide="closeModal"
)
  template(#modal-header="{ close }")
    button-close.modal__close(@click.native="closeModal")
  form(v-if="POPUP_CONTACTS", ref="send-form")
    h3.form-contact.h3 {{ POPUP_CONTACTS.title }}
    transition(name="page")
      .form-contact__field
        .alert-error(v-if="apiError") {{ POPUP_CONTACTS.anyErrors }}
    .form-contact__fields
      .form-contact__field
        .form-contact__label.h4 {{ POPUP_CONTACTS.name.label }}
        form-input.form-contact__input(
          :placeholder="POPUP_CONTACTS.name.placeholder",
          name="name",
          v-model="form.name",
          @input="$v.form.name.$touch()",
          :error="$v.form.name.$error"
        )
      .form-contact__field
        .form-contact__label.h4 {{ POPUP_CONTACTS.email.label }}
        form-input.form-contact__input(
          :placeholder="POPUP_CONTACTS.email.placeholder",
          name="email",
          type="email",
          v-model="form.email",
          @input="$v.form.email.$touch()",
          :error="$v.form.email.$error"
        )
      .form-contact__field
        .form-contact__label.h4 {{ POPUP_CONTACTS.question.label }}
        form-input.form-contact__input(
          :placeholder="POPUP_CONTACTS.question.placeholder",
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
    .button-file__error(v-if="files.length > 5") * {{ POPUP_CONTACTS.error }}
    .form-contact__bottom.flex.flex_vertical.flex_justify
      .form-contact__buttons.flex
        button-primary.form-contact__btn-send(
          blue,
          @click.prevent.native="sendForm",
          :loading="loading"
        ) {{ POPUP_CONTACTS.send }}
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
      ) {{ POPUP_CONTACTS.checkbox }}
</template>
<script>
import { minLength, required, email } from "vuelidate/lib/validators";
import inputMultiple from "@/mixins/inputMultiple";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      files: [],
      loading: false,
      form: {
        name: "",
        email: "",
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
  computed: {
    ...mapGetters({
      POPUP_CONTACTS: "popup/POPUP_CONTACTS",
    }),
  },
  watch: {
    "$i18n.locale"(val) {
      this.getPage();
    },
  },
  created() {
    this.getPage();
  },
  methods: {
    ...mapActions({
      SET_POPUP_CONTACTS: "popup/SET_POPUP_CONTACTS",
    }),
    getPage() {
      this.SET_POPUP_CONTACTS(this.$i18n.locale);
    },
    closeModal() {
      this.apiError = false;
      this.$v.form.$reset();
      this.form = {
        name: "",
        email: "",
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
      if (!this.$v.form.$error && this.files.length <= 5 && !this.apiError) {
        const form = this.$refs["send-form"];
        const formData = new FormData(form);
        this.loading = true;
        this.$axios
          .$post(this.$api.support.add, formData)
          .then((res) => {
            this.closeModal();
            this.$root.$emit("bv::show::modal", "modal-thank");
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
.modal-backdrop, .modal-open .modal.form-contact {
  padding-left: 0 !important;

  .modal-content {
    @include large-mobile {
      width: 100vw;
      bottom: 0;
      z-index: 1000;
      margin: 0;
      border-radius: 15rem 15rem 0 0;
      padding-bottom: 20px;
    }
  }
}
.form-contact {
  .form-contact__label {
    font-weight: 400;
  }

  @include large-mobile {
    padding-left: 15px !important;
    .modal-content {
      padding-bottom: 0rem;
      border-radius: 15rem 15rem 0 0;
      margin-bottom: -10px;
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
