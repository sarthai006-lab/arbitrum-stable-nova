import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Leaf, TrendingUp, Clock, DollarSign } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const farms = [
  {
    name: "ASTB/ETH",
    apy: "24.5%",
    tvl: "$2.4M",
    rewards: "ARB + ASTB",
    deposited: "1,250.00",
    earned: "45.67"
  },
  {
    name: "ASTB/USDC",
    apy: "18.2%", 
    tvl: "$1.8M",
    rewards: "ARB + ASTB",
    deposited: "890.50",
    earned: "23.41"
  }
]

export function YieldFarmingCard() {
  const [stakeAmount, setStakeAmount] = useState("")
  const { toast } = useToast()

  const handleStake = (farmName: string) => {
    toast({
      title: "Staking Tokens",
      description: `Staking ${stakeAmount} LP tokens in ${farmName} farm`,
    })
  }

  const handleHarvest = (farmName: string, earned: string) => {
    toast({
      title: "Harvesting Rewards",
      description: `Claiming ${earned} tokens from ${farmName} farm`,
    })
  }

  return (
    <div className="space-y-6">
      <GlassCard className="p-6" glow>
        <div className="flex items-center space-x-2 mb-6">
          <Leaf className="h-6 w-6 text-success" />
          <h2 className="text-xl font-semibold">Yield Farming</h2>
        </div>

        <div className="grid gap-6">
          {farms.map((farm, index) => (
            <div key={index} className="border border-border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{farm.name}</h3>
                    <p className="text-sm text-muted-foreground">{farm.rewards}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-success">{farm.apy}</p>
                  <p className="text-sm text-muted-foreground">APY</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">TVL</p>
                  <p className="font-medium">{farm.tvl}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Deposited</p>
                  <p className="font-medium">{farm.deposited}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Earned</p>
                  <p className="font-medium text-accent">{farm.earned}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Input
                  placeholder="Amount to stake"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={() => handleStake(farm.name)} variant="outline">
                  Stake
                </Button>
                <Button 
                  onClick={() => handleHarvest(farm.name, farm.earned)}
                  className="bg-gradient-to-r from-success to-accent hover:from-success/90 hover:to-accent/90"
                >
                  Harvest
                </Button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}