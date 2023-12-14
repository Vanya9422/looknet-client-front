<template>
  <div
    class="item-card"
    :class="{ 'item-inline': inline }"
    @pointerenter="loadGalleryTimer(true)"
    @pointerleave="loadGalleryTimer(false)"
  >
    <div
      class="item-card__box flex flex_bottom"
      v-if="!inline"
    >
      <div class="item-card__buttons">
        <template v-if="!showMessage && contacts === 2">
          <button-primary
            class="item-card__btn item-card__btn_chatting w-100"
            :to="$locationPath(`/product/${to}`)"
            @click.prevent.native="addConversation"
            small
            gray
            icon="info">
            {{ PAGE_PRODUCT_DETAILS.show.more }}
          </button-primary>
        </template>
        <button-primary
          class="item-card__btn item-card__btn_chatting"
          v-if="contacts !== 1 && showMessage"
          @click.prevent.native="sendMessage"
          :class="[{ 'w-100': contacts === 2 }, { 'svg-mr-0': contacts !== 2 }]"
          small
          gray
          icon="chatting"
        >
          {{ contacts === 2 ? PAGE_PRODUCT_DETAILS.sendMessage : "" }}
        </button-primary>
        <template v-if="contacts !== 2 && phoneNumber !== '0'">
          <button-primary
            class="item-card__btn item-card__btn_phone show"
            gray
            v-if="phone"
            link
            :to="`tel:+${phoneNumber}`">{{ phoneNumber }}
          </button-primary>
          <button-primary
            class="item-card__btn item-card__btn_phone"
            gray
            small
            icon="phone"
            v-else
            @click.prevent.native="showPhone">{{ PAGE_PRODUCT_DETAILS.show.number }}
          </button-primary>
        </template>
      </div>
    </div>
    <div class="item-card__head">
      <div class="item-card__gallery">
        <part-mouse-gallery
          :list="fullGallery"
          :serverGallery="serverGallery"
          @click.prevent.native="openProduct()"
          thumb
        />
        <button-action
          class="item-card__zoom"
          icon="search"
          @click.prevent.native="showItem"
        />
      </div>
      <!--        <div class="item-card__skeleton">-->
      <!--          <vue-skeleton-loader-->
      <!--            :size="400"-->
      <!--            animation="wave"-->
      <!--          />-->
      <!--        </div>-->

      <div
        class="item-card__status"
        v-if="status"
        :class="statusData.class">{{ statusData.text }}
      </div>
    </div>
    <template v-if="inline">
      <div class="item-card__info">
        <div class="item-card__top">
          <NuxtLink
            class="item-card__name p text-wrap"
            :to="$locationPath(`/product/${to}`)">{{ name }}
            <!--template(v-if="TRANSLATE") {{ $translateText(name) }}-->
            <!--template(v-else) {{ name }}-->
          </NuxtLink>
          <div class="item-card__top-right">
            <div class="item-card__price mt-0">{{ showPrice }}</div>
            <button-action
              class="item-card__favorite"
              :blue="isFavorite"
              @click.prevent.native="addFavorite(id, to)"></button-action>
          </div>
        </div>
        <div class="item-card__desc">{{ desc }}</div>
        <div class="item-card__price show-mobile">{{ showPrice }}</div>
      </div>
      <div class="item-card__footer">
        <div class="item-card__footer-left">
          <module-user-info
            class="single-sidebar__user mt-0"
            :avatar="user.avatar"
            :name="user.full_name"
            :content="`<strong>${user.phone ? 'Phone /' : ''}  ${user.email ? 'Еmail confirmed' : ''}</strong>`"
            :about="`${PAGE_PRODUCT_DETAILS.registered} 3 days`"
            :verified="user.verified_at !== null"
            v-if="user"
          />
        </div>
        <div class="item-card__text color-gray">
          <div class="single-sidebar__views"><span>
            <svg-icon
              class="single-views__icon"
              name="eye-1"
              viewBox="0 0 16 16"></svg-icon>
            {{ showDetails }}</span><span>
            <svg-icon
              class="single-views__icon"
              name="dot"
              viewBox="0 0 12 4"></svg-icon>
            ID {{ id }}</span><span>
            <svg-icon
              class="single-views__icon"
              name="dot"
              viewBox="0 0 12 4"></svg-icon>
            <template>{{ city }}</template>
            <template v-if="computedDistance">, {{ computedDistance }}</template>
          </span><span>
            <svg-icon
              class="single-views__icon"
              name="dot"
              viewBox="0 0 12 4"></svg-icon>
            {{ formatDistance(new Date(date), new Date()) }}</span></div>
        </div>
        <div class="item-card__footer-right">
          <div class="item-card__buttons">
            <template v-if="!showMessage && contacts === 2">
              <button-primary
                class="item-card__btn item-card__btn_chatting w-100"
                :to="$locationPath(`/product/${to}`)"
                @click.prevent.native="addConversation"
                small
                gray
                icon="info">
                {{ PAGE_PRODUCT_DETAILS.show.more }}
              </button-primary>
            </template>
            <button-primary
              class="item-card__btn item-card__btn_chatting"
              v-if="contacts !== 1 && showMessage"
              @click.prevent.native="addConversation"
              :class="[{ 'w-100': contacts === 2 }, { 'svg-mr-0': contacts !== 2 }]"
              small
              gray
              icon="chatting">
              {{ contacts === 2 ? PAGE_PRODUCT_DETAILS.sendMessage || "Send a message" : "" }}
            </button-primary>
            <template v-if="contacts !== 2 && phoneNumber !== '0'">
              <button-primary
                class="item-card__btn item-card__btn_phone show"
                gray
                v-if="phone">
                {{ phoneNumber }}
              </button-primary>
              <button-primary
                class="item-card__btn item-card__btn_phone"
                gray
                small
                icon="phone"
                v-else
                @click.prevent.native="showPhone">
                {{ PAGE_PRODUCT_DETAILS.show.number }}
              </button-primary>
            </template>
          </div>
        </div>
        <div class="item-card__box flex flex_bottom">
          <!--.item-card__text.color-gray {{ city }}, {{ distance }}  •  {{ formatDistance(new Date(date), new Date()) }}-->
          <!--.item-card__price  {{ showPrice }}-->
        </div>
      </div>
    </template>
    <template v-else>
      <div class="item-card__info">
        <div class="item-card__top">
          <NuxtLink
            class="item-card__name p text-wrap"
            :to="$locationPath(`/product/${to}`)">{{ name }}
            <!--template(v-if="TRANSLATE") {{ $translateText(name) }}-->
            <!--template(v-else) {{ name }}-->
          </NuxtLink>
          <button-action
            class="item-card__favorite"
            :blue="isFavorite"
            data-test="test"
            @click.prevent.native="addFavorite(id, to)"></button-action>
        </div>
        <div class="item-card__text color-gray">
          <template>{{ city }}</template>
          <template v-if="computedDistance">, {{ computedDistance }}</template>
          <template>• {{ formatDistance(new Date(date), new Date()) }}</template>
        </div>
        <div class="item-card__price">{{ showPrice }}</div>
      </div>
    </template>
  </div>
