import './App.css'
import React from 'react';
import { ThemeProvider } from './components/theme-provider';
import LandingPage from './landing/page';

interface AppProps {
  children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <LandingPage children={undefined} />
    </ThemeProvider>
  );
};

export default App;