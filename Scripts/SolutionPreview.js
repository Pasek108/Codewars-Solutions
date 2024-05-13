"use strict"

class SolutionPreview {
  constructor() {
    this.container = document.querySelector(".solution-content")

    this.instructions_container = this.container.querySelector(".instructions")
    this.description_container = this.container.querySelector(".description")

    /* ------------------------- fullscreen ------------------------- */
    this.sections = [this.container.querySelector(".info"), this.container.querySelector(".solution")]

    this.fullscreen_buttons = this.container.querySelectorAll(".fullscreen-button")
    this.fullscreen_buttons[0].addEventListener("click", () => this.toggleFullscreen(0))
    this.fullscreen_buttons[1].addEventListener("click", () => this.toggleFullscreen(1))

    /* ------------------------- info title ------------------------- */
    this.kyu_container = this.container.querySelector(".kyu")
    this.title_container = this.container.querySelector("header a")

    /* ------------------------- info tabs ------------------------- */
    this.instructions_tab = document.querySelector(".instructions-tab")
    this.instructions_tab.addEventListener("click", () => this.switchTab("instructions"))

    this.description_tab = document.querySelector(".description-tab")
    this.description_tab.addEventListener("click", () => this.switchTab("description"))

    /* ------------------------- language ------------------------- */
    this.language_select = new SolutionLanguageSelect(this.loadSolutionLanguage.bind(this))

    /* ------------------------- code ------------------------- */
    this.code_container = this.container.querySelector(".code")
    this.code = this.code_container.querySelector("code")
  }

  toggleFullscreen(section_id) {
    const target = this.fullscreen_buttons[section_id]
    const container = this.sections[section_id]

    if (target.src.includes("fullscreen")) {
      target.src = target.src.replace("fullscreen", "offscreen")
      container.classList.add("fullscreen")
    } else {
      target.src = target.src.replace("offscreen", "fullscreen")
      container.classList.remove("fullscreen")
    }
  }

  loadSolution(solution_data, language_id) {
    this.setKyu(solution_data.kyu)
    this.setTitle(solution_data.link, solution_data.name)

    loadHTML(solution_data.links.instructions, this.instructions_container)

    const lang_id = language_id == 0 ? 0 : solution_data.languages.findIndex((lang) => lang === languages_data[language_id])

    this.language_select.createLanguagesList(solution_data, lang_id)
    this.loadSolutionLanguage(solution_data, lang_id)

    this.switchTab("instructions")
  }

  loadSolutionLanguage(solution_data, lang_id) {
    loadHTML(solution_data.links.descriptions[lang_id], this.description_container)
    this.loadCode(solution_data.links.codes[lang_id], solution_data.languages[lang_id])
  }

  loadCode(file_path, language_data) {
    fetch(file_path)
      .then((response) => response.text())
      .then((text) => {
        this.code.className = `language-${language_data.hilighter_name}`
        this.code.innerHTML = text
        this.code.removeAttribute("data-highlighted")
        hljs.highlightElement(this.code)
      })
  }

  switchTab(tab) {
    let show = [this.instructions_tab, this.instructions_container]
    let hide = [this.description_tab, this.description_container]

    if (tab == "description") [show, hide] = [hide, show]

    show[0].classList.add("active")
    show[1].removeAttribute("hidden")

    hide[0].classList.remove("active")
    hide[1].setAttribute("hidden", true)
  }

  setKyu(level) {
    let colors = ["purple", "blue", "yellow", "white"]

    this.kyu_container.className = `kyu kyu-${colors[Math.ceil(level / 2) - 1]}`
    this.kyu_container.innerHTML = `${level} kyu`
  }

  setTitle(link, title) {
    this.title_container.href = link
    this.title_container.innerHTML = title
  }
}
