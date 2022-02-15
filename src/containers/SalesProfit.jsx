import '../styles/globals.scss';
import { useState, useEffect } from 'react';
import api from '../api/analytics';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Card, ButtonGroup, BarChart, LineChart } from '../components';
import { AiOutlineBarChart, AiOutlineLineChart } from 'react-icons/ai';
import dates from '../utils/dates';

export function SalesProfit() {
  const endPoints = [
    { url: 'salesAmount', name: 'Sales' },
    { url: 'profit', name: 'Gross Profit' },
    //  { url: "cogs", name: "COGS" },
  ];

  const charts = {
    BAR: 'bar',
    LINE: 'line',
  };

  const chartSwitchButtons = [
    { label: <AiOutlineBarChart />, value: charts.BAR },
    { label: <AiOutlineLineChart />, value: charts.LINE },
  ];

  const intervals = {
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    QUARTER: 'quarter',
  };

  const intervalSwitchButtons = [
    { label: '7 D', value: intervals.DAY },
    { label: '8 W', value: intervals.WEEK },
    { label: '6 M', value: intervals.MONTH },
    { label: '4 Q', value: intervals.QUARTER },
  ];

  const [selectedInterval, setSelectedInterval] = useState(
    intervalSwitchButtons[0].value
  );
  const [activeChart, setActiveChart] = useState(chartSwitchButtons[0].value);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);

  useEffect(() => {
    const apiCalls = [];
    let fetched = [];

    endPoints.forEach((endPoint) => {
      apiCalls.push(
        api.get(`${endPoint.url}`, {
          params: {
            period: selectedInterval,
          },
        })
      );
    });

    const getDataFromEndpoints = () => {
      Promise.all(apiCalls)
        .then((results) => {
          results.forEach((result) => {
            fetched.push(result.data[0]);
          });

          setData(formatData(fetched));
          setIsLoading(false);
          setLoadingError(false);
        })
        .catch((err) => {
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
    };

    getDataFromEndpoints();
  }, [selectedInterval]);

  function formatData(fetchedData) {
    const data = {};

    data.stats = fetchedData.map((data, index) => {
      return {
        label: endPoints[index].name,
        data: data.data,
      };
    });
    console.log('periods: ' + getPeriods(fetchedData.length));
    data.labels = getPeriods(fetchedData[0].data.length);
    console.log('data.labels: ' + data.labels);

    console.log(data);

    return data;
  }

  function getPeriods(interval) {
    let periods = [];

    switch (selectedInterval) {
      case intervals.WEEK:
        periods = dates.getWeeks(interval);
        break;

      case intervals.MONTH:
        periods = dates.getMonths(interval);
        break;

      case intervals.QUARTER:
        periods = dates.getQuarters(interval);
        break;

      default:
        periods = dates.getDays(interval);
        break;
    }

    return periods;
  }

  function onPeriodChange(selectedPeriod) {}

  return (
    <Card>
      {isLoading ? (
        <div style={{ padding: '20px' }}>
          <Skeleton count={15} />
        </div>
      ) : loadingError ? (
        <div>Error: </div>
      ) : (
        <>
          <Card.Header>
            <Card.Title title='Sales vs Profit' />
          </Card.Header>
          <Card.Header>
            <ButtonGroup
              size='small'
              color='primary'
              variant='outlined'
              activeButton={activeChart}
              buttons={chartSwitchButtons}
              onClick={(activeBtnValue) => {
                setActiveChart(activeBtnValue);
              }}
            />

            <ButtonGroup
              size='small'
              color='primary'
              variant='outlined'
              activeButton={selectedInterval}
              buttons={intervalSwitchButtons}
              onClick={(activeBtnValue) => {
                setSelectedInterval(activeBtnValue);
                onPeriodChange(activeBtnValue);
              }}
            />
          </Card.Header>

          <Card.Body style={{ paddingTop: '2.5vh' }}>
            {data &&
              (activeChart === charts.BAR ? (
                <BarChart data={data} />
              ) : (
                <LineChart data={data} />
              ))}
          </Card.Body>
        </>
      )}
    </Card>
  );
}
