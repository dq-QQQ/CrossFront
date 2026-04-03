import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Persona } from '../types';
import { loadPersona, savePersona } from '../utils/storage';

interface PersonaContextValue {
  persona: Persona | null;
  setPersona: (p: Persona) => void;
}

const PersonaContext = createContext<PersonaContextValue | null>(null);

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState<Persona | null>(loadPersona);

  const setPersona = (p: Persona) => {
    setPersonaState(p);
    savePersona(p);
  };

  return (
    <PersonaContext.Provider value={{ persona, setPersona }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona(): PersonaContextValue {
  const ctx = useContext(PersonaContext);
  if (!ctx) throw new Error('usePersona must be used within PersonaProvider');
  return ctx;
}
