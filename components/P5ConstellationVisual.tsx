import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

let WebViewComponent: any = null;
if (Platform.OS !== 'web') {
  WebViewComponent = require('react-native-webview').WebView;
}

const { width } = Dimensions.get('window');

interface PhaseData {
  label: string;
  subtitle: string;
  energy: string;
  mood: string;
  tip: string;
  color: string;
  days: [number, number];
}

const PHASES: Record<string, PhaseData> = {
  menstrual: {
    label: 'Menstrual', subtitle: 'Days 1–5', energy: 'Low', mood: 'Reflective', tip: 'Rest & gentle movement', color: '#C0393B', days: [1, 5],
  },
  follicular: {
    label: 'Follicular', subtitle: 'Days 6–13', energy: 'Rising', mood: 'Optimistic', tip: 'Start new projects', color: '#C06030', days: [6, 13],
  },
  ovulation: {
    label: 'Ovulation', subtitle: 'Days 14–16', energy: 'Peak', mood: 'Confident', tip: 'Connect & collaborate', color: '#7A7FD4', days: [14, 16],
  },
  luteal: {
    label: 'Luteal', subtitle: 'Days 17–28', energy: 'Declining', mood: 'Introspective', tip: 'Self-care & slow down', color: '#5A6FB0', days: [17, 28],
  },
};

function dayToPhase(day: number): string {
  if (day <= 5) return 'menstrual';
  if (day <= 13) return 'follicular';
  if (day <= 16) return 'ovulation';
  return 'luteal';
}

function buildHTML(phase: string) {
  return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 100%; height: 100%; background: transparent; overflow: hidden; }
  canvas { display: block; }
</style>
</head>
<body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
<script>
const PHASES = {
  menstrual: {
    bg: [18,8,8], primary: [192,57,59], secondary: [120,20,25], accent: [220,100,90],
    particles: 'drop', bloomSize: 0.35, petalCount: 5, wave: 'slow',
    label: 'Menstrual', subtitle: 'Days 1–5',
    desc: 'Uterine lining sheds. Estrogen & progesterone are low.',
  },
  follicular: {
    bg: [18,12,6], primary: [192,96,48], secondary: [220,140,60], accent: [255,190,80],
    particles: 'bud', bloomSize: 0.6, petalCount: 7, wave: 'medium',
    label: 'Follicular', subtitle: 'Days 6–13',
    desc: 'Follicles develop. Estrogen rises, energy returns.',
  },
  ovulation: {
    bg: [10,10,22], primary: [122,127,212], secondary: [80,80,180], accent: [200,200,255],
    particles: 'burst', bloomSize: 1.0, petalCount: 12, wave: 'fast',
    label: 'Ovulation', subtitle: 'Days 14–16',
    desc: 'Egg released. Estrogen peaks; LH surges.',
  },
  luteal: {
    bg: [10,12,22], primary: [90,111,176], secondary: [60,80,140], accent: [150,170,220],
    particles: 'drift', bloomSize: 0.7, petalCount: 9, wave: 'medium',
    label: 'Luteal', subtitle: 'Days 17–28',
    desc: 'Progesterone rises then falls. PMS may occur.',
  },
};

const currentPhase = '${phase}';

