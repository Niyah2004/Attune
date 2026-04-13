import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { getPrivateData, logDailyVibe } from '../../services/PrivateStorage';
import { useFocusEffect } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import DailyVibeCheck from '../../components/DailyVibeCheck';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme/ThemeContext';

export default function DashboardScreen() {
  const [data, setData] = useState<any>(null);
  const [cycleDay, setCycleDay] = useState(1);
  const [totalDays, setTotalDays] = useState(28);
  const { colors, isDark } = useTheme();

  const loadData = async () => {
    const raw = await getPrivateData();
    setData(raw);
    const cycleLength = raw?.settings?.averageCycleLength || 28;
    setTotalDays(cycleLength);
    if (raw?.cycles?.length) {
      const start = new Date(raw.cycles[raw.cycles.length - 1].startDate);
      const diff = Math.floor((Date.now() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      setCycleDay(Math.max(1, Math.min(diff, cycleLength)));
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const handleLogVibe = async (payload: any) => {
    const today = new Date().toISOString().split('T')[0];
    await logDailyVibe(today, payload);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Simple Moon Graphic matching screenshot */}
        <View style={styles.moonContainer}>
           <View style={styles.moonGlow}>
             <LinearGradient colors={['#fff9e6', isDark ? colors.background : '#e0dad6']} style={styles.moonDisc} />
           </View>
           <Text style={[styles.moonSubtitle, { color: colors.textMuted }]}>DAY {cycleDay} OF {totalDays}</Text>
        </View>

        {/* Phase Card */}
        <View style={[styles.shadowOffset, { backgroundColor: colors.border }]}>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
               <Feather name="target" size={24} color={colors.text} />
               <Text style={[styles.cardTitle, { color: colors.text }]}>Follicular Phase</Text>
            </View>
            <Text style={[styles.cardText, { color: colors.text }]}>
              "Your energy is new beginnings right now. Honor the shift within."
            </Text>
          </View>
        </View>

        {/* Affirmation Card */}
        <View style={[styles.shadowOffset, { backgroundColor: colors.border }]}>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.cardCaption, { color: colors.textMuted }]}>SPIRITUAL AFFIRMATION</Text>
            <Text style={[styles.affirmationText, { color: colors.text }]}>
              I am a seed of potential, ready to bloom in my own time.
            </Text>
          </View>
        </View>

        {/* Daily Vibe Tracker */}
        <View style={[styles.shadowOffset, { backgroundColor: colors.border }]}>
          <View style={[styles.vibeCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <DailyVibeCheck onLogVibe={handleLogVibe} isEmbedded />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#dad6d3' },
  scroll: { padding: 24, paddingBottom: 100, gap: 24 },
  
  moonContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  moonGlow: {
    width: 100,
    height: 100,
    borderRadius: 50,
    shadowColor: '#12101a',
    shadowOffset: { width: -10, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    marginBottom: 24,
  },
  moonDisc: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  moonSubtitle: {
    fontSize: 12,
    color: '#8b80a6',
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  
  shadowOffset: {
    backgroundColor: '#12101a',
    borderRadius: 8,
  },
  card: {
    backgroundColor: '#faf8f5',
    borderWidth: 2,
    borderColor: '#12101a',
    borderRadius: 8,
    padding: 24,
    transform: [{ translateX: -4 }, { translateY: -4 }],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#12101a',
  },
  cardText: {
    fontSize: 16,
    color: '#2d263f',
    fontStyle: 'italic',
    lineHeight: 24,
  },
  cardCaption: {
    fontSize: 10,
    color: '#8b80a6',
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  affirmationText: {
    fontSize: 22,
    color: '#12101a',
    fontStyle: 'italic',
    fontWeight: '500',
    lineHeight: 30,
  },
  vibeCard: {
    backgroundColor: '#faf8f5',
    borderWidth: 2,
    borderColor: '#12101a',
    borderRadius: 8,
    padding: 24,
    transform: [{ translateX: -4 }, { translateY: -4 }],
  }
});
