import { Line, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

function MonitoringCharts({ metrics }) {
  if (!metrics) return null

  // Generate time labels for the last 10 minutes
  const timeLabels = Array.from({ length: 10 }, (_, i) => {
    const minutes = 10 - i
    return `${minutes}m ago`
  }).reverse()

  // Generate fake CPU data over time
  const cpuData = timeLabels.map(() => 
    metrics.cpu + (Math.random() * 10 - 5)
  )

  // Generate fake memory data over time
  const memoryData = timeLabels.map(() => 
    metrics.memory + (Math.random() * 5 - 2.5)
  )

  // Generate fake request rate data
  const requestData = timeLabels.map(() => 
    metrics.requests + (Math.random() * 20 - 10)
  )

  // CPU Usage Line Chart
  const cpuChartData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: cpuData,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  // Memory Usage Line Chart
  const memoryChartData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Memory Usage (%)',
        data: memoryData,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  // Request Rate Line Chart
  const requestChartData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Request Rate (req/s)',
        data: requestData,
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  // Error Rate Doughnut Chart
  const errorChartData = {
    labels: ['Success', 'Errors'],
    datasets: [
      {
        data: [100 - metrics.errors, metrics.errors],
        backgroundColor: ['rgb(16, 185, 129)', 'rgb(239, 68, 68)'],
        borderWidth: 0,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#e2e8f0',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.9)',
        titleColor: '#e2e8f0',
        bodyColor: '#e2e8f0',
        borderColor: '#475569',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#94a3b8',
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
      },
      x: {
        ticks: {
          color: '#94a3b8',
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#e2e8f0',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.9)',
        titleColor: '#e2e8f0',
        bodyColor: '#e2e8f0',
        borderColor: '#475569',
        borderWidth: 1,
      },
    },
  }

  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-white mb-4">Monitoring Metrics</h4>
      
      {/* Prometheus & Grafana Explanation */}
      <div className="mb-6 bg-devops-gray/50 p-4 rounded-lg border border-devops-light-gray">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h5 className="text-sm font-semibold text-devops-blue mb-2">📊 Prometheus</h5>
            <p className="text-xs text-gray-300">
              Prometheus scrapes metrics from your application endpoints at regular intervals. It stores time-series data and provides a query language (PromQL) for analysis.
            </p>
          </div>
          <div>
            <h5 className="text-sm font-semibold text-devops-blue mb-2">📈 Grafana</h5>
            <p className="text-xs text-gray-300">
              Grafana visualizes Prometheus metrics in beautiful dashboards. It allows you to create alerts, set thresholds, and monitor your application's health in real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CPU Usage Chart */}
        <div className="bg-devops-gray/30 p-4 rounded-lg border border-devops-light-gray">
          <h5 className="text-sm font-semibold text-white mb-3">CPU Usage Over Time</h5>
          <div style={{ height: '200px' }}>
            <Line data={cpuChartData} options={chartOptions} />
          </div>
        </div>

        {/* Memory Usage Chart */}
        <div className="bg-devops-gray/30 p-4 rounded-lg border border-devops-light-gray">
          <h5 className="text-sm font-semibold text-white mb-3">Memory Usage Over Time</h5>
          <div style={{ height: '200px' }}>
            <Line data={memoryChartData} options={chartOptions} />
          </div>
        </div>

        {/* Request Rate Chart */}
        <div className="bg-devops-gray/30 p-4 rounded-lg border border-devops-light-gray">
          <h5 className="text-sm font-semibold text-white mb-3">Request Rate Over Time</h5>
          <div style={{ height: '200px' }}>
            <Line data={requestChartData} options={chartOptions} />
          </div>
        </div>

        {/* Error Rate Chart */}
        <div className="bg-devops-gray/30 p-4 rounded-lg border border-devops-light-gray">
          <h5 className="text-sm font-semibold text-white mb-3">Error Rate</h5>
          <div style={{ height: '200px' }}>
            <Doughnut data={errorChartData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Alert Examples */}
      <div className="mt-6 bg-devops-gray/50 p-4 rounded-lg border border-devops-light-gray">
        <h5 className="text-sm font-semibold text-white mb-3">🚨 Alert Examples</h5>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-devops-green">✓</span>
            <span className="text-gray-300">CPU Usage: {metrics.cpu.toFixed(1)}% (Threshold: 80%)</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-devops-green">✓</span>
            <span className="text-gray-300">Memory Usage: {metrics.memory.toFixed(1)}% (Threshold: 85%)</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-devops-green">✓</span>
            <span className="text-gray-300">Error Rate: {metrics.errors.toFixed(2)}% (Threshold: 1%)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonitoringCharts

