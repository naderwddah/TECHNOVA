# TECHNOVA
# TECHNOVA — معرض المشاريع (مشروع ويب ثابت)

ملف README هذا يصف مشروع "معرض المشاريع" المبني باستخدام HTML / Tailwind CSS / JavaScript (Vanilla). المشروع يجمع بين تصميم عصري (glassmorphism، تدرجات لونية)، دعم ثيمات قابلة للتبديل، عرض مشاريع متزامنة مع GitHub (projects.json أو GitHub Contents)، ومودال تفصيلي باستخدام Swiper للصور. النسخة المقدّمة جاهزة للفتح محليًا أو رفعها على أي استضافة ثابتة.

---

محتويات المستودع (هيكل مبسّط)
- index.html (الصفحة الرئيسية — في القالب الكامل)
- projects-gallery-updated.html (الصفحة: معرض المشاريع — النسخة المحسّنة)
- services.html, contact.html, ... (صفحات مساعدة)
- assets/
  - css/ (custom styles, colors)
  - js/
    - main.js (التفاعلات الأساسية)
    - theme-toggle.js (تبديل الثيم واللغة)
    - target-audience.js (قِسم الجمهور المستهدف، إن وُجد)
  - images/ (هنا تُضع شعاراتك وصور المشاريع)
  - fonts/ (ملف الخط العربي woff2)
- README.md (هذا الملف)

---

الميزات الرئيسة
- تصميم عصري مظلم مع متغيرات ألوان قابلة للتبديل (template blue, navy, accent).
- عرض مشاريع ديناميكي:
  - قراءة ذكيّة من `projects.json` على GitHub باستخدام ETag (If-None-Match) لتقليل التحميل.
  - fallback لقراءة محتويات مجلد `public` عبر GitHub Contents API إذا تعذّر جلب JSON.
  - مصفوفة مشاريع محلية كقيمة افتراضية عند عدم توفر الإنترنت.
- بطاقات مشاريع تفاعلية مع صور (Swiper) + lazy-loading.
- مودال تفصيلي للصور/الوصف مع إمكانية نسخ رابط المشروع وفتح الرابط.
- تحكم واجهة: بحث، فرز، فلتر حسب الفئة، زر تبديل ثيم.
- دعم RTL عربي وإمكانية تفعيل اتجاه LTR عند تبديل اللغة.
- تحسينات أداء: تحميل مكتبات خارجية بشكل كسول (defer)، lazy images، توافق مع reduced-motion.
- سهولة التعديل: يمكنك استبدال الشعار (SVG) والخط (WOFF2) ومحتوى المشاريع بسهولة.

---

