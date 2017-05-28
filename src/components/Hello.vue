<template>
  <div class="hello">
    <h2>{{viewType}}</h2>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        viewType: 'graph',
        whetherData: {
          city: null,
          cnt: null,
          cod: null,
          list: [],
          weather: [{ icon: null }],
        },
        temperaturList: [],
        temperaturListArr: [],
        mapUrl: null,
        dataSet: [],
        graphLabels: [],
        currentIndex: 0,
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
