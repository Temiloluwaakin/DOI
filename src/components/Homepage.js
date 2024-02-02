import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import React from "react";

const Homepage = () => {

    const numberKey = ['1','2','3','4','5','6','7','8','9','0']

    //get name from local storage
    const storedUser = JSON.parse(localStorage.getItem('name'));


    //the rules modal pop up
    const [rules, setRules] = useState(false);
	const handleRules =() => {
		setRules(!rules)
	};


    
    //guess input
    const [guess, setGuess] =useState('')
    const [selectedNumbers, setSelectednumbers] = useState([]);
    const [disabledButton, setDisableButton] = useState(false)
    const handleKeys = (key) => {
        if (!selectedNumbers.includes(key) && selectedNumbers.length < 4) {
            setGuess(guess + key)
           setSelectednumbers([...selectedNumbers, key])
        }
        if (selectedNumbers.length ===3) {
            setDisableButton(true)
        }//these means if selected nums if equal to 4, set the disable button true
    }
    const backspace = () => {
        if (selectedNumbers.length > 0) {
            setGuess(guess.slice(0, -1))
            setSelectednumbers(selectedNumbers.slice(0, -1))
            setDisableButton(false)
        }
    }
    

    const [guessed, setGuessed] = useState([]);
    const [result, setResult] = useState('')
    const [inputed, setInputed] = useState('')


    //on every reload, get and display stored data or guessed numbers
    useEffect(() => {

        const storedData = JSON.parse(localStorage.getItem('guessed'));
        if (storedData) {
            setGuessed(storedData);
        }
        //that is if there is items inside the storeddata, put it inside guessed  

    }, []);



    //on every reload of the page, put guessed list or array in the local storage
    useEffect(() => {
        localStorage.setItem('guessed', JSON.stringify(guessed));
        
    }, [guessed])


    

    // State to store the generated number //pass the generated number to this state
    const [generatedNumber, setGeneratednumber] = useState('');

    //on every reload, get and display stored data or guessed numbers
    useEffect(() => {

        const storedcode = JSON.parse(localStorage.getItem('generatedNumber'));
        if (storedcode) {
            setGeneratednumber(storedcode);
        }
        //that is if there is items inside the storeddata, put it inside guessed  

    }, []);
    
    useEffect(() => {
        localStorage.setItem('generatedNumber', JSON.stringify(generatedNumber));
        
    }, [generatedNumber])
    

    useEffect(() => {

        const intervalId = setInterval(() => {
          const currentDate = new Date();
          const hours = currentDate.getHours();
          const minutes = currentDate.getMinutes();
          const seconds = currentDate.getSeconds();
    
          // Check if it's midnight (00:00:00)
          if (hours === 12 && minutes === 9 && seconds === 0) {
            let code = '';
            const numbers = [0,1,2,3,4,5,6,7,8,9];
            for (let i = 0; i < 4; i++) {
                const randomIndex = Math.floor(Math.random() * numbers.length);
                code += numbers[randomIndex];
                numbers.splice(randomIndex, 1);
            }
            setGeneratednumber(code);
          }
        }, 1000); // Check every second
    
        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, [generatedNumber]); // Run the effect only once when the component mounts

    //let computer generate random 4 digit number that will be guessed
	/*function generateNumber() {
		let code = '';
		const numbers = [0,1,2,3,4,5,6,7,8,9];
		for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * numbers.length);
            code += numbers[randomIndex];
            numbers.splice(randomIndex, 1);
		}
		return code;

	};*/



    //on click of the button to check the guess and display the answer
    const checkGuess = (e) => {
        e.preventDefault();

		let dead = 0;
		let injured = 0;
		for (let i = 0; i < 4; i++) {
			if (guess[i] === generatedNumber[i]) {
				dead++;
			} else if (generatedNumber.includes(guess[i])) {
				injured++;
			}
		}
		if (dead === 4) {
			setResult(`Congratulations! You guessed the code within ${((guessed.length) + 1)} trial(s)`);
            setDisableButton(true);
		} else {
			setResult(`${injured}  Injured, ${dead}  dead`);
            setDisableButton(false);
		}

        setInputed(guess)
        setGuess('')
        setSelectednumbers([])

        /*
        
        
        */
	};



    /*--->on the reload of the page, first create a newguess and put it inside the guessed local storage.
    --->this is done so that onclick of the check guess, the result will already have an array to go to and it wont be
    backlogging when the click is done
    -->to make sure an empty array is not given everytime it is reloaded, we tell it to check if it is empty
    before adding to the guessed local storage. 
    */
    useEffect(() => {
        // Create a new object with the current guess and result
        const newGuess = { guess: inputed, result: result };

        if (newGuess.guess.trim() !== ''){
            setGuessed(prevGuessed => [...prevGuessed, newGuess]);
        }
    }, [inputed, result])



    return (
        <div className="homepage">
            <Navbar />
            <div className="game-bg">
                {rules &&
                    <div className="rules">
                        <div className="rul">
                            <span style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <h1>rules</h1><h4 onClick={handleRules} style={{cursor:'pointer'}}>X</h4>
                            </span>
                            <p>guess the secret four digit number generated by the computer
                                'INJURED' means the number is among the secret number generated but is 
                                not in the right position. 'DEAD' means the number is among the secret number 
                                generated and in the right spot
                            </p>
                        </div>
                    </div>
                }

                <h1> Hello, {storedUser}</h1>


                <div className="game">
                    <div className='lftside'>
                        <form>
                            <input
                                type="text"
                                value={guess}
                                onChange={(e) => setGuess(e.target.value)}
                                disabled
                            />
                            
                            <button type="submit" onClick={checkGuess}>check</button>
                        </form>

                        {generatedNumber}



                        <div className='keysz'>
                            {numberKey.map((keys) => (
                                <button key={keys} 
                                    className="kkey"
                                    onClick={() => handleKeys(keys)}
                                    disabled={disabledButton || selectedNumbers.includes(keys)}
                                >
                                    {keys}
                                </button>
                            ))}
                            <button onClick={backspace}> ⇐ </button>
                        </div>
                    </div>
                    

                    <div className="rtside">
                        
                        {guessed.map((each, index) => (
                            <div key={index}>
                                {each.guess} : {each.result}
                            </div>
                        ))} 
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Homepage;

//generate obce a day
//if you rekload and you have completed the quiz yoi cant play again until next day or change in gen num
//share result