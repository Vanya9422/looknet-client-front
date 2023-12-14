<template>
  <div class="annoucements">
    <h3 class="annoucements__inner h3">{{ content.title }}</h3>
    <part-back-nav-not-link
      class="annoucements__nav"
      :nav="content.nav"
      :active="navActive"
      mobile
      @change="changeNavActive">
      <form-select-sort-index
        class="favorites-ad__select"
        :key="sortKey"
        :label="content.sortBy"
        :items="sortList"
        v-model="sort"
        :value="sort"
        noBorder></form-select-sort-index>
    </part-back-nav-not-link>
    <div class="annoucements__container">
      <div class="annoucements__select-all">
        <form-checkbox
          class="annoucements__select-all"
          :checked="ADVERTISES_CHECKED_ALL"
          @change.native="changeAll"
          v-if="content.nav[navActive].id !== 0 && ADVERTISES.length > 0">
          <span class="color-gray h6">{{ content.selectAll }}</span></form-checkbox>
        <form-select-sort-index
          class="favorites-ad__select mobile-visible"
          :key="sortKey"
          :label="content.sortBy"
          :items="sortList"
          v-model="sort"
          :value="sort"
          noBorder></form-select-sort-index>
      </div>
      <div class="annoucements__list">
        <item-annoucement
          class="annoucements__item"
          v-for="(item, index) in ADVERTISES"
          :item="item"
          :key="index"
          :coordinates="{ longitude: item.longitude, latitude: item.latitude }"
          :active-tab="navActive"
          @checked="SET_ADVERTISES_CHECKED(index)"
          @deactivate="deleteOrDeactivateOrActiveItem('deactivateOrActiveItem', item.id, 'deactivate')"
          @active="deleteOrDeactivateOrActiveItem('deactivateOrActiveItem', item.id, 'activate')"
          @deleteAdvertis="deleteOrDeactivateOrActiveItem('deleteOrDeactivateItem', item.id, 'delete')"
          @deleteAdvertisMobile="deleteOrDeactivateOrActiveItem('deleteOrDeactivateItem', null, 'delete')"
          @draft="deleteOrDeactivateOrActiveItem('deleteOrDeactivateItem', item.id, 'draft')"
          @moderation="deleteOrDeactivateOrActiveItem('deactivateOrActiveItem', item.id, 'moderation')"
          @sale="selectedProductId = item.id"
          @statistics="openStatistics(item)"
          :buttons="content.buttons"
          :left="content.left"
          :days="content.days"></item-annoucement>
        <client-only>
          <infinite-loading
            :distance="20"
            :identifier="infiniteId"
            @infinite="handleLoadMore">
            <div
              class="section-notifications__center"
              slot="no-results">
              <part-not-notification
                class="section-notifications__not-notification"
                v-if="ADVERTISES.length === 0" />
            </div>
            <div class="section-notifications__center"
                 slot="spinner">
              <loader class="white"></loader>
            </div>
            <div slot="no-more"></div>
          </infinite-loading>
        </client-only>
      </div>
      <div class="section-notifications__center"
           v-if="ADVERTISES.length === 0"></div>
      <transition name="fade">
        <part-annoucement-panel
          class="annoucements__panel"
          v-if="ADVERTISES_CHECKED.length > 0"
          @closePanel="SET_ADVERTISES_CHECKED_ALL()"
          :selected="ADVERTISES_CHECKED.length">
          <button-medium
            class="annoucement-panel__btn"
            icon="closeBig"
            blue
            small
            v-if="ADVERTISES_CHECKED.length === 1 && navActive === 0"
            @click.native.prevent="deleteOrDeactivateOrActiveItem('deleteOrDeactivateItem', null, 'deactivate')">
            {{ deactive }}
          </button-medium>
          <button-medium
            class="annoucement-panel__btn"
            icon="delete"
            blue
            small
            v-b-modal:modal-delete
            @click.native.prevent="deleteOrDeactivateOrActiveItem('deleteOrDeactivateItem', null, 'delete')">
            {{ content.buttons.delete }}
          </button-medium>
          <button-medium
            class="annoucement-panel__btn"
            icon="lightning-bolt"
            v-if="ADVERTISES_CHECKED.length === 1"
            v-b-modal.modal-tariffs
            blue
            small>{{ content.buttons.saleFaster }}
          </button-medium>
          <button-medium
            class="annoucement-panel__btn"
            icon="setting"
            blue
            small
            v-if="ADVERTISES_CHECKED.length === 1"
            @click.prevent.native="changeProduct">{{ content.buttons.settings }}
          </button-medium>
          <button-medium
            class="annoucement-panel__btn"
            blue
            small
            v-if="content.nav[navActive].id === 2"
            @click.prevent.native="deleteOrDeactivateOrActiveItem('deactivateOrActiveItem', ADVERTISES_CHECKED, 'activate')">
            {{ content.buttons.active }}
          </button-medium>
          <button-medium
            class="annoucement-panel__btn"
            blue
            small
            v-if="content.nav[navActive].id === 5"
            @click.prevent.native="deleteOrDeactivateOrActiveItem('deactivateOrActiveItem', ADVERTISES_CHECKED, 'moderation')">
            {{ content.buttons.active }}
          </button-medium>
          <button-medium
            class="annoucement-panel__btn"
            v-if="content.nav[navActive].id !== 5"
            blue
            small
            @click.native.prevent="deleteOrDeactivateOrActiveItem('deleteOrDeactivateItem', null, 'draft')">
            {{ content.buttons.draft }}
          </button-medium>
        </part-annoucement-panel>
      </transition>
    </div>
    <modal-tariffs :productId="selectedProductId" />
    <modal-delete
      v-show="status"
      @deleteItem="changeItem"
      :title="status ? content.modals[status && status === 'moderation' ? 'activate' : status || 'delete'].title : ''"
      :desc="status ? content.modals[status && status === 'moderation' ? 'activate' : status || 'delete'].description : ''"
      :btn="status ? content.modals[status && status === 'moderation' ? 'activate' : status || 'delete'].button : ''"
      :class="{ status: true }"
      :status="status"
    >
      <template #icon>
        <svg-icon name="questionMark"></svg-icon>
      </template>
    </modal-delete>
    <modal-panel>
      <div class="modal-panel__item">
        <button-border
          class="modal-panel__btn"
          icon="zipper"
          v-if="ADVERTISES_CHECKED.length === 1"
          @click.native.prevent="setTariff"
          blue
          BigIcon>{{ content.buttons.saleFaster }}
        </button-border>
      </div>
      <div class="modal-panel__item">
        <button-border
          class="modal-panel__btn"
          icon="closeBig"
          gray
          v-if="ADVERTISES_CHECKED.length === 1 && navActive === 0"
          @click.native.prevent="deleteOrDeactivateOrActiveItem('deleteOrDeactivateItem', null, 'deactivate')"
          BigIcon>
          {{ deactive }}
        </button-border>
      </div>
      <div class="modal-panel__item">
        <button-border
          class="modal-panel__btn"
          icon="chatBorder"
          BigIcon
          gray
          :to="$locationPath('/chat')"
          v-if="ADVERTISES_CHECKED.length === 1">
          {{ content.buttons.chat }}
        </button-border>
      </div>
      <div class="modal-panel__item">
        <button-border
          class="modal-panel__btn"
          icon="chart"
          BigIcon
          white
          @click.native.prevent="openStatistics(ADVERTISES_CHECKED[0])"
          v-if="ADVERTISES_CHECKED.length === 1">
          {{ PAGE_MODAL_STATISTIC.title }}
        </button-border>
      </div>
      <div class="modal-panel__item">
        <button-border
          class="modal-panel__btn"
          icon="delete"
          BigIcon
          gray
          v-b-modal:modal-delete
          @click.native.prevent="deleteOrDeactivateOrActiveItem('deleteOrDeactivateItem', null, 'delete')">
          {{ content.buttons.delete }}
        </button-border>
      </div>
      <div class="modal-panel__item"
           v-if="ADVERTISES_CHECKED.length === 1">
        <button-border
          class="modal-panel__btn"
          :img="editIcon"
          BigIcon
          gray
          v-b-modal:modal-delete
          @click.native.prevent="changeProduct">{{ content.buttons.edit }}
        </button-border>
      </div>
      <div class="modal-panel__item"
           v-if="content.nav[navActive].id === 2">
        <button-border
          class="modal-panel__btn"
          BigIcon
          gray
          v-b-modal:modal-delete
          @click.native.prevent="deleteOrDeactivateOrActiveItem('deactivateOrActiveItem', ADVERTISES_CHECKED, 'activate')">
          {{ content.buttons.active }}
        </button-border>
      </div>
      <div class="modal-panel__item"
           v-if="content.nav[navActive].id === 5">
        <button-border
          class="modal-panel__btn"
          BigIcon
          gray
          v-b-modal:modal-delete
          @click.native.prevent="deleteOrDeactivateOrActiveItem('deactivateOrActiveItem', ADVERTISES_CHECKED, 'moderation')">
          {{ content.buttons.active }}
        </button-border>
      </div>
      <div class="modal-panel__item"
           v-if="content.nav[navActive].id !== 5">
        <button-border
          class="modal-panel__btn"
          icon="closeBig"
          BigIcon
          gray
          v-b-modal:modal-delete
          @click.native.prevent="deleteOrDeactivateOrActiveItem('deleteOrDeactivateItem', null, 'draft')">
          {{ content.buttons.draft }}
        </button-border>
      </div>
    </modal-panel>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import deactiveIcon from "../../assets/img/icons/deactive.svg";
