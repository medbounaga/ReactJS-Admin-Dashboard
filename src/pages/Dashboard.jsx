import { PerformanceStats } from '../containers/PerformanceStats';
import { RecentTransactions } from '../containers/RecentTransactions';
import { SalesProfit } from '../containers/SalesProfit';
import { TopCustomerSales } from '../containers/TopCustomerSales';
import { TopProducts } from '../containers/TopProducts';
import '../styles/globals.scss';

export function Dashboard() {
  return (
    <div className='row'>
      <div className='col-12 col-sm-12'>
        <PerformanceStats />
      </div>
      <div className='col-6 col-sm-12'>
        <TopProducts />
      </div>
      <div className='col-6 col-sm-12'>
        <SalesProfit />
      </div>
      <div className='col-7 col-sm-12'>
        <RecentTransactions />
      </div>
      <div className='col-5 col-sm-12'>
        <TopCustomerSales />
      </div>
    </div>
  );
}
