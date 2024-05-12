"use strict"

const challenges_data = new ChallengesData()
const solution_preview = new SolutionPreview()
const challenges_preview = new ChallengesList()

hljs.highlightAll()

function loadHTML(html_path, container) {
  fetch(html_path)
    .then((response) => response.text())
    .then((text) => (container.innerHTML = text))
}
