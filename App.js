import "./styles.css";
import { useState } from "react";


export default function App() {
  const [input, setInput] = useState("")
  const [list, setList] = useState([
    // {key:584535, value:"Do laundry", isChecked: false},
    // {key:439735, value:"Take out trash", isChecked: false},
    // {key:589774, value:"Do dishes", isChecked: true},
    // {key:573735, value:"code", isChecked: false},
    // {key:589739, value:"margin", isChecked: false},
    // {key:585735, value:"textbox", isChecked: false}
  ]
    )
  const [history, setHistory] = useState([[]])
  function handleCheckChange(e) {    
    let checkkey = e.target.getAttribute("checkboxkey")
    setHistory([...history, list])
    setList(list.map(
      (element) => {
        if(element.key == checkkey){
          return {...element, isChecked: !(element.isChecked)}
        }return element;
      }
    ))
  }
  function handleRemoveClick(e) {
    let buttonKey = e.target.getAttribute("buttonkey") 
    list.forEach(
      (element, index) => {
        if(element.key == buttonKey){
          setHistory([...history, list])
          setList(list.toSpliced(index, 1))
        }
      }
    )
  }
  function handleSubmit() {
    if(input == ""){return}
    let key = Math.floor(100000 + Math.random() * 900000)
      setHistory([...history, list])
      setList([...list, {key: key, value: input, isChecked:false}]) 
      setInput("")
  }
  function handleHistoryClick(){
    if((history[history.length-1]) == undefined){return}
    setList(history.pop())
    setHistory([...history])
  }
  return (
    <div className="App">
      <h1>To Do</h1>
      <input  id="input" type="text" value={input} onChange={(e) => setInput(e.target.value)} ></input>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleHistoryClick}>Undo</button>
      <div id="container">
        <ol>
          {list.map(({key, value, isChecked}) =>
            <>
              {isChecked === true && <li id="strike" key={key}>{value}</li>}
              {isChecked === false && <li key={key}>{value}</li>}
              
              <input type="checkbox" checkboxkey={key} onChange={handleCheckChange} checked={isChecked}></input>
              <button buttonkey={key} onClick={handleRemoveClick}>Remove</button>
              <br />
           </>)
          }
        </ol>
      </div>
    </div>
  );
}