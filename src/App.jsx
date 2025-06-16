import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [log, setLog] = useState([]);
  const [passphrase, setPassphrase] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get(`${API_BASE_URL}/api/status`)
        .then(res => setLog(res.data));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const checkBalance = () => {
    axios.post(`${API_BASE_URL}/api/check-balance`, { passphrase })
      .then(res => setBalance(res.data.balance));
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>🔒 Auto Transfer DApp</h2>
      <div>
        <input type="text" value={passphrase} onChange={e => setPassphrase(e.target.value)} placeholder="Enter Passphrase" />
        <button onClick={checkBalance}>Check Balance</button>
        <div><strong>Balance:</strong> {balance}</div>
      </div>

      <hr />
      <h3>🔄 Live Transfer Logs</h3>
      <ul>
        {log.map((l, i) => (
          <li key={i}>{l.time} - {l.msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
