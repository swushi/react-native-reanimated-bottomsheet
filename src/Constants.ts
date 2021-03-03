import Animated from 'react-native-reanimated';

export const DEFAULT_SPRING_CONFIG: Animated.WithSpringConfig = {
  damping: 10,
  mass: 0.2,
  stiffness: 100,
  overshootClamping: false,
  restDisplacementThreshold: 0.001,
  restSpeedThreshold: 0.001,
};
