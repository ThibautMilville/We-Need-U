import fr from './fr';
import en from './en';
import de from './de';
import { TranslationKey, Language } from '../types/translations.types';

export const translations: Record<Language, Record<TranslationKey, string>> = {
  fr,
  en,
  de,
};

export * from '../types/translations.types'; 