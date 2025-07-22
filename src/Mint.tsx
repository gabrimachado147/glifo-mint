import { useAccount, useConnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { parseEther } from 'viem'
import { useWriteContract } from 'wagmi'
import abi from './abi.json'

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`

export default function Mint() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { writeContract, isPending, isSuccess } = useWriteContract()

  return (
    <div style={{ padding: 32 }}>
      {!isConnected ? (
        <button onClick={() => connect({ connector: injected() })}>
          Connect Wallet
        </button>
      ) : (
        <button
          disabled={isPending}
          onClick={() =>
            writeContract({
              address: contractAddress,
              abi,
              functionName: 'transfer', // ou 'mint' se for o caso
              args: [address, parseEther('1000')],
            })
          }
        >
          {isPending ? 'Mintando...' : 'Mint $GLIFO'}
        </button>
      )}
      {isSuccess && <p>✅ Mint enviado para a blockchain!</p>}
    </div>
  )
}
