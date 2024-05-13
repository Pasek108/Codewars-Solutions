"use strict"

class ChallengesList {
  constructor() {
    this.container = document.querySelector(".challenges-select")

    this.current_language_id = 0
    this.current_difficulty_id = 0

    this.solution_content = document.querySelector(".solution-content")
    this.challenges_select = document.querySelector(".challenges-select")

    this.show_challenges_button = document.querySelector(".show-challenges")
    this.show_challenges_button.addEventListener("click", this.switchChallengesList.bind(this))

    /* ------------------------- challenges list ------------------------- */
    this.challenges_lists = this.container.querySelectorAll(".list")

    this.createListElement(ChallengesData.data_1kyu, this.challenges_lists[0])
    this.createListElement(ChallengesData.data_2kyu, this.challenges_lists[1])
    this.createListElement(ChallengesData.data_3kyu, this.challenges_lists[2])
    this.createListElement(ChallengesData.data_4kyu, this.challenges_lists[3])
    this.createListElement(ChallengesData.data_5kyu, this.challenges_lists[4])
    this.createListElement(ChallengesData.data_6kyu, this.challenges_lists[5])
    this.createListElement(ChallengesData.data_7kyu, this.challenges_lists[6])
    this.createListElement(ChallengesData.data_8kyu, this.challenges_lists[7])

    /* ------------------------- languages ------------------------- */
    this.active_langauge_name = this.container.querySelector(".active-language .language-name")
    this.active_langauge_count = this.container.querySelector(".active-language .count")

    this.no_data_in_group = this.container.querySelectorAll(".no-data")
    this.languages_groups = languages_data.map((lang) => {
      return this.container.querySelectorAll(`.challenge.${lang.folder_name}`)
    })

    this.languages_options = this.container.querySelectorAll("li")
    this.languages_options.forEach((lang_option, index) => {
      lang_option.addEventListener("click", () => this.showLanguage(index))
    })

    this.languages_count = this.container.querySelectorAll("li span.count")
    this.languages_count.forEach((count, index) => {
      const lang_name = languages_data[index].folder_name
      const problems_solved = this.container.querySelectorAll(`.challenge.${lang_name}`).length
      count.innerHTML = problems_solved
    })

    /* ------------------------- difficulty ------------------------- */
    this.indicator = this.container.querySelector(".difficulties .indicator")

    this.difficulties = this.container.querySelectorAll(".difficulty")
    this.difficulties.forEach((difficulty, index) => {
      difficulty.addEventListener("click", () => this.showDifficulty(index))
    })
  }

  switchChallengesList() {
    let show = this.challenges_select
    let hide = this.solution_content

    if (this.solution_content.hasAttribute("hidden")) [show, hide] = [hide, show]

    show.removeAttribute("hidden")
    hide.setAttribute("hidden", true)
  }

  showLanguage(lang_id) {
    if (this.current_language_id === lang_id) return

    this.languages_groups[this.current_language_id].forEach((lang) => lang.setAttribute("hidden", true))
    this.languages_groups[lang_id].forEach((lang) => lang.removeAttribute("hidden"))

    this.languages_options.forEach((language) => language.classList.remove("active"))
    this.languages_options[lang_id].classList.add("active")

    this.active_langauge_name.innerHTML = languages_data[lang_id].full_name

    this.current_language_id = lang_id
    this.current_difficulty_id = -1

    this.showDifficulty(0)
  }

  showDifficulty(difficulty_id) {
    if (this.current_difficulty_id === difficulty_id) return

    const indicator_width = 4.25
    this.indicator.style.translate = `${difficulty_id * indicator_width}rem`

    this.challenges_lists.forEach((list) => list.setAttribute("hidden", true))
    this.challenges_lists[difficulty_id].removeAttribute("hidden")

    const lang_name = languages_data[this.current_language_id].folder_name
    const items_count = this.challenges_lists[difficulty_id].querySelectorAll(`.challenge.${lang_name}:not([hidden])`).length

    this.no_data_in_group.forEach((no_data) => no_data.setAttribute("hidden", true))
    if (items_count === 0) this.no_data_in_group[difficulty_id].removeAttribute("hidden")

    this.active_langauge_count.innerHTML = items_count

    this.current_difficulty_id = difficulty_id
  }

  createListElement(challenges_data, list_container) {
    challenges_data.forEach((solution_data) => {
      const challenge_item = document.createElement("div")

      challenge_item.classList.add("challenge")
      solution_data.languages.forEach((lang) => challenge_item.classList.add(lang.folder_name))

      challenge_item.addEventListener("click", () => this.loadSolution(solution_data))
      challenge_item.innerHTML = solution_data.name

      if (!challenge_item.classList.contains("javascript")) {
        challenge_item.setAttribute("hidden", true)
      }

      list_container.appendChild(challenge_item)
    })
  }

  loadSolution(solution_data) {
    solution_preview.loadSolution(solution_data, this.current_language_id)
    this.switchChallengesList()
  }
}

const challenges_list = new ChallengesList()
