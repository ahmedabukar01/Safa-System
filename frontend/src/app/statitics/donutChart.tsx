"use client"
import ReactApexChart from "react-apexcharts";
// import dynamic from "next/dynamic";

export const DonutChart = ({seriesValues, labelNames}: any) => {
  
    const  options = {
              chart: {
                type: 'donut',
              },
              labels: labelNames,
              // series: seriesValues,
              plotOptions: {
                pie: {
                  donut: {
                    size: "25%"
                  }
                }
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]

          }  

  return (
    <ReactApexChart options={options} series={seriesValues} type="donut"/>
  )
}
