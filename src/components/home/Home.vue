<template>
  <div class="hello container">
    <div class="hello">
      <h2>{{viewType}}</h2>
    </div>
    <div v-if="temperaturList.length > 0">
      <div class="city_name" v-if="whetherData && whetherData.city">{{whetherData.city.name}}</div>
      <a class="map_link" v-bind:href="mapUrl" target="_blank">Show Map</a>

      <!-- two different views -->
      <ul class="nav nav-tabs nav-justified">
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 cursor_pointer" :class="{'active_view': viewType === 'graph'}" v-on:click="changeView('graph')">
          Graph View
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 cursor_pointer" :class="{'active_view': viewType === 'table'}" v-on:click="changeView('table')">
          Table View
        </div>
      </ul>
      <!-- display day -->
      <div>{{temperaturList[0].dt * 1000 | moment('dddd, DD MMM, YYYY')}}</div>
      <!-- graph view -->
      <div v-if="viewType === 'graph'">
        <div class="graph_section" v-if="dataSet.length > 0">
          <linechart :data="dataSet" :options="{responsive: true, maintainAspectRatio: false}" :labels="graphLabels" :width="500" :height="300"></linechart>
        </div>
      </div>
      <!-- table view -->
      <div class="pt-10" v-if="viewType === 'table'">
        <table class="table table-bordered">
          <tr>
            <th>Time</th>
            <th>Min. Temp</th>
            <th>Max. Temp</th>
            <th>Temp</th>
            <th>Weather</th>
            <th>Weather Details</th>
          </tr>
          <tr v-for="item in temperaturList">
            <td>{{(item.dt * 1000) | moment('hh:mm a')}}</td>
            <td>{{item.main.temp_min}}</td>
            <td>{{item.main.temp_max}}</td>
            <td>{{item.main.temp}}</td>
            <td><img :src="'http://openweathermap.org/img/w/' + item.weather[0].icon + '.png'" alt=""></td>
            <td>{{item.weather[0].description}}</td>
          </tr>
        </table>
      </div>
      <!-- next and prev day -->
      <div class="row pt-20">
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 cursor_pointer" v-on:click="prepareData(-1)">
          <i class="fa fa-arrow-left" aria-hidden="true"></i> Prev Day
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 cursor_pointer" v-on:click="prepareData(+1)">
          Next Day <i class="fa fa-arrow-right" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import urls from '../../api/urls';
  import LineChart from '../graphs/line-graph';

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
    mounted() {
      this.getWHetherDetails();
    },
    methods: {
      changeView(view) {
        this.viewType = view;
      },
      getWHetherDetails() {
        this.$http.get('http://samples.openweathermap.org/data/2.5/forecast', { params: { id: urls.cityId, appid: urls.apikey } })
          // getWhetherReportApi()
          .then((response) => {
            this.whetherData = response.body;
            _.forEach(this.whetherData.list, (val) => {
              val.day = this.removeHMS(val.dt);   // eslint-disable-line
            });
            // grouping the values on day basis
            const groupedValues = _.groupBy(this.whetherData.list, 'day');
            this.temperaturListArr = _.values(groupedValues);
            window.console.log(this.temperaturListArr);
            // preparing the map url
            this.mapUrl = 'https://www.google.com/maps?q=' + this.whetherData.city.coord.lat + ',' + this.whetherData.city.coord.lon;  // eslint-disable-line
            this.prepareData(0);
          }, (error) => {
            window.console.log(error);
          });
      },
      prepareData(index) {
        // preparing the set of single day array of objects
        this.graphLabels = [];
        this.currentIndex = this.currentIndex + index;
        if (this.currentIndex === this.temperaturListArr.length) {
          this.currentIndex = 0;
        } else if (this.currentIndex === -1) {
          this.currentIndex = this.temperaturListArr.length - 1;
        }
        this.temperaturList = this.temperaturListArr[this.currentIndex];
        this.dataSet = _.map(_.map(this.temperaturListArr[this.currentIndex], 'main'), 'temp');
        const dates = _.map(this.temperaturListArr[this.currentIndex], 'day');
        _.forEach(dates, (val) => {
          this.graphLabels.push(new Date(val).getDate() + '-' + (new Date(val).getMonth() + 1) + '-' + new Date(val).getFullYear());  // eslint-disable-line
        });
      },
      removeHMS(val) {  // removing hours, minutes, seconds and milliseconds to get the exact day
        const tempEpoch = new Date(val * 1000);
        tempEpoch.setHours(0);
        tempEpoch.setMinutes(0);
        tempEpoch.setSeconds(0);
        tempEpoch.setMilliseconds(0);
        return tempEpoch.getTime();
      },
      getit() {
        window.console.log('computed');
      },
    },
    components: { linechart: LineChart },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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
tr{
  border-top: 1px solid #ddd;
}
td, th {
  text-align: left;
  border-right: 1px solid #ddd;
  padding: 0 10px;
}
a {
  color: #42b983;
}
.active_view {
  color: #54f;
  font-weight: bold;
}
.cursor_pointer {
  cursor: pointer;
}
.city_name {
  font-size: 28px;
  font-weight: bold;
}
.pt-10{
  padding-top: 10px;
}
.pr-10{
  padding-right: 10px;
}
.pb-10{
  padding-bottom: 10px;
}
.pl-10{
  padding-left: 10px;
}
.pt-20 {
  padding-top: 20px;
}
.graph_section {
  width: 100%;
  height: 300px;
  padding-top: 20px;
}
</style>
