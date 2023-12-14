<template lang="pug">
  .edit-field
    .edit-field___wrap(v-if="edit")
      .edit-field__row(
        v-for="(row, i) in list"
        :key="i"
      )
        .edit-field__column.edit-field__column_left
          .edit-field__label.color-gray.p {{row.label}}
        .edit-field__column.edit-field__column_center
          form-input(
            :value="row.value"
            :name="row.name"
            :placeholder="row.placeholder"
            @click="$emit('changePassIcon',i)"
            :icon="row.isPassword ? 'eyeHide' : 'eyeShow' "
            :type="row.isPassword ? 'password':'text'"
          )

        .edit-field__column.edit-field__column_right
          .edit-field__nav(v-if="i <= 0")
            .edit-field__nav-item
              .edit-field__link.color-gray(@click="closeEdit") Cancel
            .edit-field__nav-item
              .edit-field__link.color-blue(@click="closeEdit") Save

    .edit-field__row(v-else)
      .edit-field__column.edit-field__column_left
        .edit-field__label.color-gray.p {{label}}
      .edit-field__column.edit-field__column_center
        .edit-field__placeholder.h4 {{placeholder}}
      .edit-field__column.edit-field__column_right
        .edit-field__nav.mobile-hidden
          .edit-field__nav-item
            .edit-field__link.color-blue(@click="showEdit") Edit
        .edit-field__nav.mobile-visible
          .edit-field__nav-item
            .edit-field__link.color-blue(@click="$bvModal.show(`${modalName}`)") Edit
    modal-field(:id="modalName" :title="groupName")
      .modal-field__list
        .modal-field__item(
          v-for="(row, i) in list"
          :key="i"
        )
          .modal-field__label {{row.label}}
          form-input.modal-field__input(
            :value="row.value"
            :name="row.name"
            :placeholder="row.placeholder"
            :type="row.type"
            :icon="row.icon"
          )

</template>

<script>
// import recommendedPassword from "@/mixins/auth/recommendedPassword";

export default {
  props: {
    label: {
      type: String,
      default: 'Label name'
    },
    name: {
      type: String,
      default: 'name'
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Alexandr'
    },
    type: {
      type: String,
      default: ''
    },
    modalName: {
      type: String,
      default: ''
    },
    groupName: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => ([])
    },
  },
  data() {
    return {
      edit: false,
      isPassword: false,
    }
  },
  methods: {
    showEdit() {
      this.edit = true;
    },
    closeEdit() {
      this.edit = false;
    },
  }
}
</script>

<style lang="scss">
@import '~/assets/сss/components/edit-field.scss';
</style>