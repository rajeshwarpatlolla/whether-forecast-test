import { Line } from 'vue-chartjs';

export default Line.extend({
  props: ['data', 'options', 'labels'],
  watch: {
    data: {
      handler(newData, oldData) {
        window.console.log(newData, oldData);
        this.data = newData;
        if (newData) {
          this.renderChart({
            maintainAspectRatio: false,
            responsive: false,
            labels: this.labels,
            datasets: [
              {
                label: 'Temperature',
                backgroundColor: '#51dd75',
                data: newData,
                spanGaps: true,
              },
            ],
          }, this.options);
        }
      },
    },
  },
  mounted() {
    this.renderChart({
      maintainAspectRatio: false,
      responsive: false,
      labels: this.labels,
      datasets: [
        {
          label: 'Temperature',
          backgroundColor: '#51dd75',
          data: this.data,
          spanGaps: true,
        },
      ],
    }, this.options);
  },
});
