# Ekspertiza — обзор проекта

## Назначение
Веб-приложение для учёта договоров (`agreements`), лифтов (`lifts`), технических освидетельствований (`inspections`), компаний (`companies`), физических лиц (`persons`) и представителей обслуживающих компаний (`sc_reps`). Судя по доменной модели — система учёта технических экспертиз/освидетельствований лифтов (домен `ekspertiza.eu`).

Проект находится на раннем этапе: реализована схема БД, аутентификация и базовый каркас публичной страницы; собственных бизнес-страниц (дашборд, формы CRUD) пока нет — только заготовки навигации, ведущие на `/dashboard` и `/sign-in` (страницы ещё не созданы).

## Стек
- **Next.js 16.2.9** (App Router), **React 19.2.4**, **TypeScript 5**
  - ⚠️ См. `AGENTS.md` в корне: версия Next.js имеет breaking changes относительно того, что известно из обучающих данных — перед написанием кода нужно сверяться с `node_modules/next/dist/docs/`.
- **Drizzle ORM 0.45** + **mysql2** — работа с MySQL
- **better-auth 1.6.20** — аутентификация (email/password, drizzle-adapter, next-cookies plugin)
- **Tailwind CSS 4**, **shadcn (style: base-nova)**, **base-ui/react**, **lucide-react** — UI
- **Biome 2 + Ultracite 7** — линт/форматирование (см. правила в `AGENTS.md`)

## Структура `src/`
```
src/
├── app/
│   ├── api/auth/[...all]/route.ts   # обработчик better-auth (catch-all)
│   ├── layout.tsx, page.tsx, globals.css
├── components/
│   ├── ui/                          # компоненты shadcn (button, card, input, drawer, combobox, ...)
│   ├── public-main-navigation/      # публичная навигация (desktop + mobile drawer/sheet)
│   ├── footer.tsx, theme-toggle.tsx, component-example.tsx
├── db/
│   ├── schema/                      # основные Drizzle-схемы (актуальные)
│   ├── seeds/                       # сидеры (agreements, lifts)
│   ├── utils/                       # скрипты обслуживания БД
│   ├── reference_skriemelis/, reference__claude/, temp_schema/  # черновые/референсные схемы, не используются в index.ts
│   ├── index.ts                     # инициализация drizzle (mysql2)
│   └── seed.ts                      # запуск всех сидеров
└── lib/
    ├── auth.ts                      # конфигурация better-auth (сервер)
    ├── auth-client.ts                # клиент better-auth
    └── utils.ts
```

## Схема базы данных (`src/db/schema`)
| Таблица | Назначение | Ключевые поля/связи |
|---|---|---|
| `user`, `session`, `account`, `verification` | Таблицы better-auth | стандартные |
| `agreements` | Договоры | `agreementNumber` (unique) |
| `lifts` | Лифты | `regNumber` (unique), `agreementId` → `agreements.id`, `address` |
| `inspections` | Освидетельствования | `protocolNumber` (unique), `liftId` → `lifts.id` |
| `companies` | Компании | `name`, `regNumber` |
| `persons` | Физлица | `personalCode` (unique), `firstName`, `lastName` |
| `sc_reps` | Представители обслуживающей компании | `personId` → `persons.id`, `companyId` → `companies.id`, `position` |
| `inspections_sc_reps` | Связь M:N | составной PK (`inspectionId`, `serviceCompanyRepId`) |

Многие поля в `lifts.ts` и `companies.ts` закомментированы — это запланированные, но ещё не активированные колонки (тип/категория лифта, реквизиты компании и т.д.).

`src/db/reference_skriemelis/`, `reference__claude/`, `temp_schema/` — черновые/референсные наборы схем, не подключены в `schema/index.ts` и не используются приложением напрямую.

## Аутентификация
- `better-auth` с MySQL через `drizzle-adapter`, схема — весь `src/db/schema`.
- Включён вход по email/паролю с автологином после регистрации.
- Кэш сессии в cookie на 5 минут.
- `trustedOrigins`: `https://ekspertiza.eu` (локальные хосты закомментированы).
- Эндпоинт: `POST/GET /api/auth/[...all]`.
- Клиентский хук: `authClient.useSession()` (`src/lib/auth-client.ts`).

## Маршруты приложения
На данный момент существует только `/` (главная страница: навигация + `ComponentExample` + футер). Навигация содержит ссылки-заглушки на `/dashboard` и `/sign-in`, страницы для которых ещё не реализованы.

## Скрипты (`package.json`)
- `dev` / `build` / `start` — Next.js
- `lint` / `format` — Biome
- `check` / `fix` — Ultracite
- `db:generate`, `db:migrate`, `db:push`, `db:pull`, `db:studio` — Drizzle Kit
- `db:seed` — заполнение БД тестовыми данными
- `db:ddd`, `db:dat`, `db:regenerate`, `db:rgm`, `db:all` — служебные комбинации для пересборки схемы/таблиц с нуля

## Переменные окружения (`.env`, `.env.local`)
`BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `DB_USERNAME`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DATABASE_URL`.

## Репозиторий
- Git remote: `https://github.com/koptevs/ekspertiza.git`
- Текущая ветка: `dev`, основная ветка: `master`
