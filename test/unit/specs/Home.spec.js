import Vue from 'vue';
import { Home } from '../../../src/components';

describe('variables', () => {
  it('sets the correct current index', () => {
    const defaultData = Home.data();
    expect(defaultData.currentIndex).toBe(0);
  });

  it('sets the correct dataSet', () => {
    const defaultData = Home.data();
    expect(defaultData.dataSet.length).toBe(0);
  });

  it('sets the correct temperaturList', () => {
    const defaultData = Home.data();
    expect(defaultData.temperaturList.length).toBe(0);
  });

  it('sets the correct temperaturListArr', () => {
    const defaultData = Home.data();
    expect(defaultData.temperaturListArr.length).toBe(0);
  });

  it('sets the correct mapUrl', () => {
    const defaultData = Home.data();
    expect(defaultData.mapUrl).toBe(null);
  });

  it('sets the correct whetherData', () => {
    const defaultData = Home.data();
    expect(defaultData.whetherData).toEqual({
      city: null,
      cnt: null,
      cod: null,
      list: [],
      weather: [{ icon: null }],
    });
  });

  it('sets the correct view Type', () => {
    const defaultData = Home.data();
    expect(defaultData.viewType).toBe('graph');
  });
});

describe('methods', () => {
  it('should have a function with the name data', () => {
    expect(typeof Home.data).toBe('function');
  });

  it('should have a function with the name mounted', () => {
    expect(typeof Home.mounted).toBe('function');
  });

  it('should have a function with the name changeView', () => {
    expect(typeof Home.methods.changeView).toBe('function');
  });

  it('should have a function with the name getWHetherDetails', () => {
    expect(typeof Home.methods.getWHetherDetails).toBe('function');
  });

  it('should have a function with the name prepareData', () => {
    expect(typeof Home.methods.prepareData).toBe('function');
  });

  it('should have a function with the name removeHMS', () => {
    expect(typeof Home.methods.removeHMS).toBe('function');
  });

  it('should have a function with the name getit', () => {
    expect(typeof Home.methods.getit).toBe('function');
  });
});

describe('rendered content', () => {
  it('should show the type of view selected', () => {
    const Constructor = Vue.extend(Home);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.hello h2').textContent).toBe('graph');
  });
});
