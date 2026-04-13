import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export default function PomodoroTimer({ onBack }: any) {
  const { colors } = useTheme();
  
  const [inputMinutes, setInputMinutes] = useState('2');
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(prev => prev - 1);
        } else if (minutes > 0) {
          setMinutes(prev => prev - 1);
          setSeconds(59);
        } else {
          setIsActive(false);
          clearInterval(interval);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const applyTime = () => {
    const parsed = parseInt(inputMinutes) || 2;
    setIsActive(false);
    setMinutes(parsed);
    setSeconds(0);
  };
  
  const resetTimer = () => { 
    setIsActive(false); 
    setMinutes(parseInt(inputMinutes) || 2); 
    setSeconds(0); 
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Feather name="arrow-left" size={20} color={colors.textMuted} />
        <Text style={[styles.backText, { color: colors.textMuted }]}>Library</Text>
      </TouchableOpacity>

      <View style={[styles.cardOffset, { backgroundColor: colors.border }]}>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.text }]}>Meditation Timer</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>ADJUST TIME (MINUTES)</Text>
          
          <View style={styles.inputRow}>
            <TextInput 
              style={[styles.input, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
              keyboardType="numeric"
              value={inputMinutes}
              onChangeText={setInputMinutes}
              onBlur={applyTime}
            />
          </View>

          <View style={[styles.timerCircle, { borderColor: colors.highlight }]}>
            <Text style={[styles.timerText, { color: colors.text }]}>
               {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </Text>
          </View>

          <View style={styles.controls}>
             <TouchableOpacity style={[styles.controlBtn, { backgroundColor: colors.border }]} onPress={resetTimer}>
               <Feather name="rotate-ccw" size={20} color={colors.background} />
             </TouchableOpacity>
             <TouchableOpacity style={[styles.controlBtnMain, { backgroundColor: colors.highlight }]} onPress={toggleTimer}>
               <Feather name={isActive ? "pause" : "play"} size={28} color={colors.text} />
             </TouchableOpacity>
          </View>
        </View>
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
  cardOffset: {
    borderRadius: 8,
  },
  card: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 32,
    alignItems: 'center',
    transform: [{ translateX: -4 }, { translateY: -4 }],
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    fontSize: 20,
    width: 80,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  timerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  timerText: {
    fontSize: 48,
    fontWeight: '300',
    fontVariant: ['tabular-nums'],
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  controlBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBtnMain: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
