@echo off
setlocal
echo ========================================================
echo        BlockCity Project Setup Script
echo ========================================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: Node.js is not installed or not in the PATH.
    echo Please install Node.js from https://nodejs.org/
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

:: Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: npm is not installed or not in the PATH.
    echo Please install Node.js which includes npm.
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

echo [1/3] Installing root dependencies...
call npm install
if %ERRORLEVEL% neq 0 (
    echo Error finding or installing root dependencies.
    pause
    exit /b 1
)
echo.

echo [2/3] Installing frontend dependencies...
if not exist frontend (
    echo Error: 'frontend' directory not found!
    pause
    exit /b 1
)
cd frontend
echo Clearing frontend cache to ensure clean Tailwind CSS setup...
if exist node_modules\.vite rmdir /s /q node_modules\.vite
call npm install
if %ERRORLEVEL% neq 0 (
    echo Error installing frontend dependencies.
    cd ..
    pause
    exit /b 1
)
cd ..
echo.

echo [3/3] Installing backend dependencies...
if not exist backend (
    echo Error: 'backend' directory not found!
    pause
    exit /b 1
)
cd backend
call npm install
if %ERRORLEVEL% neq 0 (
    echo Error installing backend dependencies.
    cd ..
    pause
    exit /b 1
)
cd ..
echo.

echo ========================================================
echo        Setup Complete!
echo ========================================================
echo All dependencies have been successfully installed.
echo.
echo Please ensure you configure your environment variables:
echo  1. Create a .env file in the root directory (or respective folders)
echo  2. Add your database connection string and other secrets.
echo.
echo To start the project, simply run:
echo    npm run dev
echo.
echo Press any key to exit...
pause >nul
exit /b 0
