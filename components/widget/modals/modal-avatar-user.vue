<template>
  <b-modal
    id="modal-avatar-user"
    ref="modal-avatar-user"
    size="photo-size"
    modal-class="modal-avatar"
    body-class="modal-avatar__body"
    header-class="modal-avatar__header"
    footer-class="modal-avatar__footer"
    @hide="closeModal"
    centered="centered"
  >
    <template #modal-header="{ close }">
      <button-close class="modal__close" @click.native="close()" />
    </template>
    <h3 class="modal-avatar__title h3">{{ POPUP_AVATAR.title }}</h3>
    <p class="alert-error" v-if=" error">{{errorText}}</p>
    <form ref="send-form" id="send-form">
      <cropper
        class="add-avatar__btn-full
        example-cropper"
        v-if="!flag"
        stencil-component="circle-stencil"
        ref="cropper"
        :src="img"
        :checkCrossOrigin="true"
      />
      <input type="hidden" name="_method" value="PUT" />
      <button-photo
        class="add-avatar__btn-full"
        v-if="flag"
        :img="img"
        :error="error"
        :name="name"
        @change="changeImg"
      />
    </form>
    <template #modal-footer="{ close }">
      <div class="modal-avatar-user__buttons">
        <div class="row">
          <button-primary
            class="modal-avatar__btn-first"
            v-if="!flag"
            small="small"
            gray="gray"
            @click.native="removeImage"
          >
            {{del}}
          </button-primary>
        </div>
        <div class="row">
          <button-photo
            class="button-primary
            modal-avatar__btn"
            v-if="!flag"
            :title="POPUP_GLOBAL.edit"
            :error="error"
            :name="name"
            @change="changeImg"
          />
          <button-primary
            class="modal-avatar__btn"
            v-if="img"
            small="small"
            blue="blue"
            :loading="loading"
            @click.native="save()"
          >
            {{POPUP_GLOBAL.save}}
          </button-primary>
        </div>
      </div>
    </template>
  </b-modal>
</template>
<script>
import {Cropper, CircleStencil} from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import {mapActions, mapGetters} from "vuex";

export default {
  components: {
    Cropper, CircleStencil
  },
  props: {
    title: {
      type: String,
      default: 'Change Profile Picture'
    },
    user: {
      type: Object,
      default: 'Alexandr'
    },
    showEdit: {
      type: Boolean,
      default: false
    },
    propImg: {
      type: String,
      default: null
    }
  },
  data() {
    const img = this.propImg !== null ? this.propImg : this.$auth.user?.avatar?.original_full_url || '';

    return {
      img: this.propImg !== null ? this.propImg : this.$auth.user?.avatar?.original_full_url || '',
      name: 'file',
      error: false,
      flag: !Boolean(img),
      loading: false,
      errorText:'',
      del: 'Delete'
    }
  },
  async created() {
    await this.getPage()
  },
  watch:{
    async '$i18n.locale'(val){
      await this.getPage()
    },
  },
  computed: {
    ...mapGetters({
      POPUP_GLOBAL: 'popup/POPUP_GLOBAL',
      POPUP_AVATAR: 'popup/POPUP_AVATAR',
    })
  },
  methods: {
    ...mapActions({
      SET_POPUP_GLOBAL: 'popup/SET_POPUP_GLOBAL',
      SET_POPUP_AVATAR: 'popup/SET_POPUP_AVATAR',
    }),
    async getPage() {
      let locale = this.$i18n.locale
      await this.SET_POPUP_GLOBAL(locale)
      await this.SET_POPUP_AVATAR(locale)
    },
    closeModal() {
      // this.img = ''
      this.$refs['modal-avatar-user'].hide();
    },
    removeImage() {
      this.flag = true
      this.img = ''
      this.$emit('change', null)
      this.closeModal()
    },
    changeImg(val, meta) {
      if(meta.size > 3145728) {
        this.error = true;
        this.errorText = this.POPUP_AVATAR.errorText;
        return
      }
      this.error = false
      this.errorText = ''
      this.flag = false
       this.img = val
    },
    save() {
      if (this.img !== '' && !this.loading) {
        this.loading = true;
        const {canvas} = this.$refs.cropper.getResult();
        if (canvas) {
          canvas.toBlob(async blob => {
            this.$emit('change', blob)
            this.loading = false;
            this.closeModal()
          }, "image/png");
        }
      } else {
        this.error = true
      }
    }
  }
}
</script>


<style lang="scss">
.modal-avatar-user {
  display: flex;
  justify-content: space-between;
  &__buttons {
    display: flex;
    justify-content: space-between;
    padding: 0 16rem;
    @include large-mobile {
      flex-direction: column-reverse;
      align-items: center;
      padding: 0;
      width: 100%;
      gap: 10px;
    }
    .row {
      display: flex;
      align-items: center;
      gap: 10rem;
      @include large-mobile {
        width: 100%;
        &:last-child {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        & > * {
          width: 100% !important;
        }
      }
      &:nth-child(2) {
        justify-content: flex-end;
      }
      & > * {
        width: 120rem;
        height: 50rem;
        max-height: 100%;
      }
    }
  }
}

.modal-avatar {
  .modal-dialog {
    max-width: 737px;
    width: 100%;
  }

  .button-photo__img {
    display: flex;
    justify-content: center;
    align-items: center;

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
</style>
