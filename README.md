<h1 align="center">Codewars-Solutions - Readme</h1>
<p align="center">
  <strong>
    My solutions with descriptions for <a href="https://www.codewars.com">Codewars</a> challenges
  </strong>
</p>
<div align="center">
  <a href="https://www.codewars.com">
    <img src="_for_readme/banner.jpg">
  </a>
</div>

<br>

> [!CAUTION]  
> <h4>Please, don't look at my solutions until you have completed it yourself.</h4>
> Challenges like these are an opportunity to improve by coming up with your own solutions. Take your time and think about your approach.  
> If you can't complete a challenge, skip it and come back to it later. Only look at someone else's solutions as a last resort, and treat it as a learning opportunity rather than a defeat.

<!--
<br>

# Table of Contents
* [Codewars :thinking:](#codewars-thinking)
  * [What is it](#what-is-it)
  * [Is it worth playing](#is-it-worth-playing)
  * [Useful links](#useful-links)
* [Overview :sparkles:](#overview-sparkles)
  * [About](#about)
  * [Technologies](#technologies)
  * [Features](#features)
  * [Copyright](#copyright-copyright)
* [Details :scroll:](#details-scroll)
  * [User interface](#user-interface)
  * [Project structure](#project-structure)
  * [Code organization](#code-organization)

<br>

# Codewars :thinking:

## What is it
[CSSBattle](https://cssbattle.dev) is an online game where players compete with each other to create the shortest and most effective CSS code to recreate visual shapes and patterns. 
CSSBattle is a fun and challenging way to improve CSS coding skills while competing with other players. It is the first ever code-golfing platform for CSS lovers. 

## Is it worth playing
Playing the game helps to better understand CSS and gives opportunity to use properties that are rarely used, but to climb the leaderboards it requires to exploit how HTML and CSS are parsed by browsers, therefore the code written here is not the way anyone would write it in a real project. 

## Useful links
- [CSSBattle Previewer 2.1](https://tc70f3.csb.app)
- [CSSBattle Unit Converter](https://u9kels.csb.app)
- [CSSBattle getting started](https://cssbattle.dev/blog/getting-started)
- [CSSBattle tips](https://cssbattle.dev/tips)

<br>

# Overview :sparkles:

## About
The project is a showcase of my solutions for [Codewars](https://www.codewars.com) challanges. Each solution contains an image that I had to recreate, as well as my normal and minimal solutions that accomplish this task. 

Check out the [live version](https://pasek108.github.io/Codewars-Solutions/) of this project, as well as my [Codewars profile](https://www.codewars.com/users/Artur%20Pas).

![preview](/_for_readme/preview.png)

## Technologies
Languages:
- HTML
- CSS
- JS
  
Libraries and frameworks:
- [GoogleFonts](https://fonts.google.com)
- [hilight.js](https://highlightjs.org)

Programs:
- [VSCode](https://code.visualstudio.com)

## Features
- Well-organized challenges files
- Nice and responsive UI
- Solution preview
  - Code highlighting
  - Character counter
  - Loading real HTML for preview
  - Switching between solutions
- List of challenges
  - Selecting a challenge to preview
  - Grouping by battle
  - Disabling unattempted challenges

## Copyright :copyright:
I do not own the rights to the content of the challenges. All challenge data was downloaded and included only to provide context for the solutions.

<br>

# Details :scroll:

## User interface

### Solution preview
![solution preview](/_for_readme/solution_preview.png)
Solution preview has 3 sections:
- Code section shows:
  - Hilighted code
  - Characters count
- Preview section shows:
  - Real html solution
  - Switch between solutions
- Target section shows:
  - Image target to recreate
  - Links to challenge and battle
  - Solution match precentage

### Challenges list
![challenges list](/_for_readme/challenges_list.png)
Challenges list view shows all challenges grouped by battle in increasing order. 

The challenges are numbered and can be in disbaled state that means I didn't attempt the challenge yet.

## Project structure
- :file_folder: CSSBattle-Solutions (project folder)
  - :page_facing_up: *github config*
  - :page_facing_up: *readme file*
  - :page_facing_up: *index.html file*
  - :file_folder: _for_readme - :page_facing_up: *files for readme*
  - :file_folder: Images - :page_facing_up: *images used in the project*
  - :file_folder: Scripts - :page_facing_up: *scripts used in project*
  - :file_folder: Styles - :page_facing_up: *css files used in project*
  - :file_folder: Challenges
    - :file_folder: *challenge_name*
      - :page_facing_up: *.png target to recretae*
      - :page_facing_up: *.html normal solution*
      - :page_facing_up: *.html minimal solution*
    - :file_folder: *other challenges...*

## Code organization
![program diagram](/_for_readme/program_diagram.png)

> [!WARNING]  
> Classes must be loaded from bottom to the top to avoid situation when class does not exist in the time of its objects creation

### script.js
This is the starting file of the program. 

Contains the required data of challenges and battles:
- challenges [solved, folder_name, match_precentage]
- battles [battle_name, last_challenge_id]

Creates:
- ChallengesData
- SolutionPreview 

### ChallengesData
Takes required data of challenges and battles and then:
- Creates array of challenges objects with challenge data and links to its resources
- Creates array of battles objects with with battle data and links to its resources
- Connects challenges to the battles which they are part of

### SolutionPreview
Takes ChallengesData object, creates ChallengesList and is responsible for:
- Loading solution 
- Counting solution length
- Hilighting code
- Switching between normal and minimal solution

### ChallengesList
Takes ChallengesData and  SolutionPreview objects and is responsible for:
- Creating list of challenges grouped by battle 
- Toggling list of all challenges
- Initializing the loading of another challenge solution preview
-->
