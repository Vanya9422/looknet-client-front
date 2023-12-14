import Vue from "vue";
import VueTippy, { TippyComponent } from "vue-tippy";

Vue.use(VueTippy, {
	directive: "tippy",
	interactive: true,
	arrow: true,
	arrowType: 'round',
	allowHTML: true,
	// placement: 'bottom',
	theme: 'default',
	// trigger: 'click'
	trigger: 'mouseenter focus'
});

Vue.component("tippy", TippyComponent);