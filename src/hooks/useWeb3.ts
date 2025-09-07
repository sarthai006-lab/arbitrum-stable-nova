import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

export function useWeb3() {
  const { address, isConnected, isConnecting } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  const connectWallet = () => {
    connect({ connector: injected() })
  }

  return {
    address,
    isConnected,
    isConnecting,
    connectWallet,
    disconnect
  }
}