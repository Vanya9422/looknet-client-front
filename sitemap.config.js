const axios = require('axios');
const sitemapConfig = {
  hostname: process.env.SERVER_URL,
  gzip: true,
  path: 'sitemap.xml',
  sitemaps: [
    {
      path: '/sitemap-index.xml',
      gzip: true,
    },
    {
      path: '/sitemap-products.xml',
      gzip: true,
      exclude: ['/**'],
      routes: async () => {
        const { data } = await axios.get(`${process.env.API_URL}/products?per_page=1000000&page=1`);
        return data.data.map((item) => `/product/${item.slug}`);
      }
    },
    {
      path: '/sitemap-cities.xml',
      gzip: true,
      exclude: ['/**'],
      routes: async () => {
        const { data } = await axios.get(`${process.env.API_URL}/search-cities?per_page=100000`);
        return data.data.map((item) => `/${item.slug}`);
      }
    },
    {
      path: '/sitemap-search-results.xml',
      gzip: true,
      exclude: ['/**'],
      routes: async () => {
        const { data } = await axios.get(`${process.env.API_URL}/search_texts?per_page=100000`);
        return data.data.map((item) => `/catalog/?search_text=${item.search}`);
      }
    }
  ]
};

module.exports = sitemapConfig;
