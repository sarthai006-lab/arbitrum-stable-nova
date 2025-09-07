import { GlassCard } from "@/components/ui/glass-card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"

const priceData = [
  { time: "00:00", price: 1.001, volume: 120000 },
  { time: "04:00", price: 0.999, volume: 98000 },
  { time: "08:00", price: 1.002, volume: 145000 },
  { time: "12:00", price: 1.000, volume: 167000 },
  { time: "16:00", price: 1.001, volume: 134000 },
  { time: "20:00", price: 0.998, volume: 156000 },
  { time: "24:00", price: 1.001, volume: 178000 },
]

export function PriceChart() {
  return (
    <GlassCard className="p-6" glow>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold">ASTB Price Stability</h2>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">$1.001</p>
          <p className="text-sm text-success">+0.1%</p>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              domain={[0.995, 1.005]}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">24h High</p>
          <p className="font-semibold">$1.002</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">24h Low</p>
          <p className="font-semibold">$0.998</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Volatility</p>
          <p className="font-semibold text-success">0.2%</p>
        </div>
      </div>
    </GlassCard>
  )
}