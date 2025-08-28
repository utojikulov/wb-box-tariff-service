# WB Tariffs Service

Сервис для работы с тарифами Wildberries. Автоматически получает данные о тарификации через API WB и синхронизирует с Google Sheets.

## Требования

- Node.js 18+
- PostgreSQL
- Docker и Docker Compose (опционально)

## Быстрый старт с Docker

1. **Клонируйте репозиторий**
   ```bash
   git clone <repository-url>
   cd wb-tariffs-service
   ```

2. **Настройте переменные окружения**
   ```bash
   cp example.env .env
   ```

   Заполните файл `.env`:

3. **Настройте Google Sheets API**
   - Создайте проект в Google Cloud Console
   - Включите Google Sheets API
   - Скачайте файл credentials.json и поместите в корень проекта

4. **Запустите сервис**
   ```bash
   docker-compose up -d
   ```

## Локальный запуск

1. **Установите зависимости**
   ```bash
   npm install
   ```

2. **Настройте базу данных PostgreSQL**
   - Создайте базу данных
   - Обновите настройки подключения в `.env`

3. **Выполните миграции**
   ```bash
   npm run build
   npm run migrate
   ```

4. **Запустите в режиме разработки**
   ```bash
   npm run dev
   ```

## Основные команды

- `npm run dev` - запуск в режиме разработки
- `npm run build` - сборка TypeScript проекта
- `npm start` - запуск production версии
- `npm run migrate` - выполнение миграций БД

## Что делает сервис

- Получает данные о тарифах с API Wildberries
- Сохраняет информацию в PostgreSQL
- Синхронизирует данные с Google Sheets по расписанию

## Настройка Google Sheets

1. Создайте Google Spreadsheet
2. Скопируйте его ID из URL (часть между `/d/` и `/edit`)
3. Добавьте ID в переменную `SPREADSHEET_ID`
4. Предоставьте доступ к таблице сервисному аккаунту из credentials.json
