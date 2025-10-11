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
      projectItem.querySelector(".info__footer-text").textContent =
         project.year;

      // Обновляем ссылки
      const siteLink = projectItem.querySelector(".preview__links-site");
      siteLink.href = project.siteLink;
      const githubLink = projectItem.querySelector(".preview__links-code");
      githubLink.href = project.githubLink;

      // Обновляем src для изображения
      const image = projectItem.querySelector(".preview__image");
      if (image) {
         image.src = `../images/projects/${project.image}`;
         image.alt = project.name;
      } else {
         console.warn(
            "Элемент img с классом .preview__image не найден в шаблоне"
         );
      }

      // Обработка иконок инструментов
      const infoSvg = projectItem.querySelector(".info__svg");
      if (infoSvg) {
         (project.instruments || []).forEach(function (instrument) {
            const icon = createInstrumentIcon(instrument);
            if (icon) {
               infoSvg.appendChild(icon);
            }
         });
      } else {
         console.warn("Элемент .info__svg не найден в шаблоне проекта");
      }

      // Кнопка "Подробнее" — открытие модального окна и наполнение данными
      const detailsBtn = projectItem.querySelector(".preview__links-more");
      if (detailsBtn) {
         detailsBtn.addEventListener("click", function () {
            openProjectModal(project);
         });
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
      if (iconUse) {
         iconUse.setAttribute("href", "../images/skills/" + skill.icon);
      } else {
         console.warn(
            "Элемент <use> для иконки не найден в шаблоне навыка " + skill.title
         );
      }

      // Заполняем список навыков
      const skillsOtherList = skillItem.querySelector(
         ".skills__item__other-list"
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
               skill.title
         );
      }

      skillsList.appendChild(skillItem);
   });
}

// Функция для горизонтальной прокрутки проектов
function initProjectsScroll() {
   const projectsList = document.querySelector(".projects__list");
   if (!projectsList) return;

   // Обработка прокрутки колесиком мыши
   projectsList.addEventListener("wheel", function (e) {
      e.preventDefault();

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
