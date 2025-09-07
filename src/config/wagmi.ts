import { createConfig, http } from 'wagmi'
import { arbitrumSepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [arbitrumSepolia],
  connectors: [
    injected()
  ],
  transports: {
    [arbitrumSepolia.id]: http()
  },
})

export const STABLECOIN_CONTRACT_ADDRESS = "0x1234567890123456789012345678901234567890" // Placeholder for actual contract
export const COLLATERAL_MANAGER_ADDRESS = "0x0987654321098765432109876543210987654321" // Placeholder for actual contract