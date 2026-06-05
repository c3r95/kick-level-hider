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
