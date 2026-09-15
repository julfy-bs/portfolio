import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState, useMemo, type ChangeEvent } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { ProfileAdmin, UpdateProfile } from '@/entities/profile';
import { cn, countDirtyFields } from '@/shared/lib';
import type { AppLanguage } from '@/shared/config';
import { SaveBar, ToggleField } from '@/shared/ui';
import { Avatar, Button, Icon, Input, Textarea, type CropRect } from '@sutuzhko/ui-kit';

import {
  AVAILABILITY_OPTIONS,
  AVATAR_COLORS,
  createProfileSchema,
  formToUpdate,
  profileToForm,
  type ProfileFormValues,
} from '../model/profile-form';

import { AvatarCropperModal } from './avatar-cropper-modal';
import styles from './admin-profile.module.css';

export interface AdminProfileViewProps {
  readonly profile: ProfileAdmin;
  readonly locale: AppLanguage;
  readonly isSaving: boolean;
  /**
   * Контакты на бэке отдельный ресурс. `update` равен null, если менялись только контакты:
   * тогда PATCH `/profile` не нужен. Какие контакты отправлять, решает контейнер.
   */
  readonly onSave: (update: UpdateProfile | null, contacts: ProfileContacts) => void;
  /** Возвращает URL уже обрезанного фото. */
  readonly onUploadAvatar: (file: File, crop: CropRect) => Promise<string>;
  /** Резюме своё для каждой локали. */
  readonly onUploadCv: (file: File) => Promise<string>;
}

export interface ProfileContacts {
  readonly telegram: string;
  readonly github: string;
}

/**
 * Локализованные поля правятся в активной локали, и на сохранении уходит только она:
 * вторую бэкенд мёржит сам. При смене `locale` родитель монтирует форму заново.
 */
