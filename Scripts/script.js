"use strict"

const solution_content = document.querySelector(".solution-content")
const challenges_select = document.querySelector(".challenges-select")

/* ------------------------- open challeneges ------------------------- */
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
