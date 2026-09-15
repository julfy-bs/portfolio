import { useProfile } from '@/entities/profile';
import { useAuth } from '@/entities/session';
import { Avatar, Icon } from '@sutuzhko/ui-kit';

/**
 * Аватар заполняет кнопку навбара целиком, скругление даёт сама кнопка через
 * `overflow: hidden`. Гостю и до загрузки профиля показываем обычную иконку.
 *
 * Оборачиваем в `aria-hidden`: подпись уже есть у кнопки, иначе имя прозвучит дважды.
 */
export function ProfileMenuTrigger() {
  const { isAuthenticated } = useAuth();
  const { data: profile } = useProfile();

  if (!isAuthenticated || profile === undefined) {
    return <Icon name="user" size={18} />;
  }

  return (
    <span aria-hidden="true">
      <Avatar
        name={profile.name}
        src={profile.avatarPhotoUrl}
        color={profile.avatarColor}
        size={38}
        shape="square"
      />
    </span>
  );
}
