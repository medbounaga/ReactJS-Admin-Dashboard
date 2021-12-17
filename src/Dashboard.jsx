import "./styles.scss";
import { useState, useEffect } from "react";
import { Dropdown, PerformanceTable, BarChart, BarChart1, TableExample, Card } from "./components";
import { FaChartBar, FaChartLine } from "react-icons/fa";

export default function Dashboard() {
  const Periods = {
    DAY: "day",
    WEEK: "week",
    MONTH: "month",
    QUARTER: "quarter"
  };

  const options = [
    { label: "Today vs Yesterday", value: Periods.DAY },
    { label: "This Week vs Last Week", value: Periods.WEEK },
    { label: "This Month vs Last Month", value: Periods.MONTH },
    { label: "This Quarter vs Last Quarter", value: Periods.QUARTER }
  ];

  const daily = {
    saleOrdersCount: {
      title: "number of sale orders",
      period: "day",
      interval: 2,
      data: { period_0: 60, period_1: 10 }
    }
  };

  const weekly = {
    saleOrdersCount: {
      title: "number of sale orders",
      period: "week",
      interval: 2,
      data: { period_0: 10, period_1: 20 }
    }
  };

  const monthly = {
    saleOrdersCount: {
      title: "number of sale orders",
      period: "month",
      interval: 2,
      data: { period_0: 30, period_1: 10 }
    }
  };

  const quarterly = {
    saleOrdersCount: {
      title: "number of sale orders",
      period: "quarter",
      interval: 2,
      data: { period_0: 40, period_1: 70 }
    }
  };

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const [data, setData] = useState(formatData(weekly));

  useEffect(() => {});

  function formatData(fetchedData) {
    let period_0 = Math.trunc(
      Number(fetchedData.saleOrdersCount.data.period_0)
    );

    let period_1 = Math.trunc(
      Number(fetchedData.saleOrdersCount.data.period_1)
    );
    let difference = period_0 - period_1;

    if (difference >= 0) {
      difference = `+${difference}`;
    }

    let performace = ((period_0 - period_1) / period_0) * 100;
    performace = Number.parseFloat(performace).toFixed(1);

    const saleOrdersCount = {
      indicator: "Sales Orders",
      period_0: period_0,
      period_1: period_1,
      difference: difference,
      performance: performace
    };

    return saleOrdersCount;
  }

  function callback(selectedValue) {
    switch (selectedValue) {
      case Periods.WEEK:
        setData(formatData(weekly));
        break;

      case Periods.MONTH:
        setData(formatData(monthly));
        break;

      case Periods.QUARTER:
        setData(formatData(quarterly));
        break;

      default:
        setData(formatData(daily));
        break;
    }
  }

  return (

    
    
    <Card title="Key Performance Indicators">
      
        
        <div class="chart-nav">
          <div>
            <FaChartBar />
          </div>
          <div>
            <FaChartLine />
          </div>
        </div>
     
      <Dropdown
        options={options}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        callback={callback}
      />
      <PerformanceTable data={data} />

      </Card>
  );
}