export function AdminProfileView({
  profile,
  locale,
  isSaving,
  onSave,
  onUploadAvatar,
  onUploadCv,
}: AdminProfileViewProps) {
  const { t } = useTranslation();
  const schema = useMemo(() => createProfileSchema(t, locale), [t, locale]);
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(schema),
    defaultValues: profileToForm(profile, locale),
  });

  const {
    fields: highlightFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({ control, name: 'highlights' });

  const nameValue = watch('name');
  const avatarColorValue = watch('avatarColor');
  const avatarPhotoUrl = watch('avatarPhotoUrl');
  const hasPhoto = avatarPhotoUrl.length > 0;
  const submit = (values: ProfileFormValues): void => {
    // Telegram и GitHub живут в контактах, их изменение не повод слать PATCH /profile.
    const profileDirty = Object.keys(dirtyFields).some(
      (field) => field !== 'telegram' && field !== 'github',
    );
    onSave(profileDirty ? formToUpdate(values, locale) : null, {
      telegram: values.telegram.trim(),
      github: values.github.trim(),
    });
  };

  // Выбор файла открывает кадрирование; на сервер уходит уже обрезанный квадрат.
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const cropFileRef = useRef<File | null>(null);

  const closeCrop = (): void => {
    setCropSrc((previous) => {
      if (previous !== null) URL.revokeObjectURL(previous);
      return null;
    });
    cropFileRef.current = null;
  };

  const onAvatarFile = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    // Без сброса повторный выбор того же файла не вызовет change.
    event.target.value = '';
    if (!file) return;
    cropFileRef.current = file;
    setCropSrc(URL.createObjectURL(file));
  };

  const onApplyCrop = async (crop: CropRect): Promise<void> => {
    const file = cropFileRef.current;
    if (file === null) return;
    setIsUploadingAvatar(true);
    try {
      const url = await onUploadAvatar(file, crop);
      setValue('avatarPhotoUrl', url, { shouldDirty: true });
      closeCrop();
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const removePhoto = (): void => setValue('avatarPhotoUrl', '', { shouldDirty: true });

  const cvUrl = watch('cvUrl');
  const hasCv = cvUrl.length > 0;

  const onCvFile = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const url = await onUploadCv(file);
    setValue('cvUrl', url, { shouldDirty: true });
  };

  const removeCv = (): void => setValue('cvUrl', '', { shouldDirty: true });

  return (
    <form className={styles.form} onSubmit={(event) => void handleSubmit(submit)(event)} noValidate>
      <section className={styles.card}>
        <header className={styles.head}>
          <div>
            <h2 className={styles.title}>{t('admin.profile.title')}</h2>
            <span className={styles.endpoint}>PATCH /api/profile</span>
          </div>
        </header>

        <div className={styles.body}>
          <div className={styles.avatarRow}>
            <Avatar
              name={nameValue || '—'}
              src={hasPhoto ? avatarPhotoUrl : null}
              color={avatarColorValue}
              size={64}
            />
            <div className={styles.avatarMeta}>
              <span className={styles.inlineLabel}>
                {t('admin.profile.avatar')}{' '}
                <span className={styles.hint}>· {t('admin.profile.avatarHint')}</span>
              </span>
              <div className={styles.avatarActions}>
                <label className={styles.uploadBtn}>
                  <Icon name="upload" size={14} className={styles.uploadIcon} />
                  {t('admin.profile.avatarUpload')}
                  <input
                    type="file"
                    accept="image/*"
                    className={styles.fileInput}
                    onChange={onAvatarFile}
                  />
                </label>
                {hasPhoto ? (
                  <button type="button" className={styles.removePhoto} onClick={removePhoto}>
                    {t('admin.profile.avatarRemove')}
                  </button>
                ) : null}
                <Controller
                  control={control}
                  name="avatarColor"
                  render={({ field }) => (
                    <div
                      className={styles.palette}
                      role="radiogroup"
                      aria-label={t('admin.profile.avatarColor')}
                    >
                      {AVATAR_COLORS.map((color) => (
                        <button
                          key={color}
                          type="button"
                          role="radio"
                          aria-checked={field.value === color}
                          aria-label={color}
                          className={styles.swatch}
                          style={{ background: color }}
                          onClick={() => field.onChange(color)}
                        />
                      ))}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          <div className={styles.grid2}>
            <Input
              label={t('admin.profile.name')}
              labelVariant="plain"
              font="sans"
              required={locale === 'ru'}
              error={errors.name?.message}
              {...register('name')}
            />
            <Input
              label={t('admin.profile.role')}
              labelVariant="plain"
              font="sans"
              required={locale === 'ru'}
              error={errors.roleTitle?.message}
              {...register('roleTitle')}
            />
          </div>

          <div className={styles.grid2}>
            <Input
              label={t('admin.profile.location')}
              labelVariant="plain"
              font="sans"
              {...register('location')}
            />
            <Input
              label={t('admin.profile.email')}
              labelVariant="plain"
              required
              error={errors.email?.message}
              {...register('email')}
            />
          </div>

          <div className={styles.grid2}>
            <Input
              label={t('admin.profile.telegram')}
              labelVariant="plain"
              required
              error={errors.telegram?.message}
              {...register('telegram')}
            />
            <Input label={t('admin.profile.github')} labelVariant="plain" {...register('github')} />
          </div>

          <Textarea
            label={t('admin.profile.bio')}
            labelVariant="plain"
            font="sans"
            required={locale === 'ru'}
            rows={3}
            error={errors.bioMarkdown?.message}
            {...register('bioMarkdown')}
          />

          <Textarea
            label={t('admin.profile.headline')}
            labelVariant="plain"
            font="sans"
            rows={2}
            {...register('headline')}
          />
          <Input
            label={t('admin.profile.heroStack')}
            labelVariant="plain"
            font="sans"
            hint={t('admin.profile.heroStackHint')}
            {...register('heroStack')}
          />
          <div className={styles.cvField}>
            <span className={styles.inlineLabel}>
              {t('admin.profile.cv')}{' '}
              <span className={styles.hint}>
                · {t('admin.profile.cvHint', { lang: locale.toUpperCase() })}
              </span>
            </span>
            <div className={styles.avatarActions}>
              <label className={styles.uploadBtn}>
                <Icon name="upload" size={14} className={styles.uploadIcon} />
                {t('admin.profile.cvUpload')}
                <input
                  type="file"
                  accept="application/pdf"
                  className={styles.fileInput}
                  onChange={(event) => void onCvFile(event)}
                />
              </label>
              {hasCv ? (
                <>
                  <a
                    className={styles.cvLink}
                    href={cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="file" size={13} />
                    {t('admin.profile.cvCurrent')}
                  </a>
                  <button type="button" className={styles.removePhoto} onClick={removeCv}>
                    {t('admin.profile.cvRemove')}
                  </button>
                </>
              ) : (
                <span className={styles.hint}>{t('admin.profile.cvEmpty')}</span>
              )}
            </div>
          </div>

          <Controller
            control={control}
            name="isBioHidden"
            render={({ field }) => (
              <ToggleField
                icon="eye-off"
                title={t('admin.profile.bioHidden')}
                description={t('admin.profile.bioHiddenHint')}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />

          <fieldset className={styles.highlights}>
            <legend className={styles.blockLabel}>{t('admin.profile.highlights.label')}</legend>
            <p className={styles.blockHint}>{t('admin.profile.highlights.hint')}</p>
            <ul className={styles.highlightList}>
              {highlightFields.map((field, index) => (
                <li key={field.id} className={styles.highlightRow}>
                  <Input
                    label={t('admin.profile.highlights.value')}
                    labelVariant="plain"
                    font="mono"
                    {...register(`highlights.${index}.value`)}
                  />
                  <Input
                    label={t('admin.profile.highlights.caption')}
                    labelVariant="plain"
                    font="sans"
                    {...register(`highlights.${index}.label`)}
                  />
                  <button
                    type="button"
                    className={styles.rowRemove}
                    onClick={() => removeHighlight(index)}
                    aria-label={t('admin.profile.highlights.remove')}
                  >
                    <Icon name="trash" size={15} />
                  </button>
                </li>
              ))}
            </ul>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={styles.addRow}
              onClick={() => appendHighlight({ value: '', label: '', labelOther: '' })}
            >
              <Icon name="plus" size={14} />
              {t('admin.profile.highlights.add')}
            </Button>
          </fieldset>

          <Textarea
            label={t('admin.profile.projectsIntro')}
            labelVariant="plain"
            font="sans"
            rows={2}
            {...register('projectsIntro')}
          />
          <Textarea
            label={t('admin.profile.experienceIntro')}
            labelVariant="plain"
            font="sans"
            rows={2}
            {...register('experienceIntro')}
          />
          <Textarea
            label={t('admin.profile.contactIntro')}
            labelVariant="plain"
            font="sans"
            rows={2}
            {...register('contactIntro')}
          />
        </div>
      </section>

      <section className={styles.statusCard}>
        <h3 className={styles.statusTitle}>{t('admin.profile.availabilityLabel')}</h3>
        <p className={styles.statusDesc}>{t('admin.profile.availabilityHint')}</p>
        <Controller
          control={control}
          name="availability"
          render={({ field }) => (
            <div
              className={styles.statusOptions}
              role="radiogroup"
              aria-label={t('admin.profile.availabilityLabel')}
            >
              {AVAILABILITY_OPTIONS.map((value) => {
                const selected = field.value === value;
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    className={cn(styles.statusOption, selected && styles.statusOptionActive)}
                    onClick={() => field.onChange(value)}
                  >
                    <span className={styles.statusDot} data-status={value} />
                    <span className={styles.statusOptionLabel}>
                      {t(`admin.profile.availability.${value}`)}
                    </span>
                    {selected ? (
                      <Icon name="success" size={17} className={styles.statusCheck} />
                    ) : null}
                  </button>
                );
              })}
            </div>
          )}
        />
      </section>

      <AvatarCropperModal
        open={cropSrc !== null}
        src={cropSrc ?? ''}
        isUploading={isUploadingAvatar}
        onCancel={closeCrop}
        onApply={(crop) => void onApplyCrop(crop)}
      />

      <SaveBar
        visible={isDirty}
        isSaving={isSaving}
        saveType="submit"
        count={countDirtyFields(dirtyFields)}
        onCancel={() => reset()}
      />
    </form>
  );
}
