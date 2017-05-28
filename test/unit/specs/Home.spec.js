import Vue from 'vue';
import { Home } from '../../../src/components';

describe('Home.vue', () => {
  it('should show the type of view selected', () => {
    const Constructor = Vue.extend(Home);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.hello h2').textContent).to.equal('graph');
  });

  // it('should result in correct text about hide button clicked', () => {
  //   const Constructor = Vue.extend(Home);
  //   const vm = new Constructor().$mount();
  //   expect(vm.$el('#city_name')).toHaveText('Moscow');
  // });
});
