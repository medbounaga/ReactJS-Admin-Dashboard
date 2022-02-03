import { useEffect, useState, useMemo } from 'react';
import { ButtonGroup, Card, Table, Loader, LinkList } from '../components';
import api from '../api/analytics';
import styles from '../styles/RecentTransactions.module.scss';
import useSortableData from '../hooks/useSortableData';
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { openModal } from '../store/modalSlice';

export function RecentTransactions() {
  const endPoint = useMemo(() => {
    return { url: 'transations', name: 'Transactions' };
  }, []);

  const dispatch = useDispatch();

  const Status = useMemo(() => {
    return {
      PAID: 'Paid',
      CANCELLED: 'Cancelled',
      PENDING: 'Pending',
      ALL: 'All',
    };
  }, []);

  const statusOptions = [
    { label: 'Paid', value: Status.PAID },
    { label: 'Cancelled', value: Status.CANCELLED },
    { label: 'Pending', value: Status.PENDING },
    { label: 'All', value: Status.ALL },
  ];

  const thData = [
    { title: 'Order No', sortBy: 'orderNo', id: 'orderNo' },
    { title: 'Customer', sortBy: 'customer', id: 'customer' },
    { title: 'Date', sortBy: 'date', id: 'date' },
    { title: 'Ref', sortBy: 'ref', id: 'ref' },
    { title: 'Amount', sortBy: 'amount', id: 'amount' },
    { title: 'Status', sortBy: 'status', id: 'status' },
  ];

  const defaultSortBy = { key: 'date', direction: 'descending' };

  const [statusFilter, setStatusFilter] = useState(statusOptions[3]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const { sortedItems, requestSort, sortedBy } = useSortableData(
    filteredItems,
    defaultSortBy
  );

  useEffect(() => {
    const getDataFromEndpoint = async () => {
      try {
        const result = await api.get(`${endPoint.url}`);
        console.log('transactions');
        console.log(result.data[0]);
        const newItems = convertToDateObject(result.data[0].data);
        console.log('newData');
        console.log(result.data[0]);
        setItems(newItems);
        setFilteredItems(newItems);
        console.log('setFilteredData');
        console.log(filteredItems);
        setIsLoading(false);
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

    getDataFromEndpoint();
  }, [endPoint]);

  useEffect(() => {
    if (statusFilter.value === Status.ALL) {
      setFilteredItems(items);
    } else {
      const dataFiltered = items.filter((payment) => {
        return payment.status === statusFilter.value;
      });

      setFilteredItems(dataFiltered);
    }
  }, [statusFilter, items, Status]);

  function convertToDateObject(fetchedData) {
    const newData = fetchedData.map((data) => {
      data.date = new Date(data.date);
      return data;
    });

    return newData;
  }

  const getSortingClassNames = (name) => {
    if (!sortedBy) {
      return;
    }
    return sortedBy.key === name
      ? sortedBy.direction === 'ascending'
        ? styles.ascending
        : styles.descending
      : undefined;
  };

  const getStatusClassName = (status) => {
    switch (status) {
      case Status.PAID:
        return 'badge green';

      case Status.PENDING:
        return 'badge orange';

      case Status.CANCELLED:
        return 'badge red';

      default:
        return undefined;
    }
  };

  const getHideClassNames = (ColumnId) => {
    switch (ColumnId) {
      case 'ref':
        return styles.colMdHide;

      case 'date':
        return styles.colSmHide;

      case 'customer':
        return styles.colSmHide;

      default:
        break;
    }
  };

  const resquestDeletePayment = (item) => {
    console.log('delete clicked');

    if (item.status === Status.PENDING || item.status === Status.PAID) {
      dispatch(
        openModal({
          componentName: 'ErrorMessage',
          childrenProps: {
            message: 'Item should be cancelled first',
          },
        })
      );
    } else {
      dispatch(
        openModal({
          componentName: 'ConfirmAction',
          childrenProps: {
            handleConfirm: () => deletePayment(item),
          },
        })
      );
    }
  };

  const deletePayment = (item) => {
    setItems(
      items.filter((i) => {
        return i.orderNo !== item.orderNo;
      })
    );
  };

  const confirmPayment = (id) => {
    const newItemList = items.map((payment) => {
      if (payment.orderNo === id) {
        const confirmedPayment = {
          ...payment,
          status: Status.PAID,
        };

        return confirmedPayment;
      }

      return payment;
    });

    setItems(newItemList);
  };

  const cancelPayment = (id) => {
    const newItemList = items.map((payment) => {
      if (payment.orderNo === id) {
        const cancelledPayment = {
          ...payment,
          status: Status.CANCELLED,
        };

        return cancelledPayment;
      }

      return payment;
    });

    setItems(newItemList);
  };

  return (
    <Card>
      {isLoading ? (
        <Loader height={15} />
      ) : loadingError ? (
        <div>Error: </div>
      ) : (
        <>
          <Card.Header>
            <Card.Title title='Transactions' />
          </Card.Header>
          <Card.Header>
            <ButtonGroup
              activeButton={statusFilter}
              setActiveButton={setStatusFilter}
              buttons={statusOptions}
              onClick={() => {}}
            />
          </Card.Header>
          <Card.Body>
            <Table>
              <Table.Head>
                <Table.TR>
                  {thData.map(({ title, id }) => (
                    <Table.TH key={title} className={getHideClassNames(id)}>
                      <div
                        onClick={() => requestSort(id)}
                        className={getSortingClassNames(id)}
                      >
                        {title}
                      </div>
                    </Table.TH>
                  ))}
                </Table.TR>
              </Table.Head>
              <Table.Body>
                {sortedItems &&
                  sortedItems.map((d, id) => (
                    <Table.TR key={id}>
                      <Table.TD>
                        <span>{d.orderNo}</span>
                      </Table.TD>
                      <Table.TD className={styles.colSmHide}>
                        <span>
                          <img src={`/img/partners/${d.imgUrl}.png`} alt='' />
                        </span>
                        <span>{d.customer}</span>
                      </Table.TD>
                      <Table.TD className={styles.colSmHide}>
                        <span>{moment(d.date).format('MM/DD/YYYY')}</span>
                      </Table.TD>
                      <Table.TD className={styles.colMdHide}>
                        <span>{d.ref}</span>
                      </Table.TD>
                      <Table.TD>
                        <span>{d.amount}</span>
                      </Table.TD>
                      <Table.TD>
                        <span className={getStatusClassName(d.status)}>
                          {d.status}
                        </span>
                      </Table.TD>
                      <Table.TD>
                        <LinkList>
                          {d.status === Status.PENDING && (
                            <LinkList.Item
                              title='Confirm'
                              icon={<HiOutlineEye />}
                              callback={() =>
                                dispatch(
                                  openModal({
                                    componentName: 'ConfirmAction',
                                    childrenProps: {
                                      handleConfirm: () =>
                                        confirmPayment(d.orderNo),
                                    },
                                  })
                                )
                              }
                            />
                          )}
                          <LinkList.Item
                            title='View'
                            icon={<HiOutlineEye />}
                            callback={() =>
                              dispatch(
                                openModal({
                                  componentName: 'ViewTransaction',
                                  childrenProps: {
                                    transaction: {
                                      ...d,
                                      date: moment(d.date).format('MM/DD/YYYY'),
                                    },
                                  },
                                })
                              )
                            }
                          />

                          <LinkList.Item
                            title='Delete'
                            icon={<HiOutlineTrash />}
                            callback={() => resquestDeletePayment(d)}
                          />
                          {(d.status === Status.PENDING ||
                            d.status === Status.PAID) && (
                            <LinkList.Item
                              title='Cancel'
                              icon={<HiOutlineTrash />}
                              callback={() =>
                                dispatch(
                                  openModal({
                                    componentName: 'ConfirmAction',
                                    childrenProps: {
                                      handleConfirm: () =>
                                        cancelPayment(d.orderNo),
                                    },
                                  })
                                )
                              }
                            />
                          )}
                        </LinkList>
                      </Table.TD>
                    </Table.TR>
                  ))}
              </Table.Body>
            </Table>
            {!items?.length && (
              <div className={styles.empty}>No items found</div>
            )}
          </Card.Body>
        </>
      )}
    </Card>
  );
}
