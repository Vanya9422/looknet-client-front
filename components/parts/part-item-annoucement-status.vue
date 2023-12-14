<template lang="pug">
  div(v-if="isShow")
    .status-container
      client-only
        template(v-for="(status, key) in statusItems")
          tippy(
            v-if="status.show"
            :animate-fill="false"
            distant="7"
            theme="light"
            animation="fade"
            trigger="mouseenter"
            arrow
            placement="bottom-end"
          )
            template(v-slot:trigger)
              .status-container__item(:class="`${key}-bg`")
                img(v-if="status.icon" :src="status.icon")
                template(v-else) {{ status.name }}
            .status-container__tippy
              .status-container__tippy-header(
                v-if="status.header"
                :class="`${key}-color`"
              ) {{ status.header }}
              .status-container__tippy-description(v-if="status.description") {{ status.description }}
              .status-container__tippy-residue(v-if="status.residue") {{ status.residue }}
</template>

<script>
import getUpIcon from "../../assets/img/icons/get_up.svg";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    statusItems() {
      return {
        vip: {
          show: this.item.is_vip,
          name: "VIP",
          header: "Vip advertise.",
          description: "Your advertise on home pages",
          // residue: "Progress : 3 days from 10",
        },
        top: {
          show: this.item.is_top,
          name: "TOP",
          header: "Top advertise.",
          description: "Your advertise showing on all pages",
          // residue: "Progress : 3 from 10",
        },
        get_up: {
          show: this.item.is_up,
          icon: getUpIcon,
          header: "Return.",
          description: "Your post will be returned to the top of the list",
          // residue: "Times : 2 from 10",
        },
      };
    },
    isShow() {
      return Object.keys(this.statusItems).some((key) => this.statusItems[key].show);
    },
  },
};
</script>

<style lang="scss">
.status-container {
  display: flex;
  > * {
    margin-right: 5rem;
  }
  &__item {
    height: 30rem;
    width: 43rem;
    border-radius: 7rem;
    padding: 0 10rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 600;
    letter-spacing: normal;
    transition: ease .12s;
  }
  &__tippy {
    text-align: left;
    max-width: 219rem;
    &-description {
      color: #6E6E73;
    }
    &-residue {
      padding-top: 16rem;
    }
  }
}
$vip_color: #FF664A;
$top_color: #4B68FF;
$get_up_color: #4B68FF;
.vip-color {
  color: $vip_color;
}
.top-color {
  color: $top_color;
}
.get_up-color {
  color: $get_up_color;
}
.vip-bg {
  background-color: $vip_color;
}
.top-bg {
  background-color: $top_color;
}
.get_up-bg {
  background-color: $get_up_color;
}
</style>
