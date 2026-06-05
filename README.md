# Kick Level Badge Hider

Kick sohbetindeki **Level rozetlerini** ve kapladıkları boşluğu kaldıran basit bir Chrome Extension.

---

## Klasör Yapısı

```text
kick-level-badge-hider/
├── manifest.json
└── content.js
```

---

## manifest.json

```json
{
  "manifest_version": 3,
  "name": "Kick Level Badge Hider",
  "version": "1.0",
  "description": "Kick chat üzerindeki level rozetlerini kaldırır.",
  "content_scripts": [
    {
      "matches": ["*://*.kick.com/*"],
      "js": ["content.js"],
      "run_at": "document_idle"
    }
  ]
}
```

---

## content.js

```javascript
function removeLevelBadges() {
    document.querySelectorAll('img[alt^="Level "]').forEach(img => {

        const badgeContainer = img.closest(
            '.inline-flex.shrink-0.items-center'
        );

        if (badgeContainer) {
            badgeContainer.remove();
        }
    });
}

// İlk yüklemede çalıştır
removeLevelBadges();

// Yeni mesajlar geldikçe çalıştır
const observer = new MutationObserver(() => {
    removeLevelBadges();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
```

---

## Kurulum

1. `kick-level-badge-hider` isminde bir klasör oluşturun.
2. Yukarıdaki `manifest.json` ve `content.js` dosyalarını oluşturun.
3. Chrome'da aşağıdaki adrese gidin:

```text
chrome://extensions
```

4. Sağ üst köşeden **Developer Mode** seçeneğini aktif edin.
5. **Load Unpacked** butonuna tıklayın.
6. `kick-level-badge-hider` klasörünü seçin.
7. Kick.com sayfasını yenileyin.

---

## Nasıl Çalışır?

Extension, sohbet mesajlarında bulunan aşağıdaki yapıyı tespit eder:

```html
<img alt="Level 14" src="...">
```

`alt` değeri `"Level "` ile başlayan tüm rozetleri bulur ve bunları saran container elementi DOM'dan kaldırır. Böylece:

* Level rozetleri görünmez olur.
* Rozetlerin kapladığı boşluk da kaldırılır.
* Yeni gelen mesajlarda da otomatik olarak çalışmaya devam eder.

---

## Test

Extension yüklendikten sonra:

1. Kick yayın sohbetini açın.
2. Level rozeti bulunan bir kullanıcı mesajını bulun.
3. Sayfayı yenileyin.
4. Rozetlerin tamamen kaldırıldığını doğrulayın.

---

**Sürüm:** 1.0
**Uyumluluk:** Chrome (Manifest V3)
