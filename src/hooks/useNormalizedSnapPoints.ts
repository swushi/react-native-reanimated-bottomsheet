import { useMemo } from 'react';

export const useNormalizedSnapPoints = (
  snapPoints: Array<string>,
  containerHeight: number
) =>
  useMemo(() => {
    const normalizedSnapPoints = snapPoints.map((snapPoint) => {
      return Math.abs(
        (parseInt(snapPoint, 10) / 100) * containerHeight - containerHeight
      );
    });

    return normalizedSnapPoints;
  }, [snapPoints, containerHeight]);
