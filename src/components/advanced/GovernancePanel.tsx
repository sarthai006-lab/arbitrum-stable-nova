import { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Vote, Users, Clock, TrendingUp, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Proposal {
  id: number
  title: string
  description: string
  status: "active" | "passed" | "failed"
  votesFor: number
  votesAgainst: number
  totalVotes: number
  timeLeft: string
  category: "protocol" | "treasury" | "security"
}

const proposals: Proposal[] = [
  {
    id: 1,
    title: "Increase Yield Pool Allocation to 15%",
    description: "Proposal to allocate more treasury funds to yield generation strategies",
    status: "active",
    votesFor: 12450,
    votesAgainst: 3200,
    totalVotes: 15650,
    timeLeft: "2d 14h",
    category: "protocol"
  },
  {
    id: 2,
    title: "Add WBTC as Collateral Type",
    description: "Enable Wrapped Bitcoin as an accepted collateral with 200% ratio",
    status: "active", 
    votesFor: 8930,
    votesAgainst: 1240,
    totalVotes: 10170,
    timeLeft: "5d 8h",
    category: "protocol"
  },
  {
    id: 3,
    title: "Emergency Security Upgrade",
    description: "Implement additional security measures for large transactions",
    status: "passed",
    votesFor: 18750,
    votesAgainst: 890,
    totalVotes: 19640,
    timeLeft: "Ended",
    category: "security"
  }
]

export function GovernancePanel() {
  const [votingPower, setVotingPower] = useState(1250)
  const { toast } = useToast()

  const handleVote = (proposalId: number, support: boolean) => {
    toast({
      title: "Vote Submitted",
      description: `Voted ${support ? 'FOR' : 'AGAINST'} proposal #${proposalId}`,
    })
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "protocol": return <TrendingUp className="h-4 w-4" />
      case "treasury": return <Users className="h-4 w-4" />
      case "security": return <Shield className="h-4 w-4" />
      default: return <Vote className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "protocol": return "bg-primary/20 text-primary border-primary/30"
      case "treasury": return "bg-accent/20 text-accent border-accent/30"
      case "security": return "bg-destructive/20 text-destructive border-destructive/30"
      default: return "bg-muted/20 text-muted-foreground border-muted/30"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success/20 text-success border-success/30"
      case "passed": return "bg-primary/20 text-primary border-primary/30"
      case "failed": return "bg-destructive/20 text-destructive border-destructive/30"
      default: return "bg-muted/20 text-muted-foreground border-muted/30"
    }
  }

  return (
    <GlassCard className="p-6" glow>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Vote className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold">Governance</h2>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Your Voting Power</p>
          <p className="font-bold text-lg">{votingPower.toLocaleString()} ASTB</p>
        </div>
      </div>

      <div className="space-y-4">
        {proposals.map((proposal, index) => (
          <div
            key={proposal.id}
            className="border border-border rounded-lg p-4 space-y-4 hover:border-primary/30 transition-colors animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold">{proposal.title}</h3>
                  <Badge className={getCategoryColor(proposal.category)}>
                    {getCategoryIcon(proposal.category)}
                    <span className="ml-1 capitalize">{proposal.category}</span>
                  </Badge>
                  <Badge className={getStatusColor(proposal.status)}>
                    {proposal.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{proposal.description}</p>
              </div>
              {proposal.status === "active" && (
                <div className="flex items-center space-x-1 text-sm text-muted-foreground ml-4">
                  <Clock className="h-4 w-4" />
                  <span>{proposal.timeLeft}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>For: {proposal.votesFor.toLocaleString()}</span>
                <span>Against: {proposal.votesAgainst.toLocaleString()}</span>
              </div>
              <Progress 
                value={(proposal.votesFor / proposal.totalVotes) * 100} 
                className="h-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{((proposal.votesFor / proposal.totalVotes) * 100).toFixed(1)}% support</span>
                <span>{proposal.totalVotes.toLocaleString()} total votes</span>
              </div>
            </div>

            {proposal.status === "active" && (
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-success/30 text-success hover:bg-success/10"
                  onClick={() => handleVote(proposal.id, true)}
                >
                  Vote For
                </Button>
                <Button
                  size="sm"
                  variant="outline" 
                  className="flex-1 border-destructive/30 text-destructive hover:bg-destructive/10"
                  onClick={() => handleVote(proposal.id, false)}
                >
                  Vote Against
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <p className="text-muted-foreground">Active Proposals</p>
            <p className="font-semibold">{proposals.filter(p => p.status === 'active').length}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Your Votes Cast</p>
            <p className="font-semibold">3</p>
          </div>
          <div>
            <p className="text-muted-foreground">Participation Rate</p>
            <p className="font-semibold text-success">78%</p>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}