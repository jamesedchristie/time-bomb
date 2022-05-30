import { useState } from 'react';
import './App.css';
import { DaysBetweenCalculator } from './components/DaysBetweenCalculator';
import { ExperimentLog } from './components/ExperimentLog';
import { formatDate } from './utils/DateUtils';

function App() {

  const [logs, setLogs] = useState([]);
  const createLogEntry = ({ startDate, endDate, daysBetween }) => {
    const startDateFormatted = formatDate(startDate);
    const endDateFormatted = formatDate(endDate);
    if (startDateFormatted && endDateFormatted && daysBetween !== undefined) {
      setLogs([...logs, {
        id: logs.length + 1,
        startDate: startDateFormatted,
        endDate: endDateFormatted,
        daysBetween: `${daysBetween} day${daysBetween === 1 ? '' : 's'}`
      }]);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Temp Job</h1>
      </header>
      <main>
        <p>
          Enter the start and end date of the experiment and press 'Calculate' to get the number of full days ellapsed.
        </p>
        <DaysBetweenCalculator onCalculate={createLogEntry} />
        <ExperimentLog logs={logs} />
      </main>
    </div>
  );
}

export default App;
