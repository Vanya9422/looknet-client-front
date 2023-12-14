<template>
  <div class="footer__apps">
    <div class="footer__apps_item">
      <img
        src="~/assets/img/icons/apps/google-play.svg"
          @click.prevent="$bvModal.show('modal-coming-soon')"
      />
    </div>
    <div class="footer__apps_item">
      <img
        src="~/assets/img/icons/apps/app-store.svg"
        @click.prevent="$bvModal.show('modal-coming-soon')"
      />
    </div>
    <modal-coming-soon />
  </div>
</template>
