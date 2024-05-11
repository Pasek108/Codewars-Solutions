"use strict"

class SolutionLanguageSelect {
  constructor() {
    this.container = document.querySelector(".langauge-select")

    this.current_language = this.container.querySelector(".current-language")
    this.languages_list = this.container.querySelector(".languages-list")

    this.current_language.addEventListener("click", () => {
      if (this.languages_list.hasAttribute("hidden")) {
        this.languages_list.removeAttribute("hidden")
      } else {
        this.languages_list.setAttribute("hidden", true)
      }
    })
  }

  createLanguagesList(languages_list) {
    // current language
    const current_language = this.createLanguageOption(languages_list[0])
    this.current_language.innerHTML = current_language.innerHTML

    // languages options
    this.languages_list.innerHTML = ""

    for (let i = 0; i < languages_list.length; i++) {
      const langauge_option = this.createLanguageOption(languages_list[i])
      if (i === 0) langauge_option.className = "language active"
      this.languages_list.appendChild(langauge_option)
    }
  }

  createLanguageOption(language_name) {
    const lowercase_name = language_name.toLowerCase()

    const language = document.createElement("div")
    language.className = "language"

    const logo = document.createElement("img")
    logo.className = `${lowercase_name}-logo`
    logo.src = `/Images/${lowercase_name}_logo.svg`
    logo.alt = `${lowercase_name} logo`

    const name = document.createElement("span")
    name.className = "name"
    name.textContent = language_name

    language.appendChild(logo)
    language.appendChild(name)

    return language
  }
}
