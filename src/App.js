import logo from './logo.svg';
import './App.css';
import ChatWidget from './ChatWidget';
import Test from './test';
import { createTheme, ThemeProvider } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { loadThemeSetting } from './utils';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  status: {
    maximized: 'modern',
    minimized: 'bar',
    alignTo: 'left',
    themeColor: "#DA3807"
  },
});

function App() {
  const [themeSetting, setThemeSetting] = useState({});

  useEffect(() => {
    (async () => {
      const themeSettingRes = await loadThemeSetting();
      setThemeSetting(themeSettingRes);
    })();
  }, [])

  const theme = useMemo(() => {
    console.log("themesetting is", themeSetting);
    return createTheme({
      palette: {
        mode: themeSetting?.theme,
      },
      status: {
        maximized: themeSetting?.maximized ? themeSetting?.maximized : "smooth",
        minimized: themeSetting?.minimized ? themeSetting?.minimized : "bubble",
        themeColor: themeSetting?.themeColor ? themeSetting?.themeColor : "#1565C0",
        alignTo: themeSetting?.alignTo ? themeSetting?.alignTo : "right",
        sideSpacing: themeSetting?.sideSpacing ? themeSetting?.sideSpacing : 10,
        bottomSpacing: themeSetting?.bottomSpacing ? themeSetting?.bottomSpacing : 10,
      }
    })
  }, [themeSetting]);

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
      </header> */}
      {/* <Test/> */}
      <ThemeProvider theme={theme}>
        <ChatWidget />       
      </ThemeProvider>
    </div>
  );
}

export default App;
