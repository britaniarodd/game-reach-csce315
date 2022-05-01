import { useState } from "react";
import SearchBar from "./searchPlayer";
import "../shared.css";
import "./pubgstatspage.css";
import NavigationBar from "./../NavigationBar/navBar";
import SoloStatsComponent from "./solostatsComponent";
import TeamStatsComponent from "./teamstatsComponent";
import pubglogo from "./pubg-logo.jpg";

function PUBGStats() {
  //different stats that will be set whenever a new name is entered
  const [name, setName] = useState("");
  const [displayName, setdisplayName] = useState("");
  //indicates whether or not a search has been made to diplay stats
  const [search, setSearch] = useState(false);
  //SOLO STATS
  var winlossratio;
  var soloKDratio;
  const [soloKills, setsoloKills] = useState(0);
  const [soloWins, setsoloWins] = useState(0);
  const [solowinLoss, setsoloWLRatio] = useState(0);
  const [soloAssists, setsoloAssists] = useState(0);
  const [soloTopTen, setsoloTopTen] = useState(0);
  const [soloSuicide, setsoloSuicide] = useState(0);
  const [soloKD, setsoloKD] = useState(0);

  //SOLOFPP STATS
  var soloFPPwinlossRatio;
  var soloFPPKDratio;
  const [soloFPPKills, setsoloFPPKills] = useState(0);
  const [soloFPPWins, setsoloFPPWins] = useState(0);
  const [soloFPPwinLoss, setsoloFPPWLRatio] = useState(0);
  const [soloFPPAssists, setsoloFPPAssists] = useState(0);
  const [soloFPPTopTen, setsoloFPPTopTen] = useState(0);
  const [soloFPPSuicide, setsoloFPPSuicide] = useState(0);
  const [soloFPPKD, setsoloFPPKD] = useState(0);

  //DUO STATS
  var duowinlossRatio;
  var duoKDratio;
  const [duoKills, setduoKills] = useState(0);
  const [duoWins, setduoWins] = useState(0);
  const [duowinLoss, setduoWLRatio] = useState(0);
  const [duoAssists, setduoAssists] = useState(0);
  const [duoTopTen, setduoTopTen] = useState(0);
  const [duoRevive, setduoRevive] = useState(0);
  const [duoKD, setduoKD] = useState(0);

  //DUO FPP STATS
  var duoFPPwinlossRatio;
  var duoFPPKDratio;
  const [duoFPPKills, setduoFPPKills] = useState(0);
  const [duoFPPWins, setduoFPPWins] = useState(0);
  const [duoFPPwinLoss, setduoFPPWLRatio] = useState(0);
  const [duoFPPAssists, setduoFPPAssists] = useState(0);
  const [duoFPPTopTen, setduoFPPTopTen] = useState(0);
  const [duoFPPRevive, setduoFPPRevive] = useState(0);
  const [duoFPPKD, setduoFPPKD] = useState(0);

  //SQUAD STATS
  var squadwinlossRatio;
  var squadKDratio;
  const [squadKills, setsquadKills] = useState(0);
  const [squadWins, setsquadWins] = useState(0);
  const [squadwinLoss, setsquadWLRatio] = useState(0);
  const [squadAssists, setsquadAssists] = useState(0);
  const [squadTopTen, setsquadTopTen] = useState(0);
  const [squadRevive, setsquadRevive] = useState(0);
  const [squadKD, setsquadKD] = useState(0);

  //SQUAD FPP STATS
  var squadFPPwinlossRatio;
  var squadFPPKDratio;
  const [squadFPPKills, setsquadFPPKills] = useState(0);
  const [squadFPPWins, setsquadFPPWins] = useState(0);
  const [squadFPPwinLoss, setsquadFPPWLRatio] = useState(0);
  const [squadFPPAssists, setsquadFPPAssists] = useState(0);
  const [squadFPPTopTen, setsquadFPPTopTen] = useState(0);
  const [squadFPPRevive, setsquadFPPRevive] = useState(0);
  const [squadFPPKD, setsquadFPPKD] = useState(0);

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
            winlossratio = handleDivideByZero(soloData.wins, soloData.losses);
            setsoloWLRatio(winlossratio);
            setsoloAssists(soloData.assists);
            setsoloTopTen(soloData.top10s);
            setsoloSuicide(soloData.suicides);
            soloKDratio = handleDivideByZero(
              soloData.kills,
              soloData.roundsPlayed
            );
            setsoloKD(soloKDratio);

            //SOLO FPP DATA
            const soloFPPData = data.data.attributes.gameModeStats["solo-fpp"];
            setsoloFPPKills(soloFPPData.kills);
            setsoloFPPWins(soloFPPData.wins);
            soloFPPwinlossRatio = handleDivideByZero(
              soloFPPData.wins,
              soloFPPData.losses
            );
            setsoloFPPWLRatio(soloFPPwinlossRatio);
            setsoloFPPAssists(soloFPPData.assists);
            setsoloFPPTopTen(soloFPPData.top10s);
            setsoloFPPSuicide(soloFPPData.suicides);
            soloFPPKDratio = handleDivideByZero(
              soloFPPData.kills,
              soloFPPData.roundsPlayed
            );
            setsoloFPPKD(soloFPPKDratio);
            //console.log(soloFPPData);

            //DUO DATA
            const duoData = data.data.attributes.gameModeStats.duo;
            setduoKills(duoData.kills);
            setduoWins(duoData.wins);
            duowinlossRatio = handleDivideByZero(duoData.wins, duoData.losses);
            setduoWLRatio(duowinlossRatio);
            setduoAssists(duoData.assists);
            setduoTopTen(duoData.top10s);
            setduoRevive(duoData.revives);
            duoKDratio = handleDivideByZero(
              duoData.kills,
              duoData.roundsPlayed
            );
            setduoKD(duoKDratio);
            console.log(duoData);

            //DUO FPP DATA
            const duoFPPData = data.data.attributes.gameModeStats["duo-fpp"];
            setduoFPPKills(duoFPPData.kills);
            setduoFPPWins(duoFPPData.wins);
            duoFPPwinlossRatio = handleDivideByZero(
              duoFPPData.wins,
              duoFPPData.losses
            );
            setduoFPPWLRatio(duoFPPwinlossRatio);
            setduoFPPAssists(duoFPPData.assists);
            setduoFPPTopTen(duoFPPData.top10s);
            setduoFPPRevive(duoFPPData.revives);
            duoFPPKDratio = handleDivideByZero(
              duoFPPData.kills,
              duoFPPData.roundsPlayed
            );
            setduoFPPKD(duoFPPKDratio);
            //console.log(duoFPPData);

            //SQUAD DATA
            const squadData = data.data.attributes.gameModeStats.squad;
            setsquadKills(squadData.kills);
            setsquadWins(squadData.wins);
            squadwinlossRatio = handleDivideByZero(
              squadData.wins,
              squadData.losses
            );
            setsquadWLRatio(squadwinlossRatio);
            setsquadAssists(squadData.assists);
            setsquadTopTen(squadData.top10s);
            setsquadRevive(squadData.revives);
            squadKDratio = handleDivideByZero(
              squadData.kills,
              squadData.roundsPlayed
            );
            setsquadKD(squadKDratio);
            //console.log(squadData);

            //SQUAD FPP DATA
            const squadFPPData =
              data.data.attributes.gameModeStats["squad-fpp"];
            setsquadFPPKills(squadFPPData.kills);
            setsquadFPPWins(squadFPPData.wins);
            squadFPPwinlossRatio = handleDivideByZero(
              squadFPPData.wins,
              squadFPPData.losses
            );
            setsquadFPPWLRatio(squadFPPwinlossRatio);
            setsquadFPPAssists(squadFPPData.assists);
            setsquadFPPTopTen(squadFPPData.top10s);
            setsquadFPPRevive(squadFPPData.revives);
            squadFPPKDratio = handleDivideByZero(
              squadFPPData.kills,
              squadFPPData.roundsPlayed
            );
            setsquadFPPKD(squadFPPKDratio);
            console.log(squadFPPData);

            setError(false);
            setSearch(true);
            setdisplayName(name);


            //get bestrankpoint
            const bestrankpoint = data.data.attributes.bestRankPoint;
          });
      })
      //if dosent work, produce error message
      .catch((err) => setError(true));
  };

  return (
    <>
      <NavigationBar />
      <div className="background p-4">
        <img src = {pubglogo} alt = "logo" className="pubgLogo"/>
        <br/>
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
            <h1 className="flex justify-center text-violet-500 font-bold font-mono">
              Showing Stats for {displayName}
            </h1>
            <br/>
            <h2 className="flex justify-center text-gray-200 font-bold font-mono">Best Rank Point:</h2>
            <br />
            <TeamStatsComponent
              kills={squadKills}
              KDRatio={squadKD}
              wins={squadWins}
              wLratio={squadwinLoss}
              assists={squadAssists}
              topten={squadTopTen}
              revives={squadRevive}
              statName="Squad FPP"
            />
            <br />
            <br />
            <TeamStatsComponent
              kills={squadFPPKills}
              KDRatio={squadFPPKD}
              wins={squadFPPWins}
              wLratio={squadFPPwinLoss}
              assists={squadFPPAssists}
              topten={squadFPPTopTen}
              revives={squadFPPRevive}
              statName="Squads"
            />
            <br />
            <br />
            <TeamStatsComponent
              kills={duoKills}
              KDRatio={duoKD}
              wins={duoWins}
              wLratio={duowinLoss}
              assists={duoAssists}
              topten={duoTopTen}
              revives={duoRevive}
              statName="Duos"
            />
            <br />
            <br />
            <TeamStatsComponent
              kills={duoFPPKills}
              KDRatio={duoFPPKD}
              wins={duoFPPWins}
              wLratio={duoFPPwinLoss}
              assists={duoFPPAssists}
              topten={duoFPPTopTen}
              revives={duoFPPRevive}
              statName="Duo FPP"
            />
            <br />
            <br />
            <SoloStatsComponent
              kills={soloKills}
              KDRatio={soloKD}
              wins={soloWins}
              wLratio={solowinLoss}
              assists={soloAssists}
              topten={soloTopTen}
              suicides={soloSuicide}
              statName="Solo"
            />
            <br />
            <br />
            <SoloStatsComponent
              kills={soloFPPKills}
              KDRatio={soloFPPKD}
              wins={soloFPPWins}
              wLratio={soloFPPwinLoss}
              assists={soloFPPAssists}
              topten={soloFPPTopTen}
              suicides={soloFPPSuicide}
              statName="Solo FPP"
            />
          </>
        )}

        <br />
      </div>
    </>
  );
}

function handleDivideByZero(stat1, stat2) {
  if (stat2 === 0) {
    return stat1;
  }
  return Math.round(100 * (stat1 / stat2)) / 100;
}

export default PUBGStats;

//(e) => return {fewhfiawuehfa}
//function (e) {
//     fwafwafaw
// }
