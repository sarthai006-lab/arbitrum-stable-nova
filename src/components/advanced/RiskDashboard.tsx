import { GlassCard } from "@/components/ui/glass-card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, TrendingDown, Activity } from "lucide-react"

interface RiskMetric {
  name: string
  value: number
  threshold: number
  status: "safe" | "warning" | "critical"
  description: string
}

const riskMetrics: RiskMetric[] = [
  {
    name: "Collateralization Ratio",
    value: 165,
    threshold: 150,
    status: "safe",
    description: "Current system-wide collateral backing"
  },
  {
    name: "Liquidation Risk",
    value: 12,
    threshold: 20,
    status: "safe", 
    description: "Percentage of positions at risk"
  },
  {
    name: "Price Volatility",
    value: 0.23,
    threshold: 0.5,
    status: "safe",
    description: "24h price deviation from peg"
  },
  {
    name: "Oracle Reliability",
    value: 98.7,
    threshold: 95,
    status: "safe",
    description: "Uptime of price feed sources"
  },
  {
    name: "Liquidity Depth",
    value: 78,
    threshold: 60,
    status: "safe",
    description: "Available liquidity for large trades"
  },
  {
    name: "Yield Reserve",
    value: 45,
    threshold: 30,
    status: "warning",
    description: "Days of yield payments remaining"
  }
]

export function RiskDashboard() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "safe": return <Shield className="h-4 w-4 text-success" />
      case "warning": return <AlertTriangle className="h-4 w-4 text-warning" />
      case "critical": return <TrendingDown className="h-4 w-4 text-destructive" />
      default: return <Activity className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe": return "bg-success/20 text-success border-success/30"
      case "warning": return "bg-warning/20 text-warning border-warning/30"
      case "critical": return "bg-destructive/20 text-destructive border-destructive/30"
      default: return "bg-muted/20 text-muted-foreground border-muted/30"
    }
  }

  const getProgressColor = (status: string) => {
    switch (status) {
      case "safe": return "bg-success"
      case "warning": return "bg-warning"
      case "critical": return "bg-destructive"
      default: return "bg-muted"
    }
  }

  const overallScore = Math.round(riskMetrics.reduce((acc, metric) => {
    const score = metric.status === "safe" ? 100 : metric.status === "warning" ? 70 : 30
    return acc + score
  }, 0) / riskMetrics.length)

  return (
    <GlassCard className="p-6" glow>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold">Risk Dashboard</h2>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Risk Score</p>
          <p className={`text-2xl font-bold ${overallScore >= 80 ? 'text-success' : overallScore >= 60 ? 'text-warning' : 'text-destructive'}`}>
            {overallScore}/100
          </p>
        </div>
      </div>

      <div className="mb-6 p-4 bg-gradient-to-r from-success/10 to-primary/10 rounded-lg border border-success/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">System Health</span>
          <Badge className="bg-success/20 text-success border-success/30">
            <Shield className="h-3 w-3 mr-1" />
            Secure
          </Badge>
        </div>
        <Progress value={overallScore} className="h-3" />
        <p className="text-xs text-muted-foreground mt-2">
          All critical systems operating within safe parameters
        </p>
      </div>

      <div className="grid gap-4">
        {riskMetrics.map((metric, index) => (
          <div
            key={metric.name}
            className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center space-x-3 flex-1">
              {getStatusIcon(metric.status)}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium">{metric.name}</h3>
                  <span className="font-mono font-bold">
                    {metric.name.includes("Ratio") || metric.name.includes("Risk") ? 
                      `${metric.value}%` : 
                      metric.name.includes("Volatility") ? 
                        `${metric.value}%` :
                        metric.name.includes("Reliability") ?
                          `${metric.value}%` :
                          metric.value
                    }
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{metric.description}</p>
                <div className="flex items-center space-x-2">
                  <Progress 
                    value={metric.name.includes("Risk") ? 100 - metric.value : metric.value} 
                    className="flex-1 h-2" 
                  />
                  <Badge className={getStatusColor(metric.status)}>
                    {metric.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
          <div>
            <p className="text-muted-foreground">Safe Metrics</p>
            <p className="font-semibold text-success">{riskMetrics.filter(m => m.status === 'safe').length}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Warnings</p>
            <p className="font-semibold text-warning">{riskMetrics.filter(m => m.status === 'warning').length}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Critical</p>
            <p className="font-semibold text-destructive">{riskMetrics.filter(m => m.status === 'critical').length}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Last Update</p>
            <p className="font-semibold">2s ago</p>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}