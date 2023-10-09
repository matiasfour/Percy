export type Dataset = {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
};
export type LineChartData = {
  labels: string[];
  datasets: Dataset[];
};
