/**
 * Пустой url допустим: пока профиль грузится, `cvUrl` ещё нет, и клик просто ничего не
 * делает. `download` срабатывает только для same-origin, а файлы у нас и так из `/uploads`.
 */
export function downloadFile(url: string | null | undefined, filename?: string): void {
  if (!url) return;
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename ?? '';
  anchor.rel = 'noopener';
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
}
