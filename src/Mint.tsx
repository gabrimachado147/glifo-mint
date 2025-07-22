// 🧠 Projeto: glifo-mint
// Landing page minimalista para mint de $GLIFO na Base, parte do ecossistema $LOOR.
// Stack: Vite + React 19 + TypeScript + wagmi@2 + viem@2
// Objetivo: conectar carteira, executar transfer/mint de 1000 $GLIFO, feedback on-chain.
// Contrato: ERC-20, função mint(address,uint256) ou transfer(address,uint256) conforme ABI.
// O endereço do contrato é injetado via VITE_CONTRACT_ADDRESS no .env
// Narrativa: $GLIFO é um artefato simbólico distribuído em rituais digitais.
// Veja README.md para detalhes completos.

// Mint.tsx
import { useAccount, useConnect, useWriteContract } from 'wagmi'
import { parseEther } from 'viem'
import abi from './abi.json'

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`

export default function Mint() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { data: hash, isPending, writeContract } = useWriteContract()

  return (
    <div style={{ padding: 32 }}>
      <img
        src="https://raw.githubusercontent.com/gabrimachado147/glifo-token/main/glifo.png"
        alt="GLIFO Logo"
        style={{ width: 64, height: 64, marginBottom: 24 }}
      />
      {!isConnected ? (
        <button onClick={() => connect({ connector: connectors[0] })}>
          Connect Wallet
        </button>
      ) : (
        <button
          disabled={isPending}
          onClick={() =>
            writeContract({
              abi,
              address: contractAddress,
              functionName: 'mint',
              args: [address!, parseEther('1000')],
            })
          }
        >
          {isPending ? 'Mintando...' : 'Mint $GLIFO'}
        </button>
      )}
      {hash && <p>✅ Mint enviado para a blockchain! Tx: {hash}</p>}
    </div>
  )
}
