import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from './store';

// Используем вместо нетипизированных хуков react-redux.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
