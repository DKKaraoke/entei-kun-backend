/**
 * typed-event.ts
 * @author soltia48
 * @date 2022-10-03
 */

/**
 * Event listener
 */
export interface Listener<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (event: T): any;
}

/**
 * Disposable object
 */
export interface Disposable {
  dispose(): void;
}

/**
 * Typed event
 */
export class TypedEvent<T> {
  private _listeners: Listener<T>[] = [];
  private _listenersOncer: Listener<T>[] = [];

  /**
   * Set event listener
   * @param listener Event listener
   * @return Event listener disposer
   */
  on = (listener: Listener<T>) => {
    this._listeners.push(listener);
    return {
      dispose: (): void => this.off(listener),
    };
  };

  /**
   * Set oncer event listener
   * @param listener Event listener
   */
  once = (listener: Listener<T>) => {
    this._listenersOncer.push(listener);
  };

  /**
   * Unset event listener
   * @param listener Event listener
   */
  off = (listener: Listener<T>) => {
    const callbackIndex = this._listeners.indexOf(listener);
    if (callbackIndex > -1) {
      this._listeners.splice(callbackIndex, 1);
    }
  };

  /**
   * Emit event
   * @param event Event
   */
  emit = (event: T) => {
    /** Update any general listeners */
    this._listeners.forEach((_listener) => _listener(event));

    /** Clear the `once` queue */
    this._listenersOncer.forEach((_listener) => _listener(event));
    this._listenersOncer = [];
  };

  /**
   * Pipe event
   * @param te Typed event
   * @return Event listener disposer
   */
  pipe = (typedEvent: TypedEvent<T>) => {
    return this.on((e) => typedEvent.emit(e));
  };
}
