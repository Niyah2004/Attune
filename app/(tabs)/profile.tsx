import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { getPrivateData, updateSettings } from '../../services/PrivateStorage';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';

export default function ProfileScreen() {
  const [cycleLength, setCycleLength] = useState('28');
  const [periodLength, setPeriodLength] = useState('5');

  const loadData = async () => {
    const raw = await getPrivateData();
    if (raw && raw.settings) {
      setCycleLength(String(raw.settings.averageCycleLength));
      setPeriodLength(String(raw.settings.averagePeriodLength));
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const handleSave = async () => {
    await updateSettings({ 
      averageCycleLength: Number(cycleLength) || 28, 
      averagePeriodLength: Number(periodLength) || 5 
    });
    alert('Settings Saved!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>My Profile</Text>
          <Text style={styles.subtitle}>Rhythm Settings</Text>
        </View>
        
        <View style={styles.glassPanel}>
           <Text style={styles.panelTitle}>Average Cycle Length (days)</Text>
           <TextInput 
             style={styles.input}
             value={cycleLength}
             onChangeText={setCycleLength}
             keyboardType="numeric"
           />

           <Text style={[styles.panelTitle, { marginTop: 16 }]}>Average Period Length (days)</Text>
           <TextInput 
             style={styles.input}
             value={periodLength}
             onChangeText={setPeriodLength}
             keyboardType="numeric"
           />

           <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
             <Feather name="check" size={20} color="#12101a" />
             <Text style={styles.saveButtonText}>Save Options</Text>
           </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#12101a' },
  scroll: { padding: 24, gap: 16 },
  header: { marginBottom: 16 },
  title: { fontSize: 32, fontWeight: '600', color: '#fdf5c9', marginBottom: 4 },
  subtitle: { fontSize: 16, color: '#e6e2f0' },
  glassPanel: {
    backgroundColor: 'rgba(26, 23, 37, 0.6)',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2d263f'
  },
  panelTitle: { color: '#8b80a6', fontSize: 14, marginBottom: 8 },
  input: {
    backgroundColor: '#1a1725',
    color: '#e6e2f0',
    borderWidth: 1,
    borderColor: '#2d263f',
    borderRadius: 8,
    padding: 12,
    fontSize: 16
  },
  saveButton: {
    marginTop: 24,
    backgroundColor: '#fdf5c9',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  saveButtonText: {
    color: '#12101a',
    fontWeight: 'bold',
    fontSize: 16
  }
});