</template>

<script>
import { numberWithSpaces } from "assets/js/functions";
import { mapActions, mapGetters, mapMutations } from "vuex";
import favorite from "@/mixins/favorite";
import { formatDistance } from "date-fns";
import distanceMixin from "@/mixins/distanceMixin";

export default {
  props: {
    name: {
      type: String,
      default: "Объектив SLR Magic. Sony E. 25mm f1.4",
    },
    city: {
      type: String,
      default: "New Your",
    },
    desc: {
      type: String,
      default: "2 km near you",
    },
    date: {
      type: String,
      default: "2 days ago",
    },
    price: {
      type: Number,
      default: 228,
    },
    pricePolicy: {
      type: Number,
      default: 1,
    },
    showDetails: {
      type: Number,
      default: 228,
    },
    favoritesProduct: {
      type: Boolean,
      default: false,
    },
    status: {
      default: "",
    },
    phoneNumber: {
      type: String,
      default: "+ 1 376 266 5353",
    },
    to: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    contacts: {
      type: Number,
      default: 0,
    },
    author_id: {
      type: Number,
      default: 0,
    },
    author_full_name: {
      type: String,
      default: "",
    },
    serverGallery: {
      type: Boolean,
      default: false,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    gallery: {
      type: Array,
      default: () => ([]),
    },
    user: {
      type: Object,
      default: () => ({}),
    },
    coordinates: {
      type: Object,
      default: () => {
      },
    },
  },
  mixins: [favorite, distanceMixin],
  data: () => ({
    formatDistance,
    phone: false,
    numberWithSpaces,
    loadedGallery: [],
    loadGalleryTimeout: null,
    loadGalleryLock: false,
  }),
  computed: {
    ...mapGetters({
      TRANSLATE: "user/TRANSLATE",
      PAGE_PRODUCT_DETAILS: "pages/PAGE_PRODUCT_DETAILS",
      STORAGE_CONV_ID: "chat/STORAGE_CONV_ID",
    }),
    computedDistance() {
      return this.distance ? `${this.distance} mils near you` : null;
    },
    showMessage() {
      if (this.$auth.loggedIn) {
        return this.$auth.user.id !== this.author_id;
      } else {
        return true;
      }
    },
    showPrice() {
      switch (this.pricePolicy) {
        case 1:
          return `$ ${this.numberWithSpaces(this.price)}`;
        case 2:
          return this.PAGE_PRODUCT_DETAILS.pricePolicy.exchange;
        case 3:
          return this.PAGE_PRODUCT_DETAILS.pricePolicy.contractual;
        default:
          return this.PAGE_PRODUCT_DETAILS.pricePolicy.free;
      }
    },
    statusData() {
      switch (this.status) {
        case 1:
          return {
            text: "VIP",
            class: "item-card__status-vip",
          };
        case 2:
          return {
            text: "TOP",
            class: "item-card__status-top",
          };
        default:
          return {};
      }
    },
    fullGallery() {
      if (this.loadedGallery.length) {
        return this.loadedGallery;
      }
      return this.gallery && Array.isArray(this.gallery) ? this.gallery : [];
    },
  },
  methods: {
    ...mapActions({
      SET_DETAIL: "product/SET_MODAL_DETAIL",
      ADD_CONVERSATION: "chat/ADD_CONVERSATION",
      CHECK_CONVERSATION: "chat/CHECK_CONVERSATION",
    }),
    ...mapMutations({
      SET_SAFETY_MESSAGE: "chat/SET_SAFETY_MESSAGE"
    }),
    openProduct(to) {
      // debugger
      this.showItem();
    },
    showPhone(e) {
      this.phone = true;
      this.$axios
        .$post(`${this.$api.user.statistics}${this.to}/phone-view`)
        .then((res) => console.log(res));
    },
    showItem() {
      this.SET_DETAIL(this.to).then(() => {
        this.$emit("show");
        this.$root.$emit("bv::show::modal", "modal-card");
        this.$axios.$post(`/statistics/${this.to}/view-details`);
      });
    },
    async $translateText(text) {
      if (this.$i18n.locale !== "en") {
        const res = await this.$axios.$post(
          `https://api.mymemory.translated.net/get?q=${text}&langpair=en|${this.$i18n.locale}`
        );
        // const res = await this.$axios.$get(`https://api.mymemory.translated.net/get?q=hello&langpair=en|ru`)
        const translateText = res.responseData.translatedText;
        console.log(translateText);
        return translateText;
      }
      return text;
    },
    async sendMessage() {
      if (!this.$auth.loggedIn) {
        this.$bvModal.show(`modal-login`);
        if (process.client) {
          localStorage.setItem(
            "send_message",
            JSON.stringify({
              participant_id: this.author_id,
              advertise_id: this.id,
            })
          );
        }
        return;
      }

      const result = await this.CHECK_CONVERSATION(
        { type: 'buying', search: this.name, id: this.id }
      );

      if (!result && process.client) {
        this.SET_SAFETY_MESSAGE(false);
      }

      await this.ADD_CONVERSATION({
        participant_id: this.author_id,
        advertise_id: this.id,
      });
      this.$emit("sendMessage");
    },
    async loadGallery() {
      this.loadGalleryLock = true;
      try {
        const { data: { data }} = await this.$axios.get(`${this.$api.products}/${this.id}/images`);
        if (!Array.isArray(data)) {
          throw new Error("load gallery error");
        }
        this.loadedGallery = data;
      } catch (error) {
        this.loadGalleryLock = false;
        console.error(error);
      }
    },
    loadGalleryTimer(value) {
      if (this.loadGalleryLock || (value && this.loadGalleryTimeout !== null)) return;
      if (value) {
        this.loadGalleryTimeout = setTimeout(() => {
          this.loadGallery();
          this.loadGalleryTimeout = null;
        }, 100);
        return;
      }
      clearTimeout(this.loadGalleryTimeout);
      this.loadGalleryTimeout = null;
    },
  },
};
</script>

<style lang="scss">
.item-card {
  position: relative;
  margin-top: 20px;

  &__skeleton {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
  }

  &.item-inline {
    max-width: 100%;
    width: 100%;
    display: flex;
    padding-right: 22px;
    margin-top: 20px;

    .item-card__name {
      max-width: 70%;
    }

    @include large-mobile {
      padding-bottom: 92px;
      padding-right: 12px;

      .item-card__name {
        max-width: 80%;
      }
      .user-info {
        display: none;
      }
      .item-card__top .item-card__favorite {
        top: 5px;
        right: 12px;
      }
      //flex-direction: column;
    }

    .item-card__gallery {
      padding-top: 0;
      padding-left: 264px;
      height: 220px;
      margin-right: 20px;
      @include large-mobile {
        padding-left: 112px;
        height: 117px;
        margin-right: 15px;
      }
    }

    .item-card__info {
      //width: calc(100% - 112px);
      position: unset;
      margin-top: 0;
    }

    .item-card__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .item-card__top-right {
      display: flex;
      align-items: center;
    }

    .item-card__name,
    .item-card__price {
      font-size: 24px;
      @include large-tablet {
        font-size: 20px;
      }
    }

    .item-card__name {
      @include large-mobile(50) {
        font-size: 17px;
      }
    }

    .item-card__price {
      @include large-mobile(50) {
        font-size: 17px;
      }
    }

    .item-card__desc {
      font-size: 14px;
      line-height: 130%;
      margin: 14px 0 20px;
      max-width: 459px;
      height: 72px;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #6e6e73;
      word-wrap: break-word;
      @include large-mobile {
        -webkit-line-clamp: 3;
        height: 54px;
        margin: 8px 0;
      }
    }

    .item-card__box {
      height: 100%;
      z-index: -1;
    }

    .item-card__footer {
      justify-content: space-between;
      align-items: flex-end;
      display: grid;
      grid-template-columns: 1fr 265px;
      gap: 0 10px;
      @include large-tablet {
        grid-template-columns: 1fr 200px;
      }
      @media screen and (max-width: 767px) {
        display: flex;
      }

      .item-card__footer-right {
        grid-row: 1/3;
        grid-column: 2/3;
      }

      .item-card__text {
        margin-top: 10px;
        @include large-desktop {
          //grid-row: 1/3;
          grid-column: 1/3;
        }
      }

      //padding-bottom: 30px;
      @include small-tablet {
        flex-direction: column;
        align-items: flex-start;
      }
      @include large-mobile {
        padding: 0;
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 6px;
        padding-right: 12px;
      }
    }

    .item-card__footer-right {
      max-width: 265px;
      width: 100%;
      @include large-mobile {
        max-width: 100%;
      }
    }
  }

  @include min-small-tablet {
    &:not(.item-inline):hover {
      z-index: 2;

      .item-card {
        &__box {
          visibility: visible;
          opacity: 1;
        }

        &__zoom {
          opacity: 1;
          visibility: visible;
        }

        &__status {
          opacity: 0;
          visibility: hidden;
        }
      }
    }
  }

  &__head {
    position: relative;
  }

  &__gallery {
    position: relative;
    z-index: 1;
    overflow: hidden;
    padding-top: div(220, 264) * 100%;
    border-radius: 10rem;
    display: block;

    @include large-tablet {
      .mouse-gallery__item:not(:first-child),
      .mouse-gallery__nav,
      .button-action {
        display: none;
      }
    }

    @include large-mobile {
      padding-top: div(140, 167) * 100%;
    }
  }

  &__info {
    margin-top: 15rem;
    position: relative;

    @include large-mobile {
      margin-top: 10rem;
    }
  }

  &__favorite {
    width: auto;
    height: auto;
    stroke: $gray;
    flex-shrink: 0;
    margin-left: 20rem;

    svg {
      width: 21rem;
      height: 19rem;
      max-width: inherit;
      max-height: inherit;
      stroke: rgba($gray, 0.3);
    }

    @include large-mobile {
      svg {
        width: 17rem;
        height: 15rem;
        stroke-width: 1.7;
      }
    }
  }

  &__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    @include large-mobile {
      .item-card__price {
        display: none;
      }
      .item-card__favorite {
        position: absolute;
        right: 0;
      }
    }
  }

  &__name {
    font-weight: 600;
    display: block;
    max-width: 210rem;
    transition: ease 0.2s;

    &:hover {
      color: $blue;
    }

    @include large-mobile {
      max-width: 75%;
    }
  }

  &__text {
    margin-top: 10rem;
  }

  &__price {
    margin-top: 15rem;
    font-size: 20rem;
    font-weight: 600;
    line-height: 1;
    letter-spacing: 0.01em;
    white-space: nowrap;
    @include large-mobile {
      margin-top: 10rem;
      font-size: 17rem;
    }
  }

  &__box {
    position: absolute;
    left: -15rem;
    top: -15rem;
    width: calc(100% + 30rem);
    height: calc(100% + 115rem);
    background: #fff;
    border-radius: 10rem;
    border: 1px solid #d2d2d7;
    padding: 20rem 15rem;
    visibility: hidden;
    opacity: 0;
    transition: ease 0.1s;

    @include large-mobile {
      display: none;
    }
  }

  &__btn {
    padding: 0;

    &:not(:last-child) {
      margin-right: 5rem;
    }

    &_chatting {
      width: 60rem;
      min-width: 60rem;
      padding: 0 !important;

      &.svg-mr-0 svg {
        margin-right: 0;
      }

      svg {
        margin-right: 10rem;
      }
    }

    &_phone {
      width: 100%;
    }

    @include large-mobile {
      &_chatting {
        width: 50rem;
        min-width: 50rem;
      }
      &_phone {
        font-size: 12rem;
      }
    }
  }

  &__buttons {
    width: 100%;
    display: flex;
  }

  &__zoom {
    position: absolute;
    left: 5rem;
    top: 5rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    z-index: 1;
    transition: ease 0.12s;
    opacity: 0;
    visibility: hidden;

    svg {
      width: 16rem;
      height: 16rem;
      fill: #fff;
      stroke: #fff;
      stroke-width: 1px;
      transform: rotate(90deg);
    }

    @include large-mobile {
      opacity: 1;
      visibility: visible;
      right: 5px;
      left: auto;
    }
  }

  &__status {
    position: absolute;
    z-index: 1;
    left: 10rem;
    top: 10rem;
    height: 30rem;
    border-radius: 7rem;
    padding: 0 10rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 600;
    letter-spacing: normal;
    transition: ease 0.12s;

    &-vip {
      background: #ff664a;
    }

    &-top,
    &-get-up {
      background: #4b68ff;
    }

    @include large-mobile {
      // height: 20rem;
      // padding: 0 6rem;
      // font-size: 10rem;
    }
  }

  &__banner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 30rem 20rem;

    &-wrap {
      position: relative;
      text-align: center;
      display: block;
    }

    &-name {
      letter-spacing: 0.01em;
      display: block;
    }

    &-img {
      display: block;
      margin-bottom: 20rem;

      img {
        max-height: 130rem;
      }
    }

    &-arrow {
      width: 9rem;
      height: 11rem;
      display: block;
      margin: 20rem auto 0 auto;
      fill: none;
      stroke: $default;
      stroke-width: 2;
    }

    &:before {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(239.83deg, #e0f0ff 10.5%, #ffe3d3 124.13%);
      opacity: 0.7;
      border-radius: 10px;
      transform: matrix(-1, 0, 0, 1, 0, 0);
    }

    @include large-mobile {
      &-img {
        margin-bottom: 17rem;

        img {
          max-height: 114rem;
        }
      }
      &-name {
        font-size: 14rem;
      }
      &-arrow {
        margin-top: 10rem;
      }
    }
  }
}

