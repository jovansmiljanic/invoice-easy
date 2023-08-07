// Core types
import type { FC } from "react";
import { useState, useEffect } from "react";

import { Invoice } from "@types";

// Vendors
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getTotalAmountsByMonth } from "@utils/client";

interface LineChart {
  invoices?: Invoice[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const index: FC<LineChart> = ({ invoices }) => {
  const [totalAmountsByMonth, setTotalAmountsByMonth] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    const result = getTotalAmountsByMonth(invoices);
    setTotalAmountsByMonth(result);
  }, [invoices]);

  const labels = Object.keys(totalAmountsByMonth).sort();
  const totalAmounts = labels.map((key) => totalAmountsByMonth[key]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Month Amount",
        data: totalAmounts,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.3,
      },
    ],
  };

  return <Line data={chartData} />;
};

export { index as LineChart };
