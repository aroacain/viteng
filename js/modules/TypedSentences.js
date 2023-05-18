import Typed from "typed.js";

class TypedSentences {
  constructor() {
    const Typing = document.querySelector(".typing");

    if (Typing) {
      var typed = new Typed(".typing", {
        strings: [
          "Wordpress.",
          "CSS.",
          "Wordpress themes.",
          "PHP.",
          "Wordpress plugins.",
        ],
        typeSpeed: 100,
        backSpeed: 60,
        backDelay: 1500,
        loop: true,
      });
    }

    const Typing2 = document.querySelector(".typing-2");

    if (Typing2) {
      var typed2 = new Typed(".typing-2", {
        strings: [
          "Wordpress",
          "Full Stack",
          "Plugin",
          "Theme",
          "PHP",
          "bilingual",
        ],
        typeSpeed: 100,
        backSpeed: 60,
        backDelay: 1500,
        loop: true,
      });
    }
  }
}

export default TypedSentences;
