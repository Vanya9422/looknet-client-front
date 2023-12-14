<template lang="pug">
  b-modal(
    id="modal-complaint"
    ref="modal-complaint"
    size="form"
    modal-class="form-contact-modal"
    body-class="form-contact__body"
    header-class="form-contact__header"
    footer-class="form-contact__footer"
    centered
    :hide-footer="true"
    @show="openModal"
    @hide="closeModal"
  )

    template(#modal-header='{ close }')
      button-close.modal__close(@click.native='closeModal')
    form(  ref="send-form" )
      h3.h3 {{ PAGE_CHAT.body.complaint }}
      .form-contact__fields
        <!--.form-contact__field-->
        <!--.form-contact__label.h4 Select the type of complaint-->
        <!--form-input.form-contact__input(-->
        <!--:placeholder="POPUP_SUPPORT.name.placeholder" name="name" v-model="form.name"-->
        <!--@input="$v.form.name.$touch()"-->
        <!--:error="$v.form.name.$error"-->
        <!--)-->
        //.form-contact__field
        //  .form-contact__label.h4 Email
        //  form-input.form-contact__input(
        //    :placeholder="POPUP_SUPPORT.email.placeholder" name="email" type="email" v-model="form.email"
        //    @input="$v.form.email.$touch()"
        //    :error="$v.form.email.$error"
        //  )
        .form-contact__field
          .form-contact__label.h4 {{ PAGE_CHAT.complaint.type }}
          form-select-refusal.form-contact__select(@input="(val) => refusal = val" v-model="refusal" :items="refusals" :selected="PAGE_CHAT.form.selected" default)
        .form-contact__field
          .form-contact__label.h4 {{ PAGE_CHAT.complaint.comment }}
          form-input.form-contact__input(
            :placeholder="PAGE_CHAT.complaint.placeholder" name="description" textarea v-model="form.description"
            @input="$v.form.description.$touch()"
            :error="$v.form.description.$error"
          )
      ul.button-file__list(v-if="files.length> 0")
        li.button-file__item(v-for="(item,i) in files" :key="i")
          set-img(:src="item.file ? item.file : require('~/assets/img/file.svg') " :default-img="item.file ? item.file : require('~/assets/img/file.svg') ")
          span {{item.name}}
          .button-file__delete(@click.prevent="deleteItem(i)")
            svg-icon( name="closeBig" viewBox="0 0 14 14")
      .button-file__error(v-if="files.length > 5 ") * {{POPUP_SUPPORT.error}}
      .form-contact__bottom.flex.flex_vertical.flex_justify
        .form-contact__buttons.flex
          button-primary.form-contact__btn-send(blue @click.prevent.native="sendForm" :loading="loading") {{ PAGE_CHAT.complaint.send }}
          button-file.form-contact__btn-file(name="files[]" :id="'files-modal'" accept='image/jpeg, image/png, image/webp, image/jpg' @changeFiles="changeFilesHear()")

</template>
<script>
import {minLength, required, email} from "vuelidate/lib/validators";
import inputMultiple from "@/mixins/inputMultiple";
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      themes: [],
      files: [],
      refusal: null,
      refusals: [],
      loading: false,
      form: {
        // email: '',
        description: '',
        remember: false
      },
      apiError: false
    }
  },
  mixins: [inputMultiple],
  validations: {
    form: {
      // email: {required, email},
      description: {required, minLength: minLength(8)},
    }
  },
  watch: {
    '$i18n.locale'(val) {
      this.getPage()
    },
  },
  computed: {
    ...mapGetters({
      POPUP_SUPPORT: 'popup/POPUP_SUPPORT',
      ACTIVE_CONVERSATION_ID: 'chat/GET_ACTIVE_CONVERSATION_ID',
      PAGE_CHAT: "pages/PAGE_CHAT",
    }),
  },
  created() {
    this.getPage()
    this.getRefusals()
  },
  methods: {
    ...mapActions({
      SET_POPUP_SUPPORT: 'popup/SET_POPUP_SUPPORT'
    }),
    getPage() {
      this.SET_POPUP_SUPPORT(this.$i18n.locale)
    },
    getRefusals() {
      this.$axios.$get(this.$chat.getRefusals).then(({data}) => {
        this.refusals = data
      })
    },
    openModal() {
      this.getRefusals()
    },
    closeModal() {
      this.apiError = false
      this.$v.form.$reset()
      this.form = {
        name: '',
        // email: '',
        description: '',
        remember: false
      }
      this.$refs['modal-complaint'].hide();
      this.deleteItemAll()
    },
    changeFilesHear(e) {
      this.apiError = false
      this.changeFiles('files-modal')
    },
    sendForm() {
      this.$v.form.$touch()
      if (!this.$v.form.$error && !this.apiError) {
        const form = this.$refs['send-form']
        const formData = new FormData(form)
        this.loading = true
        formData.append('refusal_id', this.refusal.id)
        this.$axios.$post(this.$chat.addComplaint + `/${this.ACTIVE_CONVERSATION_ID}/add-complaint`, formData).then(res => {
          this.form = {
            // email: '',
            description: '',
          }
          this.$root.$emit('bv::show::modal', 'modal-thank')
          this.$refs['modal-complaint'].hide();
        }).catch(e => {
          this.apiError = true
        }).finally(() => {

          this.loading = false
        })
      }
    }
  }
}
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
