import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App, enableMocking } from '@/app';

import './app/styles/index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Корневой элемент #root не найден');
}

// Монтируем только после запуска моков, иначе первые запросы уйдут мимо MSW.
void enableMocking().then(() => {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
