import moment from "moment";
import { BasicSignal, Signal } from "./app/types";

interface SignalData {
  [key: string]: number;
}

export const nonZeroSignalsNew = (signals: any) => {
  const nonZeroSignals: any = {};
  
  for (let signalType in signals) {
    if (signals.hasOwnProperty(signalType) && signals[signalType] !== 0) {
      nonZeroSignals[signalType] = signals[signalType];
    }
  }
  
  return nonZeroSignals;
}

export const nonZeroSignals = (signals: any[]): Signal[] => {
  let result = [];
  if (signals[0]?.signal_name) {
    result = Object.values(
      signals.reduce(
        (
          acc: { [key: string]: Signal },
          { name, count, zipcode, signal_name }
        ) => ({
          ...acc,
          [signal_name]: {
            name: signal_name,
            count: (acc[signal_name]?.count || 0) + count,
            zipcode,
          },
        }),
        {}
      )
    ).filter((signal: any) => !!signal.count);
  } else {
    result = signals.filter((signal) => !!signal.count);
  }

  return result;
};
export const getLastMonths = (monthsQty: number) => {
  const months = [];
  for (let i = 0; i < monthsQty; i++) {
    const month = moment().subtract(i, "months").format("MMMM");
    months.push(month.toLowerCase());
  }
  return months.reverse();
};

export const getMonthlySignals = (signalName: string, signals?: Signal[]) => {
  if (!signals) return {};
  const lastSixMonths = getLastMonths(6);

  const signalsByName = signals.filter((signal) => signal.name === signalName);

  const lastSixMonthsSignals = Object.fromEntries(
    lastSixMonths.map((month) => [month.toLowerCase(), 0])
  );

  signalsByName.forEach((signal) => {
    const month = moment(signal.date).format("MMMM").toLowerCase();
    if (lastSixMonthsSignals[month] !== undefined) {
      lastSixMonthsSignals[month] += signal.count;
    }
  });
  return lastSixMonthsSignals;
};

export const removeNullFields = (filters: any) => {
  for (var propName in filters) {
    if (!filters[propName]) {
      delete filters[propName];
    }
  }
  return filters;
};

export const todayDate = (): string => {
  return moment().format("YYYY-MM-DD");
};

export const getTimePeriod = (period: string | undefined): string => {
  switch (period) {
    case "Last 3 Month":
      return moment().subtract(3, "months").format("YYYY-MM-DD");
    case "Last 6 Month":
      return moment().subtract(6, "months").format("YYYY-MM-DD");
      break;
    case "Last 9 Month":
      return moment().subtract(9, "months").format("YYYY-MM-DD");
      break;
    case "Last Year":
      return moment().subtract(12, "months").format("YYYY-MM-DD");
    default:
      return moment().subtract(6, "months").format("YYYY-MM-DD");
  }
};

export const getUrlParams = (object: any) =>
  Object.keys(object)
    .map((key) => {
      if (!!object[key]) {
        return `${key}=${object[key]}`;
      }
    })
    .filter(Boolean)
    .join()
    .replaceAll(",", "&");

export const groupSignalsByMonth = (signals: any, month: string, signal: string) => {
      let result = 0;    
      const nonZero = signals.filter((s: any) => s[signal] > 0 ).forEach((s: any) => {
      const signalOcurrenceMonth = new Date(s.date).toLocaleString('default', { month: 'long' }).toLowerCase();
      if(signalOcurrenceMonth === month) {
      result += s[signal];
      }
    })
  return result

}

export const totalCountAllSignalsType = (data: any) => {
  const signalCounts = Object.values(data);
  return signalCounts.reduce((acc: number, count: any) => acc + count, 0);
};

export const groupByMonthAndSum = (signalsObj: any, month: string, signal: string) => {
  let result = 0;
  Object.entries(signalsObj).forEach(([date, signalData]) => {
    const signalOcurrenceMonth = new Date(date).toLocaleString('default', { month: 'long' }).toLowerCase();
    
    if (signalOcurrenceMonth === month) {
      result += (signalData as SignalData)[signal] || 0;
    }
  });
  return result;
};

export const unifyNameFields = (data: any) => {
    return data.map((signal: any) => {
      const { agent_name, agent_lastname, ...rest } = signal;
      const agent_fullname = [agent_name, agent_lastname].filter(Boolean).join(' ');
    
      return { ...rest, agent_fullname };
  });
}