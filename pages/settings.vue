<template>
  <main class="main">
    <section-settings :title="PAGE_SETTINGS.title" :nav="PAGE_SETTINGS.nav" v-if="$auth.user">
      <div class="settings__list">
        <div class="settings__item">
          <div class="settings__item-title h3">
            {{ PAGE_SETTINGS.username }}
            <template v-for="(field, i) in fields">
              <part-edit-field
                class="settings__field"
                v-if="!field.option"
                v-model="field.value"
                :key="i"
                :label="field.label"
                :name="field.name"
                :type="field.type"
                :placeholder="field.placeholder"
                :modalName="field.modalName"
                :groupName="field.groupName"
                @success="$bvModal.show('modal-thank-settings')"
                @error="onError"
              />
            </template>
          </div>
        </div>
        <div class="settings__item">
          <div class="settings__item-title h3">{{ PAGE_SETTINGS.notifications }}</div>
          <user-change-email
            :content="PAGE_SETTINGS"
            :edit="changeEmail"
            @edit="changeEmail = $event"
            @error="onError"
          />
          <user-change-phone
            :content="PAGE_SETTINGS"
            :edit="changePhone"
            @edit="changePhone = $event"
            @error="onError"
          />
        </div>
        <div class="settings__item">
          <div class="settings__item-title h3">{{ PAGE_SETTINGS.language }}</div>
          <part-edit-select
            class="settings__field"
            v-for="(field, i) in langFields"
            :key="i"
            :label="field.label"
            :value="field.value"
            :name="field.name"
            :type="field.type"
            :topPositionSelect="field.topPosition"
            :topPositionForm="field.topPosition"
            :placeholder="field.placeholder"
            :modalName="field.modalName"
            :groupName="field.groupName"
            :items="getCode($i18n.locales)"
            v-if="field.option === 'select'"
          />
        </div>
      </div>
    </section-settings>
    <modal-error id="modal-error-settings" :desc="errorText" @close="errorText = ''"></modal-error>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import pageTranslate from "@/mixins/pageTranslate";
import { parseRequestErrors } from "@/misc/utils/errors";

export default {
  async asyncData({ store }) {
    await store.dispatch('pages/SET_PAGE_PAGE_SETTINGS');
  },
  layout: "back",
  data() {
    return {
      type: "back_design",
      page_key: "settings",
      changeEmail: false,
      changePhone: false,
      errorText: '',
    };
  },
  mixins: [pageTranslate],
  computed: {
    fields() {
      return [
        {
          groupName: "Username",
          label: this.PAGE_SETTINGS.fName.label,
          placeholder: this.PAGE_SETTINGS.fName.placeholder,
          value: this.$auth.user?.first_name,
          modalName: "first_name",
        },
        {
          groupName: "Username",
          label: this.PAGE_SETTINGS.lName.label,
          placeholder: this.PAGE_SETTINGS.lName.placeholder,
          value: this.$auth.user?.last_name,
          modalName: "last_name",
        },
      ];
    },
    langFields() {
      return [
        {
          groupName: this.PAGE_SETTINGS.language,
          label: this.PAGE_SETTINGS.lang.label,
          value: this.$i18n.locale,
          option: "select",
          topPositionSelect: true,
          topPositionForm: false,
          modalName: "fieldLanguage",
        },
      ];
    },
    ...mapGetters({
      PAGE_SETTINGS: "pages/PAGE_SETTINGS",
    }),
  },
  watch: {
    changePhone(val) {
      if (val === true) this.changeEmail = false;
    },
    changeEmail(val) {
      if (val === true) this.changePhone = false;
    },
  },
  methods: {
    ...mapActions({
      SET_PAGE_PAGE_SETTINGS: "pages/SET_PAGE_PAGE_SETTINGS",
    }),
    getPageTranslate() {
      this.SET_PAGE_PAGE_SETTINGS();
    },
    /**
     * @description Функция getCode фильтрует массив элементов и возвращает массив кодов тех элементов,
     * чей код отличается от текущей локали.
     * @param {Array} array
     * @return {Array}
     */
    getCode(array) {
      return array
        .filter((item) => item.code !== this.$i18n.locale)
        .map((item) => item.code);
    },
    onError(data) {
      const errors = parseRequestErrors(data);
      this.errorText = errors[0];
      this.$bvModal.show('modal-error-settings');
    },
  },
};
</script>