3. اضبط `tailwind.config.js` لتتضمّن المسارات (`content`) وامتدادات الألوان إلى متغيرات CSS إن رغبت.
4. أنشئ ملف CSS المدخل (مثلاً `src/styles.css`) واستورد فيه:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   /* ثم استورد متغيرات الألوان أو تخصيصاتك */
   ```
5. بنية البناء:
   ```
   npx tailwindcss -i ./src/styles.css -o ./assets/css/tailwind.css --minify
   ```
6. افتح الصفحة عبر خادم محلي.

---

كيفية تخصيص الألوان والثيمات
- الثيم الافتراضي معرفة عبر متغيرات CSS في رأس الصفحة (أو في `assets/css/colors.css` إن وُجد).
- للتبديل برمجيًا: استخدم دالة التبديل في `theme-toggle.js` أو اضف/ازل السمة `data-theme="navy"` على عنصر `<html>`:
  - افتراضي:
    ```html
    <html lang="ar" dir="rtl">
    ```
  - تفعيل الثيم الداكن (navy):
    ```html
    <html data-theme="navy" lang="ar" dir="rtl">
    ```
- يمكنك تعديل قيم المتغيرات (`--color-primary`, `--color-accent`, ...) لتطابق شعارك (#0A2C54 أو #2563EB).

---

إدراج الشعار والخطوط
- الشعار (SVG): ضع ملف الشعار في `assets/images/logo.svg` واستبدل عنصر `<img>` أو ضع SVG inline داخل الـ HTML إن أردت تحكمًا أفضل بالألوان.
- الخط العربي: ضع ملف WOFF2 (مثلاً `NotoSansArabic-Regular.woff2`) داخل `assets/fonts/` وفعّل `@font-face` في `assets/css/colors.css` أو `styles.css`.
- مثال @font-face:
  ```css
  @font-face{
    font-family: "NotoSansArabicLocal";
    src: url("/assets/fonts/NotoSansArabic-Regular.woff2") format("woff2");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  html[lang="ar"]{ font-family: "NotoSansArabicLocal", "Tajawal", sans-serif; }
  ```

---

ملف projects.json (صيغة متوقعة)
- يمكن مزامنة ملف JSON على GitHub بهذه البنية (مثال مبسّط):
```json
{
  "projects": [
    {
      "id": "proj-1",
      "title": "منصة تجارة إلكترونية",
      "shortDesc": "متجر 3D تفاعلي",
      "tags": ["website","ecommerce"],
      "images": ["https://.../img1.jpg","https://.../img2.jpg"],
      "link": "https://example.com",
      "category": "website"
    }
  ]
}
```
- المشروع يحاول جلب هذا الملف عبر الرابط الخام (raw) ويستخدم ETag للتحقق من التغيير.

---

نصائح لتحسين الأداء والإنتاج
- استبدل صور PNG/JPG بـ WebP أو AVIF حيث أمكن.
- تحميل Three.js / PIXI / مكتبات 3D فقط في الصفحات التي تحتاجها (dynamic import).
- تفعيل preconnect / preload للعناصر الحرجة (الخط، الشعار).
- استخدم CDN موثوق للـ Swiper و AOS أو قُم ببناء نسخ مصغّرة محليًا.

---

الوصولية (A11y) وSEO
- أضفت عناصر ARIA أساسية للمودال (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`).
- تأكد من تزويد كل صورة بخصائص `alt` ذات معنى.
- أضف Schema.org (JSON-LD) لكل مشروع لرفع ظهور المشروع في البحث إن رغبت.

---

كيفية المساهمة / إضافة مشروع جديد محليًا
- أضف كائنًا جديدًا في مصفوفة `localProjects` داخل كود الصفحة (temp).
- أو حرّك ملف `projects.json` على GitHub في المسار `public/projects.json` بالصيغة الموضّحة أعلاه.
- بعد رفع `projects.json` سيقوم الكود بالتحقق الدوري (ETag) وتحديث المعرض تلقائيًا.

---

الأسئلة المتكررة (مختصر)
- Q: لماذا بعض الصور لا تظهر؟
  - A: قد تمنع سياسات CORS أو قد تكون روابط الصورة خارجية ولم تُحمّل. ضَع الصور محليًا داخل `assets/images/` أو استخدم روابط تدعم hotlink.
- Q: كيف أغير اللغة (EN)؟
  - A: يمكنك تعديل `html.lang` إلى `en` و`dir` إلى `ltr`، وتوفير ترجمات النصوص (يمكن توسيع السكربت لإدارة ترجمة JSON لاحقًا).
- Q: هل يدعم المشروع تحميل ملفات كبيرة؟
  - A: المشروع يعمل كواجهة ثابتة؛ لتحميل ملفات كبيرة أو رفع ملفات استخدم backend (API) أو خدمات مثل Netlify Functions.

---

ترخيص وحقوق
- رموز العرض في هذا المشروع نموذجية — إن أردت إعادة استخدام أجزاء من الشيفرة تأكد من وضع ترخيص مناسب (مثلاً MIT) وإضافة ملف `LICENSE`.
- أي صور خارجية مستخدمة في النسخة التجريبية قد تكون خاضعة لرخص مكاتب الصور؛ استبدلها بصور تمتلكها أو صور مرخصة للاستخدام التجاري.

---

اتصل بي
إذا تريد أن أجهّز لك:
- نسخة مضغوطة ZIP جاهزة للنشر،
- ربط المشروع بمستودع GitHub ورفع الملفات تلقائيًا،
- دمج Three.js بمشهد 3D في الصفحة الرئيسية،
- أو إضافة ترجمة إنجليزية (ملف JSON + تبديل ديناميكي) —

أخبرني أي خيار تفضّل وسأقوم بتنفيذه فورًا.