import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface IUserSettingsStore {
  darkMode: boolean,
  sidebardCollapsed: boolean,
  toggleDarkMode: (darkMode: boolean) => void
  setSidebardCollapsed: (sidebardCollapsed: boolean) => void
}

export const useUserSettingsStore = create(persist<IUserSettingsStore>((set) => ({
  darkMode: true,
  sidebardCollapsed: false,
  toggleDarkMode: (darkMode) => set({ darkMode: darkMode ?? !this.darkMode }),
  setSidebardCollapsed: (sidebardCollapsed) => set({ sidebardCollapsed })
}),
  {
    name: 'kanban@userSettings',
  }
))