.single-sidebar__views {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  span {
    display: flex;
  }

  @include large-tablet {
    gap: 4px;
  }
  @include large-mobile {
    //display: none;
  }
}

.single-views__icon {
  flex: 0 0 auto;
  width: 16rem;
  margin-right: 8rem;
  fill: #6e6e73;
}

.show-mobile {
  display: none;
  margin-top: 8px;
  @include large-mobile {
    display: block;
  }
}

.item-card.item-inline {
  display: grid;
  grid-template-columns: 320px 1fr;

  .item-card__head {
    grid-row: 1/3;
  }

  @include large-tablet {
    grid-template-columns: 280px 1fr;
  }
  @include large-mobile() {
    grid-template-columns: 112px 1fr;
    gap: 15px;
    padding-bottom: 0;
    .item-card__head {
      grid-row: 1/2;
    }
    .item-card__footer {
      grid-column: 1/3;
      position: relative;
      width: 100%;
      left: 0;
      bottom: 6px;
      padding: 0;
    }
    .item-card__text {
      display: none;
      margin-top: 10px;
    }
  }
}

.item-card__btn_chatting {
  @include large-mobile {
    font-size: 10px;
    .button-primary__icon_chatting {
      width: 10px;
    }
  }
}

.item-card__btn_phone.show {
  border-width: 2px;
  background: #fff;

  &:hover:not(:disabled) {
    background: #fff;
  }
}
</style>


