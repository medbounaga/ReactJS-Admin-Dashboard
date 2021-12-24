import "../styles/globals.scss";
import { useState, useEffect } from "react";
import {
  Dropdown, Card, Table,
} from "../components";
import { StatsIndicator } from "../components/StatsIndicator";
import api from '../api/analytics';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function PerformanceTable() {

  const periods = {
    DAY: "day",
    WEEK: "week",
    MONTH: "month",
    QUARTER: "quarter"
  };


  const tableHeaderPeriods = {
    [periods.DAY]: { current: "Today", previous: "Yestersay" },
    [periods.WEEK]: { current: "This Week", previous: "Last Week" },
    [periods.MONTH]: { current: "This Month", previous: "Last Month" },
    [periods.QUARTER]: { current: "This Quarter", previous: "Last Quarter" }
  }

  const [tableHeaderPeriod, setTableHeaderPeriod] = useState(tableHeaderPeriods[periods.DAY]);




  const endPoints = [
    { url: "cogs", name: "Cogs" },
    { url: "saleOrdersCount", name: "Sale Orders" },
    { url: "salesAmount", name: "Sales" },
    { url: "profit", name: "Gross Profit" },
  ];


  const menuOptions = [
    { label: "Today vs Yesterday", value: periods.DAY },
    { label: "This Week vs Last Week", value: periods.WEEK },
    { label: "This Month vs Last Month", value: periods.MONTH },
    { label: "This Quarter vs Last Quarter", value: periods.QUARTER }
  ];


  const [selectedPeriod, setSelectedPeriod] = useState(menuOptions[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);
  const [data, setData] = useState([]);




  useEffect(() => {

    const apiCalls = [];
    let fetched = [];

    endPoints.forEach((endPoint) => {
      apiCalls.push(
        api.get(
          `${endPoint.url}`, {
          params: {
            period: selectedPeriod.value
          }
        }));
    })

    

    const getDataFromEndpoints = () => {



      Promise.all(apiCalls).then(results => {
        results.forEach((result, index) => {
          fetched.push(formatData(result.data[0], endPoints[index].name));
        })
        setIsLoading(false);
        setData(fetched);
        setLoadingError(false);


      }).catch((err) => {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }

        setIsLoading(false);
        setLoadingError(true);
      });

    }



    getDataFromEndpoints();




  }, [selectedPeriod])




  function formatData(fetchedData, endPointName) {
    let period_0 = Math.trunc(
      Number(fetchedData.data.period_0)
    );

    let period_1 = Math.trunc(
      Number(fetchedData.data.period_1)
    );
    let difference = period_0 - period_1;

    if (difference >= 0) {
      difference = `+${difference}`;
    }

    let percentage;
    
    
      percentage =  ((period_0 - period_1) / period_1) * 100;
    
      
    
    percentage = Number.parseFloat(percentage).toFixed(1);

    const formatedData = {
      title: endPointName,
      period_0: period_0,
      period_1: period_1,
      difference: difference,
      percentage: percentage
    };

    return formatedData;
  }

  function callback(selectedValue) {
    switch (selectedValue) {
      case periods.DAY:
        setTableHeaderPeriod(tableHeaderPeriods[periods.DAY]);
        break;

      case periods.WEEK:
        setTableHeaderPeriod(tableHeaderPeriods[periods.WEEK]);
        break;

      case periods.MONTH:
        setTableHeaderPeriod(tableHeaderPeriods[periods.MONTH]);
        break;

      default:
        setTableHeaderPeriod(tableHeaderPeriods[periods.QUARTER]);
        break;
    }
  }




  return (
    <Card>
      {isLoading ? (
        <Skeleton count={15} />
      ) : loadingError ? (
        <div>Error: </div>
      ) : (
        <>
          <Card.Header >
            <Card.Title title="Key percentage titles" />
            <Dropdown
              options={menuOptions}
              selectedOption={selectedPeriod}
              setSelectedOption={setSelectedPeriod}
              callback={callback}
            />
          </Card.Header>
          <Card.Body>
            <Table style={{ display: '' }}>
              <Table.Head>
                <Table.TR>
                  <Table.TH></Table.TH>
                  <Table.TH>{tableHeaderPeriod.current}</Table.TH>
                  <Table.TH>{tableHeaderPeriod.previous}</Table.TH>
                  <Table.TH>Change</Table.TH>
                  <Table.TH>Change(%)</Table.TH>
                </Table.TR>
              </Table.Head>
              <Table.Body>

                {data.map((d, id) => (

                  <Table.TR key={id}>
                    <Table.TD>{d.title}</Table.TD>
                    <Table.TD>{d.period_0}</Table.TD>
                    <Table.TD>{d.period_1}</Table.TD>
                    <Table.TD>{d.difference}</Table.TD>
                    <Table.TD>
                      <StatsIndicator value={d.percentage} />
                    </Table.TD>
                  </Table.TR>
                ))}
              </Table.Body>
            </Table>
          </Card.Body>
        </>
      )}
    </Card>




  );
}
