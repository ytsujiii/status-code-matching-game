import { LocaleCode } from './Locale';

export interface Card {
  code: number;
  description: CardDescription;
  note: string;
  state: CardState;
}
export type CardState = 'faceDown' | 'faceUp' | 'removed';
export type CardDescription = { [locale in LocaleCode]: string };
