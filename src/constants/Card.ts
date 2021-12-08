export interface Card {
  id?: number;
  header?: string;
  body: string;
  state: CardState;
  onClick: () => void;
}
export type CardState = 'faceDown' | 'faceUp' | 'removed';
