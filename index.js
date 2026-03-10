import { projects, skills } from "./script/projects.js";

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

   projects.forEach(function (project) {
      const projectItem = projectTemplate.content
         .querySelector(".projects__item")
         .cloneNode(true);

      // Заполняем текстовые поля
      projectItem.querySelector(".info__title").textContent = project.name;
      projectItem.querySelector(".info__description-text").textContent =
         project.description;
      // Обновляем ссылки
      const siteLink = projectItem.querySelector(".info__link-site");
      if (siteLink) siteLink.href = project.siteLink;
      const githubLink = projectItem.querySelector(".info__link-code");
      if (githubLink) githubLink.href = project.githubLink;

      // Обновляем src для изображения
      const image = projectItem.querySelector(".preview__image");
      if (image) {
         image.src = `../images/projects/${project.image}`;
         image.alt = project.name;
      } else {
         console.warn(
            "Элемент img с классом .preview__image не найден в шаблоне",
         );
      }

      // Формируем строку с годом
      projectItem.querySelector(".info__footer-text").textContent =
         project.year;

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

   skills.forEach(function (skill) {
      const skillItem = skillsTemplate.content
         .querySelector(".skills__item")
         .cloneNode(true);

      // Заполняем заголовок и уровень
      skillItem.querySelector(".skills__item__box-title").textContent =
         skill.title;
      skillItem.querySelector(".skills__item__box-text").textContent =
         skill.level;

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
      }

      // Заполняем список навыков
      const skillsOtherList = skillItem.querySelector(
         ".skills__item__other-list",
      );
      if (skillsOtherList) {
         skillsOtherList.innerHTML = "";
         skill.skills.forEach(function (skillText) {
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

// Запуск рендеринга при загрузке DOM
document.addEventListener("DOMContentLoaded", function () {
   renderProjects();
   renderSkills();
   initProjectsScroll();
   initProjectTooltips();
});

// ===== Modal logic =====
function openProjectModal(project) {
   const modal = document.getElementById("project-modal");
   if (!modal) return;

   const titleEl = modal.querySelector("#modal-title");
   const descEl = modal.querySelector("#modal-description");
   const yearEl = modal.querySelector("#modal-year");
   const instrWrap = modal.querySelector("#modal-instruments");
   const siteEl = modal.querySelector("#modal-site");
   const githubEl = modal.querySelector("#modal-github");
   if (titleEl) titleEl.textContent = project.name || "";
   if (descEl) descEl.textContent = project.info || project.description || "";
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
