"use client"
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js"
import { Radar as RadarChart } from "react-chartjs-2"

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

interface RadarProps {
  data: any[]
  index: string
  categories: string[]
  valueFormatter?: (value: number) => string
  colors?: string[]
  yAxisWidth?: number
  className?: string
}

export function Radar({ data, index, categories, valueFormatter, colors, yAxisWidth, className }: RadarProps) {
  const chartData = {
    labels: categories.map((category) => category.charAt(0).toUpperCase() + category.slice(1)),
    datasets: [
      {
        label: data[0].category,
        data: categories.map((category) => data[0][category]),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  }

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          callback: valueFormatter,
          stepSize: 25,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  return <RadarChart data={chartData} options={options} className={className} />
}
