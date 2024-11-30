import { renderCards } from "./scripts/ui.js";

// dataya heryerde erişebilmek için global değişken tanımlandı

let data;

// menu verilerini json dan çeken fonksiyon
async function fetchMenu() {
  // api den iverileri al
  const res = await fetch("./db.json");

  // json verisini js formatına çevir

  data = await res.json();
}

// sayfanın yüklenme olayını izle
window.addEventListener("DOMContentLoaded", () => {
  //verileri çeken fonksiyonu çalıştır
  fetchMenu()
    // fonksiyon başarılı olduğu zaman kartları ekrana basab fonksiyonu calışltır
    .then(() => renderCards(data.menu));
});

// buttons alanındaki inputları çağır
const inputs = document.querySelectorAll("#buttons input");
// inputlar dizisini dön
inputs.forEach((input) => {
  // her bir inputun seçilme olayını izle
  input.addEventListener("change", () => {
    //seçilen kategori
    const selected = input.id;

    if (selected === "all") {
      renderCards(data.menu);
    } else {
      // menü elemanlarının seçilen kategoriye ait olanları filtrele
      const filtred = data.menu.filter((i) => i.category === selected);

      // filtrelenen datayı ekrana bas
      renderCards(filtred);
    }
  });
});
