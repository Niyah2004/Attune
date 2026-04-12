import * as tf from '@tensorflow/tfjs';
import { addDays, parseISO, differenceInDays } from 'date-fns';

/**
 * Predicts the next cycle start date using a localized ML model running in-browser.
 * We use a simple sequential model trained on past cycle lengths to predict the next.
 */

export const predictNextCycle = async (historicalCycles) => {
  // If there's 0 or 1 cycle, fallback to simple average
  if (!historicalCycles || historicalCycles.length < 2) {
    const lastStart = historicalCycles?.[0]?.startDate || new Date().toISOString();
    return {
      nextPeriod: addDays(new Date(lastStart), 28),
      estimatedLength: 28,
      isML: false
    };
  }

  // Extract lengths
  const lengths = historicalCycles.map(c => c.length).filter(l => l > 15 && l < 60);
  
  if (lengths.length < 3) {
    // Simple average if not enough data for ML
    const avg = Math.round(lengths.reduce((a,b) => a+b, 0) / lengths.length);
    const lastStart = historicalCycles[historicalCycles.length - 1].startDate;
    return {
      nextPeriod: addDays(new Date(lastStart), avg || 28),
      estimatedLength: avg || 28,
      isML: false
    };
  }

  // Define inputs & labels for a simple linear sequential setup
  // Predicting lengths[i] based on lengths[i-1]
  const xs = [];
  const ys = [];
  for (let i = 1; i < lengths.length; i++) {
    xs.push([lengths[i - 1]]);
    ys.push([lengths[i]]);
  }

  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 4, inputShape: [1], activation: 'relu' }));
  model.add(tf.layers.dense({ units: 1 }));

  model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

  const tensorX = tf.tensor2d(xs);
  const tensorY = tf.tensor2d(ys);

  await model.fit(tensorX, tensorY, {
    epochs: 50,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        // Just keeping it silent to avoid console clutter. 
        // Can be used for debugging.
      }
    }
  });

  // Predict next length
  const lastLength = lengths[lengths.length - 1];
  const prediction = model.predict(tf.tensor2d([[lastLength]]));
  const predictedValue = await prediction.data();
  
  let predictedLength = Math.round(predictedValue[0]);
  
  // Sanity constraints to prevent bizarre anomaly predictions
  if (predictedLength < 20) predictedLength = 20;
  if (predictedLength > 45) predictedLength = 45;

  const lastStart = historicalCycles[historicalCycles.length - 1].startDate;
  
  tensorX.dispose();
  tensorY.dispose();
  model.dispose();

  return {
    nextPeriod: addDays(new Date(lastStart), predictedLength),
    estimatedLength: predictedLength,
    isML: true
  };
};
