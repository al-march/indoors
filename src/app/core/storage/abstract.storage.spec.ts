import { AbstractStorage } from '@storage/abstract.storage';

interface State {
  item: string;
}

class Storage extends AbstractStorage<State> {
  constructor(key: string) {super(key);}
}

const storageKey = 'test';

describe('AbstractStorage', () => {
  let storage: Storage;
  beforeEach(() => {
    storage = new Storage(storageKey);
    localStorage.clear();
  });
  it('should create an instance', () => {
    expect(storage).toBeTruthy();
  });
  it('should create storage with key', function () {
    const key = 'specific key';
    expect(localStorage.getItem(key)).toBeFalsy();
    const storage = new Storage(key);
    storage.set('item', 'something');
    expect(localStorage.getItem(key)).toBeTruthy();
  });
  it('should set item', () => {
    const testValue = 'test value';
    storage.set('item', testValue);

    const item = storage.get('item');

    expect(typeof item === 'string').toBeTruthy();
    expect(item).toBe(testValue);
  });
  it('should delete item', () => {
    storage.set('item', 'string');
    expect(storage.get('item')).toBeTruthy();
    storage.remove('item');
    expect(storage.get('item')).toBeFalsy();
  });
  it('should get state', () => {
    storage.set('item', 'item');
    const state = storage.getState();

    expect(state).toEqual({
      item: 'item'
    });
  });
  it('should update state by localStorage', () => {
    storage.set('item', 'item');
    const storage2 = new Storage(storageKey);

    expect(storage2.getState()).toEqual({
      item: 'item'
    });
  });
});
