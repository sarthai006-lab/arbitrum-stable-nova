import { Header } from "@/components/layout/Header"
import { StatsGrid } from "@/components/dashboard/StatsGrid"
import { MintBurnCard } from "@/components/mint/MintBurnCard"
import { YieldFarmingCard } from "@/components/farming/YieldFarmingCard"
import { PriceChart } from "@/components/analytics/PriceChart"
import { GlassCard } from "@/components/ui/glass-card"
import { useWeb3 } from "@/hooks/useWeb3"
import { Coins, Shield, TrendingUp, Zap } from "lucide-react"

const Index = () => {
  const { isConnected } = useWeb3()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-6">
            <Coins className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            ArbiStable Protocol
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The first yield-bearing stablecoin on Arbitrum. Earn while you hold with algorithmic stability and over-collateralization.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <GlassCard className="p-6 text-center">
              <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Over-Collateralized</h3>
              <p className="text-sm text-muted-foreground">150%+ collateral ratio ensures stability</p>
            </GlassCard>
            <GlassCard className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-success mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Yield-Bearing</h3>
              <p className="text-sm text-muted-foreground">Automatic yield generation through DeFi</p>
            </GlassCard>
            <GlassCard className="p-6 text-center">
              <Zap className="h-8 w-8 text-accent mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Low Fees</h3>
              <p className="text-sm text-muted-foreground">Arbitrum's L2 for minimal gas costs</p>
            </GlassCard>
          </div>
        </section>

        {/* Stats Grid */}
        <StatsGrid />

        {/* Main Dashboard */}
        {isConnected && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <MintBurnCard />
            </div>
            <div className="space-y-8">
              <YieldFarmingCard />
            </div>
          </div>
        )}

        {/* Analytics */}
        <PriceChart />

        {!isConnected && (
          <GlassCard className="p-8 text-center" glow>
            <h2 className="text-2xl font-semibold mb-4">Connect Your Wallet</h2>
            <p className="text-muted-foreground mb-6">
              Connect to Arbitrum Sepolia to start minting ArbiStable and earning yield
            </p>
          </GlassCard>
        )}
      </main>
    </div>
  );
};

export default Index;
