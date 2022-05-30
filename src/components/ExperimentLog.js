export function ExperimentLog({ logs }) {
  const logItems = logs.map(log => <tr key={log.id}>
    <td>{log.id}</td>
    <td>{log.startDate}</td>
    <td>{log.endDate}</td>
    <td>{log.daysBetween}</td>
  </tr>);
  return (
    <table className="experiment-log">
      <thead>
        <tr>
          <th>Experiment</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Days</th>
        </tr>
      </thead>
      <tbody>
        { logItems }
        { logItems.length === 0 && <tr><td colSpan={4}><span>No experiments recorded</span></td></tr>}
      </tbody>
    </table>
  )
}