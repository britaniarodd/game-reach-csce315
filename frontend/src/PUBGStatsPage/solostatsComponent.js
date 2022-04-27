function StatsComponent({
  kills,
  KDRatio,
  wins,
  wLratio,
  assists,
  topten,
  suicides,
  statName,
}) {
  return (
    <div className="flex justify-center">
      <div className="stats shadow">
        <div className="stat bg-slate-800">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                //d="M13 16h-1v-4h-1m1-4h.01M21 12a9 100 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title"></div>
          <div className="stat-value text-gray-400">{statName}</div>
          {/* <div className="stat-desc">Solo Kills</div> */}
        </div>
        <div className="stat bg-slate-800">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                //d="M13 16h-1v-4h-1m1-4h.01M21 12a9 100 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title text-gray-400">Kills</div>
          <div className="stat-value text-gray-400">{kills}</div>
          <div className="stat-desc text-gray-400">Solo Kills</div>
        </div>
        <div className="stat bg-slate-800">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                //d="M13 16h-1v-4h-1m1-4h.01M21 12a9 100 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title text-gray-400">KD Ratio</div>
          <div className="stat-value text-gray-400">{KDRatio}</div>
          <div className="stat-desc text-gray-400">Solo Kills</div>
        </div>
        <div className="stat bg-slate-800">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                //d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              ></path>
            </svg>
          </div>
          <div className="stat-title text-gray-400">Wins</div>
          <div className="stat-value text-gray-400">{wins}</div>
          <div className="stat-desc text-gray-400">↗︎ 400 (22%)</div>
        </div>

        <div className="stat bg-slate-800">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                //d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <div className="stat-title text-gray-400">Win Loss Ratio</div>
          <div className="stat-value text-gray-400">{wLratio}%</div>
          <div className="stat-desc text-gray-400">↘︎ 90 (14%)</div>
        </div>

        <div className="stat bg-slate-800">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                //d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <div className="stat-title text-gray-400">Assists</div>
          <div className="stat-value text-gray-400">{assists}</div>
          <div className="stat-desc text-gray-400">↘︎ 90 (14%)</div>
        </div>

        <div className="stat bg-slate-800">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                //d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <div className="stat-title text-gray-400">Top Ten</div>
          <div className="stat-value text-gray-400">{topten}</div>
          <div className="stat-desc text-gray-400">↘︎ 90 (14%)</div>
        </div>
        <div className="stat bg-slate-800">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                //d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <div className="stat-title text-gray-400">Suicides</div>
          <div className="stat-value text-gray-400">{suicides}</div>
          <div className="stat-desc text-gray-400">↘︎ 90 (14%)</div>
        </div>
      </div>
    </div>
  );
}

export default StatsComponent;
