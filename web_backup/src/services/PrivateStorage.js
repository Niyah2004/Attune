const STORAGE_KEY = 'attune_cycle_data';

const defaultData = {
  cycles: [], // { startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD', length: number }
  logs: {},   // { 'YYYY-MM-DD': { mood: 50, habits: ['water', 'meditation'] } }
  settings: {
    averageCycleLength: 28,
    averagePeriodLength: 5,
  }
};

export const getPrivateData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : defaultData;
};

export const savePrivateData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const logDailyVibe = (dateStr, payload) => {
  const data = getPrivateData();
  data.logs[dateStr] = { ...data.logs[dateStr], ...payload };
  savePrivateData(data);
  return data;
};

export const addCycle = (startDate, endDate) => {
  const data = getPrivateData();
  let length = data.settings.averageCycleLength;
  if (data.cycles.length > 0) {
    const lastStart = new Date(data.cycles[data.cycles.length - 1].startDate);
    const newStart = new Date(startDate);
    length = Math.round((newStart - lastStart) / (1000 * 60 * 60 * 24));
  }
  
  data.cycles.push({ startDate, endDate, length });
  savePrivateData(data);
  return data;
};

export const updateSettings = (newSettings) => {
  const data = getPrivateData();
  data.settings = { ...data.settings, ...newSettings };
  savePrivateData(data);
  return data;
};

