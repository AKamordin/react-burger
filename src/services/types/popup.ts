export enum EPopupType {
  ingredients = 'INGREDIENTS',
  order = 'ORDER'
}

export interface IPopup {
  show: boolean;
  type: EPopupType | null;
}
