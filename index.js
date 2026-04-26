import { projects, skills } from "./script/projects.js";

// Получить текст на нужном языке
function getLangText(textObj) {
   const lang = document.documentElement.getAttribute("lang") || "en";
   if (typeof textObj === "string") {
      return textObj;
   }
   if (typeof textObj === "object" && textObj !== null) {
      return textObj[lang] || textObj["en"] || textObj["ru"] || "";
   }
   return "";
}

// Универсальная функция для создания иконки инструмента
function createInstrumentIcon(instrument) {
   const instrumentIcons = {
      html: { class: "html-icon", href: "../images/icons/html5.svg#html5" },
      css: { class: "css-icon", href: "../images/icons/css3.svg#css3" },
      sass: { class: "sass-icon", href: "../images/icons/sass.svg#sass" },
      js: { class: "js-icon", href: "../images/icons/javascript.svg#js" },
      react: { class: "react-icon", href: "../images/icons/react.svg#react" },
      ts: { class: "ts-icon", href: "../images/icons/typescript.svg#ts" },
   };

   if (!instrumentIcons[instrument]) {
      console.warn("Иконка для инструмента " + instrument + " не найдена");
      return null;
   }

   const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
   svg.setAttribute("class", instrumentIcons[instrument].class);
   const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
   use.setAttribute("href", instrumentIcons[instrument].href);
   svg.appendChild(use);
   return svg;
}

// Обработка проектов
function renderProjects() {
   const projectsList = document.querySelector(".projects__list");
   const projectTemplate = document.querySelector("#project-template");

   if (!projectsList) {
      console.error("Элемент с классом .projects__list не найден");
      return;
   }
   if (!projectTemplate) {
      console.error("Элемент с id #project-template не найден");
      return;
   }

   // Очищаем список перед новым рендером
   projectsList.innerHTML = "";

   projects.forEach(function (project) {
      const projectItem = projectTemplate.content
         .querySelector(".projects__item")
         .cloneNode(true);

      // Заполняем текстовые поля с использованием getLangText
      projectItem.querySelector(".info__title").textContent = getLangText(
         project.name,
      );
      projectItem.querySelector(".info__description-text").textContent =
         getLangText(project.description);
      // Обновляем ссылки
      const siteLink = projectItem.querySelector(".info__link-site");
      if (siteLink) siteLink.href = project.siteLink;
      const githubLink = projectItem.querySelector(".info__link-code");
      if (githubLink) githubLink.href = project.githubLink;

      // Обновляем src для изображения
      const image = projectItem.querySelector(".preview__image");
      if (image) {
         image.src = `../images/projects/${project.image}`;
         image.alt = getLangText(project.name);
      } else {
         console.warn(
            "Элемент img с классом .preview__image не найден в шаблоне",
         );
      }

      const moreButton = projectItem.querySelector(
         ".info__footer-more, .info__more",
      );
      if (moreButton) {
         moreButton.addEventListener("click", function () {
            openProjectModal(project);
         });
      }

      // Обработка иконок инструментов
      const infoStack = projectItem.querySelector(".info__stack");
      if (infoStack) {
         infoStack.innerHTML = "";
         (project.instruments || []).forEach(function (instrument) {
            const icon = createInstrumentIcon(instrument);
            if (icon) {
               infoStack.appendChild(icon);
            }
         });
      } else {
         console.warn("Элемент .info__stack не найден в шаблоне проекта");
      }

      projectsList.appendChild(projectItem);
   });
}

