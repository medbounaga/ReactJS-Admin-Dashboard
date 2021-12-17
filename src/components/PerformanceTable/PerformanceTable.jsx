import { useState } from "react";
import { FaArrowUp, FaArrowDown, FaCaretDown, FaCaretUp } from "react-icons/fa";

export function PerformanceTable({ data }) {
  return (
    <table className="rwd-table">
      <thead>
        <tr className="compareTable_header">
          <th>Indicactor</th>
          <th>Today</th>
          <th>Yesterday</th>
          <th>Change</th>
          <th>Change(%)</th>
        </tr>
      </thead>
      <tbody>
        <tr className="salesOrderCount">
          <td>{data.indicator}</td>
          <td>{data.period_0}</td>
          <td>{data.period_1}</td>
          <td>{data.difference}</td>
          <td>
            <div>
              <span className={data.difference >= 0 ? "positive" : "negative"}>
                {data.difference >= 0 ? <FaArrowUp /> : <FaArrowDown />}
              </span>
              <span>{Math.abs(Number(data.performance))}%</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
