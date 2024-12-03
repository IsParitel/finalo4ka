@echo off
cd /d "%~dp0server"
start cmd /k "npm run dev"

cd /d "%~dp0client"
start cmd /k "npm start

exit