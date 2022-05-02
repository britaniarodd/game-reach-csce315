import React from "react";
import "../shared.css";
import NavigationBar from "./../NavigationBar/navBar";
import "./AboutGameReach.css";
import gameReachLogo from "./Reach_heading_logo.png";

function AboutPage() {
  return (
    <React.Fragment>
      <NavigationBar />
      <div className="background p-16">
        <div id="container">
          <h1 className="text-purple-400 underline">
            EVOLVE YOUR <br />
            GAMING EXPERIENCE
          </h1>
          <img
            className="headinglogo"
            src={gameReachLogo}
            alt="Heading logo with the words Game Reach"
          ></img>
        </div>
        <br />
        <h3 className="italic text-purple-400">
          "I have found my limit a thousand times, and I still press further" ~
          Pantheon, League of Legends
        </h3>
        <br />
        <br />
        <br />
        <p className="px-20 text-lg">
          You’ve been there. We’ve been there. You start a new multiplayer game
          and starting just seems impossible. You don't understand its mechanics
          and you are afraid of letting your teammates down. Or you’re just so
          good at another game that finding a compatible team is hard to do.
          GameReach is an app designed to be catered to you, the player, and the
          teams that you will be playing with.
        </p>
        <br />
        <p className="px-20 text-lg">
          Find, Connect, and View different players for your specified video
          game. See a detailed list of their statistics and understand them and
          their playstyle before making connection choices. Do they play PUBG
          and like playing in 4-man squads? Stats indicate that they do not
          revive teammates… Nope!. Or how about League of Legends? Seems like
          they have a great win/loss ratio… Lets Connect!
        </p>
        <br />
        <p className="px-20 text-lg">
          GameReach alleviates the stresses that beginners and advanced gamers
          often endure, especially those without a large network to play with.
          By providing and displaying transparency amongst each gamer, you can
          recognize who and who aren’t good teammates to be with. Beginners can
          connect with other beginners and build a solid foundation together,
          learning and growing in healthy ways. Advanced players can do the same
          with other advanced players, allowing room for more growth when it
          seems impossible.
        </p>
        <br />
        <p className="px-20 text-lg">
          Found a team already? Or are you a beginner seeking mentorship from a
          gamer of extensive knowledge? Change your status to “Open”, “Closed”,
          or “Open to mentoring” to let others know your status. What’s your
          Discord? Display your name and tag, and customize your profile in
          different ways.
        </p>
        <br />
        <p className="px-20 text-lg">
          It is your choice and your path to create the ultimate team for your
          personal journey. And that journey starts here, with GameReach!
        </p>
      </div>
    </React.Fragment>
  );
}

export default AboutPage;
