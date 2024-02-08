import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import React from "react";

const Homepage = () => {

    const numberKey = ['1','2','3','4','5','6','7','8','9','0']


    // State to store the generated number //pass the generated number to this state
    const [generatedNumber, setGeneratednumber] = useState('');

    const numbs = [
        { day: 2, numb: '1649' }, { day: 3, numb: '5748' },{ day: 4, numb: '1039' },{ day: 5, numb: '3826' },
        { day: 6, numb: '9023' },{ day: 7, numb: '1736' },{ day: 8, numb: '8372' },{ day: 9, numb: '7241' },
        { day: 10, numb: '1234' },{ day: 11, numb: '1234' },{ day: 12, numb: '1234' },{ day: 13, numb: '1234' }
    ]


    //changing number by day
    useEffect(() => {
        const currentDay = new Date().getUTCDate() % numbs.length || numbs.length;
        const selectedNumb = numbs.find(numbObj => numbObj.day === currentDay );
        
        if (selectedNumb) {
            setGeneratednumber(selectedNumb.numb);
        }
    }, [numbs]);

    //get name from local storage
    //const storedUser = JSON.parse(localStorage.getItem('name'));


    //the rules modal pop up
    const [rules, setRules] = useState(true);
	const handleRules =() => {
		setRules(!rules)
	};


    
    //guess input
    const [guess, setGuess] =useState('')
    const [selectedNumbers, setSelectednumbers] = useState([]);
    const [disabledButton, setDisableButton] = useState(false)
    const [dischkbtn, setDischkbtn] = useState(false)
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
    const [congrats, setCongrats] = useState(false);
    const handleCongrats =() => {
		setCongrats(!congrats)
	};
    const currentDay = new Date().getUTCDate()


    //on every reload, get and display stored data or guessed numbers of ONLY THAT DAY
    useEffect(() => {
        
        const storedData = JSON.parse(localStorage.getItem('guessed'));
        if (storedData) {
            //setGuessed(storedData);
            const parsedData = storedData
            const filteredData = parsedData.filter(item => item.day === currentDay);
            setGuessed(filteredData);
        }
        //that is if there is items inside the storeddata, put it inside guessed  
        //.filter(item => item.day === currentDay )

    }, []);
        


    //on every reload of the page, put guessed list or array in the local storage
    useEffect(() => {
        localStorage.setItem('guessed', JSON.stringify(guessed));
        
    }, [guessed])


    //on reload check if you completed the quiz for that day already
    useEffect(() => {

        const completed = guessed.find(item => item.guess === generatedNumber)
        if (completed) {
            setRules(!rules)
            setCongrats(!congrats)
            setDisableButton(true)
            setDischkbtn(true)
        }
         
    }, [generatedNumber]);


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
            setDischkbtn(true)
            setCongrats(true)
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
        const newGuess = { guess: inputed, result: result, day: currentDay };

        if (newGuess.guess.trim() !== ''){
            setGuessed(prevGuessed => [...prevGuessed, newGuess]);
        }
    }, [inputed, result, currentDay])

	


    return (
        <div className="homepage">
            <Navbar />
            <div className="game-bg">
                {rules &&
                    <div className='rules'>
                        <div className="rul">
                            <span style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <h1>How To Play</h1><h1 onClick={handleRules} style={{cursor:'pointer'}}>X</h1>
                            </span>
                            <p style={{marginTop:'0px', fontSize:'19px'}}>Guess the secret four digit number.</p>
                            <p>
                                'INJURED' means the number is among the secret number but 
                                not in the right position. 
                            </p>
                            <p>
                                'DEAD' means the number is among the secret number and in the right position
                            </p>
                        </div>
                    </div>
                }
                {congrats &&
                    <div className="rules">
                        <div className="rul">
                            <span>
                                <h4 onClick={handleCongrats} style={{cursor:'pointer'}}>X</h4>
                            </span>
                            <p>
                                Congratulations! You guessed the code within {guessed.length} trial(s). 
                                come back tommorow
                            </p>
                        </div>
                    </div>
                }


                <div className="game">
                    <div className='lftside'>
                        <form>
                            <input
                                type="text"
                                value={guess}
                                onChange={(e) => setGuess(e.target.value)}
                                disabled
                            />
                        </form>
                    </div>
                    

                    <div className="rtside">
                        {guessed.map((each, index) => (
                            <div key={index} className="gg">
                                {each.guess} : {each.result}
                            </div>
                        ))} 
                        {/*{(guessed.filter(item => item.day === currentDay)).map((each, index) => (
                            <div key={index}>
                                {each.guess} : {each.result}
                            </div>
                        ))}*/}
                    </div>
                </div>

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
                    <button onClick={backspace} 
                        style={{padding:'15px',background:'#464646',color:'#fff',border:'none',borderRadius: '10px'}}
                    > ⇐ </button>
                    <button type="submit" onClick={checkGuess} disabled={dischkbtn} className="chkbtn"
                        style={{marginLeft: '20px', background:'#00ff9d', color:'black', 
                        border:'none', padding:'10px 20px', borderRadius:'8px'}}
                    >
                        check
                    </button>
                </div>
            </div>
        </div>
    );
}
 
export default Homepage;


//if you rekload and you have completed the quiz yoi cant play again until next day or change in gen num
//if the next day comes, it clears the guessed storage
//share result