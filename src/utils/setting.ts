"use client"

export const Themes = ["light", "auto", "dark"] as const;
export const Languages = ["chinese", "auto", "english"] as const;
export const SideMenuBehaviors = ['none', 'auto-collapse', 'auto-close'] as const;

export type Theme = typeof Themes[number];
export type Language = typeof Languages[number];
export type SideMenuBehavior = typeof SideMenuBehaviors[number];

export interface Settings {
    theme: Theme;
}

export type SettingsChangedCallback = (m:SettingsManager)=>void;

const ITEM_KEY = "settings";

export class SettingsManager {
    m_settings: Settings;
    m_matchMedia: MediaQueryList;
    m_changedCallback?: SettingsChangedCallback;
    m_matchMediaChanged?: ()=>void;
    m_storageChanged?: ()=>void;

    constructor() {
        this.m_matchMedia = window.matchMedia("(prefers-color-scheme:dark)");
        this.m_settings = {} as Settings;
        this.load();
    }

    store() {
        localStorage.setItem(ITEM_KEY, JSON.stringify(this.m_settings));
    }

    load() {
        const settings = localStorage.getItem(ITEM_KEY);
        if (settings) {
            this.m_settings = JSON.parse(settings);
        } 
        this.setDefault();
    }

    reset() {
        localStorage.removeItem(ITEM_KEY);
        this.m_settings = {} as Settings;
        this.setDefault();
        this.m_changedCallback?.(this);
    }

    setDefault() {
        if (!Themes.includes(this.m_settings.theme)) {
            this.m_settings.theme = "auto";
        }
    }

    setChangedCallback(callback?:SettingsChangedCallback) {
        if (this.m_matchMediaChanged) {
            this.m_matchMedia.removeEventListener("change", this.m_matchMediaChanged);
        }

        if (this.m_storageChanged) {
            window.removeEventListener("storage", this.m_storageChanged);
        }

        if (callback) {
            this.m_changedCallback = callback;
            this.m_matchMediaChanged = () => {
                this.m_changedCallback?.(this);
            }
            this.m_storageChanged = () => {
                this.load();
                this.m_changedCallback?.(this);
            }
            this.m_matchMedia.addEventListener("change", this.m_matchMediaChanged);
            window.addEventListener("storage", this.m_storageChanged);
        }
    }

    settings(): Settings {
        return this.m_settings;
    }

    finalTheme(): string {
        switch (this.m_settings.theme) {
            case "light": return "light";
            case "dark": return "dark";
            case "auto": return this.m_matchMedia.matches ? "dark" : "light";
        }
    }

    theme(): Theme {
        return this.m_settings.theme;
    }

    setTheme(theme:Theme) {
        this.m_settings.theme = theme;
        this.m_changedCallback?.(this);
        this.store();
    }

    toggleTheme(theme?:Theme) {
        if (theme) {
            this.setTheme(theme)
        } else {
            const from = Themes.indexOf(this.m_settings.theme);
            const to = (from + 1) % Themes.length;
            this.setTheme(Themes[to]);
        }
    }
}