import editIcon from "../../assets/img/icons/edit-icon.svg";

export default {
  props: {
    content: {
      type: Object,
      default: () => {
      },
    },
  },
  created() {
    this.SET_TARIFFS();
    this.SET_PAGE_MODAL_STATISTIC();
  },
  data() {
    return {
      navActive: 0,
      infiniteId: 0,
      sort: 0,
      sortKey: 0,
      status: "",
      selectedProductId: null,
      functionName: "",
      deactive: "Deactivation",
      deactiveIcon,
      editIcon,
    };
  },
  watch: {
    sort() {
      this.getAdvertises();
    },
    "$i18n.locale"(val) {
      this.SET_PAGE_MODAL_STATISTIC();
    },
  },
  computed: {
    ...mapGetters({
      ADVERTISES: "advertises/ADVERTISES",
      ADVERTISES_CHECKED: "advertises/ADVERTISES_CHECKED",
      ADVERTISES_CHECKED_ALL: "advertises/ADVERTISES_CHECKED_ALL",
      PAGE_MODAL_STATISTIC: "pages/PAGE_MODAL_STATISTIC",
    }),
    sortList() {
      return [
        {
          label: this.content.sortList[0].label,
          text: this.content.sortList[0].text,
          value: "orderBy=updated_at&sortedBy=desc",
        },
        {
          label: this.content.sortList[1].label,
          text: this.content.sortList[1].text,
          value: "orderBy=updated_at&sortedBy=asc",
        },
        {
          label: this.content.sortList[2].label,
          text: this.content.sortList[2].text,
          value: "orderBy=price&sortedBy=desc",
        },
        {
          label: this.content.sortList[3].label,
          text: this.content.sortList[3].text,
          value: "orderBy=price&sortedBy=asc",
        },
      ];
    },
    selectedItemId() {
      if (this.ADVERTISES_CHECKED.length === 1) {
        return this.ADVERTISES_CHECKED[0];
      }
      return null;
    }
  },
  methods: {
    ...mapActions({
      SET_PAGE_MODAL_STATISTIC: "pages/SET_PAGE_MODAL_STATISTIC",
      SET_ADVERTISES: "advertises/SET_ADVERTISES",
      SET_ADVERTISES_PAGE: "advertises/SET_ADVERTISES_PAGE",
      SET_ADVERTISES_CHECKED: "advertises/SET_ADVERTISES_CHECKED",
      SET_ADVERTISES_CHECKED_ALL: "advertises/SET_ADVERTISES_CHECKED_ALL",
      SET_DEACTIVATE_OR_ACTIVE: "advertises/SET_DEACTIVATE_OR_ACTIVE",
      SET_GO_TO_MODERATION: "advertises/SET_GO_TO_MODERATION",
      SET_CHANGE_STATUS: "advertises/SET_CHANGE_STATUS",
      SET_STATISTIC: "product/SET_STATISTIC",
      SET_TARIFFS: "tariffs/SET_TARIFFS",
    }),
    setTariff() {
      if (this.selectedItemId) {
        this.selectedProductId = this.selectedItemId;
        this.$root.$emit('bv::show::modal', 'modal-tariffs');
      }
    },
    changeAll() {
      this.panelOpen = true;
      this.SET_ADVERTISES_CHECKED_ALL(!this.ADVERTISES_CHECKED_ALL);
    },
    changeProduct() {
      const { slug } = this.ADVERTISES.find(
        (item) => item.id === this.ADVERTISES_CHECKED[0]
      );
      this.$router.push(this.$locationPath(`/create-ad/${slug}`));
      this.SET_ADVERTISES_CHECKED_ALL();
    },
    openStatistics(item, idAdvertise = null) {
      let obj = item;
      if (idAdvertise) {
        obj = this.ADVERTISES.find((el) => el.id === item);
      }
      const statistic = {
        favorite: obj.added_favorites,
        view: obj.show_details,
        call: obj.show_phone,
      };
      this.SET_STATISTIC(statistic);
      this.$root.$emit("bv::show::modal", "modal-statistic");
    },
    changeNavActive(index) {
      this.navActive = index;
      this.getAdvertises();
      this.SET_ADVERTISES_CHECKED_ALL();
    },
    getAdvertises() {
      this.SET_ADVERTISES_PAGE();
      this.infiniteId++;
    },
    handleLoadMore($state) {
      const status = this.content.nav[this.navActive].id;
      const sort = this.sortList[this.sort].value || "orderBy=id&sortedBy=desc";
      this.SET_ADVERTISES({ sort, status }).then((loadState) => {
        if (loadState) $state.loaded();
        else $state.complete();
      });
    },
    deleteOrDeactivateOrActiveItem(functionName, selectedProductId, status) {
      this.selectedProductId = selectedProductId;
      this.status = status;
      this.$nextTick(() => this.$root.$emit("bv::show::modal", "modal-delete"));
      this.functionName = functionName;
    },
    changeItem() {
      const selectedProductId = this.selectedProductId;
      const status = this.status;
      if (this.functionName === "deactivateOrActiveItem") {
        this.SET_DEACTIVATE_OR_ACTIVE({ selectedProductId, status });
      } else if (this.functionName === "deleteOrDeactivateItem") {
        this.SET_CHANGE_STATUS({ status, selectedProductId });
      } else if (this.functionName === "SET_GO_TO_MODERATION") {
        this.SET_GO_TO_MODERATION(selectedProductId);
      }
      this.$root.$emit('bv::hide::modal', 'modal-panel');
    },
  },
  beforeDestroy() {
    this.getAdvertises();
  },
};
</script>
