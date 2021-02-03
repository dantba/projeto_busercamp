
<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  data: () => ({
    chartdata: {
      labels: ['Utilizado(R$)', 'Disponível(R$)'],
      datasets: [{
        label: 'Limite',
        backgroundColor: ['#551118', '#288db5'],
        data: [40, 20]
      }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}

</script>
