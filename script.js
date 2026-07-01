/* ============ ШАПКА: фон при прокрутке ============ */
const navbar = document.getElementById("navbar")
const onScroll = () => navbar.classList.toggle("is-scrolled", window.scrollY > 40)
onScroll()
window.addEventListener("scroll", onScroll)

/* ============ ШАПКА: мобильное меню ============ */
const burger = document.getElementById("burger")
const navMobile = document.getElementById("navMobile")

burger.addEventListener("click", () => {
  const open = burger.classList.toggle("is-open")
  burger.setAttribute("aria-expanded", String(open))
  navMobile.hidden = !open
})
navMobile.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("is-open")
    burger.setAttribute("aria-expanded", "false")
    navMobile.hidden = true
  })
})

/* ============ ОБРАТНЫЙ ОТСЧЁТ ============ */
const TARGET = new Date("2026-09-12T15:00:00")
const cells = document.querySelectorAll("#countdown .countdown__num")

function pad(n) {
  return String(n).padStart(2, "0")
}
function tick() {
  const diff = Math.max(0, TARGET.getTime() - Date.now())
  const time = {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
  cells.forEach((cell) => {
    cell.textContent = pad(time[cell.dataset.unit])
  })
}
tick()
setInterval(tick, 1000)

/* ============ ПРОГРАММА ДНЯ ============ */
const events = [
  { time: "15:00", title: "Сбор гостей", desc: "Welcome-зона с лёгкими напитками и музыкой", icon: "🥂" },
  { time: "16:00", title: "Церемония", desc: "Выездная регистрация в саду под открытым небом", icon: "♥" },
  { time: "17:30", title: "Праздничный ужин", desc: "Банкет, тёплые слова и первые тосты", icon: "🍽" },
  { time: "20:00", title: "Первый танец", desc: "Открытие танцевального вечера и живая музыка", icon: "♪" },
  { time: "22:30", title: "Вечерний сюрприз", desc: "Фейерверк и завершение праздника", icon: "✦" },
]
const timeline = document.getElementById("timeline")
timeline.innerHTML = events
  .map(
    (e, i) => `
    <li class="timeline__item">
      <div class="timeline__rail">
        <span class="timeline__dot" aria-hidden="true">${e.icon}</span>
        ${i < events.length - 1 ? '<span class="timeline__line"></span>' : ""}
      </div>
      <div class="timeline__body">
        <span class="timeline__time">${e.time}</span>
        <h3 class="timeline__title">${e.title}</h3>
        <p class="timeline__desc">${e.desc}</p>
      </div>
    </li>`,
  )
  .join("")

/* ============ ЛОКАЦИЯ ============ */
const places = [
  {
    tag: "Церемония",
    name: "Сад «Лесная поляна»",
    address: "Московская обл., д. Сосновка, ул. Озёрная, 5",
    time: "16:00",
    note: "Свободная парковка у главного входа",
  },
  {
    tag: "Банкет",
    name: "Банкетный зал «Оранжерея»",
    address: "На территории клуба, 200 м от сада",
    time: "17:30",
    note: "Трансфер от церемонии не требуется",
  },
]
const venueGrid = document.getElementById("venueGrid")
venueGrid.innerHTML = places
  .map(
    (p) => `
    <div class="venue__card">
      <span class="venue__tag">${p.tag}</span>
      <h3 class="venue__name">${p.name}</h3>
      <ul class="venue__list">
        <li><span class="venue__icon" aria-hidden="true">⚲</span><span>${p.address}</span></li>
        <li><span class="venue__icon" aria-hidden="true">◷</span><span>Начало в ${p.time}</span></li>
        <li><span class="venue__icon" aria-hidden="true">⛟</span><span>${p.note}</span></li>
      </ul>
      <a class="venue__link" href="https://maps.google.com" target="_blank" rel="noopener noreferrer">Открыть на карте</a>
    </div>`,
  )
  .join("")

/* ============ ДРЕСС-КОД ============ */
const palette = [
  { name: "Кремовый", color: "oklch(0.95 0.02 85)" },
  { name: "Песочный", color: "oklch(0.85 0.04 75)" },
  { name: "Терракота", color: "oklch(0.62 0.08 45)" },
  { name: "Шалфей", color: "oklch(0.72 0.04 130)" },
  { name: "Графит", color: "oklch(0.35 0.01 60)" },
]
const paletteEl = document.getElementById("palette")
paletteEl.innerHTML = palette
  .map(
    (c) => `
    <div class="palette__item">
      <span class="palette__swatch" style="background-color:${c.color}"></span>
      <span class="palette__name">${c.name}</span>
    </div>`,
  )
  .join("")


  document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('rsvpForm');
  const formWrapper = document.getElementById('formWrapper');
  const attendanceButtons = document.querySelectorAll('.choice__btn');
  const attendanceInput = document.getElementById('attendanceInput');
  const guestsSelect = document.getElementById('guests');
  const guestsHidden = document.getElementById('guestsHidden');
  const successDiv = document.getElementById('rsvpSuccess');
  const errorDiv = document.getElementById('rsvpError');

  // --- Обработка кнопок "Приду / Не приду" ---
  attendanceButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      attendanceButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const value = this.dataset.value;
      attendanceInput.value = value;

      if (value === 'Не будет') {
        guestsSelect.value = '0';
        guestsSelect.disabled = true;
        guestsHidden.value = '0';
      } else {
        guestsSelect.disabled = false;
        guestsHidden.value = guestsSelect.value;
      }
    });
  });

  // --- Обновление скрытого поля при изменении select ---
  guestsSelect.addEventListener('change', function() {
    guestsHidden.value = this.value;
  });

  // --- Отправка формы ---
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Валидация: выбрана ли кнопка "Приду / Не приду"
    if (!attendanceInput.value) {
      alert('Пожалуйста, выберите, сможете ли вы прийти');
      return;
    }

    if (attendanceInput.value === 'Будет' && guestsHidden.value === '0') {
      alert('Пожалуйста, выберите количество гостей');
      return;
    }

    // Собираем данные
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      attendance: formData.get('attendance'),
      guests: formData.get('guests_hidden') || formData.get('guests'),
      wishes: formData.get('wishes') || ''
    };

    // URL вашего Google Apps Script
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxQjwrTEdQCUNaHjOn2i-oc5DPmCbelUuBk-orB3f4QdZLcDYvaVMaOZr96nyed1WLtTg/exec';

    const submitBtn = form.querySelector('.rsvp__submit');
    
    try {
      // Меняем текст кнопки
      submitBtn.textContent = 'Отправка...';
      submitBtn.disabled = true;

      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      // ✅ УСПЕШНАЯ ОТПРАВКА:
      // 1. Скрываем форму с плавным исчезновением
      formWrapper.style.transition = 'opacity 0.5s ease';
      formWrapper.style.opacity = '0';
      
      // 2. Через 0.5 секунды скрываем форму полностью и показываем благодарность
      setTimeout(() => {
        formWrapper.style.display = 'none';
        successDiv.style.display = 'block';
        
        // Плавное появление блока благодарности
        successDiv.style.opacity = '0';
        successDiv.style.transition = 'opacity 0.8s ease';
        
        setTimeout(() => {
          successDiv.style.opacity = '1';
        }, 50);
        
        // Прокручиваем к блоку благодарности
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);

      errorDiv.style.display = 'none';

    } catch (error) {
      console.error('Ошибка:', error);
      
      // Показываем ошибку
      errorDiv.style.display = 'block';
      errorDiv.style.opacity = '0';
      errorDiv.style.transition = 'opacity 0.5s ease';
      
      setTimeout(() => {
        errorDiv.style.opacity = '1';
      }, 50);
      
      // Возвращаем кнопку в исходное состояние
      submitBtn.textContent = 'Отправить анкету';
      submitBtn.disabled = false;
    }
  });

  // --- Стили для активной кнопки (добавьте в ваш CSS) ---
  // .choice__btn.active { background: #d4af37; color: #fff; }
});
