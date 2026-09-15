import { Toggle, type IconName } from '@sutuzhko/ui-kit';

import { SettingCard } from '../setting-card';

export interface ToggleFieldProps {
  readonly title: string;
  readonly description?: string;
  /** Например, `eye-off` для скрытой записи. */
  readonly icon?: IconName;
  readonly checked: boolean;
  readonly onCheckedChange: (checked: boolean) => void;
  readonly disabled?: boolean;
}

export function ToggleField({
  title,
  description,
  icon,
  checked,
  onCheckedChange,
  disabled,
}: ToggleFieldProps) {
  return (
    <SettingCard title={title} description={description} icon={icon}>
      <Toggle
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        aria-label={title}
      />
    </SettingCard>
  );
}
