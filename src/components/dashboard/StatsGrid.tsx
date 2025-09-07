import { GlassCard } from "@/components/ui/glass-card"
import { TrendingUp, DollarSign, PiggyBank, Zap } from "lucide-react"

const stats = [
  {
    title: "Total Supply",
    value: "$12,450,230",
    change: "+5.2%",
    icon: DollarSign,
    color: "text-primary"
  },
  {
    title: "Current APY",
    value: "5.25%",
    change: "+0.1%",
    icon: TrendingUp,
    color: "text-success"
  },
  {
    title: "TVL",
    value: "$15,680,940",
    change: "+12.4%",
    icon: PiggyBank,
    color: "text-accent"
  },
  {
    title: "24h Volume",
    value: "$2,340,120",
    change: "+8.7%",
    icon: Zap,
    color: "text-primary"
  }
]

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <GlassCard key={index} className="p-6" glow>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className={`text-sm ${stat.color} flex items-center space-x-1`}>
                <TrendingUp className="h-3 w-3" />
                <span>{stat.change}</span>
              </p>
            </div>
            <div className={`p-3 rounded-lg bg-gradient-to-br from-secondary to-muted ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  )
}