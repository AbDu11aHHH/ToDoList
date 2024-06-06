import { useState, useEffect } from 'react'
import './index.css'

function App() {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("todoItems")
    return savedItems ? JSON.parse(savedItems):[]
  })
  const [value, setValue] = useState("")

  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(items))
  },[items])

  const handleInput = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setItems([...items, value])
    setValue('')
  }

  const handleDelete = (index) => {
    const newItems = items.filter((item, i) => i!==index)
    setItems(newItems)
  }

  return (
    <>
    <h1>Your Everyday todo List</h1>
    <form  onSubmit={handleSubmit}>
      <label>Add Items To Your List:</label>
      <input 
      type="text"
      placeholder='Enter Item'
      value={value}
      onChange={handleInput}
       />
    </form>
    <h2>to do:</h2>
    <ul>
      {items.map((itm, index) => (
        <div className="container" key={index}>
          <div className="oneItem">
            <input type="checkBox" />         
            <li
            >{itm}
            </li>
            <button onClick={() => handleDelete(index)}>remove</button>
          </div>
        </div>
        
      ))}
    </ul>
    </>
  )
}

export default App
