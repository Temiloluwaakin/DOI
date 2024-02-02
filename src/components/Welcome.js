import { useState } from "react";
import { Link } from "react-router-dom";

const Welcome = () => {


    //Retrieve the userdata from local storage--------------------------------
    const storedUser = JSON.parse(localStorage.getItem('name'));

    //if there is a stored user already, proceed to the homepae
    if (storedUser !== null && storedUser !== "" && storedUser !== undefined) {
        window.location.href = "homepage";
    }


    //storing thr name registered to local storage-----------------------
    const[name, setName] = useState('');

    const handleSubmit = (e) => {
        //const user = { name, initial }; // Create the user object

        // Store the user object in localStorage
        localStorage.setItem('name', JSON.stringify(name));
    }

    return (
        <div className="welcome">
            <div className="icon">
                {/*<img src="svgs/calculatorgrad.svg"/>  */}
            </div>
            <div className="middle-text">
                <h1 className="headline">DOI</h1>
                <p className="text-body-small grey">Guess the correct 4 number combination</p>
            </div>
            <form className="welcome-form">
                <div className="form-group">
                    <input
                        type="text"
                        id='name'
                        placeholder="What is your name?"
                        required
                        value= {name}
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                </div>
                <button  type="submit" onClick={handleSubmit}>
                    <Link to='/homepage'> Get Started </Link >
                </button>
            </form>
        </div>
    );
}
 
export default Welcome;