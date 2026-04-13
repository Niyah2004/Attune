import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'attune_cycle_data';

const defaultData = {
  cycles: [], // { startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD', length: number }
  logs: {},   // { 'YYYY-MM-DD': { mood: 50, habits: ['water', 'meditation'] } }
  settings: {
    averageCycleLength: 28,
    averagePeriodLength: 5,
  }
};

export const getPrivateData = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : defaultData;
  } catch (e) {
    console.error('Failed to get data', e);
    return defaultData;
  }
};

export const savePrivateData = async (data) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save data', e);
  }
};

export const logDailyVibe = async (dateStr, payload) => {
  const data = await getPrivateData();
  data.logs[dateStr] = { ...data.logs[dateStr], ...payload };
  await savePrivateData(data);
  return data;
};

export const addCycle = async (startDate, endDate) => {
  const data = await getPrivateData();
  let length = data.settings.averageCycleLength;
  if (data.cycles.length > 0) {
    const lastStart = new Date(data.cycles[data.cycles.length - 1].startDate);
    const newStart = new Date(startDate);
    length = Math.round((newStart - lastStart) / (1000 * 60 * 60 * 24));
  }
  
  data.cycles.push({ startDate, endDate, length });
  await savePrivateData(data);
  return data;
};

export const updateSettings = async (newSettings) => {
  const data = await getPrivateData();
  data.settings = { ...data.settings, ...newSettings };
  await savePrivateData(data);
  return data;
};

// --- Daily Logging Helpers ---

export const attachTask = async (dateStr, text) => {
  const data = await getPrivateData();
  if (!data.logs[dateStr]) data.logs[dateStr] = {};
  if (!data.logs[dateStr].tasks) data.logs[dateStr].tasks = [];
  
  data.logs[dateStr].tasks.push({ id: Date.now().toString(), text, done: false });
  await savePrivateData(data);
  return data;
};

export const flipTaskNode = async (dateStr, taskId) => {
  const data = await getPrivateData();
  if (data.logs[dateStr] && data.logs[dateStr].tasks) {
    data.logs[dateStr].tasks = data.logs[dateStr].tasks.map(t => 
      t.id === taskId ? { ...t, done: !t.done } : t
    );
    await savePrivateData(data);
  }
  return data;
};

export const attachExercise = async (dateStr, text) => {
  const data = await getPrivateData();
  if (!data.logs[dateStr]) data.logs[dateStr] = {};
  if (!data.logs[dateStr].exercises) data.logs[dateStr].exercises = [];
  
  data.logs[dateStr].exercises.push({ id: Date.now().toString(), text });
  await savePrivateData(data);
  return data;
};
