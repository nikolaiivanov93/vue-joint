<template>
  <Line
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Plugin,
  ChartData,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);

export default {
  name: 'LineChart',
  components: { Line },
  props: {
    chartId: {
      type: String,
      default: 'line-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 480,
    },
    height: {
      type: Number,
      default: 230,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
    speed: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      chartData: {
        labels: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24',
          '25',
          '26',
          '27',
          '28',
          '29',
          '30',
        ],
        datasets: [
          {
            label: 'Speed',
            backgroundColor: '#f87979',
            data: [],
          },
        ],
      },
      chartOptions: {
        scales: {
          y1: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Speed',
              color: '#f87979',
            },
          }
        },
        responsive: true,
      },
      arrSpeed: this.storeSpeed ? this.storeSpeed[0] : [],
    };
  },
  computed: {
    storeSpeed: {
      get: function () {
        return this.$store.getters.getSpeed;
      },
    },
  },
  watch: {
    speed() {
      if (this.arrSpeed.length > 29) {
        this.arrSpeed.shift();
      }

      this.arrSpeed.push(this.speed);
      // console.log(this.arrSpeed)
      const datasets = [
        {
          label: 'Speed',
          backgroundColor: '#f87979',
          data: [...this.arrSpeed],
          borderColor: '#f87979',
          pointRadius: 0,
          borderWidth: 2,
          yAxisID: 'y1',
        }
      ];

      this.chartData.datasets = datasets;

      this.$store.commit('setArrSpeed', {
        speed: this.arrSpeed,
      });

    },
  },
  mounted() {
    if (this.storeSpeed !== undefined) {
      this.arrSpeed = this.storeSpeed[0];
    }
  },
};
</script>
