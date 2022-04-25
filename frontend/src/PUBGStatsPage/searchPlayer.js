

function SearchPlayer({name, setName}) {

    
    return ( 
        <div>
        <input className = "bg-neutral-700 px-4 py-2 outline-none text-black" type = "text" placeholder="Search PUBG Players" value = {name} onChange = {(e) => setName(e.target.value)}></input>
        {/* <p>{name}</p> */}
        </div>
     );
}

export default SearchPlayer;