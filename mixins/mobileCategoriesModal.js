import {mapGetters} from "vuex";

export default {
   props: {
    active: {
      type: Number,
      default: null
    }
  },
  computed: {
    ...mapGetters({
      CATEGORIES: 'category/CATEGORIES',
      PAGE_HOME: 'pages/PAGE_HOME'
    }),
    categories() {
      if (this.activeCategory) return this.activeCategory.allSubCategories
      else return this.CATEGORIES
    },
    slugRoute() {
      return this.$locationPath(`/catalog/${this.slugs.join('/')}`)
    }
  },
  data() {
    return {
      activeCategory: null,
      oldIndex: [],
      slugs: []
    }
  },
  watch: {
    $route(to, from) {
      if(this.$refs['mobile-categories-modal']) this.$refs['mobile-categories-modal'].hide()
    },
  },

  methods: {
    hideModel() {
      this.activeCategory = null
      this.oldIndex = []
      this.slugs = []
    },
    openModal() {
      if (this.active) {
        this.oldIndex.push(this.active)
        if (this.activeCategory) this.activeCategory = this.activeCategory.allSubCategories[this.active - 1]
        else this.activeCategory = this.CATEGORIES[this.active - 1]
        this.slugs.push(this.activeCategory.slug)
      }
    },
    closeModal() {
      this.$refs['mobile-categories-modal'].hide()
    },
    showAllCategory() {
      this.$router.push(this.slugRoute)
    },
    backActive() {
      if (this.oldIndex.length === 0) {
        this.closeModal()
        this.activeCategory = null
        return;
      }
      this.oldIndex.pop()
      this.slugs.pop()
      if (this.oldIndex.length === 0) {
        this.activeCategory = null
        return;
      }
      let cat = null
      let i = 0;
      while (i < this.oldIndex.length) {
        if (cat) cat = cat[this.oldIndex[i]];
        else cat = this.CATEGORIES[this.oldIndex[i]];
        i++;
      }
      this.activeCategory = cat;
    },
    changeActiveCategory(index) {
      this.activeCategory = this.activeCategory
        ? this.activeCategory.allSubCategories[index]
        : this.CATEGORIES[index];
      this.oldIndex.push(index);
      this.slugs.push(this.activeCategory.slug);
      if (this.activeCategory.allSubCategories.length === 0) {
        this.$router.push(this.slugRoute);
        this.backActive();
      }
    }
  }
}
