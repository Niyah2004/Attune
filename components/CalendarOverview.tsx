import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

const CalendarOverview = ({ cycleLogs, dailyLogs, onLogCycle, onAttachTask, onAttachExercise }: any) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Tracking Editor State
  const [isEditing, setIsEditing] = useState(false);
  const [selStart, setSelStart] = useState<Date | null>(null);
  const [selEnd, setSelEnd] = useState<Date | null>(null);
  const [viewDate, setViewDate] = useState<Date>(new Date());
  
  const [draftTask, setDraftTask] = useState('');
  const [draftExercise, setDraftExercise] = useState('');

  const { colors } = useTheme();

  const firstDay = startOfMonth(currentDate);
  const lastDay = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: firstDay, end: lastDay });

  const nextMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  const prevMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));

  const handleDayPress = (day: Date) => {
    if (!isEditing) {
       setViewDate(day);
       return;
    }
    
    if (!selStart || (selStart && selEnd)) {
      setSelStart(day);
      setSelEnd(null);
    } else {
      if (day < selStart) {
        setSelEnd(selStart);
        setSelStart(day);
      } else {
        setSelEnd(day);
      }
    }
  };

  const getDaySelectionState = (day: Date) => {
    const dayStr = format(day, 'yyyy-MM-dd');
    if (isEditing && selStart) {
       const startStr = format(selStart, 'yyyy-MM-dd');
       if (selEnd) {
         const endStr = format(selEnd, 'yyyy-MM-dd');
         return dayStr >= startStr && dayStr <= endStr;
       }
       return dayStr === startStr;
    }
    return false;
  };

  const getPhaseForDay = (day: Date) => {
    if (isEditing) return null;
    if (!cycleLogs || cycleLogs.length === 0) return null;
    
    const dayStr = format(day, 'yyyy-MM-dd');
    const sortedCycles = [...cycleLogs].sort((a, b) => (a.startDate < b.startDate ? 1 : -1));
    const cycle = sortedCycles.find(c => c.startDate <= dayStr);
    
    if (!cycle) return null;

    const startD = new Date(cycle.startDate);
    const targetD = new Date(dayStr);
    const diffDays = Math.round((targetD.getTime() - startD.getTime()) / (1000 * 3600 * 24));
    
    const cycleLen = cycle.length || 28;
    
    // Current cycle
    if (diffDays >= 0 && diffDays < cycleLen) {
      if (dayStr >= cycle.startDate && dayStr <= cycle.endDate) return 'menstrual';
      if (diffDays < 13) return 'follicular';
      if (diffDays >= 13 && diffDays <= 15) return 'ovulation';
      return 'luteal';
    }
    
    // Future cycle projection
    if (diffDays >= cycleLen && diffDays < cycleLen * 3) {
       const projectedDiff = diffDays % cycleLen;
       const avgPeriod = 5; 
       if (projectedDiff <= avgPeriod) return 'predicted_menstrual';
       if (projectedDiff < 13) return 'predicted_follicular';
       if (projectedDiff >= 13 && projectedDiff <= 15) return 'predicted_ovulation';
       return 'predicted_luteal';
    }

    return null;
  };

  const getPhaseColor = (phase: string | null) => {
    switch(phase) {
      case 'menstrual': return '#d94b58';
      case 'predicted_menstrual': return 'rgba(217, 75, 88, 0.4)';
      case 'follicular': return '#76a68f';
      case 'predicted_follicular': return 'rgba(118, 166, 143, 0.4)';
      case 'ovulation': return '#6b8cae';
      case 'predicted_ovulation': return 'rgba(107, 140, 174, 0.4)';
      case 'luteal': return '#a67b5b';
      case 'predicted_luteal': return 'rgba(166, 123, 91, 0.4)';
      default: return null;
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    if (selStart && selEnd && onLogCycle) {
      onLogCycle(format(selStart, 'yyyy-MM-dd'), format(selEnd, 'yyyy-MM-dd'));
      setSelStart(null);
      setSelEnd(null);
    }
  };

  const lastCycle = cycleLogs && cycleLogs.length > 0 ? cycleLogs[cycleLogs.length - 1] : null;

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={prevMonth} hitSlop={{top: 20, bottom:20, left:20, right:20}}>
          <Feather name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.monthText, { color: colors.text }]}>{format(currentDate, 'MMMM yyyy')}</Text>
        <TouchableOpacity onPress={nextMonth} hitSlop={{top: 20, bottom:20, left:20, right:20}}>
          <Feather name="chevron-right" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.weekDays}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <Text key={i} style={[styles.weekDayText, { color: colors.textMuted }]}>{d}</Text>
        ))}
      </View>

      <View style={styles.daysGrid}>
        {Array.from({ length: firstDay.getDay() }).map((_, i) => (
          <View key={`empty-${i}`} style={styles.dayCell} />
        ))}

        {daysInMonth.map((day, i) => {
          const isToday = isSameDay(day, new Date());
          const isSelectedForEdit = getDaySelectionState(day);
          const phase = getPhaseForDay(day);
          const dotColor = getPhaseColor(phase);

          return (
            <TouchableOpacity 
              key={i} 
              onPress={() => handleDayPress(day)}
              style={[
                styles.dayCell, 
                isSelectedForEdit && { backgroundColor: colors.text },
                isToday && !isSelectedForEdit && { borderWidth: 1, borderColor: colors.textMuted }
              ]}
              activeOpacity={isEditing ? 0.3 : 1}
            >
              <Text style={[
                styles.dayText, { color: colors.text },
                isSelectedForEdit && { color: colors.background, fontWeight: 'bold' },
                isToday && !isSelectedForEdit && { color: colors.text, fontWeight: 'bold' }
              ]}>
                {format(day, 'd')}
              </Text>
              
              {/* Phase Dot Indicator */}
              {dotColor && !isSelectedForEdit && (
                <View style={[styles.dropIcon, { backgroundColor: dotColor }]} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Phase Legend */}
      {!isEditing && cycleLogs?.length > 0 && (
         <View style={styles.legendRow}>
            <View style={styles.legendItem}>
               <View style={[styles.legendDot, { backgroundColor: '#d94b58' }]} />
               <Text style={[styles.legendText, { color: colors.textMuted }]}>Menstrual</Text>
            </View>
            <View style={styles.legendItem}>
               <View style={[styles.legendDot, { backgroundColor: '#76a68f' }]} />
               <Text style={[styles.legendText, { color: colors.textMuted }]}>Follicular</Text>
            </View>
            <View style={styles.legendItem}>
               <View style={[styles.legendDot, { backgroundColor: '#6b8cae' }]} />
               <Text style={[styles.legendText, { color: colors.textMuted }]}>Ovulation</Text>
            </View>
            <View style={styles.legendItem}>
               <View style={[styles.legendDot, { backgroundColor: '#a67b5b' }]} />
               <Text style={[styles.legendText, { color: colors.textMuted }]}>Luteal</Text>
            </View>
         </View>
      )}

      <View style={[styles.summaryContainer, { borderTopColor: colors.border }]}>
        {isEditing ? (
           <View style={styles.editControls}>
              <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>
                {selStart && selEnd 
                  ? `${format(selStart, 'MMM d')} to ${format(selEnd, 'MMM d')}` 
                  : 'Tap Start & End Dates'}
              </Text>
              <TouchableOpacity onPress={handleSave} style={[styles.saveBtn, { backgroundColor: colors.border }]}>
                 <Text style={[styles.saveLabel, { color: colors.background }]}>SAVE</Text>
              </TouchableOpacity>
           </View>
        ) : (
           <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>Last Tracked Cycle</Text>
                <Text style={[styles.summaryValue, { color: colors.text }]}>
                  {lastCycle ? `${lastCycle.length} Days` : 'No Data yet'}
                </Text>
              </View>
              <TouchableOpacity 
                style={[styles.editIconBtn, { backgroundColor: colors.highlight }]} 
                onPress={() => setIsEditing(true)}>
                <Feather name="edit-2" size={14} color={colors.textMuted} />
              </TouchableOpacity>
           </View>
        )}
      </View>

      {/* Dynamic Day Insights Tracker */}
      {!isEditing && (
        <View style={styles.dayDetailsBox}>
           <View style={styles.dayHeader}>
             <Feather name="calendar" size={16} color={colors.textMuted} />
             <Text style={[styles.dayTitle, { color: colors.text }]}>{format(viewDate, 'EEEE, MMMM do')}</Text>
           </View>

           {/* Tasks Block */}
           <View style={styles.inputGroup}>
             <Text style={[styles.groupLabel, { color: colors.textMuted }]}>DAILY TASKS & TO-DO's</Text>
             <View style={[styles.dayInputBox, { backgroundColor: colors.background, borderColor: colors.border }]}>
               <TextInput 
                 style={[styles.dayInput, { color: colors.text }]}
                 placeholder="Add a new responsibility..."
                 placeholderTextColor={colors.textMuted}
                 value={draftTask}
                 onChangeText={setDraftTask}
                 onSubmitEditing={() => {
                   if (draftTask.trim() && onAttachTask) {
                     onAttachTask(format(viewDate, 'yyyy-MM-dd'), draftTask);
                     setDraftTask('');
                   }
                 }}
               />
               <TouchableOpacity onPress={() => {
                 if(draftTask.trim() && onAttachTask) {
                   onAttachTask(format(viewDate, 'yyyy-MM-dd'), draftTask);
                   setDraftTask('');
                 }
               }}>
                 <Feather name="plus-circle" size={20} color={colors.highlight} />
               </TouchableOpacity>
             </View>
             {dailyLogs?.[format(viewDate, 'yyyy-MM-dd')]?.tasks?.map((t: any) => (
                <View key={t.id} style={styles.logPill}>
                  <Feather name={t.done ? "check-square" : "square"} size={12} color={colors.textMuted} />
                  <Text style={{ color: colors.text, fontSize: 12 }}>{t.text}</Text>
                </View>
             ))}
           </View>

           {/* Exercises Block */}
           <View style={styles.inputGroup}>
             <Text style={[styles.groupLabel, { color: colors.textMuted }]}>WORKOUTS & EXERCISE</Text>
             <View style={[styles.dayInputBox, { backgroundColor: colors.background, borderColor: colors.border }]}>
               <TextInput 
                 style={[styles.dayInput, { color: colors.text }]}
                 placeholder="Log a workout or movement..."
                 placeholderTextColor={colors.textMuted}
                 value={draftExercise}
                 onChangeText={setDraftExercise}
                 onSubmitEditing={() => {
                   if (draftExercise.trim() && onAttachExercise) {
                     onAttachExercise(format(viewDate, 'yyyy-MM-dd'), draftExercise);
                     setDraftExercise('');
                   }
                 }}
               />
               <TouchableOpacity onPress={() => {
                 if(draftExercise.trim() && onAttachExercise) {
                   onAttachExercise(format(viewDate, 'yyyy-MM-dd'), draftExercise);
                   setDraftExercise('');
                 }
               }}>
                 <Feather name="plus-circle" size={20} color={colors.highlight} />
               </TouchableOpacity>
             </View>
             {dailyLogs?.[format(viewDate, 'yyyy-MM-dd')]?.exercises?.map((e: any) => (
                <View key={e.id} style={styles.logPill}>
                  <Feather name="activity" size={12} color={colors.textMuted} />
                  <Text style={{ color: colors.text, fontSize: 12 }}>{e.text}</Text>
                </View>
             ))}
           </View>

        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 24,
    transform: [{ translateX: -4 }, { translateY: -4 }],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  monthText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  weekDayText: {
    width: '14.2%',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.2%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 20,
    position: 'relative'
  },
  dayText: {
    fontSize: 14,
  },
  dropIcon: {
    position: 'absolute',
    bottom: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  legendText: {
    fontSize: 8,
    fontWeight: 'bold',
  },
  summaryContainer: {
    marginTop: 16,
    paddingTop: 24,
    borderTopWidth: 1,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statBox: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  editControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editIconBtn: {
    padding: 10,
    borderRadius: 8,
  },
  saveBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  saveLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  dayDetailsBox: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#e0dad6',
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputGroup: {
    marginBottom: 20,
  },
  groupLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  dayInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  dayInput: {
    flex: 1,
    fontSize: 14,
  },
  logPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
    paddingHorizontal: 4,
  }
});

export default CalendarOverview;
