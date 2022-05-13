# Dim Souls

Imagine a game where the combat is forgiving and the boss fights are fun. Now set your standards way lower. Dim Souls, a completely unique game unlike anything else ever, sets our hero the "Picked-Posessed" against the toughest bad guys imaginable: Smashy and Stabby.

![wireframe](./img/wireframe%20%20dimsouls.jpg)

This top-down 2D action-game has the player control the Picked-Posessed, with the goal of defeating both Smashy and Stabby. In classic Dim Souls fashion, it wouldn't be a painful experience if you didn't have to fight both of them at the same time. While Smashy is slow, his giant hammer can destroy anything it touches. Stabby on the other hand is fast as lightning and will make it clear just how horrible the hitboxes are in this game. The player must use the layout of the room as well as the weaknesses of both boss's to their advantage in order to make it out alive!

## MVP

- Create fully functional player character as well as one boss complete with movement and attacks.
- Render boss room (complete with 6 pillars)
- Create hitbox detection for attacks
- Create win-condition for player by defeating both bosses, as well as a loss condition by being defeated.
- Use Javascript, html5, canvas.

## Stretch Goals

- Add second boss
- Render player and boss sprites as well as boss room background.
- Movement blocking collision with the boss room terrain
- Implement start screen
- Create online Co-op (????) with players controlling either the protagonist or either of the two bosses
- Create health bars for the player and the bosses
- Create healing items for the player
- Implement dodge ability for the player
- Have Smashy or Stabby become stronger once the other boss has been defeated.

## Post-Project Reflection

[Deployed URL](https://seiplet93.github.io/Dim-Souls/)
I used Javascript, HTML5, canvas, and some styling for this project so far. In this game you play as a character who's sole purpose is to defeat the AI enemy. I chose to make this project as a personal challenge, but also because I thought it would be fun to recreate a favorite game of mine into this style.
The game is in a functional state at the moment, but there are some things to fix. The rate at which the player and the AI attack is too fast. I've adjusted the rate at which health values are reduced because of this. I also need to implement collision to the border of the canvas as well as around the pillars in the boss room. This project was definitely a challenge I set for myself, and I think I did OK at accomplishing it. I learned a lot more about OOP (even though I'm still shaky on some concepts). My code is still an absolute mess, and cleaning it up will be the next step I take to make the project better. Adding in the second boss is after that. There is also an issue where performance is varying based on the PC the game is running on.

Sources:

- Chris Weaver: Sprite artwork for both bosses
- Za'hi Cartography: [Background image](https://www.patreon.com/posts/ornstein-and-50564364)
- Chris Courses: [Fighting game tutorial reference](https://www.youtube.com/watch?v=vyqbNFMDRGQ)