// Обработка навыков
function renderSkills() {
   const skillsList = document.querySelector(".skills__list");
   const skillsTemplate = document.querySelector("#skills-template");

   if (!skillsList) {
      console.error("Элемент с классом .skills__list не найден");
      return;
   }
   if (!skillsTemplate) {
      console.error("Элемент с id #skills-template не найден");
      return;
   }

   // Очищаем список перед новым рендером
   skillsList.innerHTML = "";

   skills.forEach(function (skill) {
      const skillItem = skillsTemplate.content
         .querySelector(".skills__item")
         .cloneNode(true);

      // Заполняем заголовок и уровень
      skillItem.querySelector(".skills__item__box-title").textContent =
         skill.title;
      skillItem.querySelector(".skills__item__box-text").textContent =
         getLangText(skill.level);

      // Обновляем иконку
      const iconUse = skillItem.querySelector(".skills-icon use");
      const iconSvg = skillItem.querySelector(".skills-icon");
      if (iconUse) {
         iconUse.setAttribute("href", "../images/skills/" + skill.icon);
      } else {
         console.warn(
            "Элемент <use> для иконки не найден в шаблоне навыка " +
               skill.title,
         );
      }

      if (iconSvg) {
         iconSvg.classList.remove(
            "html-icon",
            "css-icon",
            "sass-icon",
            "js-icon",
            "ts-icon",
            "react-icon",
         );

         if (skill.icon.includes("html")) {
            iconSvg.classList.add("html-icon");
         }
         if (skill.icon.includes("css")) {
            iconSvg.classList.add("css-icon");
         }
         if (skill.icon.includes("sass")) {
            iconSvg.classList.add("sass-icon");
         }
         if (skill.icon.includes("javascript")) {
            iconSvg.classList.add("js-icon");
         }
         if (skill.icon.includes("typescript")) {
            iconSvg.classList.add("ts-icon");
         }
         if (skill.icon.includes("react")) {
            iconSvg.classList.add("react-icon");
         }
      }

      // Заполняем список навыков
      const skillsOtherList = skillItem.querySelector(
         ".skills__item__other-list",
      );
      if (skillsOtherList) {
         skillsOtherList.innerHTML = "";
         const skillsArray = Array.isArray(skill.skills)
            ? skill.skills
            : getLangText(skill.skills);
         skillsArray.forEach(function (skillText) {
            if (skillText.trim() !== "") {
               const li = document.createElement("li");
               li.className = "skills__item__other-item";
               li.textContent = skillText;
               skillsOtherList.appendChild(li);
            }
         });
      } else {
         console.warn(
            "Элемент .skills__item__other-list не найден в шаблоне навыка " +
               skill.title,
         );
      }

      skillsList.appendChild(skillItem);
   });
}

function initProjectTooltips() {
   const tooltipMap = new WeakMap();
   const visibleItems = new Set();
   let activeTarget = null;

   function getTooltip(target) {
      let tooltip = tooltipMap.get(target);
      if (tooltip) return tooltip;

      tooltip = document.createElement("div");
      tooltip.className = "project-tooltip";
      tooltip.setAttribute("aria-hidden", "true");
      document.body.appendChild(tooltip);
      tooltipMap.set(target, tooltip);
      return tooltip;
   }

   document.querySelectorAll(".info__link").forEach(function (link) {
      getTooltip(link);
   });

   function positionTooltip(target, tooltip) {
      const rect = target.getBoundingClientRect();
      const left = rect.left + rect.width / 2 + window.scrollX;
      const top = rect.top + window.scrollY;
      tooltip.style.left = left + "px";
      tooltip.style.top = top + "px";
   }

   function showTooltip(target) {
      const text = target.getAttribute("data-tooltip");
      if (!text) return;
      const tooltip = getTooltip(target);
      tooltip.textContent = text;
      tooltip.classList.add("is-visible");
      tooltip.setAttribute("aria-hidden", "false");
      positionTooltip(target, tooltip);
      visibleItems.add(target);
      activeTarget = target;
   }

   function hideTooltip(target) {
      if (!target) return;
      const tooltip = tooltipMap.get(target);
      if (!tooltip) return;
      tooltip.classList.remove("is-visible");
      tooltip.setAttribute("aria-hidden", "true");
      visibleItems.delete(target);
      if (activeTarget === target) {
         activeTarget = null;
      }
   }

   document.addEventListener("mouseover", function (e) {
      const link = e.target.closest(".info__link");
      if (!link) return;
      if (activeTarget && activeTarget !== link) {
         hideTooltip(activeTarget);
      }
      showTooltip(link);
   });

   document.addEventListener("mouseout", function (e) {
      const link = e.target.closest(".info__link");
      if (!link) return;
      if (e.relatedTarget && link.contains(e.relatedTarget)) return;
      hideTooltip(link);
   });

   document.addEventListener("focusin", function (e) {
      const link = e.target.closest(".info__link");
      if (!link) return;
      if (activeTarget && activeTarget !== link) {
         hideTooltip(activeTarget);
      }
      showTooltip(link);
   });

   document.addEventListener("focusout", function (e) {
      const link = e.target.closest(".info__link");
      if (!link) return;
      hideTooltip(link);
   });

   window.addEventListener(
      "scroll",
      function () {
         visibleItems.forEach(function (target) {
            const tooltip = tooltipMap.get(target);
            if (tooltip) positionTooltip(target, tooltip);
         });
      },
      true,
   );

   window.addEventListener("resize", function () {
      visibleItems.forEach(function (target) {
         const tooltip = tooltipMap.get(target);
         if (tooltip) positionTooltip(target, tooltip);
      });
   });
}

