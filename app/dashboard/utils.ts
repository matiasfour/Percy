import { Dataset } from "@/components/lineChart";
interface chartDataParams {
  label: string;
  value: number;
}

export function getChartData(dataset: chartDataParams[]): Dataset[] {
  const data = dataset.map((item: chartDataParams) => {
    return {
      label: item.label,
      data: [item.value, 1239, 13, 345, 456],
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
    };
  });

  return data;
}
