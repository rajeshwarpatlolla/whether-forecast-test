import Vue from 'vue';
import { Home } from '../../../src/components';

describe('Home.vue', () => {
  it('should render correct type', () => {
    const Constructor = Vue.extend(Home);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.hello h2').textContent).to.equal('graph');
  });

  it('should render correct value currentIndex', () => {

  });
});
