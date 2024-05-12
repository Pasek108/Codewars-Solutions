"use strict"

class SolutionLanguageSelect {
  constructor(languages_list, loadSolutionLanguage) {
    this.languages_list = languages_list
    this.loadSolutionLanguage = loadSolutionLanguage

    this.current_language = languages_list[0]
    this.is_hidden = true

    this.container = document.querySelector(".langauge-select")
    document.addEventListener("click", this.hideOnClickOutdise.bind(this))

    this.current_language_container = this.container.querySelector(".current-language")
    this.current_language_container.addEventListener("click", this.toggleLanguagesList.bind(this))

    this.languages_list_container = this.container.querySelector(".languages-list")
    this.createLanguagesList(languages_list)
  }

  showLanguagesList() {
    this.is_hidden = false
    this.languages_list_container.removeAttribute("hidden")
  }

  hideLanguagesList() {
    this.is_hidden = true
    this.languages_list_container.setAttribute("hidden", true)
  }

  toggleLanguagesList() {
    if (this.is_hidden) this.showLanguagesList()
    else this.hideLanguagesList()
  }

  hideOnClickOutdise(evt) {
    if (this.is_hidden) return
    if (!this.container.contains(evt.target)) this.hideLanguagesList()
  }

  changeLanguage(language) {
    this.loadSolutionLanguage(language)

    const current_language = this.createLanguageOption(language)
    this.current_language_container.innerHTML = current_language.innerHTML

    this.hideLanguagesList()
  }

  createLanguagesList(languages_list) {
    // current language
    const current_language = this.createLanguageOption(languages_list[0])
    this.current_language_container.innerHTML = current_language.innerHTML

    // languages options
    this.languages_list_container.innerHTML = ""

    for (let i = 0; i < languages_list.length; i++) {
      const langauge_option = this.createLanguageOption(languages_list[i])
      if (i === 0) langauge_option.className = "language active"

      langauge_option.addEventListener("click", (evt) => {
        this.languages_list_container.querySelector(".active").classList.remove("active")
        evt.currentTarget.classList.add("active")
        this.changeLanguage(languages_list[i])
      })

      this.languages_list_container.appendChild(langauge_option)
    }
  }

  createLanguageOption(language_name) {
    let lowercase_name = language_name.toLowerCase()
    lowercase_name = lowercase_name.replaceAll("+", "plus")
    lowercase_name = lowercase_name.replaceAll("#", "sharp")

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
