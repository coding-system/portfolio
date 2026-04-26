export const projects = [
   // {
   //    name: {
   //       ru: "Мой сайт портфолио",
   //       en: "My Portfolio Website",
   //    },
   //    description: {
   //       ru: "Мой сайт портфолио",
   //       en: "My portfolio website",
   //    },
   //    info: {
   //       ru: "Данный сайт-портфолио.",
   //       en: "This portfolio website.",
   //    },
   //    image: "portfolio.png",
   //    siteLink: "https://codingsystem.ru/",
   //    githubLink: "https://github.com/coding-system/portfolio",
   //    instruments: ["html", "css", "sass", "js"],
   // },
   {
      name: {
         ru: "UGEKTAR",
         en: "UGEKTAR",
      },
      description: {
         ru: "Лендинг по продаже земли",
         en: "Land sale landing page",
      },
      info: {
         ru: "Лендинг компании по продаже земельных участков. На сайте используется Яндекс Карты API, реализован адаптивный дизайн, а также создана форма обратной связи с созданием записей в Google Sheets.",
         en: "A landing page for a company selling land plots. The site uses Yandex Maps API, implements responsive design, and features a feedback form that creates entries in Google Sheets.",
      },
      image: "krym.png",
      siteLink: "https://ugektar.ru",
      githubLink: "https://github.com/coding-system/krym-landing",
      instruments: ["html", "css", "sass", "js"],
   },
   {
      name: {
         ru: "Каталог разработчиков",
         en: "Developers catalog",
      },
      description: {
         ru: "Каталог сайтов портфолио разработчиков.",
         en: "A catalog of developers' portfolio websites.",
      },
      info: {
         ru: "Каталог сайтов-портфолио разработчиков и специалистов различных сфер, реализованный в виде экрана с возможностью прямо на сайте переключаться между сайтами и просматривать их без необходимости открывать новую вкладку.",
         en: "A catalog of portfolio websites for developers and specialists from various fields, implemented as a screen with the ability to switch between sites directly on the website and view them without needing to open a new tab.",
      },
      image: "catalog.png",
      siteLink: "https://portfolios.codingsystem.ru",
      githubLink: "https://github.com/coding-system/dev-sites-catalog",
      instruments: ["html", "css", "sass", "js"],
   },
   {
      name: {
         ru: "Рулетка героев",
         en: "Heroes random",
      },
      description: {
         ru: "Виджет рандома героев для OBS",
         en: "Random heroes widget for OBS",
      },
      info: {
         ru: "Специализированный инструмент для стримеров по Dota 2, который сочетает в себе систему случайного выбора героев с виджетом отслеживания MMR. Приложение позволяет стримерам интерактивно выбирать героев, управлять статистикой MMR в реальном времени и отображать прогресс прямо на стриме. С помощью горячих клавиш можно быстро запускать рулетку героев, управлять состояниями героев (банить, блокировать) и обновлять статистику MMR, что делает стрим более интересным для зрителей.",
         en: "A specialized tool for Dota 2 streamers that combines a random hero selection system with an MMR tracking widget. The application allows streamers to interactively select heroes, manage MMR statistics in real-time, and display progress directly on the stream. Using hotkeys, you can quickly launch the hero roulette, manage hero states (ban, block), and update MMR statistics, making the stream more engaging for viewers.",
      },
      image: "random.jpg",
      siteLink: "https://random.codingsystem.ru",
      githubLink: "https://github.com/coding-system/react-random-roll",
      instruments: ["html", "css", "sass", "ts", "react"],
   },
   {
      name: {
         ru: "Виниловый проигрыватель",
         en: "Vinyl Player",
      },
      description: {
         ru: "Виниловый проигрыватель",
         en: "Vinyl record player",
      },
      info: {
         ru: "Интерактивный реалистичный виниловый проигрыватель с возможностью переключения радиостанций. Откройте страницу на весь экран и запустите проигрыватель правой нижней кнопкой для создания приятной атмосферы.",
         en: "An interactive realistic vinyl record player with the ability to switch between radio stations. Open the page fullscreen and launch the player with the bottom right button to create a pleasant atmosphere.",
      },
      image: "vinyl.png",
      siteLink: "https://radio.codingsystem.ru",
      githubLink: "https://github.com/coding-system/vinyl-player",
      instruments: ["html", "css", "sass", "js", "react"],
   },
];