// Функция для горизонтальной прокрутки проектов
function initProjectsScroll() {
   const projectsList = document.querySelector(".projects__list");
   if (!projectsList) return;

   // Обработка прокрутки колесиком мыши
   projectsList.addEventListener("wheel", function (e) {
      // Получаем первую карточку для вычисления ширины
      const firstCard = projectsList.querySelector(".projects__item");
      if (!firstCard) return;

      // Вычисляем ширину карточки + отступ (gap)
      const cardWidth = firstCard.offsetWidth;
      const gap = 32; // 2em = 32px (если font-size: 1rem = 16px)
      const scrollAmount = cardWidth + gap;

      if (e.deltaY > 0) {
         // Прокрутка вправо на одну карточку
         projectsList.scrollLeft += scrollAmount;
      } else {
         // Прокрутка влево на одну карточку
         projectsList.scrollLeft -= scrollAmount;
      }
   });

   // Обработка клавиш стрелок
   projectsList.addEventListener("keydown", function (e) {
      const firstCard = projectsList.querySelector(".projects__item");
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth;
      const gap = 32;
      const scrollAmount = cardWidth + gap;

      if (e.key === "ArrowRight") {
         e.preventDefault();
         projectsList.scrollLeft += scrollAmount;
      } else if (e.key === "ArrowLeft") {
         e.preventDefault();
         projectsList.scrollLeft -= scrollAmount;
      }
   });

   // Делаем контейнер фокусируемым для клавиатуры
   projectsList.setAttribute("tabindex", "0");
}

function initLangMenu() {
   const lang = document.querySelector(".lang");
   if (!lang) return;
   const toggle = lang.querySelector(".lang__toggle");
   const options = lang.querySelectorAll(".lang__option");
   const theme = document.querySelector(".theme");

   function setOpen(isOpen) {
      lang.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
   }

   toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      if (theme) {
         theme.classList.remove("is-open");
         const themeToggle = theme.querySelector(".theme__toggle");
         if (themeToggle) themeToggle.setAttribute("aria-expanded", "false");
      }
      const isOpen = lang.classList.contains("is-open");
      setOpen(!isOpen);
   });

   options.forEach(function (option) {
      option.addEventListener("click", function () {
         const nextLang = option.getAttribute("data-lang") || "en";
         setLanguage(nextLang);
         setOpen(false);
      });
   });

   document.addEventListener("click", function (e) {
      if (!lang.contains(e.target)) {
         setOpen(false);
      }
   });

   document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
         setOpen(false);
      }
   });
}

function initThemeMenu() {
   const theme = document.querySelector(".theme");
   if (!theme) return;
   const toggle = theme.querySelector(".theme__toggle");
   const options = theme.querySelectorAll(".theme__option");
   const lang = document.querySelector(".lang");
   if (!toggle) return;

   function setOpen(isOpen) {
      theme.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
   }

   toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      if (lang) {
         lang.classList.remove("is-open");
         const langToggle = lang.querySelector(".lang__toggle");
         if (langToggle) langToggle.setAttribute("aria-expanded", "false");
      }
      const isOpen = theme.classList.contains("is-open");
      setOpen(!isOpen);
   });

   options.forEach(function (option) {
      option.addEventListener("click", function () {
         const nextTheme = option.getAttribute("data-theme") || "dark";
         setTheme(nextTheme);
         setOpen(false);
      });
   });

   document.addEventListener("click", function (e) {
      if (!theme.contains(e.target)) {
         setOpen(false);
      }
   });

   document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
         setOpen(false);
      }
   });

   syncThemeMenuState(theme);
}

function getPreferredTheme() {
   const storedTheme = localStorage.getItem("theme");
   if (storedTheme === "dark" || storedTheme === "light") {
      return storedTheme;
   }

   if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
   ) {
      return "light";
   }

   return "dark";
}

function applyTheme(theme) {
   document.documentElement.setAttribute("data-theme", theme);

   const metaTheme = document.querySelector('meta[name="theme-color"]');
   if (metaTheme) {
      metaTheme.setAttribute(
         "content",
         theme === "light" ? "#f5f7fb" : "#151515",
      );
   }

   const themeEl = document.querySelector(".theme");
   if (themeEl) {
      syncThemeMenuState(themeEl);
   }
}

function setTheme(theme) {
   applyTheme(theme);
   localStorage.setItem("theme", theme);
}

