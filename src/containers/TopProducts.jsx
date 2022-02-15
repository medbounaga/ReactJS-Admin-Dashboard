import { useEffect, useState } from 'react';
import { Card, Dropdown, ListGroup } from '../components';
import styles from '../styles/TopProducts.module.scss';
import api from '../api/analytics';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function TopProducts() {
  const periods = {
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    QUARTER: 'quarter',
  };

  const endPoint = { url: 'topProductSales', name: 'Selling Products' };

  const menuOptions = [
    { label: 'Today', value: periods.DAY },
    { label: 'Last Week', value: periods.WEEK },
    { label: 'Last Month', value: periods.MONTH },
    { label: 'Last Quarter', value: periods.QUARTER },
  ];

  const [selectedPeriod, setSelectedPeriod] = useState(menuOptions[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getDataFromEndpoints = async () => {
      try {
        const result = await api.get(`${endPoint.url}`, {
          params: { period: selectedPeriod.value },
        });
        const topproducts = (await api.get('./data/topProducts.json')).data[
          selectedPeriod.value
        ];
        console.log('topproducts: ' + topproducts);
        console.log(result.data[0]);
        console.log(formatData(result.data[0]));

        setIsLoading(false);
        setData(formatData(result.data[0]));
        setLoadingError(false);
      } catch (err) {
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
      }
    };

    getDataFromEndpoints();
  }, [selectedPeriod]);

  function formatData(fetchedData) {
    const data = fetchedData.data;

    data.sort((a, b) => {
      return b.product.salesValue - a.product.salesValue;
    });

    return data;
  }

  function callback(selectedValue) {
    switch (selectedValue) {
      case periods.DAY:
        break;

      case periods.WEEK:
        break;

      case periods.MONTH:
        break;

      default:
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
            <Card.Title title='Selling Products' />
            <Dropdown
              size='small'
              variant='outlined'
              color='primary'
              width='155'
              options={menuOptions}
              selectedOption={selectedPeriod}
              setSelectedOption={setSelectedPeriod}
              onChange={callback}
            />
          </Card.Header>
          <Card.Body>
            <ListGroup>
              {data.map((d, i) => (
                <ListGroup.Item key={i}>
                  <div className={styles.itemWrapper}>
                    <div className={styles.thumb}>
                      <img
                        src={`/img/products/${d.product.imgUrl}.png`}
                        alt=''
                      />
                    </div>
                    <div className={styles.info}>
                      <div className={styles.title}>{d.product.name}</div>
                      <div className={styles.price}>${d.product.price}</div>
                    </div>
                    <div className={styles.total}>
                      <div className={styles.amount}>
                        ${d.product.salesValue}
                      </div>
                      <div className={styles.count}>
                        {d.product.soldUnits} Orders
                      </div>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </>
      )}
    </Card>
  );
}
