import logo from './logo.svg';
import './App.css';
const apiUrl = process.env.REACT_APP_API_URL;
const version = process.env.REACT_APP_VERSION;


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
			Create by Kalcala
      <p>Version: {process.env.REACT_APP_VERSION}</p>
        </p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
