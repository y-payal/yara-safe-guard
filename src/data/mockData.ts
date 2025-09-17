// YaRa Tourism Safety Dashboard Mock Data
export interface Tourist {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  riskLevel: 'Low' | 'Moderate' | 'High';
  idIssued: boolean;
  blockchainId?: string;
  sosActive?: boolean;
  nationality?: string;
  emergencyContact?: string;
  itinerary?: string;
  safetyScore?: number;
  lastActiveTime?: string;
}

export interface Zone {
  zoneId: string;
  name: string;
  status: 'Safe' | 'Moderate' | 'Risky';
  tourists: Tourist[];
  nearbyHelpCenters: string[];
  coordinates?: { lat: number; lng: number };
  radius?: number;
}

export interface Officer {
  id: string;
  name: string;
  email: string;
  deptId: string;
  role: string;
}

export const mockOfficers: Officer[] = [
  {
    id: 'OFF001',
    name: 'Officer Rajesh Kumar',
    email: 'rajesh.kumar@tourism.gov.in',
    deptId: 'TOUR-DEL-001',
    role: 'Senior Safety Officer'
  },
  {
    id: 'OFF002',
    name: 'Officer Priya Sharma',
    email: 'priya.sharma@tourism.gov.in',
    deptId: 'TOUR-DEL-002',
    role: 'Zone Coordinator'
  }
];

export const mockZonesData: { zones: Zone[] } = {
  zones: [
    {
      zoneId: "Z001",
      name: "Hilltop View",
      status: "Safe",
      coordinates: { lat: 28.6501, lng: 77.2323 },
      radius: 500,
      tourists: [
        {
          id: "T001",
          name: "Alice Kumar",
          location: { lat: 28.6501, lng: 77.2323 },
          riskLevel: "Low",
          idIssued: true,
          blockchainId: "bc_0x1234SAFE",
          nationality: "India",
          emergencyContact: "+91-9876543210",
          itinerary: "Delhi Heritage Tour - 3 days",
          safetyScore: 95,
          lastActiveTime: "5 minutes ago"
        },
        {
          id: "T002",
          name: "Raj Verma",
          location: { lat: 28.6503, lng: 77.2328 },
          riskLevel: "Low",
          idIssued: true,
          blockchainId: "bc_0x1234SAFE2",
          nationality: "India",
          emergencyContact: "+91-9876543211",
          itinerary: "Red Fort & India Gate Visit",
          safetyScore: 92,
          lastActiveTime: "3 minutes ago"
        }
      ],
      nearbyHelpCenters: ["Police Outpost A", "Tourist Control Room North"]
    },
    {
      zoneId: "Z002",
      name: "Riverfront",
      status: "Risky",
      coordinates: { lat: 28.7041, lng: 77.1025 },
      radius: 800,
      tourists: [
        {
          id: "T003",
          name: "Fatima Sheikh",
          location: { lat: 28.7041, lng: 77.1025 },
          riskLevel: "High",
          idIssued: true,
          blockchainId: "bc_0xRISKY001",
          sosActive: true,
          nationality: "UAE",
          emergencyContact: "+971-501234567",
          itinerary: "Yamuna River Cruise",
          safetyScore: 45,
          lastActiveTime: "1 minute ago"
        },
        {
          id: "T004",
          name: "John Mathew",
          location: { lat: 28.7045, lng: 77.1028 },
          riskLevel: "High",
          idIssued: false,
          nationality: "USA",
          emergencyContact: "+1-555-0123",
          itinerary: "Independent Travel",
          safetyScore: 60,
          lastActiveTime: "8 minutes ago"
        },
        {
          id: "T005",
          name: "Mei Lin",
          location: { lat: 28.705, lng: 77.103 },
          riskLevel: "Moderate",
          idIssued: true,
          blockchainId: "bc_0xRISKY002",
          nationality: "China",
          emergencyContact: "+86-138-0013-8000",
          itinerary: "Cultural Heritage Tour",
          safetyScore: 75,
          lastActiveTime: "12 minutes ago"
        }
      ],
      nearbyHelpCenters: ["Police HQ South", "First Aid Center"]
    },
    {
      zoneId: "Z003",
      name: "City Museum",
      status: "Moderate",
      coordinates: { lat: 28.6139, lng: 77.209 },
      radius: 300,
      tourists: [
        {
          id: "T006",
          name: "Carlos Rivera",
          location: { lat: 28.6139, lng: 77.209 },
          riskLevel: "Moderate",
          idIssued: true,
          blockchainId: "bc_0xMUSEUM001",
          nationality: "Spain",
          emergencyContact: "+34-600-123-456",
          itinerary: "Museum & Art Gallery Tour",
          safetyScore: 82,
          lastActiveTime: "15 minutes ago"
        }
      ],
      nearbyHelpCenters: ["Museum Security Desk", "Tourist Helpline Booth"]
    },
    {
      zoneId: "Z004",
      name: "Desert Safari Point",
      status: "Risky",
      coordinates: { lat: 26.9124, lng: 75.7873 },
      radius: 1200,
      tourists: [
        {
          id: "T007",
          name: "Ananya Gupta",
          location: { lat: 26.9124, lng: 75.7873 },
          riskLevel: "High",
          idIssued: false,
          sosActive: false,
          nationality: "India",
          emergencyContact: "+91-9876543212",
          itinerary: "Rajasthan Desert Experience",
          safetyScore: 55,
          lastActiveTime: "25 minutes ago"
        },
        {
          id: "T008",
          name: "Michael Brown",
          location: { lat: 26.9128, lng: 75.7876 },
          riskLevel: "High",
          idIssued: true,
          blockchainId: "bc_0xDESERT001",
          sosActive: true,
          nationality: "UK",
          emergencyContact: "+44-7911-123456",
          itinerary: "Adventure Desert Safari",
          safetyScore: 40,
          lastActiveTime: "2 minutes ago"
        }
      ],
      nearbyHelpCenters: ["Tourist Patrol Camp", "Emergency First Response Tent"]
    },
    {
      zoneId: "Z005",
      name: "Beachfront",
      status: "Safe",
      coordinates: { lat: 15.2993, lng: 74.124 },
      radius: 600,
      tourists: [
        {
          id: "T009",
          name: "Sophia Lee",
          location: { lat: 15.2993, lng: 74.124 },
          riskLevel: "Low",
          idIssued: true,
          blockchainId: "bc_0xBEACH001",
          nationality: "South Korea",
          emergencyContact: "+82-10-1234-5678",
          itinerary: "Goa Beach Holiday",
          safetyScore: 90,
          lastActiveTime: "10 minutes ago"
        },
        {
          id: "T010",
          name: "Arjun Singh",
          location: { lat: 15.2998, lng: 74.1244 },
          riskLevel: "Low",
          idIssued: true,
          blockchainId: "bc_0xBEACH002",
          nationality: "India",
          emergencyContact: "+91-9876543213",
          itinerary: "Water Sports & Beach Activities",
          safetyScore: 88,
          lastActiveTime: "7 minutes ago"
        }
      ],
      nearbyHelpCenters: ["Beach Police Station", "Lifeguard Center"]
    }
  ]
};

