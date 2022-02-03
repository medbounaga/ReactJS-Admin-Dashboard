import styles from '../styles/PerformanceStats.module.scss';
import { useState, useEffect } from 'react';
import { Dropdown, Card, DonutChart } from '../components';
import {
  HiOutlineArrowNarrowDown,
  HiOutlineArrowNarrowUp,
} from 'react-icons/hi';
import api from '../api/analytics';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function PerformanceStats() {
  const periods = {
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    QUARTER: 'quarter',
  };

  const currentPreviousPeriods = {
    [periods.DAY]: { current: 'Today', previous: 'Yestersay' },
    [periods.WEEK]: { current: 'This Week', previous: 'Last Week' },
    [periods.MONTH]: { current: 'This Month', previous: 'Last Month' },
    [periods.QUARTER]: { current: 'This Quarter', previous: 'Last Quarter' },
  };

  const [currentPreviousPeriod, setCurrentPreviousPeriod] = useState(
    currentPreviousPeriods[periods.DAY]
  );

  const endPoints = [
    { url: 'profit', name: 'Total Profit' },
    { url: 'cogs', name: 'Total Expenses' },
    { url: 'salesAmount', name: 'Total Revenue' },
    { url: 'profit', name: 'Profit' },
  ];

  const menuOptions = [
    { label: 'Today vs Yesterday', value: periods.DAY },
    { label: 'This Week vs Last Week', value: periods.WEEK },
    { label: 'This Month vs Last Month', value: periods.MONTH },
    { label: 'This Quarter vs Last Quarter', value: periods.QUARTER },
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
        api.get(`${endPoint.url}`, {
          params: {
            period: selectedPeriod.value,
          },
        })
      );
    });

    const getDataFromEndpoints = () => {
      Promise.all(apiCalls)
        .then((results) => {
          results.forEach((result, index) => {
            fetched.push(formatData(result.data[0], endPoints[index].name));
          });
          setIsLoading(false);
          setData(fetched);
          setLoadingError(false);
        })
        .catch((err) => {
          if (err.response) {
            // Not in the 200 response range
            console.error(err.response.data);
            console.error(err.response.status);
            console.error(err.response.headers);
          } else {
            console.error(`Error: ${err.message}`);
          }

          setIsLoading(false);
          setLoadingError(true);
        });
    };

    getDataFromEndpoints();
  }, [selectedPeriod]);

  function formatData(fetchedData, endPointName) {
    let currentPeriodValue = Math.trunc(Number(fetchedData.data[0]));
    let previousPeriodValue = Math.trunc(Number(fetchedData.data[1]));

    let currentPeriodName = currentPreviousPeriod.current;
    let previousPeriodName = currentPreviousPeriod.previous;

    let difference = currentPeriodValue - previousPeriodValue;

    if (difference >= 0) {
      difference = `+${difference}`;
    }

    let percentage;

    percentage =
      ((currentPeriodValue - previousPeriodValue) / previousPeriodValue) * 100;

    percentage = Number.parseFloat(percentage).toFixed(1);

    const formatedData = {
      title: endPointName,
      data: [currentPeriodValue, previousPeriodValue],
      labels: [currentPeriodName, previousPeriodName],
      difference: difference,
      percentage: percentage,
    };

    return formatedData;
  }

  function callback(selectedValue) {
    switch (selectedValue) {
      case periods.DAY:
        setCurrentPreviousPeriod(currentPreviousPeriods[periods.DAY]);
        break;

      case periods.WEEK:
        setCurrentPreviousPeriod(currentPreviousPeriods[periods.WEEK]);
        break;

      case periods.MONTH:
        setCurrentPreviousPeriod(currentPreviousPeriods[periods.MONTH]);
        break;

      default:
        setCurrentPreviousPeriod(currentPreviousPeriods[periods.QUARTER]);
        break;
    }
  }

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
            <Dropdown
              width='220'
              options={menuOptions}
              selectedOption={selectedPeriod}
              setSelectedOption={setSelectedPeriod}
              onChange={callback}
            />
          </Card.Header>
          <Card.Body>
            <div className={styles.wrapper}>
              {data.map((d, index) => (
                <div className={styles.singleData} key={index}>
                  <div className={styles.info}>
                    <div className={styles.title}>
                      <h3>{d.title}</h3>
                    </div>
                    <div className={styles.value}>${d.data[0]}</div>
                    <div className={styles.desc}>
                      <div
                        className={
                          Number(d.percentage) >= 0
                            ? styles.positivePerformace
                            : styles.negativePerformace
                        }
                      >
                        <span>
                          {d.percentage >= 0 ? (
                            <HiOutlineArrowNarrowUp />
                          ) : (
                            <HiOutlineArrowNarrowDown />
                          )}
                        </span>
                        <span>{Math.abs(d.percentage)}%</span>
                      </div>
                      vs. {d.labels[1]}
                    </div>
                  </div>
                  <div className={styles.thumb}>
                    <DonutChart
                      data={d.data}
                      labels={d.labels}
                      className={styles.donutChart}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card.Body>
        </>
      )}
    </Card>
  );
}