export const skills = [
   {
      title: "HTML5",
      level: {
         ru: "Стабильный",
         en: "Stable",
      },
      icon: "html5-colored.svg#html5-colored",
      skills: {
         ru: [
            "Семантическая разметка страниц.",
            "Создание адаптивных и доступных интерфейсов.",
            "Использование современных атрибутов и тегов.",
            "Применение ARIA-атрибутов для повышения доступности.",
         ],
         en: [
            "Semantic page markup.",
            "Creating responsive and accessible interfaces.",
            "Using modern attributes and tags.",
            "Applying ARIA attributes for improved accessibility.",
         ],
      },
   },
   {
      title: "CSS3",
      level: {
         ru: "Стабильный",
         en: "Stable",
      },
      icon: "css3-colored.svg#css3-colored",
      skills: {
         ru: [
            "Верстка с использованием Flexbox и Grid.",
            "Создание адаптивных и резиновых макетов.",
            "Реализация сложных CSS-анимаций и переходов.",
            "Создание кастомных тем через переменные CSS (Custom Properties)",
         ],
         en: [
            "Layout using Flexbox and Grid.",
            "Creating responsive and flexible layouts.",
            "Implementing complex CSS animations and transitions.",
            "Creating custom themes through CSS variables (Custom Properties)",
         ],
      },
   },
   {
      title: "Sass/Scss",
      level: {
         ru: "Стабильный",
         en: "Stable",
      },
      icon: "sass.svg#sass",
      skills: {
         ru: [
            "Организация стилей с использованием вложенности и миксинов.",
            "Работа с переменными и функциями SCSS.",
            "Оптимизация кода через наследование и модульность.",
         ],
         en: [
            "Organizing styles using nesting and mixins.",
            "Working with SCSS variables and functions.",
            "Code optimization through inheritance and modularity.",
         ],
      },
   },
   {
      title: "Javascript",
      level: {
         ru: "Базовый",
         en: "Basic",
      },
      icon: "javascript-colored.svg#javascript-colored",
      skills: {
         ru: [
            "Работа с DOM: манипуляции, события.",
            "Написание клиентской логики и модульного кода.",
            "Асинхронное программирование: Promises, async/await.",
            "Использование веб-API: Geolocation, Fetch, File API.",
         ],
         en: [
            "Working with DOM: manipulation, events.",
            "Writing client-side logic and modular code.",
            "Asynchronous programming: Promises, async/await.",
            "Using Web APIs: Geolocation, Fetch, File API.",
         ],
      },
   },
   {
      title: "GIT",
      level: {
         ru: "Базовый",
         en: "Basic",
      },
      icon: "git.svg#git",
      skills: {
         ru: [
            "Управление версиями кода: commit, branch, merge.",
            "Работа с удалёнными репозиториями: pull, push, rebase.",
         ],
         en: [
            "Version control: commit, branch, merge.",
            "Working with remote repositories: pull, push, rebase.",
         ],
      },
   },
   {
      title: "Figma",
      level: {
         ru: "Базовый",
         en: "Basic",
      },
      icon: "figma.svg#figma",
      skills: {
         ru: [
            "Работа с макетами и прототипами интерфейсов.",
            "Создание интерактивных элементов и анимаций.",
            "Экспорт ресурсов для разработки.",
         ],
         en: [
            "Working with layouts and interface prototypes.",
            "Creating interactive elements and animations.",
            "Exporting resources for development.",
         ],
      },
   },
   {
      title: "React",
      level: {
         ru: "Обучение",
         en: "Learning",
      },
      icon: "react.svg#react",
      skills: {
         ru: [
            "Разработка компонентов на функциональной и классовой основе.",
            "Использование хуков: useState, useEffect, useContext.",
            "Оптимизация приложений через мемоизацию и lazy-loading.",
         ],
         en: [
            "Developing functional and class-based components.",
            "Using hooks: useState, useEffect, useContext.",
            "Optimizing applications through memoization and lazy-loading.",
         ],
      },
   },
   {
      title: "Typescript",
      level: {
         ru: "Обучение",
         en: "Learning",
      },
      icon: "typescript-colored.svg#typescript-colored",
      skills: {
         ru: [
            "Создание типизированного кода для повышения надежности.",
            "Использование интерфейсов, дженериков и утилит типов.",
            "Настройка строгой типизации и компиляции.",
         ],
         en: [
            "Creating typed code for improved reliability.",
            "Using interfaces, generics, and utility types.",
            "Configuring strict typing and compilation.",
         ],
      },
   },
];
