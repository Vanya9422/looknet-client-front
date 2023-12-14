<template lang="pug">
b-modal#modal-avatar(
  ref="modal-avatar",
  size="photo-size",
  modal-class="modal-avatar",
  body-class="modal-avatar__body",
  header-class="modal-avatar__header",
  footer-class="modal-avatar__footer",
  @hide="closeModal",
  @show="openModal",
  centered
)
  template(#modal-header="{ close }")
    button-close.modal__close(@click.native="close()")
  h3.modal-avatar__title.h3 {{ POPUP_AVATAR.title }}
  p.alert-error(v-if="errorText && error") {{ errorText }}
  form#send-form(ref="send-form")
    cropper.add-avatar__btn-full.example-cropper(
      v-if="!flag",
      stencil-component="circle-stencil",
      ref="cropper",
      :src="img"
    )
    input(type="hidden", name="_method", value="PUT")
    button-photo.add-avatar__btn-full(
      v-if="flag",
      :img="img",
      :error="error",
      :name="name",
      :editIcon="false",
      @change="changeImg"
    )
  template(#modal-footer="{ close }")
    .modal-avatar__buttons
      button-primary.modal-avatar__btn(
        small,
        gray,
        :class="!flag ? 'no-flag_btn-btn' : ''",
        @click.native="closeModal()"
      ) {{ POPUP_GLOBAL.close }}
      //- .flex.modal-avatar__buttons-top
        //- button-primary.modal-avatar__btn.modal-avatar__btn-first(
        //-   small,
        //-   gray,
        //-   :class="!flag ? 'no-flag_btn-btn' : ''",
        //-   style="width: 120px",
        //-   @click.native="removeImage"
        //- ) {{ del }}
      .flex.modal-avatar__buttons-bottom
        button-photo.button-primary.button-primary_gray.modal-avatar__btn.modal-avatar__btn-first.no-flag_btn-btn(
          :title="POPUP_GLOBAL.edit",
          :error="error",
          :name="name",
          @change="changeImg"
        )
        button-primary.modal-avatar__btn(
          small,
          blue,
          :loading="loading",
          @click.native="save()"
        ) {{ POPUP_GLOBAL.save }}
</template>
<script>
import { Cropper, CircleStencil } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Cropper,
    CircleStencil,
  },
  props: {
    title: {
      type: String,
      default: "Change Profile Picture",
    },
    user: {
      type: String,
      default: "Alexandr",
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      img: this.$auth.user.avatar
        ? this.$auth.user.avatar?.original_full_url
        : "",
      name: "file",
      error: false,
      errorText: "tse",
      flag: true,
      loading: false,
      del: "Delete",
    };
  },
  async created() {
    await this.getPage();
  },
  watch: {
    async "$i18n.locale"(val) {
      await this.getPage();
    },
  },
  computed: {
    ...mapGetters({
      POPUP_GLOBAL: "popup/POPUP_GLOBAL",
      POPUP_AVATAR: "popup/POPUP_AVATAR",
    }),
  },
  methods: {
    ...mapActions({
      SET_POPUP_GLOBAL: "popup/SET_POPUP_GLOBAL",
      SET_POPUP_AVATAR: "popup/SET_POPUP_AVATAR",
      LOAD_USER_INFO: "user/LOAD_USER_INFO",
    }),
    async getPage() {
      let locale = this.$i18n.locale;
      await this.SET_POPUP_GLOBAL(locale);
      await this.SET_POPUP_AVATAR(locale);
    },
    openModal() {
      this.img = this.avatar;
      this.flag = true;
    },
    removeImage() {
      this.flag = true;
      this.img = "";
    },
    closeModal() {
      this.img = "";
      this.$refs["modal-avatar"].hide();
      this.error = false;
      this.errorText = "";
    },
    changeImg(val, meta) {
      const imageSize = 3145728; // 3mb
      const isErrorSize = meta.size > imageSize;

      this.error = isErrorSize;
      this.errorText = isErrorSize ? this.POPUP_AVATAR.errorText : "";

      if (isErrorSize) return;

      this.flag = false;
      this.img = val;
    },
    save() {
      if (this.img === "" && this.loading) {
        this.error = true;
        return;
      }

      this.loading = true;

      const { canvas } = this.$refs.cropper.getResult();
      if (!canvas) return;

      const formData = new FormData();

      canvas.toBlob(async (blob) => {
        formData.append("file", blob, "myImageName.png");
        formData.append("path", "/theKoiIsAwesome");
        formData.append("_method", "PUT");

        this.$axios
          .$post("/users/settings", formData)
          .then((res) => {
            this.$auth.fetchUser().catch(() => this.$auth.logout());
            this.LOAD_USER_INFO();
            this.closeModal();
            this.$bvModal.show('modal-thank-settings');
          })
          .catch(
            ({
              response: {
                data: { errors },
              },
            }) => {
              this.error = true;
              this.errorText = errors.file[0];
            }
          )
          .finally(() => {
            this.loading = false;
          });
      }, "image/png");
    },
  },
};
</script>


<style lang="scss">
.modal-avatar {
  .modal-dialog {
    max-width: 737px;
    width: 100%;
  }
  &__btn {
    max-height: 50rem
  }
  &__buttons {
    // @include items(2, 5);
    display: flex;
    justify-content: space-between;
    margin: -5rem;
    > * {
      width: auto;
    }
    .no-flag_btn-btn {
      margin-right: 10rem;
    }
    .button-photo {
      width: auto !important;
      @include large-mobile {
        width: initial;
      }
    }
    @include large-mobile {
      flex-direction: column-reverse;
      gap: 10px;
    }
  }

  .button-photo__img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    max-width: 100%;
    img {
      max-height: 100%;
    }
  }

  &__footer {
    padding: 0;
    margin-top: 20rem;
    display: block;
    border: none;
  }

  .add-avatar__btn-full {
    margin: 24rem 0 20rem;
    height: 550px;
    @include large-mobile {
      height: auto;
      width: 100%;
      aspect-ratio: 1 / 1;
    }
    border-radius: 16px;
    width: 100%;
    overflow: hidden;

    .vue-advanced-cropper__foreground {
      opacity: 0.2;
    }

    .button-photo__wrap {
      border-radius: 16px;
      border-width: 2px;

      svg {
        width: 56px;
        height: 56px;
      }
    }
  }
}
.modal-avatar .alert-error {
  margin-top: 20px;
}
.modal-avatar__buttons {
  &-top {
    @include min-small-tablet {
      width: 48%;
      justify-content: flex-start;
    }
  }
  &-bottom {
    @include large-mobile {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      & > * {
        margin: 0 !important;
        width: 100%;
      }
    }
  }
}
.no-flag_btn {
  @include min-small-tablet {
    width: 100% !important;
    justify-content: space-between;
  }
  &-btn {
    @include min-small-tablet {
      margin-right: 10px;
    }
  }
}
</style>
