
const sorting_types = ["Artikkel", "Kronikk", "Anmeldelse"]

const sorting_medie = [""]

function SortingContainer(){
    return(
        <select>
        <option>Artikler</option>
        <option>Kronikker</option>
        <option>Anmeldelser</option>
      </select>
        
    );
} export default SortingContainer;