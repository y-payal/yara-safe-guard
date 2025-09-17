import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Map, BarChart3, AlertTriangle, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { to: '/dashboard', icon: Map, label: 'Zone Risk Mapping' },
    { to: '/reports', icon: BarChart3, label: 'Reports & Statistics' },
    { to: '/alerts', icon: AlertTriangle, label: 'Manage Alerts & ID Issuance' },
  ];

  return (
    <nav className="government-gradient text-primary-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8" />
              <div>
                <h1 className="text-xl font-bold">YaRa</h1>
                <p className="text-xs opacity-90">Smart Tourist Safety System</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary-foreground text-primary"
                      : "text-primary-foreground hover:bg-primary-hover"
                  )
                }
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <User className="h-4 w-4" />
              <span className="hidden sm:block">{user?.name}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-primary-foreground hover:bg-primary-hover"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;