function SoloStatsComponent({
  kills,
  KDRatio,
  wins,
  wLratio,
  assists,
  topten,
  suicides,
  statName,
}) {

  function alertTitle(){
    if (statName === "Solo"){
      alert("Solo Gameplay: Everyone for themselves!");
    }
    else{
      alert("Solo Gameplay: First Person Point-of-View");
    }
  }

  function alertStats(statName){
    // if (statName === "kills"){
    //   //put alerts here
    //   alert("Total number of kills");
    // }
    if (statName === "KDRatio"){
      alert("Ratio between kills and deaths");
    }
    // else if (statName === "Wins"){
    //   alert("First Place! Congrats!");
    // }
    else if (statName === "WLRatio"){
      alert("Ratio between wins and losses");
    }
    // else if (statName === "Assists"){
    //   alert("Number of assists");
    // }
    else if (statName === "TopTen"){
      alert("Number of times placed in Top Ten");
    }
    // else{
    //   alert("Are you unlucky? Or are you just bad.");
    // }

  }


  return (
    <div className="flex justify-center">
      <div className="stats shadow">
        <div className="stat bg-slate-800">
          <div className="stat-figure text-secondary">

          </div>
          <div className="stat-title"></div>
          <button onClick={alertTitle} className="bg-transparent border-none">
          <div className="stat-value text-gray-400 hover:text-white transition ease-in-out duration-200 hover:underline">{statName}</div>
          </button>
          
        </div>
        <div className="stat bg-slate-800">
          <div className="stat-figure text-secondary">

          </div>
          {/* <button onClick={() => alertStats("kills")} className="bg-transparent border-none"> */}
          <div className="stat-title text-gray-400">Kills</div>
          {/* </button> */}
          <div className="stat-value text-gray-400">{kills}</div>

        </div>
        <div className="stat bg-slate-800">
          <div className="stat-figure text-secondary">

          </div>
          <button onClick={() => alertStats("KDRatio")} className="bg-transparent border-none">
          <div className="stat-title text-orange-500 hover:text-white transition ease-in-out duration-200 hover:underline">KD Ratio</div>
          </button>
          <div className="stat-value text-gray-400">{KDRatio}</div>

        </div>
        <div className="stat bg-slate-800">
          <div className="stat-figure text-secondary">

          </div>
          {/* <button onClick={() => alertStats("Wins")} className="bg-transparent border-none"> */}
          <div className="stat-title text-gray-400">Wins</div>
          {/* </button> */}
          <div className="stat-value text-gray-400">{wins}</div>

        </div>

        <div className="stat bg-slate-800">
          <div className="stat-figure text-secondary">

          </div>
          <button onClick={() => alertStats("WLRatio")} className="bg-transparent border-none">
          <div className="stat-title text-orange-500 hover:text-white transition ease-in-out duration-200 hover:underline">Win Loss Ratio</div>
          </button>
          <div className="stat-value text-gray-400">{wLratio}%</div>

        </div>

        <div className="stat bg-slate-800">
          <div className="stat-figure text-secondary">

          </div>
          {/* <button onClick={() => alertStats("Assists")} className="bg-transparent border-none"> */}
          <div className="stat-title text-gray-400">Assists</div>
          {/* </button> */}
          <div className="stat-value text-gray-400">{assists}</div>

        </div>

        <div className="stat bg-slate-800">
          <div className="stat-figure text-secondary">

          </div>
          <button onClick={() => alertStats("TopTen")} className="bg-transparent border-none">
          <div className="stat-title text-orange-500 hover:text-white transition ease-in-out duration-200 hover:underline">Top Ten</div>
          </button>
          <div className="stat-value text-gray-400">{topten}</div>

        </div>
        <div className="stat bg-slate-800">
          <div className="stat-figure text-secondary">

          </div>
          {/* <button onClick={() => alertStats("Suicides")} className="bg-transparent border-none"> */}
          <div className="stat-title text-gray-400">Suicides</div>
          {/* </button> */}
          <div className="stat-value text-gray-400">{suicides}</div>

        </div>
      </div>
    </div>
  );
}

export default SoloStatsComponent;
