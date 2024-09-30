import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/ui/theme-provider.tsx'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import store from './context/store.ts'
import { SocketContextProvider } from './context/socket-context/socketContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <SocketContextProvider>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <App />
          <Toaster position='top-center' reverseOrder={false} />
        </ThemeProvider>
      </SocketContextProvider>
    </Provider>
  </StrictMode>
)
