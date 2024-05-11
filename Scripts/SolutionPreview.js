"use strict"

class SolutionPreview {
  constructor() {
    this.container = document.querySelector(".solution-content")

    this.instructions_container = this.container.querySelector(".instructions")
    this.description_container = this.container.querySelector(".description")

    // info title
    this.kyu_container = this.container.querySelector(".kyu")
    this.title_container = this.container.querySelector("header a")

    // info tabs
    this.instructions_tab = document.querySelector(".instructions-tab")
    this.instructions_tab.addEventListener("click", () => this.switchTab("instructions"))

    this.description_tab = document.querySelector(".description-tab")
    this.description_tab.addEventListener("click", () => this.switchTab("description"))

    // language
    this.language_select = new SolutionLanguageSelect()
    this.language_select.createLanguagesList(["JavaScript", "Python", "Haskell"])
  }

  loadSolution(solution_data) {
    this.setKyu(solution_data.kyu)
    this.setTitle(solution_data.link, solution_data.name)

    this.language_select.createLanguagesList(solution_data.languages)

    loadHTML(solution_data.instructions_link, this.instructions_container)
    loadHTML(solution_data.description_link, this.description_container)
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
