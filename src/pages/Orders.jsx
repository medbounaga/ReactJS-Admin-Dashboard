import { useEffect, useState, useMemo } from 'react';
import {
  ButtonGroup,
  Card,
  Table,
  Loader,
  LinkList,
  Button,
  Pagination,
  Input,
} from '../components';
import api from '../api/analytics';
import styles from '../styles/RecentTransactions.module.scss';
import useSortableData from '../hooks/useSortableData';
import { HiOutlineEye, HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { BiSearch } from 'react-icons/bi';
import { openModal } from '../store/modalSlice';

export function Orders() {
  const endPoint = useMemo(() => './data/orders.json', []);

  const dispatch = useDispatch();

  const Status = useMemo(() => {
    return {
      PENDING: 'Pending',
      DELIVERED: 'Delivered',
      CANCELLED: 'Cancelled',
      ALL: 'All',
    };
  }, []);

  const statusOptions = [
    { label: 'Pending', value: Status.PENDING },
    { label: 'Delivered', value: Status.DELIVERED },
    { label: 'Cancelled', value: Status.CANCELLED },
    { label: 'All', value: Status.ALL },
  ];

  const thData = [
    { title: 'Order', sortBy: 'orderId', id: 'orderId' },
    { title: 'Date', sortBy: 'date', id: 'date' },
    { title: 'Customer', sortBy: 'customer', id: 'customer' },
    { title: 'Purchased', sortBy: 'purchased', id: 'purchased' },
    { title: 'Total', sortBy: 'total', id: 'total' },
    { title: 'Status', sortBy: 'status', id: 'status' },
  ];

  const defaultSortBy = { key: 'date', direction: 'descending' };

  const [statusFilter, setStatusFilter] = useState(statusOptions[3].value);
  const [globalFilter, setGlobalFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const { sortedItems, requestSort, sortedBy } = useSortableData(
    filteredItems,
    defaultSortBy
  );

  const [currentPaginationItems, setCurrentPaginationItems] = useState(null);
  const [resetPagination, setResetPagination] = useState(false);

  const itemsPerPage = useMemo(() => 10, []);

  useEffect(() => {
    const getDataFromEndpoint = async () => {
      try {
        const orders = (await api.get(endPoint)).data;
        const newData = convertToDateObject(orders);
        setItems(newData);
        setFilteredItems(newData);
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
    let itemsFiltered = [];
    if (statusFilter === Status.ALL) {
      itemsFiltered = items;
    } else {
      itemsFiltered = items.filter((order) => {
        return order.status === statusFilter;
      });
    }

    const globalFilters = ['orderId', 'customer', 'total', 'date', 'purchased'];

    itemsFiltered = itemsFiltered.filter((item) => {
      let includesKeyword = false;
      for (let searchby of globalFilters) {
        if (
          String(item[searchby])
            .toLowerCase()
            .includes(globalFilter.toLowerCase())
        ) {
          includesKeyword = true;
          break;
        }
      }
      return includesKeyword;
    });

    setFilteredItems(itemsFiltered);
  }, [statusFilter, globalFilter, items, Status]);

  function convertToDateObject(fetchedData) {
    const newItems = fetchedData.map((item) => {
      item.date = new Date(item.date);
      return item;
    });

    return newItems;
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
      case Status.DELIVERED:
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
      case 'purchased':
        return styles.colMdHide;

      case 'date':
        return styles.colSmHide;

      case 'customer':
        return styles.colSmHide;

      default:
        break;
    }
  };

  const resquestDeleteOrder = (item) => {
    console.log('delete clicked');

    if (item.status === Status.PENDING || item.status === Status.DELIVERED) {
      dispatch(
        openModal({
          componentName: 'Message',
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
            handleConfirm: () => deleteOrder(item.orderId),
          },
        })
      );
    }
  };

  const deleteOrder = (orderNo) => {
    setItems(
      items.filter((i) => {
        return i.orderId !== orderNo;
      })
    );
  };

  const confirmOrder = (id) => {
    const newItemList = items.map((order) => {
      if (order.orderId === id) {
        const confirmedOrder = {
          ...order,
          status: Status.DELIVERED,
        };

        return confirmedOrder;
      }

      return order;
    });

    setItems(newItemList);
  };

  const cancelOrder = (id) => {
    const newItemList = items.map((order) => {
      if (order.orderId === id) {
        const cancelledOrder = {
          ...order,
          status: Status.CANCELLED,
        };

        return cancelledOrder;
      }

      return order;
    });

    setItems(newItemList);
  };

  const createOrder = (item) => {
    const customerImgUrls = [
      'partner-1',
      'partner-2',
      'partner-3',
      'partner-4',
    ];
    item.imgUrl = customerImgUrls[Math.floor(Math.random() * 4)];

    const date = new Date(item.date).getDate();
    const Id = '#' + Math.floor(Math.random() * 90000);
    const newItem = { date, orderId: Id, ...item };
    setItems([newItem, ...items]);
  };

  return (
    <>
      <div className='row'>
        <div className='col-12 col-sm-12'>
          <div className='page-header'>
            <div className='page-header-title'>Orders</div>
            <div className='page-header-content'>
              <Button
                color='primary'
                size='medium'
                icon={<HiOutlinePlus />}
                callback={() =>
                  dispatch(
                    openModal({
                      componentName: 'CreateOrderForm',
                      childrenProps: { createOrder: createOrder },
                    })
                  )
                }
              >
                New Order
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 col-sm-12'>
          <Card disableShadow>
            {isLoading ? (
              <Loader height={15} />
            ) : loadingError ? (
              <div>Error: </div>
            ) : (
              <>
                <Card.Header>
                  <Input
                    placeholder='filter'
                    icon={<BiSearch />}
                    iconPosition='right'
                    onChange={(e) => {
                      setGlobalFilter(e.target.value);
                      setResetPagination(true);
                    }}
                  />
                  <ButtonGroup
                    size='medium'
                    color='primary'
                    variant='outlined'
                    activeButton={statusFilter}
                    buttons={statusOptions}
                    onClick={(activeBtnValue) => {
                      setStatusFilter(activeBtnValue);
                      setResetPagination(true);
                    }}
                  />
                </Card.Header>
                <Card.Body>
                  <Table>
                    <Table.Head>
                      <Table.TR>
                        {thData.map(({ title, id }) => (
                          <Table.TH
                            key={title}
                            className={getHideClassNames(id)}
                          >
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
                      {currentPaginationItems &&
                        currentPaginationItems.map((d, id) => (
                          <Table.TR key={id}>
                            <Table.TD>
                              <span>{d.orderId}</span>
                            </Table.TD>
                            <Table.TD className={styles.colSmHide}>
                              <span>{moment(d.date).format('MM/DD/YYYY')}</span>
                            </Table.TD>
                            <Table.TD className={styles.colSmHide}>
                              <span>
                                <img
                                  src={`/img/partners/${d.imgUrl}.png`}
                                  alt=''
                                />
                              </span>
                              <span>{d.customer}</span>
                            </Table.TD>

                            <Table.TD className={styles.colMdHide}>
                              <span>{d.purchased}</span>
                            </Table.TD>
                            <Table.TD>
                              <span>{d.total}</span>
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
                                              confirmOrder(d.orderId),
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
                                        componentName: 'ViewOrder',
                                        childrenProps: {
                                          order: {
                                            ...d,
                                            date: moment(d.date).format(
                                              'MM/DD/YYYY'
                                            ),
                                          },
                                        },
                                      })
                                    )
                                  }
                                />

                                <LinkList.Item
                                  title='Delete'
                                  icon={<HiOutlineTrash />}
                                  callback={() => resquestDeleteOrder(d)}
                                />
                                {(d.status === Status.PENDING ||
                                  d.status === Status.DELIVERED) && (
                                  <LinkList.Item
                                    title='Cancel'
                                    icon={<HiOutlineTrash />}
                                    callback={() =>
                                      dispatch(
                                        openModal({
                                          componentName: 'ConfirmAction',
                                          childrenProps: {
                                            handleConfirm: () =>
                                              cancelOrder(d.orderId),
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
                  {!sortedItems.length && (
                    <div className={styles.empty}>No items found</div>
                  )}
                </Card.Body>
              </>
            )}
          </Card>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 col-sm-12'>
          <Card disableShadow>
            <Card.Body>
              <Pagination
                items={sortedItems}
                setCurrentItems={setCurrentPaginationItems}
                itemsPerPage={itemsPerPage}
                resetPagination={resetPagination}
                setResetPagination={setResetPagination}
              />
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}
