"use strict"

class SolutionLanguageSelect {
  constructor(loadSolutionLanguage) {
    this.loadSolutionLanguage = loadSolutionLanguage

    this.current_solution = null
    this.current_language = null
    this.is_hidden = true

    this.container = document.querySelector(".language-select")
    document.addEventListener("click", this.hideOnClickOutdise.bind(this))

    this.current_language_container = this.container.querySelector(".current-language")
    this.current_language_container.addEventListener("click", this.toggleLanguagesList.bind(this))

    this.languages_list_container = this.container.querySelector(".languages-list")
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

  changeLanguage(lang_id) {
    this.current_language = this.current_solution.languages[lang_id]

    this.loadSolutionLanguage(this.current_solution, lang_id)

    const current_language = this.createLanguageOption(this.current_language)
    this.current_language_container.innerHTML = current_language.innerHTML

    this.hideLanguagesList()
  }

  createLanguagesList(solution_data) {
    this.current_solution = solution_data
    this.current_language = solution_data.languages[0]

    const current_language = this.createLanguageOption(this.current_language)
    this.current_language_container.innerHTML = current_language.innerHTML

    this.languages_list_container.innerHTML = ""

    for (let i = 0; i < solution_data.languages.length; i++) {
      const language_option = this.createLanguageOption(solution_data.languages[i])
      if (i === 0) language_option.className = "language active"

      language_option.addEventListener("click", (evt) => this.selectLanguage(evt, i))

      this.languages_list_container.appendChild(language_option)
    }
  }

  selectLanguage(evt, lang_id) {
    if (this.current_language === this.current_solution.languages[lang_id]) {
      this.hideLanguagesList()
      return
    }

    const active_language_option = this.languages_list_container.querySelector(".active")
    active_language_option.classList.remove("active")

    evt.currentTarget.classList.add("active")

    this.changeLanguage(lang_id)
  }

  createLanguageOption(language) {
    const language_option = document.createElement("div")
    language_option.className = "language"

    const logo = document.createElement("img")
    logo.className = `${language.folder_name}-logo`
    logo.src = `/Images/${language.folder_name}_logo.svg`
    logo.alt = `${language.folder_name} logo`

    const name = document.createElement("span")
    name.className = "name"
    name.textContent = language.full_name

    language_option.appendChild(logo)
    language_option.appendChild(name)

    return language_option
  }
}
