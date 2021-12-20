import { PerformanceTable } from "../containers/PerformanceTable";
import "../styles/globals.scss";



export default function Dashboard() {

  return (

    <div className="container" >
      <div className="row row-cols-2 row-cols-sm-1" >
        <div className="col">
          <PerformanceTable />
        </div>
        <div className="col">
          <PerformanceTable />
        </div>
      </div>
      <div className="row row-cols-2 row-cols-sm-1" >
        <div className="col">
          <PerformanceTable />
        </div>
        <div className="col">
          <PerformanceTable />
        </div>
      </div>
    </div>


  );
}
