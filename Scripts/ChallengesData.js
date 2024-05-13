"use strict"

class ChallengesData {
  static data_1kyu = []
  static data_2kyu = []
  static data_3kyu = []
  static data_4kyu = []
  static data_5kyu = []
  static data_6kyu = []
  static data_7kyu = []
  static data_8kyu = []

  constructor() {
    ChallengesData.data_1kyu = this.getChallengesData(1, challenges_1kyu_data, languages_data)
    ChallengesData.data_2kyu = this.getChallengesData(2, challenges_2kyu_data, languages_data)
    ChallengesData.data_3kyu = this.getChallengesData(3, challenges_3kyu_data, languages_data)
    ChallengesData.data_4kyu = this.getChallengesData(4, challenges_4kyu_data, languages_data)
    ChallengesData.data_5kyu = this.getChallengesData(5, challenges_5kyu_data, languages_data)
    ChallengesData.data_6kyu = this.getChallengesData(6, challenges_6kyu_data, languages_data)
    ChallengesData.data_7kyu = this.getChallengesData(7, challenges_7kyu_data, languages_data)
    ChallengesData.data_8kyu = this.getChallengesData(8, challenges_8kyu_data, languages_data)
  }

  getChallengesData(kyu, challenges, languages) {
    const challenges_data = []

    challenges.forEach((challenge) => {
      const challenge_data = {}

      challenge_data.name = challenge.name
      challenge_data.link = challenge.link
      challenge_data.kyu = kyu

      challenge_data.languages = []

      challenge_data.links = {
        instructions: this.createInstructionsLink(kyu, challenge.name),
        descriptions: [],
        codes: [],
      }

      challenge.languages.map((lang_id) => {
        challenge_data.languages.push(languages[lang_id])
        challenge_data.links.descriptions.push(this.createDescriptionLink(kyu, challenge.name, languages[lang_id]))
        challenge_data.links.codes.push(this.createCodeLink(kyu, challenge.name, languages[lang_id]))
      })

      challenges_data.push(challenge_data)
    })

    return challenges_data
  }

  createInstructionsLink(kyu, name) {
    const level_folder = `${kyu}kyu`
    const solution_folder = name.toLowerCase().replaceAll(" ", "_").match(/[1-9a-z_]/g).join("");

    return `Challenges/${level_folder}/${solution_folder}/instructions.html`
  }

  createDescriptionLink(kyu, name, language_data) {
    const level_folder = `${kyu}kyu`
    const solution_folder = name.toLowerCase().replaceAll(" ", "_").match(/[1-9a-z_]/g).join("");
    const language_folder = language_data.folder_name

    return `Challenges/${level_folder}/${solution_folder}/${language_folder}/description.html`
  }

  createCodeLink(kyu, name, language_data) {
    const level_folder = `${kyu}kyu`
    const solution_folder = name.toLowerCase().replaceAll(" ", "_").match(/[1-9a-z_]/g).join("");
    const language_folder = language_data.folder_name
    const file_extension = language_data.file_extension

    return `Challenges/${level_folder}/${solution_folder}/${language_folder}/solution.${file_extension}`
  }
}

const challenges_data = new ChallengesData()
