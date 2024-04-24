// // Core types
// import { type FC, useState, useEffect } from "react";

// // Global types
// import { Invoice } from "@types";

// // Vendors
// import useTranslation from "next-translate/useTranslation";

// // Chart js
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Client utils
// // import { getTotalAmountsByMonth } from "@utils/client";

// interface LineChart {
//   invoices?: Invoice[];
// }

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const index: FC<LineChart> = ({ invoices }) => {
//   // Translation
//   const { t } = useTranslation();

//   const [totalAmountsByMonth, setTotalAmountsByMonth] = useState<
//     Record<string, number>
//   >({});

//   useEffect(() => {
//     const result = getTotalAmountsByMonth(invoices);
//     setTotalAmountsByMonth(result);
//   }, [invoices]);

//   const labels = Object.keys(totalAmountsByMonth).sort();
//   const totalAmounts = labels.map(key => totalAmountsByMonth[key]);

//   const chartData = {
//     labels,
//     datasets: [
//       {
//         label: t("table:chartLabel"),
//         data: totalAmounts,
//         fill: false,
//         borderColor: "rgb(75, 192, 192)",
//         tension: 0.3,
//       },
//     ],
//   };

//   return <Line data={chartData} />;
// };

// export { index as LineChart };
