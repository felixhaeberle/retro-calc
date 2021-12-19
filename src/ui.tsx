import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './ui.css'

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const ops = ["/", "*", "-", "+"];
const ids = {
            7: "seven",
            8: "eight",
            9: "nine",
            4: "four",
            5: "five",
            6: "six",
            1: "one",
            2: "two",
            3: "three",
            0: "zero",
            '/': "divide",
            '*': "multiply",
            '-': "subtract",
            '+': "add"
}

class App extends React.Component {
  state = {
    calc: '0',
    operation: undefined,
    lastPressed: undefined
  }

  handleClick = (e) => {
    const { calc, lastPressed } = this.state;
    const { innerText } = e.target;
    
    switch(innerText){
      case 'AC': {
        this.setState({
          calc: '0'
        });
        break;
      }
      case '=': {
        const evaluated = eval(calc);
        this.setState({
          calc: evaluated
        });
        break;
      }
      case '.': {
        const splitted = calc.split(/[\+\-\*\/]/);
        const last = splitted.slice(-1)[0];
        
        if(!last.includes('.')){
          this.setState({
            calc: calc+'.'
          });
        }
        break;
      }
      default:
        let newCalc = undefined;
        if(ops.includes(innerText)) {
          if(ops.includes(lastPressed) && innerText !== '-'){
            const lastNumberIndex = calc
                                  .split('')
                                  .reverse()
                                  .findIndex(char => char !== ' ' && nums.includes(+char));
            newCalc = calc.slice(0, calc.length - lastNumberIndex) + `${innerText}`;
          } else {
            newCalc = `${calc} ${innerText}`;
          }
        } else {
          newCalc = (calc === '0') ? innerText : (calc + innerText);
        }
        
        this.setState({
          calc: newCalc
        })
        
        this.setState({
          lastPressed: innerText
        })
    }

  }
  
  
  render() {
    const { calc } = this.state;
    
    return (
      <div className="calculator">
        <div id="display" className="display">
          {calc}
        </div>
        
        <div className="nums-container">
          <button id="clear" onClick={this.handleClick} className="light-grey">AC</button>
          {nums.map(num => (
            <button 
              key={num}
              className={`dark-grey ${num === 0 && 'big'}`}
              onClick={this.handleClick}
              id={ids[num]}
             >{num}</button>
          ))}
          <button id="decimal" onClick={this.handleClick} className="dark-grey">.</button>
        </div>
        <div className="ops-container">
          {ops.map(op => (
            <button 
              className="orange" 
              key={op}
              onClick={this.handleClick}
              id={ids[op]}
              >{op}</button>
          ))}
          <button id="equals" className="orange" onClick={this.handleClick}>=</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-page'))
