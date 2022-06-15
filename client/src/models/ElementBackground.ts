import { AppColorsText as ColorsText } from '@/models/AppColors'

export interface ElementBackground {
  readonly id: number;
  color: ColorsText;
  active: boolean;
}
