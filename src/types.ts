import Animated from 'react-native-reanimated';

export interface BottomSheetProps {
  /**
   * Points for the bottom sheet to snap to, points
   * should be sorted from bottom to top. It accepts array of number,
   * string or mix.
   * @type Array<number>
   */
  snapPoints?: Array<string>;

  /**
   * Spring Config for BottomSheet
   * @type Animated.SpringConfig
   */
  springConfig?: Animated.WithSpringConfig;
  /**
   * Enable generic grabber at top of BottomSheet.
   * @type Boolean
   * @default false
   */
  grabber?: Boolean;
  /**
   * Background color of the grabber.
   * @type string
   * @default "grey"
   */
  grabberColor?: string;
  children: (() => React.ReactNode) | React.ReactNode[] | React.ReactNode;
}

export interface BottomSheetMethods {
  /**
   * Dismisses the BottomSheet.
   * @example bottomSheetRef.current.snapTo(2);
   */
  snapTo: (index: number) => void;
  /**
   * Expands to the biggest snapPoint.
   * @example bottomSheetRef.current.expand();
   */
  expand: () => void;
  /**
   * Collapse to smallest snapPoint.
   * @example bottomSheetRef.current.collapse();
   */
  collapse: () => void;
  /**
   * Dismisses the BottomSheet.
   * @example bottomSheetRef.current.dismiss();
   */
  dismiss: () => void;
}
