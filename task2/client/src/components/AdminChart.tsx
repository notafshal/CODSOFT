"use client";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import getTasks from "@/app/api/getTasks";

ChartJS.register(ArcElement, Tooltip, Legend);
function AdminChart() {
  const [chartData, setChartData] = useState<any[]>([]);
  useEffect(() => {
    const fetchTask = async () => {
      const taskData = await getTasks();
      setChartData(taskData);
    };
    fetchTask();
  }, []);
  const statusData = chartData.map((status) => status.stage);
  const uniqueStages = [...new Set(statusData)];
  const statusCounts = uniqueStages.map(
    (stage) => statusData.filter((status) => status === stage).length
  );

  const data = {
    labels: [...uniqueStages],
    datasets: [
      {
        label: "Status",
        data: statusCounts,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="mx-32 bg-neutral-100 p-10 ">
      <div>
        <h2 className="text-center my-4">Progress</h2>
        <div>
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default AdminChart;
