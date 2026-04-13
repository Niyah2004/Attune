import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { getPrivateData, attachExercise } from '../../services/PrivateStorage';
import { format } from 'date-fns';

const phaseMovement = [
  {
    id: 'menstrual',
    title: 'Menstrual Phase',
    color: '#d94b58',
    intensity: 'Low Intensity',
    activities: [
      'Yin or Restorative Yoga',
      'Light Nature Walks',
      'Gentle Mat Stretching',
      'Complete Rest'
    ],
    ytLink: 'https://www.youtube.com/results?search_query=restorative+yoga+for+period+cramps'
  },
  {
    id: 'follicular',
    title: 'Follicular Phase',
    color: '#76a68f',
    intensity: 'Medium & Rising',
    activities: [
      'Vinyasa Yoga',
      'Light Jogging / Hiking',
      'Dance Workouts',
      'Mat Pilates'
    ],
    ytLink: 'https://www.youtube.com/results?search_query=follicular+phase+vinyasa+yoga+workout'
  },
  {
    id: 'ovulation',
    title: 'Ovulation Phase',
    color: '#6b8cae',
    intensity: 'High Energy',
    activities: [
      'HIIT & Cardio',
      'Strength Training / Weights',
      'Spin Classes',
      'Power Yoga'
    ],
    ytLink: 'https://www.youtube.com/results?search_query=ovulation+phase+high+intensity+workout+hiit'
  },
  {
    id: 'luteal',
    title: 'Luteal Phase',
    color: '#a67b5b',
    intensity: 'Tapering Down',
    activities: [
      'Reformer Pilates',
      'Long Steady Walks',
      'Hatha Yoga',
      'Mobility Work'
    ],
    ytLink: 'https://www.youtube.com/results?search_query=luteal+phase+slow+mat+pilates'
  }
];

export default function WaysToMove({ onBack }: any) {
  const { colors } = useTheme();
  const [exercises, setExercises] = useState<any[]>([]);
  const [draft, setDraft] = useState('');
  
  const todayStr = format(new Date(), 'yyyy-MM-dd');

  const loadData = async () => {
    const data = await getPrivateData();
    setExercises(data?.logs?.[todayStr]?.exercises || []);
  };

  useEffect(() => { loadData(); }, []);

  const handleAdd = async () => {
    if (!draft.trim()) return;
    await attachExercise(todayStr, draft);
    setDraft('');
    loadData();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Feather name="arrow-left" size={20} color={colors.textMuted} />
        <Text style={[styles.backText, { color: colors.textMuted }]}>Library</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: colors.text }]}>Ways To Move</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>SYNC WITH YOUR ENERGY</Text>

      <View style={styles.list}>
        {phaseMovement.map((phase) => (
          <View key={phase.id} style={[styles.cardOffset, { backgroundColor: colors.border }]}>
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <TouchableOpacity 
                 style={styles.cardHeader} 
                 onPress={() => Linking.openURL(phase.ytLink).catch(e => console.log(e))}
                 activeOpacity={0.6}
              >
                <View style={[styles.dot, { backgroundColor: phase.color }]} />
                <Text style={[styles.phaseTitle, { color: colors.text }]}>{phase.title}</Text>
                <Feather name="play-circle" size={16} color="#FA243C" style={{ marginLeft: 6 }} />
              </TouchableOpacity>
              
              <Text style={[styles.intensityText, { color: colors.textMuted }]}>{phase.intensity}</Text>
              
              <View style={styles.activityList}>
                {phase.activities.map((act, index) => (
                  <View key={index} style={[styles.activityBadge, { backgroundColor: colors.highlight }]}>
                    <Text style={[styles.activityText, { color: colors.text }]}>{act}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}
      </View>

      <Text style={[styles.title, { color: colors.text, marginTop: 40 }]}>Exercise Log</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>TRACK TODAY'S MOVEMENT</Text>
      
      <View style={[styles.cardOffset, { backgroundColor: colors.border, marginBottom: 24 }]}>
        <View style={[styles.inputBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
           <TextInput 
             style={[styles.input, { color: colors.text }]}
             placeholder="What did you do today?"
             placeholderTextColor={colors.textMuted}
             value={draft}
             onChangeText={setDraft}
             onSubmitEditing={handleAdd}
           />
           <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.border }]} onPress={handleAdd}>
             <Feather name="plus" size={16} color={colors.background} />
           </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.logList}>
        {exercises.map(e => (
          <View key={e.id} style={[styles.logRow, { backgroundColor: colors.cardAlt }]}>
             <Feather name="activity" size={16} color={colors.highlight} />
             <Text style={[styles.logText, { color: colors.text }]}>{e.text}</Text>
          </View>
        ))}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingBottom: 40,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  backText: {
    fontWeight: 'bold',
    letterSpacing: 1,
    fontSize: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 24,
  },
  list: {
    gap: 20,
  },
  cardOffset: {
    borderRadius: 8,
  },
  card: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 20,
    transform: [{ translateX: -4 }, { translateY: -4 }],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  phaseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  intensityText: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  activityList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  activityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  activityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  inputBox: {
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    transform: [{ translateX: -4 }, { translateY: -4 }],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  addBtn: {
    padding: 8,
    borderRadius: 16,
  },
  logList: {
    gap: 12,
  },
  logRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 12,
  },
  logText: {
    fontSize: 16,
    fontWeight: '500',
  }
});
