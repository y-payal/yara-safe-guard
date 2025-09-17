import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';

interface ChartData {
  name: string;
  value: number;
  color?: string;
  [key: string]: any;
}

interface SimpleBarChartProps {
  data: ChartData[];
  title?: string;
  className?: string;
}

export const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data, title, className = "" }) => (
  <div className={`p-4 ${className}`}>
    {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis dataKey="name" className="text-sm" />
        <YAxis className="text-sm" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))', 
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px'
          }}
        />
        <Bar dataKey="value" fill="hsl(var(--primary))" className="transition-opacity hover:opacity-80" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

interface SimplePieChartProps {
  data: ChartData[];
  title?: string;
  className?: string;
}

export const SimplePieChart: React.FC<SimplePieChartProps> = ({ data, title, className = "" }) => (
  <div className={`p-4 ${className}`}>
    {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }: any) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="hsl(var(--primary))"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || `hsl(var(--primary))`} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))', 
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

interface SimpleLineChartProps {
  data: Array<{ time: string; tourists: number }>;
  title?: string;
  className?: string;
}

export const SimpleLineChart: React.FC<SimpleLineChartProps> = ({ data, title, className = "" }) => (
  <div className={`p-4 ${className}`}>
    {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis dataKey="time" className="text-sm" />
        <YAxis className="text-sm" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))', 
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="tourists" 
          stroke="hsl(var(--primary))" 
          strokeWidth={2}
          dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);