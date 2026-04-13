import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';
import { differenceInDays, parseISO } from 'date-fns';
import { getPrivateData, addCycle, attachTask, attachExercise } from '../../services/PrivateStorage';
import { getInnerSeason } from '../../services/CycleWisdom';
import { useFocusEffect } from 'expo-router';
import P5ConstellationVisual from '../../components/P5ConstellationVisual';
import CalendarOverview from '../../components/CalendarOverview';
import CalendarIntegrations from '../../components/CalendarIntegrations';
import { useTheme } from '../../theme/ThemeContext';

export default function ConstellationScreen() {
  const [data, setData] = useState<any>(null);
  const { colors } = useTheme();

  const loadData = async () => {
    const raw = await getPrivateData();
    setData(raw);
  };

  const handleLogCycle = async (start: string, end: string) => {
    const updated = await addCycle(start, end);
    setData(updated);
  };

  const handleAttachTask = async (dateStr: string, text: string) => {
    const updated = await attachTask(dateStr, text);
    setData(updated);
  };

  const handleAttachExercise = async (dateStr: string, text: string) => {
    const updated = await attachExercise(dateStr, text);
    setData(updated);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  let currentCycleDay = 13;
  if (data?.cycles && data.cycles.length > 0) {
    const sorted = [...data.cycles].sort((a: any, b: any) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    const active = sorted[0];
    currentCycleDay = differenceInDays(new Date(), parseISO(active.startDate)) + 1;
    if (currentCycleDay < 1) currentCycleDay = 1;
  }
  
  const phaseInfo = getInnerSeason(currentCycleDay);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
           <Text style={[styles.title, { color: colors.text }]}>The Constellation</Text>
           <Text style={[styles.subtitle, { color: colors.textMuted }]}>YOUR {phaseInfo.name.toUpperCase()} STAR MAP</Text>
        </View>
        
        {/* The Map */}
        <View style={[styles.shadowOffset, { backgroundColor: colors.border }]}>
          <View style={[styles.mapCard, { backgroundColor: '#0A0A12', borderColor: colors.border, height: 500, padding: 0, overflow: 'hidden' }]}>
             <P5ConstellationVisual />
          </View>
        </View>

        {/* The Calendar Tracking */}
        <View style={[styles.shadowOffset, { backgroundColor: colors.border }]}>
          <CalendarOverview 
             cycleLogs={data?.cycles} 
             dailyLogs={data?.logs}
             onLogCycle={handleLogCycle} 
             onAttachTask={handleAttachTask}
             onAttachExercise={handleAttachExercise}
          />
        </View>

        {/* External Calendars Hookup */}
        <CalendarIntegrations />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#dad6d3' },
  scroll: { padding: 24, paddingBottom: 100, gap: 24 },
  
  header: {
    alignItems: 'center',
    marginVertical: 16,
  },
  title: {
    fontSize: 28,
    color: '#2d263f',
    fontStyle: 'italic',
    fontWeight: '500',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#8b80a6',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  shadowOffset: {
    backgroundColor: '#12101a',
    borderRadius: 8,
  },
  mapCard: {
    backgroundColor: '#faf8f5',
    borderWidth: 2,
    borderColor: '#12101a',
    borderRadius: 8,
    padding: 24,
    transform: [{ translateX: -4 }, { translateY: -4 }],
  }
});