new p5(function(p) {
  const ph = PHASES[currentPhase];
  let particles = [];
  let frame = 0;
  let W, H, CX, CY;

  function initParticles() {
    particles = [];
    const count = ph.particles === 'burst' ? 60 : ph.particles === 'drop' ? 30 : 40;
    for (let i = 0; i < count; i++) {
      particles.push({
        angle: p.random(p.TWO_PI),
        r: p.random(60, 220),
        speed: p.random(0.002, 0.008) * (ph.wave === 'fast' ? 2.5 : ph.wave === 'slow' ? 0.5 : 1.2),
        size: p.random(2, 6),
        opacity: p.random(100, 220),
        phase: p.random(p.TWO_PI),
      });
    }
  }

  p.setup = function() {
    W = window.innerWidth;
    H = window.innerHeight;
    CX = W / 2;
    CY = H / 2;
    p.createCanvas(W, H);
    p.colorMode(p.RGB);
    initParticles();
  };

  p.draw = function() {
    frame++;
    p.background(ph.bg[0], ph.bg[1], ph.bg[2]);

    // Outer glow ring...
    p.noFill();
    for (let i = 5; i > 0; i--) {
      p.stroke(ph.primary[0], ph.primary[1], ph.primary[2], 8 * i);
      p.strokeWeight(i * 6);
      const pulse = ph.bloomSize * 220 + Math.sin(frame * 0.03) * 8;
      p.ellipse(CX, CY, pulse * 2, pulse * 2);
    }

    // Particles / orbital dots...
    particles.forEach((pt, i) => {
      pt.angle += pt.speed;
      const wobble = Math.sin(frame * 0.05 + pt.phase) * 15;
      const rx = CX + (pt.r + wobble) * Math.cos(pt.angle);
      const ry = CY + (pt.r * 0.65 + wobble * 0.5) * Math.sin(pt.angle);
      const col = i % 3 === 0 ? ph.accent : i % 3 === 1 ? ph.primary : ph.secondary;
      p.noStroke();
      p.fill(col[0], col[1], col[2], pt.opacity);
      if (ph.particles === 'drop') {
        p.ellipse(rx, ry, pt.size * 0.8, pt.size * 1.5);
      } else {
        p.ellipse(rx, ry, pt.size, pt.size);
      }
    });

    // Petal flower bloom...
    const bloomR = ph.bloomSize * 110;
    p.push();
    p.translate(CX, CY);
    const spinSpeed = ph.wave === 'fast' ? 0.004 : ph.wave === 'slow' ? 0.001 : 0.002;
    p.rotate(frame * spinSpeed);
    for (let i = 0; i < ph.petalCount; i++) {
      const a = (i / ph.petalCount) * p.TWO_PI;
      const px2 = Math.cos(a) * bloomR * 0.55;
      const py2 = Math.sin(a) * bloomR * 0.55;
      const pulse2 = 1 + Math.sin(frame * 0.04 + i) * 0.08;
      p.noStroke();
      for (let g = 3; g > 0; g--) {
        p.fill(ph.accent[0], ph.accent[1], ph.accent[2], 18 * g);
        p.ellipse(px2, py2, bloomR * 0.62 * pulse2 * (1 + g * 0.15), bloomR * 0.38 * pulse2 * (1 + g * 0.1));
      }
      p.fill(ph.primary[0], ph.primary[1], ph.primary[2], 160);
      p.ellipse(px2, py2, bloomR * 0.58 * pulse2, bloomR * 0.34 * pulse2);
    }
    p.pop();

    // Center orb...
    const orbR = bloomR * 0.32 + Math.sin(frame * 0.06) * 4;
    for (let g = 4; g > 0; g--) {
      p.noStroke();
      p.fill(ph.accent[0], ph.accent[1], ph.accent[2], 22 * g);
      p.ellipse(CX, CY, (orbR + g * 8) * 2, (orbR + g * 8) * 2);
    }
    p.fill(ph.accent[0], ph.accent[1], ph.accent[2], 230);
    p.noStroke();
    p.ellipse(CX, CY, orbR * 2, orbR * 2);
    p.fill(255, 255, 255, 90);
    p.ellipse(CX - orbR * 0.25, CY - orbR * 0.25, orbR * 0.55, orbR * 0.4);

    // Cycle ring tick marks...
    p.noFill();
    p.stroke(ph.primary[0], ph.primary[1], ph.primary[2], 50);
    p.strokeWeight(0.5);
    p.ellipse(CX, CY, Math.min(W, H) * 0.9, Math.min(W, H) * 0.58);
    for (let d = 0; d < 28; d++) {
      const ang = (d / 28) * p.TWO_PI - p.HALF_PI;
      const r1 = Math.min(W, H) * 0.285;
      const r2 = r1 + (d % 7 === 0 ? 14 : 7);
      p.stroke(ph.accent[0], ph.accent[1], ph.accent[2], d % 7 === 0 ? 120 : 50);
      p.strokeWeight(d % 7 === 0 ? 1.5 : 0.7);
      p.line(
        CX + r1 * Math.cos(ang), CY + r1 * 0.65 * Math.sin(ang),
        CX + r2 * Math.cos(ang), CY + r2 * 0.65 * Math.sin(ang)
      );
    }

    // Phase label...
    p.noStroke();
    p.fill(255, 255, 255, 200);
    p.textAlign(p.CENTER);
    p.textSize(16);
    p.textStyle(p.BOLD);
    p.text(ph.label.toUpperCase(), CX, H - 44);
    p.textSize(12);
    p.textStyle(p.NORMAL);
    p.fill(255, 255, 255, 120);
    p.text(ph.desc, CX, H - 24);
  };
});
</script>
</body>
</html>`;
}

export default function P5ConstellationVisual() {
  const [currentPhase, setCurrentPhase] = useState<string>('ovulation');
  const [currentDay, setCurrentDay] = useState<number>(14);
  const webviewRef = useRef<any>(null);

  const handlePhaseChange = (phase: string) => {
    setCurrentPhase(phase);
    const dayMap: Record<string, number> = { menstrual: 3, follicular: 10, ovulation: 14, luteal: 21 };
    setCurrentDay(dayMap[phase]);
  };

  const handleDayChange = (direction: number) => {
    const newDay = Math.min(28, Math.max(1, currentDay + direction));
    setCurrentDay(newDay);
    setCurrentPhase(dayToPhase(newDay));
  };

  const ph = PHASES[currentPhase];

  return (
    <View style={styles.container}>
      {/* Canvas */}
      <View style={styles.canvasWrap}>
        {Platform.OS === 'web' ? (
          <iframe
            srcDoc={buildHTML(currentPhase)}
            style={{ width: '100%', height: '100%', border: 'none', backgroundColor: 'transparent' }}
          />
        ) : (
          WebViewComponent && (
            <WebViewComponent
              ref={webviewRef}
              key={currentPhase}
              source={{ html: buildHTML(currentPhase) }}
              style={styles.webview}
              scrollEnabled={false}
              originWhitelist={['*']}
              javaScriptEnabled={true}
              allowFileAccess={true}
            />
          )
        )}
      </View>

      {/* Bottom Controls */}
      <View style={styles.controls}>
        {/* Day stepper */}
        <View style={styles.dayRow}>
          <TouchableOpacity style={styles.stepBtn} onPress={() => handleDayChange(-1)}>
            <Text style={styles.stepBtnText}>‹</Text>
          </TouchableOpacity>
          <View style={styles.dayInfo}>
            <Text style={styles.dayLabel}>Day {currentDay} of 28</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(currentDay / 28) * 100}%`, backgroundColor: ph.color }]} />
            </View>
          </View>
          <TouchableOpacity style={styles.stepBtn} onPress={() => handleDayChange(1)}>
            <Text style={styles.stepBtnText}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Phase buttons */}
        <View style={styles.phaseRow}>
          {Object.entries(PHASES).map(([key, p]) => {
            const isActive = currentPhase === key;
            return (
              <TouchableOpacity
                key={key}
                style={[styles.phaseBtn, isActive && { backgroundColor: p.color, borderColor: p.color }]}
                onPress={() => handlePhaseChange(key)}
              >
                <Text style={[styles.phaseBtnText, isActive && { color: '#fff' }]}>
                  {p.label}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Info cards */}
        <View style={styles.infoRow}>
          {[
            { label: 'Energy', value: ph.energy },
            { label: 'Mood', value: ph.mood },
            { label: 'Tip', value: ph.tip },
          ].map((item) => (
            <View key={item.label} style={styles.infoCard}>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A12',
  },
  canvasWrap: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  controls: {
    backgroundColor: '#111118',
    paddingTop: 12,
    paddingBottom: 28,
    paddingHorizontal: 16,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(255,255,255,0.08)',
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  stepBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnText: {
    color: '#fff',
    fontSize: 22,
    lineHeight: 26,
  },
  dayInfo: {
    flex: 1,
  },
  dayLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginBottom: 6,
    textAlign: 'center',
  },
  progressBar: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  phaseRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 12,
  },
  phaseBtn: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
  },
  phaseBtnText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
    fontWeight: '500',
  },
  infoRow: {
    flexDirection: 'row',
    gap: 8,
  },
  infoCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  infoLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  infoValue: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});