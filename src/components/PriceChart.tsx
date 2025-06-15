// src/components/PriceChart.tsx
"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts';
import { motion } from 'framer-motion';

type Props = {
  data: [number, number][]; // An array of [timestamp, price] tuples
};

export default function PriceChart({ data }: Props) {
  const formattedData = data.map(([timestamp, price]) => ({
    date: new Date(timestamp),
    price: price,
  }));

  // Calculate price change percentage
  const firstPrice = formattedData[0]?.price || 0;
  const lastPrice = formattedData[formattedData.length - 1]?.price || 0;
  const priceChange = lastPrice - firstPrice;
  const priceChangePercent = firstPrice !== 0 ? (priceChange / firstPrice) * 100 : 0;
  const isPositive = priceChange >= 0;

  return (
    <motion.div 
      className="w-full mt-2 rounded-xl overflow-hidden bg-gray-800/30 border border-gray-700/50 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Price Chart</h3>
          <p className="text-sm text-gray-400">Last 7 days</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold">${lastPrice.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
          <div className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'} flex items-center`}>
            {isPositive ? '↑' : '↓'} {Math.abs(priceChangePercent).toFixed(2)}%
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isPositive ? "#4ade80" : "#f87171"} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={isPositive ? "#4ade80" : "#f87171"} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.5} />
            <XAxis
              dataKey="date"
              stroke="#9ca3af"
              tickFormatter={(time) => time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              dy={5}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              stroke="#9ca3af"
              tickFormatter={(price) => `$${Math.round(price).toLocaleString()}`}
              domain={['dataMin', 'dataMax']}
              dx={-5}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              labelStyle={{ color: '#e5e7eb', fontWeight: 'bold', marginBottom: '0.5rem' }}
              formatter={(value: number) => [value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }), 'Price']}
              labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke={isPositive ? "#4ade80" : "#f87171"} 
              strokeWidth={2} 
              fillOpacity={1}
              fill="url(#colorPrice)" 
              dot={false}
              activeDot={{ r: 6, stroke: isPositive ? "#22c55e" : "#ef4444", strokeWidth: 2, fill: "#fff" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}