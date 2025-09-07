import { useState, useEffect } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Wifi, AlertTriangle, CheckCircle } from "lucide-react"

interface OracleData {
  source: string
  price: number
  lastUpdate: string
  status: "active" | "warning" | "offline"
  deviation: number
}

const mockOracles: OracleData[] = [
  { source: "Chainlink", price: 1.0012, lastUpdate: "2s ago", status: "active", deviation: 0.12 },
  { source: "Uniswap V3", price: 1.0008, lastUpdate: "5s ago", status: "active", deviation: 0.08 },
  { source: "Band Protocol", price: 1.0015, lastUpdate: "3s ago", status: "active", deviation: 0.15 },
  { source: "Tellor", price: 1.0006, lastUpdate: "12s ago", status: "warning", deviation: 0.06 },
  { source: "DIA", price: 1.0010, lastUpdate: "8s ago", status: "active", deviation: 0.10 },
]

export function OraclePanel() {
  const [oracles, setOracles] = useState<OracleData[]>(mockOracles)
  const [aggregatedPrice, setAggregatedPrice] = useState(1.0010)

  useEffect(() => {
    const interval = setInterval(() => {
      setOracles(prev => prev.map(oracle => ({
        ...oracle,
        price: oracle.price + (Math.random() - 0.5) * 0.0004,
        deviation: Math.abs(oracle.price - aggregatedPrice) * 100
      })))
      
      const avgPrice = oracles.reduce((sum, oracle) => sum + oracle.price, 0) / oracles.length
      setAggregatedPrice(avgPrice)
    }, 2000)

    return () => clearInterval(interval)
  }, [oracles, aggregatedPrice])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4 text-success" />
      case "warning": return <AlertTriangle className="h-4 w-4 text-warning" />
      default: return <Wifi className="h-4 w-4 text-destructive" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success/20 text-success border-success/30"
      case "warning": return "bg-warning/20 text-warning border-warning/30"
      default: return "bg-destructive/20 text-destructive border-destructive/30"
    }
  }

  return (
    <GlassCard className="p-6" glow>
      <div className="flex items-center space-x-2 mb-6">
        <Activity className="h-6 w-6 text-primary animate-pulse" />
        <h2 className="text-xl font-semibold">Price Oracle Network</h2>
        <Badge variant="outline" className="ml-auto">
          Live Feed
        </Badge>
      </div>

      <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">Aggregated Price</span>
          <span className="text-2xl font-bold font-mono">${aggregatedPrice.toFixed(4)}</span>
        </div>
        <Progress value={99.8} className="h-2" />
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Stability Score: 99.8%</span>
          <span>Confidence: High</span>
        </div>
      </div>

      <div className="space-y-3">
        {oracles.map((oracle, index) => (
          <div
            key={oracle.source}
            className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:border-primary/30 transition-colors animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center space-x-3">
              {getStatusIcon(oracle.status)}
              <div>
                <p className="font-medium">{oracle.source}</p>
                <p className="text-xs text-muted-foreground">{oracle.lastUpdate}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="font-mono font-medium">${oracle.price.toFixed(4)}</p>
                <p className="text-xs text-muted-foreground">±{oracle.deviation.toFixed(2)}%</p>
              </div>
              <Badge className={getStatusColor(oracle.status)}>
                {oracle.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <p className="text-muted-foreground">Active Oracles</p>
            <p className="font-semibold text-success">{oracles.filter(o => o.status === 'active').length}/5</p>
          </div>
          <div>
            <p className="text-muted-foreground">Avg Deviation</p>
            <p className="font-semibold">0.11%</p>
          </div>
          <div>
            <p className="text-muted-foreground">Update Frequency</p>
            <p className="font-semibold">~3s</p>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}