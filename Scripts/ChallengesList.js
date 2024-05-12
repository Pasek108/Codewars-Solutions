"use strict"

class ChallengesList {
  constructor() {
    this.container = document.querySelector(".challenges-select")

    this.solution_content = document.querySelector(".solution-content")
    this.challenges_select = document.querySelector(".challenges-select")

    this.show_challenges_button = document.querySelector(".show-challenges")
    this.show_challenges_button.addEventListener("click", () => {
      if (this.solution_content.hasAttribute("hidden")) {
        this.solution_content.removeAttribute("hidden")
        this.challenges_select.setAttribute("hidden", true)
      } else {
        this.solution_content.setAttribute("hidden", true)
        this.challenges_select.removeAttribute("hidden")
      }
    })

    /* ------------------------- choosing project ------------------------- */
    this.projects = this.container.querySelectorAll("li")
    this.projects.forEach((project) => project.addEventListener("click", this.loadProject.bind(this)))

    /* ------------------------- choosing catregory ------------------------- */
    this.indicator = this.container.querySelector(".difficulties .indicator")
    this.difficulties = this.container.querySelectorAll(".difficulty")
    this.difficulties.forEach((difficulty) => difficulty.addEventListener("click", this.loadDifficulty.bind(this)))
  }

  loadProject(evt) {
    this.projects.forEach((project) => project.classList.remove("active"))
    evt.currentTarget.classList.add("active")
  }

  loadDifficulty(evt) {
    this.indicator.style.translate = `${+evt.currentTarget.dataset.id * 4.25}rem`
  }
}
