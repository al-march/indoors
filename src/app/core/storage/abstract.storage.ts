type StorageState<T> = Partial<T>

export abstract class AbstractStorage<T extends Object> {

  private state: StorageState<T>;

  protected constructor(
    public key: string,
    public storage: Storage = localStorage,
  ) {
    this.state = this.getLocal();
  }

  set(key: keyof T, data: T[keyof T]): void {
    this.state[key] = data;
    this.update();
  }

  setState(state: T) {
    this.state = state;
    this.update();
  }

  getState() {
    return this.state;
  }

  get<K extends keyof T>(key: K) {
    return this.state[key];
  }

  clear() {
    this.state = {};
    this.update();
  }

  remove(key: keyof T) {
    delete this.state[key];
    this.update();
  }

  protected update() {
    try {
      this.storage.setItem(this.key, JSON.stringify(this.state));
    } catch (e) {
      console.error(e);
    }
  }

  protected getLocal(): StorageState<T> {
    try {
      const storage = this.storage.getItem(this.key);
      return JSON.parse(storage || '{}');
    } catch {
      return {};
    }
  }
}
