function StatsComponent({
    kills,
    KDRatio,
    wins,
    wLratio,
    assists,
    topten,
    revives,
    statName,
  }) {

    function alertTitle(){
      if (statName === "Squad FPP"){
        alert("Squad FPP");
      }
      else if (statName === "Squads"){
        alert("Squads");
      }
      else if (statName === "Duos"){
        alert("Duos");
      }
      else{
        alert ("Duo FPP")
      }
    }

    function alertStats(statName){
      if (statName === "kills"){
        //put alerts here
        console.log("Kills");
      }
      else if (statName === "KDRatio"){
        console.log("KDRatio");
      }
      else if (statName === "Wins"){
        console.log("Wins");
      }
      else if (statName === "WLRatio"){
        console.log("WLRatio");
      }
      else if (statName === "Assists"){
        console.log("Assists");
      }
      else if (statName === "TopTen"){
        console.log("Top Ten");
      }
      else{
        console.log("Revives");
      }
  
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
            <button onClick={() => alertStats("kills")} className="bg-transparent border-none">
            <div className="stat-title text-gray-400 hover:text-white transition ease-in-out duration-200 hover:underline">Kills</div>
            </button>
            <div className="stat-value text-gray-400">{kills}</div>

          </div>
          <div className="stat bg-slate-800">
            <div className="stat-figure text-secondary">

            </div>
            <button onClick={() => alertStats("KDRatio")} className="bg-transparent border-none">
            <div className="stat-title text-gray-400 hover:text-white transition ease-in-out duration-200 hover:underline">KD Ratio</div>
            </button>
            <div className="stat-value text-gray-400">{KDRatio}</div>

          </div>
          <div className="stat bg-slate-800">
            <div className="stat-figure text-secondary">

            </div>
            <button onClick={() => alertStats("Wins")} className="bg-transparent border-none">
            <div className="stat-title text-gray-400 hover:text-white transition ease-in-out duration-200 hover:underline">Wins</div>
            </button>
            <div className="stat-value text-gray-400">{wins}</div>

          </div>
  
          <div className="stat bg-slate-800">
            <div className="stat-figure text-secondary">

            </div>
            <button onClick={() => alertStats("WLRatio")} className="bg-transparent border-none">
            <div className="stat-title text-gray-400 hover:text-white transition ease-in-out duration-200 hover:underline">Win Loss Ratio</div>
            </button>
            <div className="stat-value text-gray-400">{wLratio}%</div>

          </div>
  
          <div className="stat bg-slate-800">
            <div className="stat-figure text-secondary">

            </div>
            <button onClick={() => alertStats("Assists")} className="bg-transparent border-none">
            <div className="stat-title text-gray-400 hover:text-white transition ease-in-out duration-200 hover:underline">Assists</div>
            </button>
            <div className="stat-value text-gray-400">{assists}</div>

          </div>
  
          <div className="stat bg-slate-800">
            <div className="stat-figure text-secondary">

            </div>
            <button onClick={() => alertStats("TopTen")} className="bg-transparent border-none">
            <div className="stat-title text-gray-400 hover:text-white transition ease-in-out duration-200 hover:underline">Top Ten</div>
            </button>
            <div className="stat-value text-gray-400">{topten}</div>

          </div>
          <div className="stat bg-slate-800">
            <div className="stat-figure text-secondary">

            </div>
            <button onClick={() => alertStats("Revives")} className="bg-transparent border-none">
            <div className="stat-title text-gray-400 hover:text-white transition ease-in-out duration-200 hover:underline">Revives</div>
            </button>
            <div className="stat-value text-gray-400">{revives}</div>

          </div>
        </div>
      </div>
    );
  }
  
  export default StatsComponent;