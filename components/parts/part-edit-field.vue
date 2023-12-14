<template lang="pug">
.edit-field
  .edit-field__row
    .edit-field__column.edit-field__column_left
      .edit-field__label.color-gray.p {{ label }}
    .edit-field__column.edit-field__column_center
      form-input(
        v-model="value",
        :name="name",
        :placeholder="placeholder",
        :type="type",
        :error="!notError",
        v-if="edit"
      )
      .edit-field__placeholder.h4(v-else) {{ value }}
    .edit-field__column.edit-field__column_right
      .edit-field__nav.mobile-hidden(v-if="edit")
        .edit-field__nav-item
          .edit-field__link.color-gray(@click="closeEdit")
            //span {{cancelText}}
            svg-icon.edit-field__icon.edit-field__icon-close(name="close")
        .edit-field__nav-item
          .edit-field__link.color-blue(@click="closeSave")
            //span {{saveText}}
            svg-icon.edit-field__icon.edit-field__icon-checked(name="check")

      .edit-field__nav.mobile-hidden(v-else)
        .edit-field__nav-item
          .edit-field__link.color-blue(@click="showEdit")
            //span {{editText}}
            svg-icon.edit-field__icon(name="edit")
      .edit-field__nav.mobile-visible
        .edit-field__nav-item
          .edit-field__link.color-blue(@click="$bvModal.show(`${modalName}`)")
            svg-icon.edit-field__icon(name="edit")
  modal-field(
    :id="modalName",
    :title="groupName",
    @save="closeSave",
    :closeAuto="true"
  )
    .modal-field__list
      .modal-field__item
        .modal-field__label {{ label }}
        form-input.modal-field__input(
          v-model="value",
          :name="name",
          :placeholder="placeholder",
          :type="type",
          :error="!notError"
        )
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    label: {
      type: String,
      default: "Label name",
    },
    name: {
      type: String,
      default: "name",
    },
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Alexandr",
    },
    type: {
      type: String,
      default: "",
    },
    modalName: {
      type: String,
      default: "",
    },
    groupName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      oldValue: null,
      edit: false,
      notError: true,
    };
  },
  computed: {
    ...mapGetters({
      PAGE_NOTIFICATIONS: "pages/PAGE_NOTIFICATIONS",
    }),
  },
  watch: {
    value(val) {
      this.notError = val.length > 0;
      if (val === this.oldValue) this.notError = false;
      this.$emit("input", val);
    },
    "$i18n.locale"() {
      this.SET_PAGE_NOTIFICATIONS();
    },
  },
  created() {
    this.SET_PAGE_NOTIFICATIONS();
  },
  methods: {
    ...mapActions({
      SET_PAGE_NOTIFICATIONS: "pages/SET_PAGE_NOTIFICATIONS",
    }),
    showEdit() {
      this.edit = true;
      this.notError = true;
      this.oldValue = this.value;
    },
    closeEdit() {
      this.edit = false;
      this.value = this.oldValue;
    },
    closeSave() {
      let form = {
        [this.modalName]: this.value,
      };
      if (this.notError && this.value !== this.oldValue) {
        this.$axios
          .$put("/users/settings", form)
          .then((res) => {
            this.$auth.fetchUser().catch(() => this.$auth.logout());
            this.edit = false;
            // this.$toast.show(
            //   this.PAGE_NOTIFICATIONS?.changeUserName?.succes ??
            //     "Username changed successfully",
            //   {
            //     duration: 3000,
            //     position: "top-right",
            //     type: "success",
            //   }
            // );
            this.$emit('success');
          })
          .catch(() => {
            this.$emit('error', {
              message: this.PAGE_NOTIFICATIONS?.changeUserName?.error,
            });
            // this.$toast.show(
            //   this.PAGE_NOTIFICATIONS?.changeUserName?.error ??
            //     "Failed to apply changes",
            //   {
            //     duration: 3000,
            //     position: "top-right",
            //     type: "error",
            //   }
            // );
          })
          .finally(() => {
            this.edit = false;
          });
      } else {
        this.notError = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/сss/components/edit-field.scss";
</style>
