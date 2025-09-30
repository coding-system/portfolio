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

      // Обновляем src для iframe
      const iframe = projectItem.querySelector(".preview__iframe");
      if (iframe) {
         iframe.src = project.siteLink;
      } else {
         console.warn(
            "Элемент iframe с классом .preview__iframe не найден в шаблоне"
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

// Запуск рендеринга при загрузке DOM
document.addEventListener("DOMContentLoaded", function () {
   renderProjects();
   renderSkills();
});
