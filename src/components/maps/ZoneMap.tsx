import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MapPin, Users, Shield, Phone, AlertTriangle, X } from 'lucide-react';
import { mockZonesData, Tourist, Zone, getTouristStatusColor } from '@/data/mockData';

// Mock Map Component (since we don't have Mapbox token)
const MockMapView: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [selectedTourist, setSelectedTourist] = useState<Tourist | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [sosAlerts, setSosAlerts] = useState<Tourist[]>([]);

  // Find SOS alerts
  useEffect(() => {
    const allTourists = mockZonesData.zones.flatMap(zone => zone.tourists);
    const sosActive = allTourists.filter(tourist => tourist.sosActive);
    setSosAlerts(sosActive);
  }, []);

  const handleZoneClick = (zone: Zone) => {
    setSelectedZone(zone);
    setSelectedTourist(null);
  };

  const handleTouristClick = (tourist: Tourist) => {
    setSelectedTourist(tourist);
  };

  const dismissAlert = (touristId: string) => {
    setSosAlerts(prev => prev.filter(t => t.id !== touristId));
  };

  // Calculate tourist density for coloring
  const calculateDensity = (zoneIndex: number) => {
    const zone = mockZonesData.zones[zoneIndex];
    const touristCount = zone.tourists.length;
    if (touristCount >= 3) return 'high'; // Red
    if (touristCount >= 2) return 'medium'; // Yellow  
    return 'low'; // Green
  };

  const getDensityColor = (density: string) => {
    switch (density) {
      case 'high': return 'risky';
      case 'medium': return 'moderate'; 
      default: return 'safe';
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-4">
      {/* SOS Alerts Banner */}
      {sosAlerts.length > 0 && (
        <Alert className="border-sos bg-sos/10 animate-pulse">
          <AlertTriangle className="h-4 w-4 text-sos" />
          <AlertDescription className="text-sos font-semibold">
            {sosAlerts.length} Active SOS Alert{sosAlerts.length > 1 ? 's' : ''} - Immediate Attention Required!
          </AlertDescription>
        </Alert>
      )}

      {/* Mapbox Token Input (temporary for demo) */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Enter Mapbox Public Token (Optional)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbGhzM..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" size="sm">
              Load Map
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Get your token from <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
          </p>
        </CardContent>
      </Card>

      {/* Mock Map Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Zone List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-semibold">Zones Overview</h3>
          {mockZonesData.zones.map((zone) => (
            <Card 
              key={zone.zoneId} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedZone?.zoneId === zone.zoneId ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleZoneClick(zone)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{zone.name}</h4>
                  <Badge className={`bg-status-${zone.status.toLowerCase()}`}>
                    {zone.status}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  {zone.tourists.length} tourists
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Map View (Mock) */}
        <div className="lg:col-span-2">
          <Card className="h-[600px]">
            <CardContent className="p-0 h-full">
              <div className="relative h-full bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 rounded-lg flex items-center justify-center">
                {/* Mock Map Background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg"></div>
                </div>
                
                {/* Zone Markers */}
                <div className="relative z-10 w-full h-full p-8">
                  {mockZonesData.zones.map((zone, index) => {
                    const density = calculateDensity(index);
                    return (
                      <div
                        key={zone.zoneId}
                        className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2`}
                        style={{
                          left: `${20 + (index * 15)}%`,
                          top: `${30 + (index * 12)}%`,
                        }}
                      >
                        {/* Zone Circle with Tooltip */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div 
                              className={`w-16 h-16 rounded-full bg-status-${zone.status.toLowerCase()} opacity-30 animate-pulse cursor-pointer`}
                              onClick={() => handleZoneClick(zone)}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-sm">
                              <p className="font-medium">{zone.name}</p>
                              <p>Status: {zone.status}</p>
                              <p>Tourists: {zone.tourists.length}</p>
                              <p>Density: {density}</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                        
                        {/* Zone Label */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white px-2 py-1 rounded shadow-sm text-xs font-medium whitespace-nowrap">
                          {zone.name}
                        </div>

                        {/* Tourist Dots - All visible with density-based coloring */}
                        {zone.tourists.map((tourist, tIndex) => (
                          <Tooltip key={tourist.id}>
                            <TooltipTrigger asChild>
                              <div
                                className={`absolute w-3 h-3 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                                  tourist.sosActive 
                                    ? 'animate-pulse-sos bg-status-sos' 
                                    : `bg-status-${getDensityColor(density)}`
                                }`}
                                style={{
                                  left: `${-20 + (tIndex * 15)}px`,
                                  top: `${-10 + (tIndex * 10)}px`,
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTouristClick(tourist);
                                }}
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-sm">
                                <p className="font-medium">{tourist.name}</p>
                                <p>Risk: {tourist.riskLevel}</p>
                                <p>ID: {tourist.idIssued ? 'Issued' : 'Pending'}</p>
                                {tourist.sosActive && <p className="text-sos font-bold">SOS ACTIVE!</p>}
                                <p>Safety: {tourist.safetyScore}/100</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    );
                  })}
                </div>

                {/* Map Instructions */}
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-sm text-sm">
                  <p className="font-medium mb-2">Interactive Demo Map</p>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-safe rounded-full"></div>
                      <span>Safe Zone/Tourist</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-moderate rounded-full"></div>
                      <span>Moderate Risk</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-risky rounded-full"></div>
                      <span>High Risk</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-sos rounded-full animate-pulse"></div>
                      <span>SOS Alert</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Zone Details */}
      {selectedZone && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{selectedZone.name} Details</span>
              <Badge className={`bg-status-${selectedZone.status.toLowerCase()}`}>
                {selectedZone.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Tourists ({selectedZone.tourists.length})
                </h4>
                <div className="space-y-2">
                  {selectedZone.tourists.map((tourist) => (
                    <div
                      key={tourist.id}
                      className="flex items-center justify-between p-2 bg-muted rounded cursor-pointer hover:bg-muted/80"
                      onClick={() => handleTouristClick(tourist)}
                    >
                      <span className="text-sm">{tourist.name}</span>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full bg-status-${getTouristStatusColor(tourist)}`}></div>
                        {tourist.sosActive && (
                          <Badge variant="destructive" className="text-xs animate-pulse">
                            SOS
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Nearby Help Centers
                </h4>
                <div className="space-y-1">
                  {selectedZone.nearbyHelpCenters.map((center, index) => (
                    <div key={index} className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-2" />
                      {center}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tourist Details Lightbox Modal */}
      <Dialog open={!!selectedTourist} onOpenChange={() => setSelectedTourist(null)}>
        <DialogContent className="max-w-2xl">
          {selectedTourist && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Tourist Details: {selectedTourist.name}</span>
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
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Blockchain ID</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedTourist.blockchainId || 'Not Issued'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Nationality</label>
                    <p className="text-sm text-muted-foreground">{selectedTourist.nationality}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Safety Score</label>
                    <p className="text-sm text-muted-foreground">{selectedTourist.safetyScore}/100</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Emergency Contact</label>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Phone className="h-3 w-3 mr-1" />
                      {selectedTourist.emergencyContact}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Itinerary</label>
                    <p className="text-sm text-muted-foreground">{selectedTourist.itinerary}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Last Active</label>
                    <p className="text-sm text-muted-foreground">{selectedTourist.lastActiveTime}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                {selectedTourist.sosActive && (
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => dismissAlert(selectedTourist.id)}
                  >
                    Acknowledge SOS
                  </Button>
                )}
                {!selectedTourist.idIssued && (
                  <Button variant="outline" size="sm">
                    Issue Blockchain ID
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  Contact Tourist
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      </div>
    </TooltipProvider>
  );
};

export default MockMapView;