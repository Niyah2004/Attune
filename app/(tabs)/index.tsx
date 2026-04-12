import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';
import { getPrivateData } from '../../services/PrivateStorage';
import { useFocusEffect } from 'expo-router';

export default function DashboardScreen() {
  const [data, setData] = useState(null);

  const loadData = async () => {
    const raw = await getPrivateData();
    setData(raw);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Attune</Text>
          <Text style={styles.subtitle}>Your Lofi Sanctuary</Text>
        </View>
        
        <View style={styles.glassPanel}>
           <Text style={styles.panelTitle}>Welcome to Mobile</Text>
           <Text style={styles.panelBody}>Your web application logic has been successfully connected to Expo. React Native views are replacing Web components.</Text>
        </View>

        <View style={styles.glassPanel}>
           <Text style={styles.panelTitle}>Cycles Tracked Locally</Text>
           <Text style={styles.panelText}>{data ? data.cycles.length : 0}</Text>
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
    borderColor: '#2d263f',
    marginBottom: 16
  },
  panelTitle: { color: '#8b80a6', fontSize: 14, marginBottom: 8 },
  panelText: { color: '#fdf5c9', fontSize: 32, fontWeight: 'bold' },
  panelBody: { color: '#e6e2f0', fontSize: 16, lineHeight: 24 }
});
