import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { base } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(import.meta.env.VITE_RPC_URL),
  },
  connectors: [injected()],
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <App />
    </WagmiProvider>
  </React.StrictMode>
)

