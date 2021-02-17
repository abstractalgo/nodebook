import { useState } from 'react';

export default function <T>(defaultState: T) {
  const [state, setFullState] = useState<T>(defaultState);
  const setState = (partialState: Partial<T>) => {
    setFullState({
      ...state,
      ...partialState,
    });
  };
  return [state, setState] as [T, (state: Partial<T>) => void];
}
