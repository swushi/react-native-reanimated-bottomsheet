import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import { StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { DEFAULT_SPRING_CONFIG, DEFAULT_SNAP_POINTS } from './Constants';
import { useNormalizedSnapPoints } from './hooks';
import { BottomSheetMethods, BottomSheetProps } from './types';

type BottomSheet = BottomSheetMethods;
const BottomSheetComponet = forwardRef<BottomSheet, BottomSheetProps>(
  (props, ref) => {
    const {
      children,
      snapPoints: _providedSnapPoints = DEFAULT_SNAP_POINTS,
      springConfig = DEFAULT_SPRING_CONFIG,
      grabber = true,
      grabberColor = 'grey',
    } = props;
    const [containerHeight, setContainerHeight] = useState(0);

    // animated values
    const translation = useSharedValue(containerHeight);

    const snapPoints = useNormalizedSnapPoints(
      _providedSnapPoints,
      containerHeight
    );

    const snapTo = (index: number) => {
      if (index < snapPoints.length) {
        translation.value = withSpring(snapPoints[index], springConfig);
      } else {
        console.warn(
          `snapTo index must be between 0 and ${snapPoints.length - 1}`
        );
      }
    };

    const expand = () => {
      snapTo(snapPoints.length - 1);
    };

    const collapse = () => {
      snapTo(0);
    };

    const dismiss = () => {
      translation.value = withSpring(containerHeight, springConfig);
    };

    const handleOnLayout = useCallback(
      ({
        nativeEvent: {
          layout: { height },
        },
      }) => {
        setContainerHeight(height);
      },
      []
    );

    const gestureHandler = useAnimatedGestureHandler({
      onFail: (event) => {
        console.log(event);
      },
      onStart: (event) => {
        console.log(event);
      },
      onCancel: (event) => {
        console.log(event);
      },
      onActive: (event) => {
        console.log(event);
      },
      onEnd: (event) => {
        console.log(event);
      },
      onFinish: (event) => {
        console.log(event);
      },
    });

    const styles = StyleSheet.create({
      container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      },
      topBar: {
        backgroundColor: grabberColor,
        height: 5,
        width: 40,
        borderRadius: 30,
        position: 'absolute',
        top: 5,
        alignSelf: 'center',
      },
    });

    const animatedStyles = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: translation.value,
          },
        ],
      };
    });

    useImperativeHandle(ref, () => ({
      expand,
      collapse,
      snapTo,
      dismiss,
    }));

    return (
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.container, animatedStyles]}>
          <View onLayout={handleOnLayout}>
            {children}
            {grabber && <View style={styles.topBar} />}
          </View>
        </Animated.View>
      </PanGestureHandler>
    );
  }
);

const BottomSheet = BottomSheetComponet;
export default BottomSheet;
