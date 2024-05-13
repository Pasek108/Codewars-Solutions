"use strict"

const default_solution_data = {
  name: "Simple Interactive Interpreter",
  link: "https://www.codewars.com/kata/52ffcfa4aff455b3c2000750",
  kyu: 1,
  links: {
    instructions: "Challenges/1kyu/simple_interactive_interpreter/instructions.html",
    descriptions: ["Challenges/1kyu/simple_interactive_interpreter/javascript/description.html"],
    codes: ["Challenges/1kyu/simple_interactive_interpreter/javascript/solution.js"],
  },
  languages: [
    {
      full_name: "JavaScript",
      folder_name: "javascript",
      hilighter_name: "javascript",
      file_extension: "js",
      kyu: 3,
    },
  ],
}

const solution_preview = new SolutionPreview()
solution_preview.loadSolution(default_solution_data, 0)

function loadHTML(html_path, container) {
  fetch(html_path)
    .then((response) => response.text())
    .then((text) => (container.innerHTML = text))
}
