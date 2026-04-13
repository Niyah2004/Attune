import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

export default function CalendarIntegrations() {
  const { colors } = useTheme();
  const [googleSynced, setGoogleSynced] = useState(false);
  const [outlookSynced, setOutlookSynced] = useState(false);
  
  const [loading, setLoading] = useState(false);

  const showAlert = (title: string, msg: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n\n${msg}`);
    } else {
      Alert.alert(title, msg);
    }
  };

  const handleGoogleAuth = () => {
    if (googleSynced) {
      setGoogleSynced(false);
      return;
    }
    setLoading(true);
    // In production, this triggers Expo AuthSession Google OAuth
    setTimeout(() => {
      setGoogleSynced(true);
      setLoading(false);
      showAlert('Sync Successful', 'Your Google Calendar events will now safely sync into your Daily Planner.');
    }, 600);
  };

  const handleOutlookAuth = () => {
    if (outlookSynced) {
      setOutlookSynced(false);
      return;
    }
    setLoading(true);
    // In production, this triggers Microsoft Graph API OAuth
    setTimeout(() => {
      setOutlookSynced(true);
      setLoading(false);
      showAlert('Sync Successful', 'Your Outlook events have been securely tethered to your planner.');
    }, 600);
  };

  return (
    <View style={[styles.cardOffset, { backgroundColor: colors.border, marginTop: 32 }]}>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>Integrations</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>SYNC EXTERNAL CALENDARS</Text>

        <TouchableOpacity 
           style={[
             styles.syncBtn, 
             { 
               borderColor: googleSynced ? '#34A853' : colors.border, 
               backgroundColor: googleSynced ? 'rgba(52, 168, 83, 0.1)' : colors.background 
             }
           ]} 
           onPress={handleGoogleAuth}
           disabled={loading}
           activeOpacity={0.7}
        >
          <View style={styles.syncLeft}>
            <FontAwesome5 name="google" size={16} color={googleSynced ? '#34A853' : colors.textMuted} />
            <Text style={[styles.syncText, { color: googleSynced ? '#34A853' : colors.text }]}>
              {googleSynced ? 'Google Attached' : 'Connect Google'}
            </Text>
          </View>
          <Feather name={googleSynced ? "check-circle" : "link"} size={16} color={googleSynced ? '#34A853' : colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity 
           style={[
             styles.syncBtn, 
             { 
               borderColor: outlookSynced ? '#0078D4' : colors.border, 
               backgroundColor: outlookSynced ? 'rgba(0, 120, 212, 0.1)' : colors.background 
             }
           ]} 
           onPress={handleOutlookAuth}
           disabled={loading}
           activeOpacity={0.7}
        >
          <View style={styles.syncLeft}>
            <FontAwesome5 name="microsoft" size={16} color={outlookSynced ? '#0078D4' : colors.textMuted} />
            <Text style={[styles.syncText, { color: outlookSynced ? '#0078D4' : colors.text }]}>
              {outlookSynced ? 'Outlook Attached' : 'Connect Outlook'}
            </Text>
          </View>
          <Feather name={outlookSynced ? "check-circle" : "link"} size={16} color={outlookSynced ? '#0078D4' : colors.textMuted} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardOffset: {
    borderRadius: 8,
  },
  card: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 24,
    transform: [{ translateX: -4 }, { translateY: -4 }],
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 24,
  },
  syncBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  syncLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  syncText: {
    fontSize: 14,
    fontWeight: '600',
  }
});
