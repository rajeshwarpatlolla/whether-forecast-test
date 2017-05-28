import Vue from 'vue';
import Hello from '@/components/Hello';

describe('Hello.vue', () => {
  it('should render correct type', () => {
    const Constructor = Vue.extend(Hello);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.hello h2').textContent).to.equal('graph');
  });

  it('should render correct value currentIndex', () => {
    
  });
});
