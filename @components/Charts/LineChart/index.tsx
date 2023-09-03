// Core types
import { type FC, useState, useEffect } from "react";

// Global types
import { Invoice } from "@types";

// Vendors
import { Line } from "react-chartjs-2";
import styled, { css } from "styled-components";
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

// Client utils
import { getTotalAmountsByMonth } from "@utils/client";

const Wrap = styled.div`
  width: 100%;
`;

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

  return (
    <Wrap>
      <Line data={chartData} />
    </Wrap>
  );
};

export { index as LineChart };