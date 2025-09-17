import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { mockZonesData, Tourist, getTouristStatusColor } from '@/data/mockData';
import { AlertTriangle, CheckCircle, Clock, Search, Shield, User, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AlertsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTourist, setSelectedTourist] = useState<Tourist | null>(null);
  const [alerts, setAlerts] = useState<Tourist[]>([]);
  const { toast } = useToast();

  // Initialize alerts from mock data
  useEffect(() => {
    const allTourists = mockZonesData.zones.flatMap(zone => zone.tourists);
    const sosAlerts = allTourists.filter(t => t.sosActive);
    const inactiveAlerts = allTourists.filter(t => 
      !t.sosActive && t.lastActiveTime && 
      parseInt(t.lastActiveTime.split(' ')[0]) > 20
    );
    setAlerts([...sosAlerts, ...inactiveAlerts]);
  }, []);

  const allTourists = mockZonesData.zones.flatMap(zone => zone.tourists);
  
  const filteredTourists = allTourists.filter(tourist =>
    tourist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tourist.nationality?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tourist.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAcknowledgeAlert = (touristId: string) => {
    setAlerts(prev => prev.filter(t => t.id !== touristId));
    toast({
      title: "Alert Acknowledged",
      description: "SOS alert has been acknowledged and response team notified.",
    });
  };

  const handleIssueId = (touristId: string) => {
    // In real app, this would make API call
    toast({
      title: "ID Issued Successfully",
      description: `Blockchain ID has been generated and sent to tourist ${touristId}`,
    });
  };

  const getAlertType = (tourist: Tourist): 'sos' | 'inactive' | 'unregistered' => {
    if (tourist.sosActive) return 'sos';
    if (!tourist.idIssued) return 'unregistered';
    if (tourist.lastActiveTime && parseInt(tourist.lastActiveTime.split(' ')[0]) > 20) return 'inactive';
    return 'inactive';
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'sos': return AlertTriangle;
      case 'inactive': return Clock;
      case 'unregistered': return Shield;
      default: return AlertTriangle;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'sos': return 'destructive';
      case 'inactive': return 'secondary';
      case 'unregistered': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Alerts & ID Issuance</h1>
        <div className="flex items-center space-x-2">
          <Badge variant="destructive" className={alerts.length > 0 ? 'animate-pulse' : ''}>
            {alerts.length} Active Alerts
          </Badge>
        </div>
      </div>

      {/* Active Alerts Section */}
      {alerts.length > 0 && (
        <Card className="border-destructive bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Critical Alerts Requiring Immediate Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((tourist) => {
                const alertType = getAlertType(tourist);
                const AlertIcon = getAlertIcon(alertType);
                
                return (
                  <Alert key={tourist.id} className="alert-shadow animate-fade-in">
                    <AlertIcon className="h-4 w-4" />
                    <AlertDescription>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold">{tourist.name}</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            {alertType === 'sos' && '🚨 SOS Alert Active'}
                            {alertType === 'inactive' && '⏰ No activity for 25+ minutes'}  
                            {alertType === 'unregistered' && '🆔 No Blockchain ID issued'}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedTourist(tourist)}
                          >
                            View Details
                          </Button>
                          {alertType === 'sos' && (
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleAcknowledgeAlert(tourist.id)}
                            >
                              Acknowledge
                            </Button>
                          )}
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle>Tourist Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, nationality, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Tourist List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTourists.map((tourist) => (
              <Card 
                key={tourist.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  tourist.sosActive ? 'border-destructive animate-pulse-sos' : ''
                } ${selectedTourist?.id === tourist.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedTourist(tourist)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{tourist.name}</h4>
                    <div className="flex items-center space-x-1">
                      <div className={`w-3 h-3 rounded-full bg-status-${getTouristStatusColor(tourist)}`}></div>
                      {tourist.sosActive && (
                        <Badge variant="destructive" className="text-xs animate-pulse">
                          SOS
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {tourist.nationality}
                    </div>
                    <div className="flex items-center">
                      <Shield className="h-3 w-3 mr-1" />
                      {tourist.idIssued ? 'ID Issued' : 'No ID'}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {tourist.lastActiveTime}
                    </div>
                  </div>

                  <div className="mt-3 flex space-x-2">
                    <Badge className={`bg-status-${tourist.riskLevel.toLowerCase()}`}>
                      {tourist.riskLevel}
                    </Badge>
                    {!tourist.idIssued && (
                      <Badge variant="outline">Unregistered</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tourist Detail Modal */}
      {selectedTourist && (
        <Card className="border-primary animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Tourist Profile: {selectedTourist.name}</span>
              <div className="flex items-center space-x-2">
                <Badge className={`bg-status-${getTouristStatusColor(selectedTourist)}`}>
                  {selectedTourist.riskLevel}
                </Badge>
                {selectedTourist.sosActive && (
                  <Badge variant="destructive" className="animate-pulse">
                    SOS ACTIVE
                  </Badge>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Personal Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Tourist ID</label>
                    <p className="font-mono">{selectedTourist.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <p>{selectedTourist.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Nationality</label>
                    <p>{selectedTourist.nationality}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Emergency Contact</label>
                    <p className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {selectedTourist.emergencyContact}
                    </p>
                  </div>
                </div>
              </div>

              {/* Security & Status */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Security & Status</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Blockchain ID</label>
                    <p className="font-mono text-sm">
                      {selectedTourist.blockchainId || (
                        <span className="text-muted-foreground">Not Issued</span>
                      )}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Risk Level</label>
                    <Badge className={`bg-status-${selectedTourist.riskLevel.toLowerCase()}`}>
                      {selectedTourist.riskLevel}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Safety Score</label>
                    <p className="text-lg font-semibold">{selectedTourist.safetyScore}/100</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Last Activity</label>
                    <p className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {selectedTourist.lastActiveTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Travel Information */}
              <div className="lg:col-span-2 space-y-4">
                <h4 className="font-semibold text-lg">Travel Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Current Location</label>
                    <p className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      {selectedTourist.location.lat.toFixed(4)}, {selectedTourist.location.lng.toFixed(4)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Itinerary</label>
                    <p className="text-sm">{selectedTourist.itinerary}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-2">
              {selectedTourist.sosActive && (
                <Button 
                  variant="destructive" 
                  onClick={() => handleAcknowledgeAlert(selectedTourist.id)}
                  className="animate-pulse"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Acknowledge SOS Alert
                </Button>
              )}
              {!selectedTourist.idIssued && (
                <Button 
                  onClick={() => handleIssueId(selectedTourist.id)}
                  className="government-gradient"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Issue Blockchain ID
                </Button>
              )}
              <Button variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Contact Tourist
              </Button>
              <Button variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                Track Location
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setSelectedTourist(null)}
              >
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AlertsPage;