import { useAccount, useConnect, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { parseEther } from 'viem'
import abi from './abi.json'

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`

export default function Mint() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({ connector: new InjectedConnector() })

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi,
    functionName: 'transfer',
    args: [address, parseEther('1000')],
  })

  const { write, isLoading, isSuccess } = useContractWrite(config)

  return (
    <div style={{ padding: 32 }}>
      {!isConnected ? (
        <button onClick={() => connect()}>Connect Wallet</button>
      ) : (
        <button disabled={isLoading} onClick={() => write?.()}>
          {isLoading ? 'Mintando...' : 'Mint $GLIFO'}
        </button>
      )}
      {isSuccess && <p>✅ Mint enviado para a blockchain!</p>}
    </div>
  )
}
