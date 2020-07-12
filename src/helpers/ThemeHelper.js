import {ThemeMode} from '../constants';
import StorageHelper from './StorageHelper';

export const setThemeMode = async (mode) => {
  await StorageHelper.set('mode', mode);
};

export const getThemeMode = async () => {
  const mode = await StorageHelper.get('mode');
  return mode || ThemeMode.light;
};
