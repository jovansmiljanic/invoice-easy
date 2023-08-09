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
import styled, { css } from "styled-components";

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

const Wrap = styled.div`
  width: 100%;

  canvas {
    width: 100% !important;
    height: auto !important;
  }
`;

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

  return (
    <Wrap>
      <Line data={chartData} />
    </Wrap>
  );
};

export { index as LineChart };
