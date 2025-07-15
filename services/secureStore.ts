import * as SecureStore from "expo-secure-store";

/**
 * SecureStore Service
 * Provides a simple interface for securely storing key-value pairs
 */
export const SecureStoreService = {
  /**
   * Set a value in SecureStore
   * @param key The key to store the value under
   * @param value The value to store
   * @param options SecureStore options
   * @returns Promise<void>
   */
  set: async (
    key: string,
    value: string,
    options?: SecureStore.SecureStoreOptions
  ): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(value);
      await SecureStore.setItemAsync(key, jsonValue, options);
    } catch (error) {
      console.error(`SecureStore set error for key "${key}":`, error);
      throw error;
    }
  },

  /**
   * Get a value from SecureStore
   * @param key The key to retrieve
   * @returns Promise<string | null> The stored value or null if not found
   */
  get: async (key: string): Promise<string | null> => {
    try {
      const jsonValue = await SecureStore.getItemAsync(key);
      return jsonValue ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`SecureStore get error for key "${key}":`, error);
      return null;
    }
  },

  /**
   * Remove a value from SecureStore
   * @param key The key to remove
   * @returns Promise<void>
   */
  remove: async (key: string): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error(`SecureStore remove error for key "${key}":`, error);
      throw error;
    }
  },

  /**
   * Check if SecureStore is available on the current device
   * @returns Promise<boolean>
   */
  isAvailable: async (): Promise<boolean> => {
    try {
      return await SecureStore.isAvailableAsync();
    } catch (error) {
      console.error("SecureStore availability check error:", error);
      return false;
    }
  },
};

/**
 * Commonly used SecureStore keys
 */
export const SecureStoreKeys = {
  AUTH_INFO: "authInfo",
};
