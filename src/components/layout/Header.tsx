import { Button } from "@/components/ui/button"
import { useWeb3 } from "@/hooks/useWeb3"
import { Wallet, Coins, TrendingUp } from "lucide-react"

export function Header() {
  const { address, isConnected, connectWallet, disconnect } = useWeb3()

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent">
            <Coins className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ArbiStable
            </h1>
            <p className="text-xs text-muted-foreground">Yield-Bearing Stablecoin</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Dashboard
          </a>
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Mint/Burn
          </a>
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Farming
          </a>
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Analytics
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 text-sm">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="text-success font-medium">5.2% APY</span>
          </div>
          
          {isConnected ? (
            <Button
              variant="outline"
              onClick={() => disconnect()}
              className="flex items-center space-x-2"
            >
              <Wallet className="h-4 w-4" />
              <span>{formatAddress(address!)}</span>
            </Button>
          ) : (
            <Button
              onClick={connectWallet}
              className="flex items-center space-x-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              <Wallet className="h-4 w-4" />
              <span>Connect Wallet</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}