import { useState } from "react";

const Navbar = () => {

    const storedUser = JSON.parse(localStorage.getItem('name'));

    const handleLogoutmodal =() => {
        setLogout(!logout)
    };

    
    //the rules modal pop up
    const [logout, setLogout] = useState(false);
    
      
    const handleLogOut = (e) => {
        localStorage.clear('name');
        window.location.href = "/";
    }

    return (
        <nav>
            <div className='nav-bg'>
                <h1>menu</h1>
                <h1>DOI</h1>
                <h1 id="circled-letter" onClick={handleLogoutmodal}>{storedUser[0]}</h1>
                {logout &&
                    <div className="ruless">
                        <div className="rull">
                            <span style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <h1>Log Out?</h1>
                                <button onClick={handleLogOut} style={{cursor:'pointer'}}>Yes</button>
                                <button onClick={handleLogoutmodal} style={{cursor:'pointer'}}>No</button>
                            </span>
                        </div>
                    </div>
                }
            </div>
        </nav>
    );
}
 
export default Navbar;