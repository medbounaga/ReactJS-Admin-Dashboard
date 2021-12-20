import "../styles/globals.scss";
import { useState, useEffect } from "react";
import {
  Dropdown, Card, ButtonGroup, Table, BarChart
} from "../components";
import { StatsIndicator } from "../components/StatsIndicator";
import { FaChartBar, FaChartLine } from "react-icons/fa";


export function PerformanceTable() {

  const chartSwitchButtons = [
    { label: <FaChartBar />, value: 'barChart' },
    { label: <FaChartLine />, value: 'lineChart' }
  ];

  const periods = {
    DAY: "day",
    WEEK: "week",
    MONTH: "month",
    QUARTER: "quarter"
  };

  const options = [
    { label: "Today vs Yesterday", value: periods.DAY },
    { label: "This Week vs Last Week", value: periods.WEEK },
    { label: "This Month vs Last Month", value: periods.MONTH },
    { label: "This Quarter vs Last Quarter", value: periods.QUARTER }
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

  useEffect(() => { });

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

    let percentage = ((period_0 - period_1) / period_0) * 100;
    percentage = Number.parseFloat(percentage).toFixed(1);

    const saleOrdersCount = {
      indicator: "Sales Orders",
      period_0: period_0,
      period_1: period_1,
      difference: difference,
      percentage: percentage
    };

    return saleOrdersCount;
  }

  function callback(selectedValue) {
    switch (selectedValue) {
      case periods.WEEK:
        setData(formatData(weekly));
        break;

      case periods.MONTH:
        setData(formatData(monthly));
        break;

      case periods.QUARTER:
        setData(formatData(quarterly));
        break;

      default:
        setData(formatData(daily));
        break;
    }
  }

  return (


    <Card>
      <Card.Header >
        <Card.Title title="Key percentage Indicators" />
      </Card.Header>
      <Card.Header >
        <Dropdown
          options={options}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          callback={callback}
        />

        <ButtonGroup buttons={chartSwitchButtons} onClick={(value) => { }} />

      </Card.Header>

      <Card.Body>
        <Table style={{display:'none'}}>
          <Table.Head>
            <Table.TR>
              <Table.TH></Table.TH>
              <Table.TH>Today</Table.TH>
              <Table.TH>Yesterday</Table.TH>
              <Table.TH>Change</Table.TH>
              <Table.TH>Change(%)</Table.TH>
            </Table.TR>
          </Table.Head>
          <Table.Body>
            <Table.TR>
              <Table.TD>{data.indicator}</Table.TD>
              <Table.TD>{data.period_0}</Table.TD>
              <Table.TD>{data.period_1}</Table.TD>
              <Table.TD>{data.difference}</Table.TD>
              <Table.TD>
                <StatsIndicator value={data.percentage} />
              </Table.TD>
            </Table.TR>
            <Table.TR>
              <Table.TD>{data.indicator}</Table.TD>
              <Table.TD>{data.period_0}</Table.TD>
              <Table.TD>{data.period_1}</Table.TD>
              <Table.TD>{data.difference}</Table.TD>
              <Table.TD>
                <StatsIndicator value={data.percentage} />
              </Table.TD>
            </Table.TR>
          </Table.Body>
        </Table>
        <BarChart />
      </Card.Body>
      
      <Card.Footer >
        <Dropdown
          options={options}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          callback={callback}
        />

        <ButtonGroup buttons={chartSwitchButtons} onClick={(btnValue) => { }} />

      </Card.Footer>
    </Card>
  );
}
