export const projects = [
   {
      name: "My Portfolio Website",
      description: "Мой сайт портфолио",
      info: "Данный сайт-портфолио.",
      image: "portfolio.png",
      siteLink: "https://codingsystem.ru/",
      githubLink: "https://github.com/coding-system/portfolio",
      instruments: ["html", "css", "sass", "js"],
   },
   {
      name: "Developers catalog",
      description: "Каталог сайтов портфолио разработчиков.",
      info: "Каталог сайтов-портфолио разработчиков и специалистов различных сфер, реализованный в виде экрана с возможностью прямо на сайте переключаться между сайтами и просматривать их без необходимости открывать новую вкладку.",
      image: "catalog.png",
      siteLink: "https://portfolios.codingsystem.ru",
      githubLink: "https://github.com/coding-system/dev-sites-catalog",
      instruments: ["html", "css", "sass", "js"],
   },
   {
      name: "Heroes random",
      description: "Виджет рандома героев для OBS",
      info: "Специализированный инструмент для стримеров по Dota 2, который сочетает в себе систему случайного выбора героев с виджетом отслеживания MMR. Приложение позволяет стримерам интерактивно выбирать героев, управлять статистикой MMR в реальном времени и отображать прогресс прямо на стриме. С помощью горячих клавиш можно быстро запускать рулетку героев, управлять состояниями героев (банить, блокировать) и обновлять статистику MMR, что делает стрим более интересным для зрителей.",
      image: "random.jpg",
      siteLink: "https://random.codingsystem.ru",
      githubLink: "https://github.com/coding-system/react-random-roll",
      instruments: ["html", "css", "sass", "ts", "react"],
   },
   {
      name: "Vinyl Player",
      description: "Виниловый проигрыватель",
      info: "Интерактивный реалистичный виниловый проигрыватель с возможностью переключения радиостанций. Откройте страницу на весь экран и запустите поигрыватель правой нижней кнопкой для создания приятной атмосферы.",
      image: "vinyl.png",
      siteLink: "https://radio.codingsystem.ru",
      githubLink: "https://github.com/coding-system/vinyl-player",
      instruments: ["html", "css", "sass", "js", "react"],
   },
   {
      name: "UGEKTAR",
      description: "Лендинг по продаже земли",
      info: "Лендинг компании по продаже земельных участков. На сайте используется Яндекс Карты API, реализован адаптивный дизайн, а также создана форма обратной связи с созданием записей в Google Sheets. Если рассмативаете инвестиции в земельные участки с патенциалом роста до 800%, ознакомьтесь с предложением компании.",
      image: "krym.png",
      siteLink: "https://ugektar.ru",
      githubLink: "https://github.com/coding-system/krym-landing",
      instruments: ["html", "css", "sass", "js"],
   },
];

export const skills = [
   {
      title: "HTML5",
      level: "Stable",
      icon: "html5-colored.svg#html5-colored",
      skills: [
         "Семантическая разметка страниц.",
         "Создание адаптивных и доступных интерфейсов.",
         "Использование современных атрибутов и тегов.",
         "Применение ARIA-атрибутов для повышения доступности.",
      ],
   },
   {
      title: "CSS3",
      level: "Stable",
      icon: "css3-colored.svg#css3-colored",
      skills: [
         "Верстка с использованием Flexbox и Grid.",
         "Создание адаптивных и резиновых макетов.",
         "Реализация сложных CSS-анимаций и переходов.",
         "Создание кастомных тем через переменные CSS (Custom Properties)",
      ],
   },
   {
      title: "Sass/Scss",
      level: "Stable",
      icon: "sass.svg#sass",
      skills: [
         "Организация стилей с использованием вложенности и миксинов.",
         "Работа с переменными и функциями SCSS.",
         "Оптимизация кода через наследование и модульность.",
      ],
   },
   {
      title: "Javascript",
      level: "Basic",
      icon: "javascript-colored.svg#javascript-colored",
      skills: [
         "Работа с DOM: манипуляции, события.",
         "Написание клиентской логики и модульного кода.",
         "Асинхронное программирование: Promises, async/await.",
         "Использование веб-API: Geolocation, Fetch, File API.",
      ],
   },
   {
      title: "GIT",
      level: "Basic",
      icon: "git.svg#git",
      skills: [
         "Управление версиями кода: commit, branch, merge.",
         "Работа с удалёнными репозиториями: pull, push, rebase.",
      ],
   },
   {
      title: "Figma",
      level: "Basic",
      icon: "figma.svg#figma",
      skills: [
         "Работа с макетами и прототипами интерфейсов.",
         "Создание интерактивных элементов и анимаций.",
         "Экспорт ресурсов для разработки.",
      ],
   },
   {
      title: "React",
      level: "Learning",
      icon: "react.svg#react",
      skills: [
         "Разработка компонентов на функциональной и классовой основе.",
         "Использование хуков: useState, useEffect, useContext.",
         "Оптимизация приложений через мемоизацию и lazy-loading.",
      ],
   },
   {
      title: "Typescript",
      level: "Learning",
      icon: "typescript-colored.svg#typescript-colored",
      skills: [
         "Создание типизированного кода для повышения надежности.",
         "Использование интерфейсов, дженериков и утилит типов.",
         "Настройка строгой типизации и компиляции.",
      ],
   },
];
