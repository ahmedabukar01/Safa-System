"use client"
import ReactApexChart from "react-apexcharts";
import dynamic from "next/dynamic";

export const DonutChart = ({seriesValues, labelNames}: any) => {

  console.log()
    // const series = [44, 55, 41, 17, 15];
  
    const  options = {
              chart: {
                type: 'donut',
              },
              labels: labelNames,
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
    <ReactApexChart options={options} series={seriesValues} type="donut" />
  )
}
