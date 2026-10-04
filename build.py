"""Tek dosyalık, çevrimdışı açılabilen Shorts önizlemesi oluşturur."""
from pathlib import Path

root = Path(__file__).parent
html = (root / "index.html").read_text(encoding="utf-8")
css = (root / "styles.css").read_text(encoding="utf-8")
js = (root / "script.js").read_text(encoding="utf-8")
html = html.replace('<link rel="stylesheet" href="styles.css">', f"<style>\n{css}\n</style>")
html = html.replace('<script src="script.js"></script>', f"<script>\n{js}\n</script>")
(root / "100-milyon-short.html").write_text(html, encoding="utf-8")
print("100-milyon-short.html hazır — dosyaya çift tıklayarak açabilirsiniz.")
