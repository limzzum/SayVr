import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import "./style.css";

interface ScoreHistory {
  grammarTotal: number;
  contextTotal: number;
  pronunciationTotal: number;
  averageTotal: number;
  createdAt: string;
}

export interface ChartData {
  averageTotal: number;
  contextTotal: number;
  grammarTotal: number;
  pronunciationTotal: number;
  createdAt: string;
  scoreHistory: ScoreHistory[];
}

interface ChartComponentProps {
  data: ChartData | null;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data }) => {
  const [chartData, setChartData] = useState<ApexOptions>({
    series: [],
    chart: {
      height: 350,
      type: "line" as const,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      colors: [],
    },
    markers: {
      colors: [],
      size: 6,
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: data?.scoreHistory?.map((item: ScoreHistory) => item.createdAt) || [],
    },
  });

  useEffect(() => {
    if (data && data.scoreHistory) {
      const seriesData = [
        {
          name: "Grammar Total",
          data: data.scoreHistory.map((item: ScoreHistory) => item.grammarTotal),
        },
        {
          name: "Context Total",
          data: data.scoreHistory.map((item: ScoreHistory) => item.contextTotal),
        },
        {
          name: "Pronunciation Total",
          data: data.scoreHistory.map((item: ScoreHistory) => item.pronunciationTotal),
        },
        {
          name: "Average Total",
          data: data.scoreHistory.map((item: ScoreHistory) => item.averageTotal),
        },
      ];

      const colors = ["#0000ff", "#00ff00", "#ffff00", "#ff0000"];
      setChartData((prevChartData) => ({
        ...prevChartData,
        series: seriesData,
        stroke: {
          ...prevChartData.stroke,
          colors: colors,
        },
        markers: {
          ...prevChartData.markers,
          colors: colors,
        },
      }));
    } else {
      console.log("No data or scoreHistory");
    }
  }, [data]);

  return (
    <div className="col-12 custom-chart-container" style={{ marginBottom: "20px" }}>
      <h3>학습별 평균 등급 변동치</h3>
      <ApexCharts options={chartData} series={chartData.series} type="line" height={250} />
    </div>
  );
};

export default ChartComponent;
