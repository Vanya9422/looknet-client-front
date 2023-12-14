import { mapGetters } from "vuex";

export default {
  computed:{
    ...mapGetters({
      SEO_CATALOG: 'seo/SEO_CATALOG',
      SEO_HOME: 'seo/SEO_HOME',
      SEO_CONTACTS: 'seo/SEO_CONTACTS',
      LOCATION: "location/LOCATION",
      CATEGORY: "category/CATEGORY",
      SEO_SUPPORT: 'seo/SEO_SUPPORT',
    }),
    city() {
      if (this.LOCATION?.name && this.LOCATION?.state_code) {
        return `${this.LOCATION.name}, ${this.LOCATION.state_code}`;
      }
      return 'USA';
    },
    category_name() {
      return this?.CATEGORY?.name || '';
    },
    catalogPageSeo() {
      let seoResult = {};
      for (let key in this.SEO_CATALOG) {
        seoResult[key] = this.replaceVariables(this.SEO_CATALOG[key]);
      }
      return seoResult;
    },
    homePageSeo() {
      let seoResult = {};
      for (let key in this.SEO_HOME) {
        seoResult[key] = this.replaceVariables(this.SEO_HOME[key]);
      }
      return seoResult;
    },
    supportPageSeo() {
      let seoResult = {};
      for (let key in this.SEO_SUPPORT) {
        seoResult[key] = this.replaceVariables(this.SEO_SUPPORT[key]);
      }
      return seoResult;
    },
    site_name() {
      return this?.homePageSeo?.title || '';
    },
    contactsPageSeo() {
      let seoResult = {};
      for (let key in this.SEO_CONTACTS) {
        seoResult[key] = this.replaceVariables(this.SEO_CONTACTS[key]);
      }
      return seoResult;
    }
  },

  methods: {
    replaceVariables(template) {
      return template.replace(/\{(.*?)\}/g, (match, key) => {
        return this[key] || match;
      });
    }
  }
}
