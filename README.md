# Personal Planner v8 (готово для Vercel)

Этот проект собран из одного файла компонента `personal-planner-v8-goals.jsx` и обёрнут в Vite + React, чтобы его можно было пушнуть в GitHub и задеплоить на Vercel.

## Локальный запуск

1) Установи Node.js 20 (или просто используй `.nvmrc`).
2) В корне проекта:

```bash
npm install
npm run dev
```

Откроется адрес из консоли (обычно `http://localhost:5173`).

## Что внутри важного

- `src/App.jsx` — твой компонент (как есть).
- `src/storage.js` — полифилл `window.storage` через `localStorage` (чтобы прототип работал в обычном браузере/на Vercel).

## Деплой на Vercel через GitHub

1) Создай репозиторий на GitHub (пустой).
2) Залей проект:

```bash
git init
git add .
git commit -m "init"
git branch -M main
git remote add origin <URL_репозитория>
git push -u origin main
```

3) В Vercel:
- `Add New -> Project`
- выбери репозиторий
- Framework: **Vite** (обычно определится автоматически)
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

Нажми Deploy.
