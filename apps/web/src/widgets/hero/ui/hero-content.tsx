import type { Profile } from '@/entities/profile';

import { HeroIdentity, HeroIdentitySkeleton } from './hero-identity';
import { Pitch, PitchSkeleton } from './pitch';
import { TypingLine, TypingSkeleton } from './typing-line';

/** Левая колонка героя. Всё здесь берётся из профиля, поэтому при загрузке под скелетоном. */
export function HeroContent({ profile }: { readonly profile: Profile }) {
  return (
    <>
      <HeroIdentity profile={profile} />
      <TypingLine words={profile.heroStack} />
      <Pitch text={profile.headline} />
    </>
  );
}

export function HeroContentSkeleton() {
  return (
    <>
      <HeroIdentitySkeleton />
      <TypingSkeleton />
      <PitchSkeleton />
    </>
  );
}
