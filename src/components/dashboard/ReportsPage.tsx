import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SimpleBarChart, SimplePieChart, SimpleLineChart } from '@/components/charts/SimpleChart';
import { getStatisticsData } from '@/data/mockData';
import { Users, Shield, AlertTriangle, TrendingUp } from 'lucide-react';

const ReportsPage: React.FC = () => {
  const stats = getStatisticsData();

  const statsCards = [
    {
      title: 'Total Tourists',
      value: stats.totalTourists,
      icon: Users,
      color: 'primary',
      change: '+12%'
    },
    {
      title: 'Active SOS',
      value: stats.activeSOS,
      icon: AlertTriangle,
      color: 'destructive',
      change: '-5%'
    },
    {
      title: 'Unregistered',
      value: stats.unregisteredTourists,
      icon: Shield,
      color: 'moderate',
      change: '-8%'
    },
    {
      title: 'Avg Safety Score',
      value: stats.averageSafetyScore,
      icon: TrendingUp,
      color: 'safe',
      change: '+3%'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Reports & Statistics</h1>
        <Badge variant="outline" className="text-sm">
          Last updated: 2 minutes ago
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="card-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-safe">
                    {stat.change} from last hour
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}/10`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tourist Distribution by Zone */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Tourists by Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleBarChart
              data={stats.touristsByZone.map(item => ({
                name: item.name,
                value: item.tourists,
                color: item.status === 'Safe' ? '#22c55e' : 
                       item.status === 'Moderate' ? '#f59e0b' : '#ef4444'
              }))}
            />
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Zone Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <SimplePieChart data={stats.riskDistribution} />
          </CardContent>
        </Card>
      </div>

      {/* Tourist Activity Timeline */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Tourist Activity (24 Hours)</CardTitle>
        </CardHeader>
        <CardContent>
          <SimpleLineChart data={stats.touristActivity} />
        </CardContent>
      </Card>

      {/* Detailed Statistics Table */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Zone Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Zone</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Tourists</th>
                  <th className="text-left p-2">SOS Alerts</th>
                  <th className="text-left p-2">Unregistered</th>
                </tr>
              </thead>
              <tbody>
                {stats.touristsByZone.map((zone, index) => {
                  const sosCount = zone.name === 'Riverfront' ? 1 : zone.name === 'Desert Safari Point' ? 1 : 0;
                  const unregistered = zone.name === 'Riverfront' ? 1 : zone.name === 'Desert Safari Point' ? 1 : 0;
                  
                  return (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-2 font-medium">{zone.name}</td>
                      <td className="p-2">
                        <Badge className={`bg-status-${zone.status.toLowerCase()}`}>
                          {zone.status}
                        </Badge>
                      </td>
                      <td className="p-2">{zone.tourists}</td>
                      <td className="p-2">
                        {sosCount > 0 ? (
                          <Badge variant="destructive" className="animate-pulse">
                            {sosCount}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">0</span>
                        )}
                      </td>
                      <td className="p-2">
                        {unregistered > 0 ? (
                          <Badge variant="outline">{unregistered}</Badge>
                        ) : (
                          <span className="text-muted-foreground">0</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;