import { useState } from "react";
import SearchBar from "./searchPlayer";
import "../shared.css";
import NavigationBar from "./../NavigationBar/navBar";
import StatsComponent from "./solostatsComponent";

function PUBGStats() {
  //different stats that will be set whenever a new name is entered
  const [name, setName] = useState("");
  const [displayName, setdisplayName] = useState("");
  //indicates whether or not a search has been made to diplay stats
  const [search, setSearch] = useState(false);
  //SOLO STATS
  var winlossratio;
  const [soloKills, setsoloKills] = useState(0);
  const [soloWins, setsoloWins] = useState(0);
  const [solowinLoss, setsoloWLRatio] = useState(0);
  const [soloAssists, setsoloAssists] = useState(0);
  const [soloTopTen, setsoloTopTen] = useState(0);
  const [soloSuicide, setsoloSuicide] = useState(0);

  //SOLOFPP STATS
  var soloFPPwinlossRatio;
  const [soloFPPKills, setsoloFPPKills] = useState(0);
  const [soloFPPWins, setsoloFPPWins] = useState(0);
  const [soloFPPwinLoss, setsoloFPPWLRatio] = useState(0);
  const [soloFPPAssists, setsoloFPPAssists] = useState(0);
  const [soloFPPTopTen, setsoloFPPTopTen] = useState(0);
  const [soloFPPSuicide, setsoloFPPSuicide] = useState(0);

  const [error, setError] = useState(false);

  const handleClick = () => {
    //GET ID
    //then() function is like a chain
    //first, fetch data in string from from api
    fetch(
      `https://api.pubg.com/shards/steam/players?filter[playerNames]=${name}`,
      {
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhNTNjNTJlMC1hNGE2LTAxM2EtZjMwZS0yYmJhOGI1OWNiNGMiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNjUwNjU4NDI5LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImdhbWVyZWFjaCJ9.Fja9Ktnp9-ZUZWzTiJSYkAH3JuN7XUK7VFhkWOJuPDE",
          Accept: "application/vnd.api+json",
        },
      }
    )
      //then, response parameter holds the string. afterwards, response.json() turns it into a json that we can use
      .then((response) => response.json())
      //then, data now holds response.json() (like chain link system); we can use data to manage our data and get the player id
      .then((data) => {
        const id = data.data[0].id;
        console.log(id);
        //using player id, get individual lifetime stats from API
        fetch(
          `https://api.pubg.com/shards/steam/players/${id}/seasons/lifetime?filter[gamepad]=false`,
          {
            headers: {
              Authorization:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhNTNjNTJlMC1hNGE2LTAxM2EtZjMwZS0yYmJhOGI1OWNiNGMiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNjUwNjU4NDI5LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImdhbWVyZWFjaCJ9.Fja9Ktnp9-ZUZWzTiJSYkAH3JuN7XUK7VFhkWOJuPDE",
              Accept: "application/vnd.api+json",
            },
          }
        )
          //now response holds the lifetime stats data. do response.json to turn it into json
          .then((response) => response.json())
          //data now holds json
          .then((data) => {
            //use the data

            //SOLO DATA
            const soloData = data.data.attributes.gameModeStats.solo;
            //console.log(soloData);
            setsoloKills(soloData.kills);
            setsoloWins(soloData.wins);
            winlossratio = soloData.wins / soloData.losses;
            setsoloWLRatio(Math.round(100 * winlossratio)/100);
            setsoloAssists(soloData.assists);
            setsoloTopTen(soloData.top10s);
            setsoloSuicide(soloData.suicides);


            //SOLO FPP DATA
            const soloFPPData = data.data.attributes.gameModeStats["solo-fpp"];
            setsoloFPPKills(soloFPPData.kills);
            setsoloFPPWins(soloFPPData.wins);
            soloFPPwinlossRatio = soloFPPData.wins/soloFPPData.losses;
            setsoloFPPWLRatio(Math.round(100 * soloFPPwinlossRatio)/100);
            setsoloFPPAssists(soloFPPData.assists);
            setsoloFPPTopTen(soloFPPData.top10s);
            setsoloFPPSuicide(soloFPPData.suicides);
            console.log(soloFPPData);


            setError(false);
            setSearch(true);
            setdisplayName(name);
          });
      })
      //if dosent work, produce error message
      .catch((err) => setError(true));
  };

  return (
    <>
      <NavigationBar />
      <div className="background p-4">
        <div className="flex justify-center">
          <div className="flex">
            <SearchBar name={name} setName={setName} />
            <button
              className="bg-purple-600 px-4 py-2 rounded-sm hover:bg-purple-800 font-semibold"
              onClick={handleClick}
            >
              Search Players
            </button>
          </div>
        </div>

        {error ? (
          <h1 className="text-2xl text-red-600">Does Not Exist</h1>
        ) : (
          <>
            <br/>
            <h1 className = "flex justify-center text-violet-500 font-bold font-mono">Showing Stats for {displayName}</h1>
            <br />
            <br />
            <StatsComponent kills={soloKills} wins = {soloWins} wLratio = {solowinLoss} assists = {soloAssists} topten = {soloTopTen} suicides = {soloSuicide} statName = "Solo"/>
            <br/>
            <StatsComponent kills={soloFPPKills} wins = {soloFPPWins} wLratio = {soloFPPwinLoss} assists = {soloFPPAssists} topten = {soloFPPTopTen} suicides = {soloFPPSuicide} statName = "Solo FPP"/>
          </>
        )}

        <br />
      </div>
    </>
  );
}

export default PUBGStats;

//(e) => return {fewhfiawuehfa}
//function (e) {
//     fwafwafaw
// }
