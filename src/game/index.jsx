import { useEffect, useState } from 'react';
import '../main.css';
import Rule from './Rule';

const rules = [
  {
    rule: "Пароль должен содержать английские буквы",
    condition: (text) => {
      return text.search(/[A-Za-z]/g) !== -1;
    }
  },
  {
    rule: "Пароль должен быть длинее 6 символов",
    condition: (text) => {
      return text.length > 6;
    }
  },
  {
    rule: "Пароль должен содержать заглавные английские буквы",
    condition: (text) => {
      return text.search(/[A-Z]/g) !== -1;
    }
  },
  {
    rule: "Пароль должен содержать цифру",
    condition: (text) => {
      return text.search(/[0-9]/g) !== -1;
    }
  },
  {
    rule: "Пароль должен содержать один из следующих сиволов [!,#,$,@,%,*]",
    condition: (text) => {
      return text.search(/[!#$@%*]/g) !== -1;
    }
  },
  {
    rule: "Сумма цифр пароля должна быть больше 20",
    condition: (text) => {
      return text.match(/[0-9]/g)?.reduce((sum, item) => sum + parseInt(item), 0) >= 20;
     
    }
  },
  {
    rule: "Пароль должен содержать название нашей организации (IT-куб)",
    condition: (text) => {
      return text.toLowerCase().search("it-куб") !== -1;
    }
  },
  {
    rule: "Пароль должен содержать римские цифры",
    condition: (text) => {
      return text.search(/[CIVXMDL]/g) !== -1;
    }
  },
  {
    rule: "Пароль должен содержать ответ: 1/2 + 1/3 = ?",
    condition: (text) => {
      return text.search(/5\/6/g) !== -1;
    }
  },
  {
    rule: "Пароль не должен быть длинее 20 символов",
    condition: (text) => {
      return text.length <= 20;
    }
  },
]

let ulockedRulesCount = 0;

function Game({setIsNotEnd, isRetry}) {
  const [letterCount, setLetterCount] = useState(0);
  const [inputHeight, setInputHeight] = useState(51);
  const [inputValue, setInputValue] = useState("");
  const [unlockedRules, setUnlockedRules] = useState([rules[ulockedRulesCount]])
  
  //костыль
  function changeInputHeight() {
    setInputHeight(Math.ceil(letterCount/30) * 31 + 20);
    
  }

  function unlockNewRule() {
    const AlredyUnlockedRules = document.querySelectorAll(".password-game__rule");
  

    for (let i of AlredyUnlockedRules) {
      if (i.classList[1] === "true") continue;
      return;
    }

    ulockedRulesCount++;
  
    rules[ulockedRulesCount] !== undefined ? setUnlockedRules([...unlockedRules, rules[ulockedRulesCount]]) :  setTimeout(() => setIsNotEnd(false), 1000);
    
  }

  function overload() {
    setInputValue("")
    ulockedRulesCount = 0;
    setUnlockedRules([rules[ulockedRulesCount]])
    
  }


  useEffect(() => {
    setLetterCount(inputValue.length);
    
  }, [inputValue])

  useEffect(() => {
    changeInputHeight();
    
  }, [letterCount])

  useEffect(() => {
    overload()
    
  }, [isRetry])
  
  return (
      <>
        <div className="password-game__wrapper">
          <h1 className="password-game__title">The password game</h1>
          <div className="password-game__input-container">
              <textarea  type="text" className="password-game__input" value={inputValue} style={{height:inputHeight + "px"}} onChange={(event) => {
              event.currentTarget.value.at(-1) !== "\n" && event.currentTarget.value.at(-1) !== " "? setInputValue(event.currentTarget.value) : setInputValue(inputValue);
              }}/>
          <div className="password-game__words-counter">{letterCount}</div>
          </div>
          
          <div className="password-game__rules-container">
              {unlockedRules.map((item, index) => (
              <Rule key={index} condition={item.condition} text={item.rule} inputValue={inputValue} unlockNewRule={unlockNewRule}/>
              ))}
          </div>
          
          
      </div>
      </>
  )
}

export default Game;