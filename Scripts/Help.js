"use strict"

class Help {
  constructor() {
    this.container = document.querySelector(".help-content")

    this.help_button = document.querySelector(".help-button")
    this.help_button.addEventListener("click", () => this.switchHelp(this.container.hasAttribute("hidden")))

    this.tabs = this.container.querySelectorAll(".tab-select .tab")
    this.tabs.forEach((tab, index) => tab.addEventListener("click", () => this.switchTab(index)))

    this.sections = this.container.querySelectorAll(".section")
  }

  switchHelp(show) {
    if (show) this.container.removeAttribute("hidden")
    else this.container.setAttribute("hidden", true)
  }

  switchTab(tab_id) {
    this.sections.forEach((section) => section.setAttribute("hidden", true))
    this.sections[tab_id].removeAttribute("hidden")

    this.tabs.forEach((tab) => tab.classList.remove("active"))
    this.tabs[tab_id].classList.add("active")
  }
}

const help = new Help()
