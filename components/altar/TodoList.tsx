import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { getPrivateData, attachTask, flipTaskNode } from '../../services/PrivateStorage';
import { format } from 'date-fns';

export default function TodoList({ onBack }: any) {
  const { colors } = useTheme();
  const [tasks, setTasks] = useState<any[]>([]);
  const [draft, setDraft] = useState('');
  
  const todayStr = format(new Date(), 'yyyy-MM-dd');

  const loadTasks = async () => {
    const data = await getPrivateData();
    setTasks(data?.logs?.[todayStr]?.tasks || []);
  };

  useEffect(() => { loadTasks(); }, []);

  const addTask = async () => {
    if (!draft.trim()) return;
    await attachTask(todayStr, draft);
    setDraft('');
    loadTasks();
  };

  const toggleTask = async (id: string) => {
    await flipTaskNode(todayStr, id);
    loadTasks();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Feather name="arrow-left" size={20} color={colors.textMuted} />
        <Text style={[styles.backText, { color: colors.textMuted }]}>Library</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: colors.text }]}>Daily To-Do</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>TRACK RESPONSIBILITIES</Text>

      <View style={[styles.cardOffset, { backgroundColor: colors.border, marginBottom: 24 }]}>
        <View style={[styles.inputBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
           <TextInput 
             style={[styles.input, { color: colors.text }]}
             placeholder="Add a new responsibility..."
             placeholderTextColor={colors.textMuted}
             value={draft}
             onChangeText={setDraft}
             onSubmitEditing={addTask}
           />
           <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.border }]} onPress={addTask}>
             <Feather name="plus" size={16} color={colors.background} />
           </TouchableOpacity>
        </View>
      </View>

      <View style={styles.list}>
        {tasks.map(t => (
          <TouchableOpacity 
            key={t.id} 
            style={[styles.taskRow, { backgroundColor: colors.cardAlt }]} 
            onPress={() => toggleTask(t.id)}
            activeOpacity={0.7}
          >
             <View style={[styles.checkCircle, { borderColor: t.done ? colors.highlight : colors.textMuted, backgroundColor: t.done ? colors.highlight : 'transparent' }]}>
               {t.done && <Feather name="check" size={12} color={colors.text} />}
             </View>
             <Text style={[styles.taskText, { color: t.done ? colors.textMuted : colors.text, textDecorationLine: t.done ? 'line-through' : 'none' }]}>
               {t.text}
             </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
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
  cardOffset: {
    borderRadius: 8,
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
  list: {
    gap: 12,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 12,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    fontSize: 16,
    fontWeight: '500',
  }
});
