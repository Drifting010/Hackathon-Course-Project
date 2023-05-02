
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Home } from './pages'
import { Header } from './pages'
import { Footer } from './pages'
import './App.css'

function App() {

  const theme = createTheme();
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <Home />
        </main>
      </Container>
      <Footer
        title="Hackathon"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  )
}

export default App;
