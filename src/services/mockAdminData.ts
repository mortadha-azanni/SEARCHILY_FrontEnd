export const mockMetrics = [
  { title: 'Total Searches', value: '124,592', change: '+12.5%', isPositive: true },
  { title: 'Active Users', value: '8,234', change: '+5.2%', isPositive: true },
  { title: 'Avg Response Time', value: '1.2s', change: '-0.3s', isPositive: true },
  { title: 'Error Rate', value: '0.4%', change: '+0.1%', isPositive: false },
];

export const mockChartData = [
  { label: 'Mon', value: 45 },
  { label: 'Tue', value: 65 },
  { label: 'Wed', value: 80 },
  { label: 'Thu', value: 55 },
  { label: 'Fri', value: 90 },
  { label: 'Sat', value: 70 },
  { label: 'Sun', value: 40 },
];

export const getMockDate = (daysAgo: number) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
};

export const mockReportsData = [
  { id: 'REP-001', name: 'Weekly Search Engagement', dateAgo: 0, status: 'Generated' },
  { id: 'REP-002', name: 'Top Trending Products', dateAgo: 1, status: 'Generated' },
  { id: 'REP-003', name: 'User Session Retention', dateAgo: 2, status: 'Failed' },
  { id: 'REP-004', name: 'Zero-Result Queries', dateAgo: 3, status: 'Generated' },
];

export const initialMockLogs = [
  { time: '12:05:32 AM', level: 'INFO', message: 'Sync process started manually.' },
  { time: '12:05:34 AM', level: 'INFO', message: 'Fetching updated records from catalog...' },
  { time: '12:06:12 AM', level: 'WARN', message: 'Skipped 3 records due to missing required fields.' },
  { time: '12:06:45 AM', level: 'INFO', message: 'Successfully indexed 12,402 items.' },
  { time: '12:06:46 AM', level: 'INFO', message: 'Sync completed.' },
];
