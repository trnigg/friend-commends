import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    let navigate = useNavigate();


    function handleChange(value) {
        navigate(`${value}`);
        value = "";
      }

    return (
        <div>
            <h1>Welcome to the navbar</h1>
            <select onChange={event => handleChange(event.target.value)}> 
                <option value=''>Landing screen</option>
                <option value='recommendations' >Recommendations</option>
                <option value='indiv_shows'>Individual Shows</option>
                <option value='overview'>Overview</option>
                <option value='friends'>Friends</option>
            </select>
        </div>
    );
};

export default Navbar;
