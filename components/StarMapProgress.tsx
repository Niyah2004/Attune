import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import { useTheme } from '../theme/ThemeContext';
import { getInnerSeason } from '../services/CycleWisdom';

const StarMapProgress = ({ cycleDay = 13, isEmbedded }: any) => {
  const { colors, isDark } = useTheme();
  const phaseInfo = getInnerSeason(cycleDay);

  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 2500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0.4, duration: 2500, useNativeDriver: true })
      ])
    ).start();
  }, []);

  const renderConstellation = () => {
    const strokeCol = isDark ? colors.border : colors.background;
    const fillCol = colors.text;

    if (phaseInfo.name === 'Menstrual Phase') {
      return (
        <Svg height="100%" width="100%" viewBox="0 0 100 100">
           <Circle cx={50} cy={50} r={4} fill={phaseInfo.color} opacity={0.8} />
           <Circle cx={40} cy={45} r={2} fill={fillCol} />
           <Circle cx={60} cy={55} r={2} fill={fillCol} />
           <Circle cx={45} cy={60} r={1.5} fill={fillCol} />
           <Circle cx={55} cy={40} r={1.5} fill={fillCol} />
           <Line x1={50} y1={50} x2={40} y2={45} stroke={strokeCol} strokeWidth="0.5" />
           <Line x1={50} y1={50} x2={60} y2={55} stroke={strokeCol} strokeWidth="0.5" />
           <Line x1={40} y1={45} x2={45} y2={60} stroke={strokeCol} strokeWidth="0.5" />
           <Line x1={60} y1={55} x2={55} y2={40} stroke={strokeCol} strokeWidth="0.5" />
        </Svg>
      );
    } else if (phaseInfo.name === 'Follicular Phase') {
      return (
        <Svg height="100%" width="100%" viewBox="0 0 100 100">
           <Circle cx={50} cy={80} r={4} fill={phaseInfo.color} opacity={0.8} />
           <Circle cx={30} cy={50} r={2} fill={fillCol} />
           <Circle cx={70} cy={40} r={2} fill={fillCol} />
           <Circle cx={50} cy={20} r={3} fill={fillCol} />
           <Line x1={50} y1={80} x2={30} y2={50} stroke={strokeCol} strokeWidth="0.5" />
           <Line x1={50} y1={80} x2={70} y2={40} stroke={strokeCol} strokeWidth="0.5" />
           <Line x1={30} y1={50} x2={50} y2={20} stroke={strokeCol} strokeWidth="0.5" />
           <Line x1={70} y1={40} x2={50} y2={20} stroke={strokeCol} strokeWidth="0.5" />
        </Svg>
      );
    } else if (phaseInfo.name === 'Ovulatory Phase') {
      return (
        <Svg height="100%" width="100%" viewBox="0 0 100 100">
           <Circle cx={50} cy={50} r={5} fill={phaseInfo.color} opacity={0.8} />
           <Circle cx={20} cy={20} r={2} fill={fillCol} />
           <Circle cx={80} cy={20} r={2} fill={fillCol} />
           <Circle cx={20} cy={80} r={2} fill={fillCol} />
           <Circle cx={80} cy={80} r={2} fill={fillCol} />
           <Circle cx={50} cy={10} r={1.5} fill={fillCol} />
           <Circle cx={50} cy={90} r={1.5} fill={fillCol} />
           <Line x1={50} y1={50} x2={20} y2={20} stroke={strokeCol} strokeWidth="0.5" />
           <Line x1={50} y1={50} x2={80} y2={20} stroke={strokeCol} strokeWidth="0.5" />
           <Line x1={50} y1={50} x2={20} y2={80} stroke={strokeCol} strokeWidth="0.5" />
           <Line x1={50} y1={50} x2={80} y2={80} stroke={strokeCol} strokeWidth="0.5" />
           <Line x1={50} y1={50} x2={50} y2={10} stroke={strokeCol} strokeWidth="0.5" />
           <Line x1={50} y1={50} x2={50} y2={90} stroke={strokeCol} strokeWidth="0.5" />
        </Svg>
      );
    } else {
      return (
        <Svg height="100%" width="100%" viewBox="0 0 100 100">
           <Circle cx={20} cy={30} r={3} fill={phaseInfo.color} opacity={0.8} />
           <Circle cx={40} cy={50} r={2} fill={fillCol} />
           <Circle cx={60} cy={40} r={1.5} fill={fillCol} />
           <Circle cx={80} cy={70} r={3} fill={fillCol} />
           <Line x1={20} y1={30} x2={40} y2={50} stroke={strokeCol} strokeWidth="0.5" />
           <Line x1={40} y1={50} x2={60} y2={40} stroke={strokeCol} strokeWidth="0.5" />
           <Line x1={60} y1={40} x2={80} y2={70} stroke={strokeCol} strokeWidth="0.5" />
        </Svg>
      );
    }
  };

  return (
    <View style={!isEmbedded ? [styles.standalonePanel, { backgroundColor: colors.card, borderColor: colors.border }] : null}>
      <Animated.View style={{ height: 200, width: '100%', opacity: pulseAnim }}>
        {renderConstellation()}
      </Animated.View>
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
    marginVertical: 16,
    alignItems: 'center'
  }
});

export default StarMapProgress;
