import AsyncStorage from '@react-native-async-storage/async-storage';

const CHOSEN_NUMBERS_KEY = 'chosenNumbers';
const SAVED_STATE_KEY = 'savedState';

const storage = {
  async getChosenNumbers(): Promise<number[]> {
    const data = await AsyncStorage.getItem(CHOSEN_NUMBERS_KEY);
    return data ? JSON.parse(data) : [];
  },
  async setChosenNumbers(numbers: number[]) {
    await AsyncStorage.setItem(CHOSEN_NUMBERS_KEY, JSON.stringify(numbers));
  },
  async clear() {
    await AsyncStorage.clear();
  },
  async saveState(numbers: number[]) {
    await AsyncStorage.setItem(SAVED_STATE_KEY, JSON.stringify(numbers));
  },
  async restoreState(): Promise<number[] | null> {
    const data = await AsyncStorage.getItem(SAVED_STATE_KEY);
    return data ? JSON.parse(data) : null;
  },
};

export default storage;
