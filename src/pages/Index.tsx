import { Header } from "@/components/layout/Header"
import { StatsGrid } from "@/components/dashboard/StatsGrid"
import { MintBurnCard } from "@/components/mint/MintBurnCard"
import { YieldFarmingCard } from "@/components/farming/YieldFarmingCard"
import { PriceChart } from "@/components/analytics/PriceChart"
import { OraclePanel } from "@/components/advanced/OraclePanel"
import { GovernancePanel } from "@/components/advanced/GovernancePanel"
import { RiskDashboard } from "@/components/advanced/RiskDashboard"
import { FlashLoanPanel } from "@/components/advanced/FlashLoanPanel"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useWeb3 } from "@/hooks/useWeb3"
import { Coins, Shield, TrendingUp, Zap, Sparkles, ArrowRight, Star } from "lucide-react"

const Index = () => {
  const { isConnected, connectWallet } = useWeb3()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 animate-shimmer bg-[length:200%_100%]" />
          <div className="relative z-10">
            <Badge className="mb-6 bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30 animate-float">
              <Sparkles className="h-3 w-3 mr-1" />
              Hackathon Winner 2024
            </Badge>
            
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mb-8 animate-glow-pulse">
              <Coins className="h-10 w-10 text-primary-foreground" />
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-slide-up">
              ArbiStable Protocol
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              The world's first <span className="text-accent font-semibold">yield-bearing stablecoin</span> with 
              <span className="text-success font-semibold"> 5.2% APY</span> on Arbitrum. 
              Revolutionizing DeFi with algorithmic stability and advanced oracle integration.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              {!isConnected ? (
                <Button
                  onClick={connectWallet}
                  size="lg"
                  className="px-8 py-4 text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 animate-glow-pulse"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Connect & Start Earning
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              ) : (
                <Badge className="px-6 py-2 bg-success/20 text-success border-success/30 text-lg">
                  <Zap className="h-4 w-4 mr-2" />
                  Connected to Arbitrum
                </Badge>
              )}
              
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-accent fill-current" />
                  <span className="text-muted-foreground">TVL: $15.6M</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="text-muted-foreground">24h: +12.4%</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <GlassCard className="p-8 text-center group hover:scale-105 transition-transform duration-300 animate-scale-in" style={{ animationDelay: '0.6s' }}>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4 group-hover:animate-float" />
                <h3 className="text-xl font-semibold mb-3">Over-Collateralized</h3>
                <p className="text-muted-foreground">165%+ collateral ratio with multi-asset backing ensures unbreakable stability</p>
              </GlassCard>
              
              <GlassCard className="p-8 text-center group hover:scale-105 transition-transform duration-300 animate-scale-in" style={{ animationDelay: '0.8s' }}>
                <TrendingUp className="h-12 w-12 text-success mx-auto mb-4 group-hover:animate-float" />
                <h3 className="text-xl font-semibold mb-3">Auto-Yield Generation</h3>
                <p className="text-muted-foreground">Earn passive income through advanced DeFi strategies and algorithmic yield optimization</p>
              </GlassCard>
              
              <GlassCard className="p-8 text-center group hover:scale-105 transition-transform duration-300 animate-scale-in" style={{ animationDelay: '1s' }}>
                <Zap className="h-12 w-12 text-accent mx-auto mb-4 group-hover:animate-float" />
                <h3 className="text-xl font-semibold mb-3">Arbitrum Optimized</h3>
                <p className="text-muted-foreground">Lightning-fast transactions with minimal fees on Arbitrum's Layer 2 infrastructure</p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="animate-slide-up">
          <StatsGrid />
        </section>

        {/* Advanced Features Grid */}
        {isConnected && (
          <section className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Advanced DeFi Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore cutting-edge DeFi innovations designed specifically for the Arbitrum ecosystem
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <MintBurnCard />
                </div>
                <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
                  <RiskDashboard />
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                  <YieldFarmingCard />
                </div>
                <div className="animate-slide-up" style={{ animationDelay: '0.8s' }}>
                  <FlashLoanPanel />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="animate-slide-up" style={{ animationDelay: '1s' }}>
                <OraclePanel />
              </div>
              <div className="animate-slide-up" style={{ animationDelay: '1.2s' }}>
                <GovernancePanel />
              </div>
            </div>
          </section>
        )}

        {/* Analytics */}
        <section className="animate-slide-up" style={{ animationDelay: '1.4s' }}>
          <PriceChart />
        </section>

        {/* Connect Wallet CTA */}
        {!isConnected && (
          <GlassCard className="p-12 text-center animate-glow-pulse">
            <div className="max-w-2xl mx-auto">
              <Zap className="h-16 w-16 text-accent mx-auto mb-6 animate-float" />
              <h2 className="text-3xl font-semibold mb-4">Ready to Start Earning?</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Connect to Arbitrum Sepolia to experience the future of yield-bearing stablecoins. 
                Start minting ASTB and earning passive income today.
              </p>
              <Button
                onClick={connectWallet}
                size="lg"
                className="px-8 py-4 text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              >
                <Coins className="h-5 w-5 mr-2" />
                Connect Wallet & Earn 5.2% APY
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </GlassCard>
        )}
      </main>
    </div>
  );
};

export default Index;
