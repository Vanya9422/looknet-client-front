import Vue from "vue";


const defaultConfig = {
  enabled: true,
  handlePrepend: false,
};

const scroll = (el, scrollTop) => {
  const count = el.getAttribute('data-page')
  if (+count === 0 || +count === 1){
    lastHeight = el.scrollHeight;
    const top = scrollTop || lastHeight;
    if (typeof el.scroll === 'function') el.scroll({top});
    else el.scrollTop = top; // eslint-disable-line no-param-reassign
  }else{
    const id = el.getAttribute('data-id')
    const el1 = document.querySelector(`.chat-message__item[data-id="${id}"]`)
    el1.scrollIntoView({behavior: 'smooth'});
  }

};
let lastHeight = 0;
const observers = new WeakMap();
const heights = new WeakMap();


const mutationObserved = (el, config) => {
  // if not enabled, do nothing.
  if (config.enabled === false) return;

  // if not handling prepend, simply scroll.
  if (config.handlePrepend === false) {
    scroll(el);
    return;
  }

  // if handling prepend, we need to calculate where to scroll to.
  // We're prepending if scrollTop is zero and heights has the el.
  // ScrollTop will be difference in scrollHeight before and after.
  const scrollTop = (el.scrollTop === 0 && heights.has(el))
      && (el.scrollHeight - heights.get(el));

  scroll(el, scrollTop);
  heights.set(el, el.scrollHeight);
};
Vue.directive('scroll-down', {

  /**
   * This object defines the directive itself.
   */

  inserted: (el, binding) => {
    if (!process.client) return;
    const config = {...defaultConfig, ...binding.value};
    mutationObserved(el, config);
  },

  /**
   * When the directive binding is updated we have to update our MutationObserver.
   * We disconnect the old MutationObserver (if it already exists in observers).
   * We then create and save a new MutationObserver with the new callback.
   */

  update: (el, binding) => {
    if (!process.client) return;
    if (observers.has(el)) observers.get(el).disconnect();
    const config = {...defaultConfig, ...binding.value};
    const mutationCallback = () => {
      mutationObserved(el, config);
    };

    const mutationObserver = new MutationObserver(mutationCallback);
    mutationObserver.observe(el, {childList: true, subtree: true});
    observers.set(el, mutationObserver);
  }
})

