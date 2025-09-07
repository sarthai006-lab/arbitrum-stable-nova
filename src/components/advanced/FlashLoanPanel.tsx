import { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Zap, TrendingUp, AlertCircle, Repeat } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FlashLoanStrategy {
  name: string
  description: string
  expectedReturn: number
  risk: "low" | "medium" | "high"
  minAmount: number
  fee: number
}

const strategies: FlashLoanStrategy[] = [
  {
    name: "Arbitrage ETH/USDC",
    description: "Exploit price differences between Uniswap and SushiSwap",
    expectedReturn: 2.3,
    risk: "low",
    minAmount: 1000,
    fee: 0.09
  },
  {
    name: "Liquidation Bot",
    description: "Liquidate undercollateralized positions for profit",
    expectedReturn: 5.7,
    risk: "medium", 
    minAmount: 5000,
    fee: 0.09
  },
  {
    name: "Collateral Swap",
    description: "Optimize collateral composition for better yield",
    expectedReturn: 1.8,
    risk: "low",
    minAmount: 2000,
    fee: 0.09
  },
  {
    name: "Yield Farming Boost",
    description: "Leverage positions in high-yield farms",
    expectedReturn: 8.2,
    risk: "high",
    minAmount: 10000,
    fee: 0.15
  }
]

export function FlashLoanPanel() {
  const [amount, setAmount] = useState("")
  const [selectedStrategy, setSelectedStrategy] = useState("")
  const [isExecuting, setIsExecuting] = useState(false)
  const { toast } = useToast()

  const handleExecute = async () => {
    if (!amount || !selectedStrategy) return
    
    setIsExecuting(true)
    
    // Simulate execution time
    setTimeout(() => {
      setIsExecuting(false)
      toast({
        title: "Flash Loan Executed",
        description: `Successfully executed ${selectedStrategy} with ${amount} ASTB`,
      })
    }, 3000)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "bg-success/20 text-success border-success/30"
      case "medium": return "bg-warning/20 text-warning border-warning/30"
      case "high": return "bg-destructive/20 text-destructive border-destructive/30"
      default: return "bg-muted/20 text-muted-foreground border-muted/30"
    }
  }

  const selectedStrategyData = strategies.find(s => s.name === selectedStrategy)
  const estimatedProfit = selectedStrategyData ? 
    (parseFloat(amount || "0") * selectedStrategyData.expectedReturn / 100) - 
    (parseFloat(amount || "0") * selectedStrategyData.fee / 100) : 0

  return (
    <GlassCard className="p-6" glow>
      <div className="flex items-center space-x-2 mb-6">
        <Zap className="h-6 w-6 text-accent animate-pulse" />
        <h2 className="text-xl font-semibold">Flash Loan Hub</h2>
        <Badge variant="outline" className="ml-auto animate-shimmer bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 bg-[length:200%_100%]">
          Instant Arbitrage
        </Badge>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-2 block">Loan Amount (ASTB)</label>
          <Input
            type="number"
            placeholder="10000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-lg font-mono"
          />
          <p className="text-xs text-muted-foreground mt-1">
            No collateral required • Instant execution • Auto-repayment
          </p>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Strategy</label>
          <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
            <SelectTrigger>
              <SelectValue placeholder="Select arbitrage strategy" />
            </SelectTrigger>
            <SelectContent>
              {strategies.map((strategy) => (
                <SelectItem key={strategy.name} value={strategy.name}>
                  <div className="flex items-center justify-between w-full">
                    <span>{strategy.name}</span>
                    <Badge className={getRiskColor(strategy.risk)}>
                      {strategy.risk}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedStrategyData && (
          <div className="bg-muted/50 rounded-lg p-4 space-y-3 animate-scale-in">
            <h3 className="font-medium flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <span>Strategy Details</span>
            </h3>
            <p className="text-sm text-muted-foreground">{selectedStrategyData.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Expected Return</p>
                <p className="font-bold text-success">{selectedStrategyData.expectedReturn}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Fee</p>
                <p className="font-medium">{selectedStrategyData.fee}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Min Amount</p>
                <p className="font-medium">${selectedStrategyData.minAmount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Est. Profit</p>
                <p className="font-bold text-accent">+${estimatedProfit.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-2 p-3 bg-warning/10 rounded-lg border border-warning/20">
          <AlertCircle className="h-4 w-4 text-warning" />
          <p className="text-xs text-warning">
            Flash loans are executed atomically. If the strategy fails, the transaction reverts automatically.
          </p>
        </div>

        <Button
          onClick={handleExecute}
          disabled={!amount || !selectedStrategy || isExecuting || (selectedStrategyData && parseFloat(amount || "0") < selectedStrategyData.minAmount)}
          className="w-full bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90"
          size="lg"
        >
          {isExecuting ? (
            <>
              <Repeat className="h-4 w-4 mr-2 animate-spin" />
              Executing Flash Loan...
            </>
          ) : (
            <>
              <Zap className="h-4 w-4 mr-2" />
              Execute Flash Loan
            </>
          )}
        </Button>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <p className="text-muted-foreground">Available Liquidity</p>
            <p className="font-semibold">$2.4M</p>
          </div>
          <div>
            <p className="text-muted-foreground">Success Rate</p>
            <p className="font-semibold text-success">94.2%</p>
          </div>
          <div>
            <p className="text-muted-foreground">Avg Execution</p>
            <p className="font-semibold">1.2s</p>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}