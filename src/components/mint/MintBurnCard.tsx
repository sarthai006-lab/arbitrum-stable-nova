import { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Coins, ArrowRightLeft, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function MintBurnCard() {
  const [amount, setAmount] = useState("")
  const [collateral, setCollateral] = useState("ETH")
  const { toast } = useToast()

  const handleMint = () => {
    toast({
      title: "Minting ArbiStable",
      description: `Minting ${amount} ASTB with ${collateral} collateral`,
    })
  }

  const handleBurn = () => {
    toast({
      title: "Burning ArbiStable",
      description: `Burning ${amount} ASTB tokens`,
    })
  }

  return (
    <GlassCard className="p-6" glow>
      <div className="flex items-center space-x-2 mb-6">
        <Coins className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold">Mint & Burn</h2>
      </div>

      <Tabs defaultValue="mint" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mint">Mint ASTB</TabsTrigger>
          <TabsTrigger value="burn">Burn ASTB</TabsTrigger>
        </TabsList>

        <TabsContent value="mint" className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Collateral Type</label>
            <Select value={collateral} onValueChange={setCollateral}>
              <SelectTrigger>
                <SelectValue placeholder="Select collateral" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ETH">ETH (150% Ratio)</SelectItem>
                <SelectItem value="USDC">USDC (110% Ratio)</SelectItem>
                <SelectItem value="ARB">ARB (200% Ratio)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Amount</label>
            <Input
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg"
            />
          </div>

          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Collateral Required:</span>
              <span className="font-medium">{(parseFloat(amount || "0") * 1.5).toFixed(2)} {collateral}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Liquidation Price:</span>
              <span className="font-medium text-destructive">$1,800</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Interest Rate:</span>
              <span className="font-medium text-success">0.5% APR</span>
            </div>
          </div>

          <Button onClick={handleMint} className="w-full" size="lg">
            <Coins className="h-4 w-4 mr-2" />
            Mint ArbiStable
          </Button>
        </TabsContent>

        <TabsContent value="burn" className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">ASTB Amount</label>
            <Input
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg"
            />
          </div>

          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>You'll Receive:</span>
              <span className="font-medium">{(parseFloat(amount || "0") * 0.99).toFixed(2)} {collateral}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Burn Fee:</span>
              <span className="font-medium">1%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Accrued Interest:</span>
              <span className="font-medium text-success">+$12.45</span>
            </div>
          </div>

          <Button onClick={handleBurn} variant="destructive" className="w-full" size="lg">
            <ArrowRightLeft className="h-4 w-4 mr-2" />
            Burn ArbiStable
          </Button>
        </TabsContent>
      </Tabs>
    </GlassCard>
  )
}