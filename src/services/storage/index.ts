"use client";

export namespace Storage {
  export function get(key: string) {
    return localStorage.getItem(key);
  }

  export function remove(key: string) {
    return localStorage.removeItem(key);
  }

  export function set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  export function clear() {
    localStorage.clear();
  }
}
