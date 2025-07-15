# Balance Sheet App (obooks)

A simple Laravel application for managing personal assets and liabilities with real-time net worth calculations.

## Features

- **User Authentication**: Register and login functionality
- **Asset Management**: Add, edit, and delete assets
- **Liability Management**: Add, edit, and delete liabilities
- **Real-time Calculations**: Automatic calculation of total assets, total liabilities, and net worth
- **Clean UI**: Built with Tailwind CSS and React
- **Printable Reports**: Generate clean, printable balance sheet summaries
- **SQLite Database**: Lightweight, serverless database

## Installation

### Step 1: Install PHP and Composer

```bash
/bin/bash -c "$(curl -fsSL https://php.new/install/linux/8.4)"
source $HOME/.bashrc
```

### Step 2: Clone and Setup Project

```bash
git clone https://github.com/01-nicholas-otieno/obooks.git
cd obooks
composer install
```
## Setup

### Step 3: Environment Configuration

```bash
cp .env.example .env
php artisan key:generate


# Ensure directories exist
mkdir -p storage/framework/views bootstrap/cache

# Clear and rebuild caches
php artisan config:clear
php artisan view:clear
```

### Step 4: Database Setup

```bash
touch database/database.sqlite
php artisan migrate
```

### Step 5: Install Node Dependencies

```bash
npm install
npm run build
```

### Step 6: Start Development Server

```bash
php artisan serve
```

## Usage

1. **Register/Login**: Create an account or login to access your balance sheet
2. **Add Assets**: Click "Add Asset" to record your valuable items (bank accounts, investments, property)
3. **Add Liabilities**: Click "Add Liability" to record your debts and obligations
4. **View Summary**: See your total assets, total liabilities, and net worth in real-time
5. **Edit/Delete**: Modify or remove entries as needed
6. **Print**: Generate a clean, printable balance sheet report

## Project Structure

```
obooks/
├── app/
│   ├── Http/Controllers/
│   │   ├── AssetController.php
│   │   ├── LiabilityController.php
│   │   └── DashboardController.php
│   ├── Models/
│   │   ├── Asset.php
│   │   ├── Liability.php
│   │   └── User.php
│   └── Policies/
│       ├── AssetPolicy.php
│       └── LiabilityPolicy.php
├── database/
│   └── migrations/
│       ├── create_assets_table.php
│       └── create_liabilities_table.php
├── resources/
│   ├── js/
│   │   └── Pages/
│   │       ├── Dashboard.jsx
│   │       ├── Assets/Edit.jsx
│   │       ├── Liabilities/Edit.jsx
│   │       └── Welcome.jsx
│   └── css/
│       └── app.css
└── routes/
    └── web.php
```

## Technologies Used

- **Backend**: Laravel 11, PHP 8.4
- **Frontend**: React 18, Inert