export const getTouristStatusColor = (tourist: Tourist): string => {
  if (tourist.sosActive) return 'sos';
  switch (tourist.riskLevel) {
    case 'Low': return 'safe';
    case 'Moderate': return 'moderate';
    case 'High': return 'risky';
    default: return 'safe';
  }
};

export const getZoneStatusColor = (status: string): string => {
  switch (status) {
    case 'Safe': return 'safe';
    case 'Moderate': return 'moderate';
    case 'Risky': return 'risky';
    default: return 'safe';
  }
};

// Statistics data for charts
export const getStatisticsData = () => {
  const zones = mockZonesData.zones;
  const allTourists = zones.flatMap(zone => zone.tourists);
  
  return {
    touristsByZone: zones.map(zone => ({
      name: zone.name,
      tourists: zone.tourists.length,
      status: zone.status
    })),
    
    riskDistribution: [
      { name: 'Safe Zones', value: zones.filter(z => z.status === 'Safe').length, color: '#22c55e' },
      { name: 'Moderate Risk', value: zones.filter(z => z.status === 'Moderate').length, color: '#f59e0b' },
      { name: 'High Risk', value: zones.filter(z => z.status === 'Risky').length, color: '#ef4444' }
    ],
    
    touristActivity: [
      { time: '00:00', tourists: 45 },
      { time: '04:00', tourists: 12 },
      { time: '08:00', tourists: 89 },
      { time: '12:00', tourists: 156 },
      { time: '16:00', tourists: 203 },
      { time: '20:00', tourists: 187 },
      { time: '24:00', tourists: 98 }
    ],
    
    totalTourists: allTourists.length,
    activeSOS: allTourists.filter(t => t.sosActive).length,
    unregisteredTourists: allTourists.filter(t => !t.idIssued).length,
    averageSafetyScore: Math.round(allTourists.reduce((acc, t) => acc + (t.safetyScore || 0), 0) / allTourists.length)
  };
};