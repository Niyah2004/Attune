import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

const habitsList = [
  { id: 'water', icon: '💧', label: 'Drink Water' },
  { id: 'meditation', icon: '✨', label: 'Meditation' },
  { id: 'coffee', icon: '💨', label: 'No Coffee' },
  { id: 'journal', icon: '📖', label: 'Journaling' },
  { id: 'walk', icon: '🌻', label: 'Nature Walk' },
  { id: 'screentime', icon: '📵', label: 'Limit Screens' }
];

const habitRoadmaps: Record<string, { title: string, desc: string }> = {
  water: { title: 'Hydration Station', desc: 'Fill a 2L bottle right now and keep it physically close to your workspace.' },
  meditation: { title: 'Sacred Pause', desc: 'Set exactly a 2-minute timer immediately after lunch to disconnect.' },
  coffee: { title: 'Decaf Transition', desc: 'Swap your afternoon cup for an herbal peppermint tea or matcha.' },
  journal: { title: 'Mind Dump', desc: 'Leave your notebook open on your pillow to write down lingering thoughts before sleep.' },
  walk: { title: 'Sun Catcher', desc: 'Step outside into the physical elements for 10 minutes during your first break.' },
  screentime: { title: 'Digital Detox', desc: 'Physically place your phone in a drawer 1 full hour before your intended bedtime.' }
};

const DailyVibeCheck = ({ onLogVibe, isEmbedded }: any) => {
  const [mood, setMood] = useState(50);
  const [habits, setHabits] = useState<string[]>([]);
  const [roadmap, setRoadmap] = useState<{title: string, desc: string}[] | null>(null);
  
  const { colors, setTheme, isDark } = useTheme();
  
  const handleMoodChange = (val: number) => {
    setMood(val);
    if (val <= 5 && !isDark) {
      setTheme(true);
    } else if (val >= 95 && isDark) {
      setTheme(false);
    }
  };
  const handleHabitToggle = (id: string) => {
    setHabits(prev => 
      prev.includes(id) ? prev.filter(h => h !== id) : [...prev, id]
    );
    // Reset roadmap if they change their mind
    if (roadmap) setRoadmap(null);
  };

  const handleSealTheDeal = () => {
    if (habits.length === 0) {
       setRoadmap([]);
       return;
    }
    const steps = habits.map(id => habitRoadmaps[id]);
    setRoadmap(steps);
  };

  return (
    <View style={!isEmbedded ? [styles.standalonePanel, { backgroundColor: colors.card, borderColor: colors.border }] : null}>
      <View style={styles.header}>
        <Feather name="star" size={12} color={colors.textMuted} />
        <Text style={[styles.title, { color: colors.textMuted }]}>DAILY VIBE</Text>
      </View>
      
      <View style={styles.moodSection}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={mood}
          onValueChange={handleMoodChange}
          minimumTrackTintColor={colors.highlight}
          maximumTrackTintColor={colors.highlight}
          thumbTintColor={colors.textMuted}
        />
        <View style={styles.moodIcons}>
          <Text style={styles.emoji}>🌙</Text>
          <Text style={styles.emoji}>✨</Text>
        </View>
      </View>
      
      <View style={styles.header}>
        <Feather name="star" size={12} color={colors.textMuted} />
        <Text style={[styles.title, { color: colors.textMuted }]}>HABITS</Text>
      </View>
      
      <View style={styles.habitsGrid}>
        {habitsList.map(h => {
          const isActive = habits.includes(h.id);
          return (
            <TouchableOpacity 
              key={h.id}
              style={[
                styles.habitButton, 
                { backgroundColor: isActive ? colors.highlight : colors.card, borderColor: isActive ? colors.textMuted : colors.highlight }
              ]}
              onPress={() => handleHabitToggle(h.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.habitIcon}>{h.icon}</Text>
              <Text style={[styles.habitLabel, { color: colors.textMuted }]}>{h.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity 
         style={[styles.sealBtn, { backgroundColor: colors.text, borderColor: colors.border }]} 
         onPress={handleSealTheDeal}
         activeOpacity={0.8}
      >
         <Text style={[styles.sealText, { color: colors.background }]}>SEAL THE DEAL</Text>
      </TouchableOpacity>

      {roadmap && roadmap.length > 0 && (
         <View style={[styles.roadmapBox, { borderTopColor: colors.border }]}>
           <Text style={[styles.roadmapHeader, { color: colors.text }]}>Today's Roadmap</Text>
           {roadmap.map((step, idx) => (
             <View key={idx} style={styles.roadmapStep}>
                <View style={[styles.stepDot, { backgroundColor: colors.text }]} />
                <View style={styles.stepTextContent}>
                  <Text style={[styles.stepTitle, { color: colors.text }]}>{step.title}</Text>
                  <Text style={[styles.stepDesc, { color: colors.textMuted }]}>{step.desc}</Text>
                </View>
             </View>
           ))}
         </View>
      )}

      {roadmap && roadmap.length === 0 && (
         <Text style={{ marginTop: 16, color: colors.textMuted, fontSize: 12, textAlign: 'center' }}>
           Select a few habits first!
         </Text>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  standalonePanel: {
    backgroundColor: '#faf8f5',
    padding: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#12101a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#8b80a6',
    letterSpacing: 1.5,
  },
  moodSection: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  moodIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  emoji: {
    fontSize: 18,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  habitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  habitButton: {
    width: '31%',
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: '#faf8f5',
    borderWidth: 1,
    borderColor: '#e0dad6',
    alignItems: 'center',
    gap: 8,
  },
  habitButtonActive: {
    backgroundColor: '#e0dad6',
    borderColor: '#8b80a6',
  },
  habitIcon: {
    fontSize: 16,
  },
  habitLabel: {
    color: '#8b80a6',
    fontSize: 10,
    fontWeight: '600',
  },
  sealBtn: {
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 24,
    borderWidth: 2,
    alignItems: 'center',
    transform: [{ translateX: -2 }, { translateY: -2 }],
    shadowColor: '#12101a',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  sealText: {
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 12,
  },
  roadmapBox: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
  },
  roadmapHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  roadmapStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  stepDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
  },
  stepTextContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 12,
    lineHeight: 18,
  }
});

export default DailyVibeCheck;
