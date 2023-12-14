<template>
  <div class="edit-field">
    <div class="edit-field__row">
      <div class="edit-field__column edit-field__column_left">
        <div class="edit-field__label color-gray p">{{ label }}</div>
      </div>
      <div class="edit-field__column edit-field__column_center">
        <form-select
          :name="name"
          v-model="mutableValue"
          :items="items"
          default
          :top="topPositionSelect"
          v-if="edit"
        />
        <div class="edit-field__placeholder h4" v-else>
          {{ value }}
        </div>
      </div>
      <div class="edit-field__column edit-field__column_right">
        <div class="edit-field__nav mobile-hidden" v-if="edit">
          <div class="edit-field__nav-item">
            <div class="edit-field__link color-gray" @click="closeEdit">
              <svg-icon class="edit-field__icon edit-field__icon-close" name="close" />
            </div>
          </div>
          <div class="edit-field__nav-item">
            <div class="edit-field__link color-blue" @click="closeSave">
              <svg-icon class="edit-field__icon edit-field__icon-checked" name="check" />
            </div>
          </div>
        </div>
        <div class="edit-field__nav mobile-hidden" v-else>
          <div class="edit-field__nav-item">
            <div class="edit-field__link color-blue" @click="showEdit">
              <svg-icon class="edit-field__icon" name="edit" />
            </div>
          </div>
        </div>
        <div class="edit-field__nav mobile-visible">
          <div class="edit-field__nav-item">
            <div class="edit-field__link color-blue" @click="$bvModal.show(`${modalName}`)">
              <svg-icon class="edit-field__icon" name="edit" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal-field :id="modalName" :title="groupName">
      <div class="modal-field__list">
        <div class="modal-field__item">
          <div class="modal-field__label">{{ label }}</div>
          <form-select
            class="modal-field__input"
            :name="name"
            v-model="mutableValue"
            :items="items"
            default
            :top="topPositionForm"
          />
        </div>
      </div>
    </modal-field>
  </div>
</template>

<script>
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
      default: "Eng",
    },
    type: {
      type: String,
      default: "",
    },
    items: {
      type: Array,
      default: () => ["Ukr", "Ru"],
    },
    topPositionSelect: {
      type: Boolean,
      default: true,
    },
    topPositionForm: {
      type: Boolean,
      default: false,
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
      edit: false,
      mutableValue: null,
    };
  },
  methods: {
    showEdit() {
      this.edit = true;
    },

    closeEdit() {
      this.edit = false;
    },
    closeSave() {
      this.$i18n.setLocale(this.mutableValue);
      if (process.client) {
        localStorage.setItem("lang", this.mutableValue);
      }
      this.edit = false;
    },
  },
  mounted() {
    this.mutableValue = JSON.parse(JSON.stringify(this.value));
  },
};
</script>

<style lang="scss">
@import "~/assets/сss/components/edit-field.scss";
</style>
