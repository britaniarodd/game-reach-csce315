import { useState } from "react";
import SearchBar from "./searchPlayer";
import "../shared.css";
import NavigationBar from "./../NavigationBar/navBar";
import StatsComponent from "./solostatsComponent";

function PUBGStats() {
  //different stats that will be set whenever a new name is entered
  const [name, setName] = useState("");

  //indicates whether or not a search has been made to diplay stats
  const [search, setSearch] = useState(false);
  //SOLO STATS
  var winlossratio;
  const [soloKills, setsoloKills] = useState(0);
  const [soloWins, setsoloWins] = useState(0);
  const [solowinLoss, setsoloWLRatio] = useState(0);
  const [soloAssists, setsoloAssists] = useState(0);
  const [soloTopTen, setsoloTopTen] = useState(0);

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
            const soloData = data.data.attributes.gameModeStats.solo;
            console.log(soloData);
            setsoloKills(soloData.kills);
            setsoloWins(soloData.wins);
            winlossratio = soloData.wins / soloData.losses;
            setsoloWLRatio(winlossratio);
            setsoloAssists(soloData.assists);
            setsoloTopTen(soloData.top10s);
            setError(false);
            setSearch(true);
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
            <br />
            <StatsComponent kills={soloKills} wins = {soloWins} wLratio = {solowinLoss} assists = {soloAssists} topten = {soloTopTen}/>
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
