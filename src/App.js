import CssBaseline from '@mui/material/CssBaseline';
import Header from 'components/Header';
import Container from 'components/Container';
import AppContextProvider from 'contexts/AppContext';

function App() {
  return (
    <AppContextProvider>
      <CssBaseline />
      <Header />
      <Container />
    </AppContextProvider>
  );
}

export default App;
