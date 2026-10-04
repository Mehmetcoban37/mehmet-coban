# 100 Milyon TL — YouTube Shorts Animasyonu

YouTube Shorts için hazırlanmış, 9:16 oranında ve tam 60 saniyelik interaktif motion-graphics videosu.

## En kolay açma yöntemi

**`100-milyon-short.html` dosyasına çift tıklayın.** Bu sürüm tüm CSS ve JavaScript'i içinde taşır; sunucu, kurulum veya internet bağlantısı gerektirmez. Açılan ekranda **VİDEOYU BAŞLAT** düğmesine basın.

- **Windows:** `BASLAT-WINDOWS.bat` dosyasına çift tıklayın.
- **macOS / Linux:** terminalde `./baslat.sh` çalıştırın.

> `localhost` yalnızca aşağıdaki sunucu komutu kendi bilgisayarınızda çalışırken açılır. Başka bir bilgisayarda veya bu sohbetin dışında `localhost:8000` adresini açmak `ERR_CONNECTION_REFUSED` hatası verir. En kolay yöntem yukarıdaki tek dosyalık sürümü doğrudan açmaktır.

Alternatif olarak kaynak sürümü yerel sunucuyla açabilirsiniz:

```bash
python3 -m http.server 8000
```

Ardından tarayıcıda `http://localhost:8000` adresine gidin.

## Dosyalar

- `100-milyon-short.html`: Tek dosyalık, doğrudan açılan teslim sürümü
- `BASLAT-WINDOWS.bat`: Windows için çift tıklamalı başlatıcı
- `baslat.sh`: macOS ve Linux için başlatıcı
- `index.html`, `styles.css`, `script.js`: Düzenlenebilir kaynak dosyalar
- `build.py`: Kaynaklardan tek dosyalık sürümü yeniden üretir

```bash
python3 build.py
```

## Özellikler

- 9:16 dikey sahne ve tam 60 saniyelik zaman çizelgesi
- Senaryoya uygun 7 sahne, dinamik geçişler ve büyük Türkçe yazılar
- Türkçe tarayıcı seslendirmesi ve altyazılar
- Duraklatma, tekrar oynatma, ileri-geri sarma ve tam ekran
- Tamamen çevrimdışı çalışan CSS tabanlı 2D/3D hibrit görseller