function syncThemeMenuState(themeEl) {
   const currentTheme =
      document.documentElement.getAttribute("data-theme") || "dark";

   themeEl.querySelectorAll(".theme__option").forEach(function (option) {
      const optionTheme = option.getAttribute("data-theme");
      const isActive = optionTheme === currentTheme;

      option.classList.toggle("is-active", isActive);
      option.setAttribute("aria-selected", isActive ? "true" : "false");
   });
}

function initI18n() {
   const defaultLang = getPreferredLanguage();
   setLanguage(defaultLang);
}

function getPreferredLanguage() {
   const stored = localStorage.getItem("lang");
   if (stored) return stored;
   const browserLang = (navigator.language || "en").toLowerCase();
   return browserLang.startsWith("ru") ? "ru" : "en";
}

async function setLanguage(lang) {
   const langFile = lang === "ru" ? "./i18n/ru.json" : "./i18n/en.json";
   try {
      const response = await fetch(langFile, { cache: "no-store" });
      if (!response.ok) {
         console.warn("Не удалось загрузить файл перевода", langFile);
         return;
      }
      const translations = await response.json();
      applyTranslations(translations);
      localStorage.setItem("lang", lang);
      document.documentElement.setAttribute("lang", lang);
      // Пересчитываем проекты и навыки с новым языком
      renderProjects();
      renderSkills();
   } catch (error) {
      console.warn("Ошибка загрузки перевода", error);
   }
}

function applyTranslations(translations) {
   document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      const value = getTranslationValue(translations, key);
      if (value) {
         el.textContent = value;
      }
   });

   document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      const raw = el.getAttribute("data-i18n-attr") || "";
      raw.split(",").forEach(function (pair) {
         const trimmed = pair.trim();
         if (!trimmed) return;
         const parts = trimmed.split(":");
         if (parts.length < 2) return;
         const attr = parts.shift().trim();
         const key = parts.join(":").trim();
         const value = getTranslationValue(translations, key);
         if (value) {
            el.setAttribute(attr, value);
         }
      });
   });
}

function getTranslationValue(translations, key) {
   if (!key) return "";
   return key.split(".").reduce(function (acc, part) {
      if (!acc || typeof acc !== "object") return "";
      return acc[part];
   }, translations);
}

// Запуск рендеринга при загрузке DOM
applyTheme(getPreferredTheme());

document.addEventListener("DOMContentLoaded", function () {
   renderProjects();
   renderSkills();
   initProjectsScroll();
   initProjectTooltips();
   initLangMenu();
   initI18n();
   initThemeMenu();
});

// ===== Modal logic =====
function openProjectModal(project) {
   const modal = document.getElementById("project-modal");
   if (!modal) return;

   const titleEl = modal.querySelector("#modal-title");
   const descEl = modal.querySelector("#modal-description");
   const yearEl = modal.querySelector("#modal-year");
   const instrWrap = modal.querySelector("#modal-stack");
   const siteEl = modal.querySelector("#modal-site");
   const githubEl = modal.querySelector("#modal-github");
   if (titleEl) titleEl.textContent = getLangText(project.name) || "";
   if (descEl)
      descEl.textContent =
         getLangText(project.info) || getLangText(project.description) || "";
   if (yearEl) yearEl.textContent = project.year || "";
   if (siteEl) siteEl.href = project.siteLink || "#";
   if (githubEl) githubEl.href = project.githubLink || "#";

   if (instrWrap) {
      instrWrap.innerHTML = "";
      (project.instruments || []).forEach(function (instrument) {
         const icon = createInstrumentIcon(instrument);
         if (icon) instrWrap.appendChild(icon);
      });
   }

   modal.classList.add("is-open");

   // Добавляем класс is-open для overlay
   const overlay = modal.querySelector(".modal__overlay");
   if (overlay) {
      overlay.classList.add("is-open");
   }

   document.body.style.overflow = "hidden";

   // Close handlers
   const closeTargets = modal.querySelectorAll("[data-modal-close]");
   closeTargets.forEach(function (el) {
      el.addEventListener("click", closeProjectModal, { once: true });
   });

   document.addEventListener("keydown", handleEscClose);
}

function closeProjectModal() {
   const modal = document.getElementById("project-modal");
   if (!modal) return;
   modal.classList.remove("is-open");

   // Убираем класс is-open с overlay
   const overlay = modal.querySelector(".modal__overlay");
   if (overlay) {
      overlay.classList.remove("is-open");
   }

   // Восстанавливаем прокрутку основной страницы
   document.body.style.overflow = "";

   document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(e) {
   if (e.key === "Escape") {
      closeProjectModal();
   }
}
