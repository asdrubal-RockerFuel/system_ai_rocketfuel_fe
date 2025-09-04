import { Injectable } from "@angular/core";
import CryptoJS from "crypto-js";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class LocalStoreService {
  private readonly ls = window.localStorage;

  setItem<T>(key: string, value: T): void {
    try {
      const stringValue = JSON.stringify(value);
      const encrypted = CryptoJS.AES.encrypt(
        stringValue,
        environment.SECRET_KEY
      ).toString();
      this.ls.setItem(key, encrypted);
    } catch (error) {
      console.error("Error storing encrypted item", error);
    }
  }

  getItem<T>(key: string): T | null {
    const encrypted = this.ls.getItem(key);
    if (!encrypted) return null;
    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, environment.SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted) as T;
    } catch (error) {
      console.error("Error decrypting item", error);
      return null;
    }
  }

  removeItem(key: string): void {
    this.ls.removeItem(key);
  }

  clear(): void {
    this.ls.clear();
  }

  exists(key: string): boolean {
    return this.ls.getItem(key) !== null;
  }
}
