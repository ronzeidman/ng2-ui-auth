import { StorageType } from './storage-type.enum';

export abstract class StorageService {
  abstract updateStorageType(storageType: StorageType): boolean;

  abstract get(key: string): string;

  abstract set(key: string, value: string, date: string): void;

  abstract remove(key: string): void;
}
