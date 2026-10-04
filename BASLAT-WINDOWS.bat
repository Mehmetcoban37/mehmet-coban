@echo off
chcp 65001 >nul
echo Video tarayicida aciliyor...
start "" "%~dp0100-milyon-short.html"
if errorlevel 1 (
  echo Dosya otomatik acilamadi. 100-milyon-short.html dosyasina cift tiklayin.
  pause
)
