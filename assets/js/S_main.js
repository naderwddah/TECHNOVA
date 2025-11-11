document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("services-container");

  try {
    const res = await fetch("../json/S_main.json");
    const services = await res.json();

    // تحميل كل خدمة والتحقق من الأيقونة قبل عرضها
    for (const service of services) {
      const iconExists = await checkImageExists(service.icon);
      const iconSrc = iconExists ? service.icon : "../default-icon.svg"; // الأيقونة البديلة الافتراضية

      const article = document.createElement("article");
      article.className = "service-card-3d";
      article.innerHTML = `
          <div class="card-inner relative w-full h-80">
            <!-- FRONT -->
            <div class="card-front absolute inset-0 bg-white rounded-2xl p-6 glass-effect flex flex-col justify-between">
              <div>
                <div class="w-16 h-16 rounded-xl bg-${
                  service.color
                }-100 flex items-center justify-center mb-4 mx-auto">
                <img src="${iconSrc}" alt="${service.title}" class="w-8 h-8">
                </div>
                    <div class="h-32 flex flex-col justify-center">
                    <h3 class="text-xl font-semibold mb-2">${service.title}</h3>
                    <p class="text-muted">${service.description}</p>
                    </div>
              </div>
              <div class="w-full flex items-center justify-between">
                <span class="text-${service.color}-600 font-bold">${
        service.price
      }</span>
                <button class="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors" onclick="flipCard(this)">تفاصيل</button>
              </div>
            </div>
  
            <!-- BACK -->
            <div class="card-back absolute inset-0 bg-gradient-to-br from-${
              service.color
            }-500 to-${
        service.color
      }-600 text-white rounded-2xl p-6 flex flex-col">
              <h3 class="text-xl font-semibold mb-3">تفاصيل الخدمة</h3>
              <ul class="list-inside space-y-2 mb-4 text-right">
                ${service.details.map((d) => `<li>• ${d}</li>`).join("")}
              </ul>
              <div class="mt-auto w-full flex justify-between">
                <button class="btn-cta px-4 py-2 rounded-full hover:opacity-90 transition-opacity">اطلب الخدمة</button>
                <button class="px-4 py-2 rounded-full border border-white/30 hover:bg-white/10 transition-colors" onclick="flipCard(this)">رجوع</button>
              </div>
            </div>
          </div>
        `;
      container.appendChild(article);
    }
  } catch (err) {
    console.error("خطأ أثناء تحميل الخدمات:", err);
  }
});

// دالة التحقق من وجود الصورة
async function checkImageExists(url) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

// دالة تقليب الكارت
function flipCard(btn) {
  const card = btn.closest(".card-inner");
  card.classList.toggle("flipped");
}
