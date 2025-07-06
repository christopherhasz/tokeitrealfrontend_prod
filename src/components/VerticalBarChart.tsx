import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface VerticalBarChartProps {
  marketSize: number;
  transactionVolume: number;
  maxValue: number;
  unit: string;
}

interface ChartDataItem {
  name: string;
  value: number;
  fill: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    fill: string;
    dataKey: string;
    payload: ChartDataItem;
  }>;
  label?: string;
}

export const VerticalBarChart: React.FC<VerticalBarChartProps> = ({
  marketSize,
  transactionVolume,
  maxValue,
  unit,
}) => {
  const primaryColor = '#000000';
  const secondaryColor = 'rgba(0, 0, 0, 0.5)';

  const data = [
    {
      name: 'Market Size',
      value: marketSize,
      fill: primaryColor
    },
    {
      name: 'Transaction Volume',
      value: transactionVolume,
      fill: secondaryColor
    }
  ];

  const formatYAxis = (value: number) => {
    if (value >= 1) {
      return `${value}${unit}`;
    } else if (value > 0) {
      return `${(value * 1000).toFixed(0)}B`;
    }
    return '0';
  };

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const formattedValue = value >= 1 ? 
        `${value.toFixed(2)}${unit}` : 
        `${(value * 1000).toFixed(1)}B`;
      
      return (
        <div className="bg-white dark:bg-gray-800 p-2 shadow-lg rounded-lg border border-gray-100 dark:border-gray-700">
          <p className="text-sm" style={{ color: payload[0].fill }}>{`${label}: ${formattedValue}`}</p>
        </div>
      );
    }
    return null;
  };

  const ticks = maxValue === 200 ? [0, 100, 200] : [0, 1, 2];

  return (
    <div className="w-32 md:w-48 h-32 md:h-48 -ml-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <XAxis
            dataKey="name"
            tick={false}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis
            domain={[0, maxValue]}
            tickFormatter={formatYAxis}
            tick={{ fontSize: 10, fill: document.documentElement.classList.contains('dark') ? '#9CA3AF' : '#4B5563' }}
            width={55}
            ticks={ticks}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="value"
            radius={[4, 4, 0, 0]}
            barSize={window.innerWidth < 768 ? 20 : 37}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};