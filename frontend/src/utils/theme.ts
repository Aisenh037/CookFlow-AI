export function initializeTheme(): boolean {
  const isDark =
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  return isDark;
}

export function toggleTheme(): boolean {
  const isDarkNow = document.documentElement.classList.contains('dark');
  if (isDarkNow) {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
    return false;
  } else {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
    return true;
  }
}
