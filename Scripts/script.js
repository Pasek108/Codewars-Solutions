"use strict"

/* ------------------------- open challeneges ------------------------- */
const solution_content = document.querySelector(".solution-content")
const challenges_select = document.querySelector(".challenges-select")

const show_challenges_button = document.querySelector(".show-challenges")
show_challenges_button.addEventListener("click", () => {
  if (solution_content.hasAttribute("hidden")) {
    solution_content.removeAttribute("hidden")
    challenges_select.setAttribute("hidden", true)
  } else {
    solution_content.setAttribute("hidden", true)
    challenges_select.removeAttribute("hidden")
  }
})

/* ------------------------- info tabs ------------------------- */
const instructions_tab = document.querySelector(".instructions-tab")
const description_tab = document.querySelector(".description-tab")

instructions_tab.addEventListener("click", () => {
  description_tab.classList.remove("active")
  instructions_tab.classList.add("active")
})

description_tab.addEventListener("click", () => {
  instructions_tab.classList.remove("active")
  description_tab.classList.add("active")
})

/* ------------------------- solution langauge ------------------------- */
const current_language = document.querySelector(".current-language")
const languages_list = document.querySelector(".languages-list")

current_language.addEventListener("click", () => {
  if (languages_list.hasAttribute("hidden")) {
    languages_list.removeAttribute("hidden")
  } else {
    languages_list.setAttribute("hidden", true)
  }
})

/* ------------------------- choosing project ------------------------- */
const projects = document.querySelectorAll("li")
projects.forEach((project) => project.addEventListener("click", loadProject))

function loadProject(evt) {
  projects.forEach((project) => project.classList.remove("active"))
  evt.currentTarget.classList.add("active")
}

/* ------------------------- choosing catregory ------------------------- */
const indicator = document.querySelector(".difficulties .indicator")
const difficulties = document.querySelectorAll(".difficulty")
difficulties.forEach((difficulty) => difficulty.addEventListener("click", loadDifficulty))

function loadDifficulty(evt) {
  indicator.style.translate = `${+evt.currentTarget.dataset.id * 4.25}rem`
}
