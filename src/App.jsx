import { Component, createRef } from 'react'

class Todo {
  constructor(text) {
    this.text = text
    this.completed = false
    this.id = Date.now() + Math.random()
  }
}

class App extends Component {
  state = {
    todos: [],
    input: '',
    border: false
  };

  inputRef = createRef();

  handleChange = (e) => {
    this.setState({ input: e.target.value })
  };

  addTodo = () => {
    if (this.state.input.trim() === '') return
    const newTodo = new Todo(this.state.input)
    this.setState((prevState) => ({
      todos: [...prevState.todos, newTodo],
      input: ''
    }))
  };

  toggleTodo = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }))
  };

  deleteTodo = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter(todo => todo.id !== id)
    }))
  };

  render() {
    return (
      <div className="max-w-md max-h-[90vh] mx-auto mt-16 p-6 bg-white rounded-xl shadow-lg font-sans">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Todo List (OOP)</h2>
        <div className={`flex w-full mb-6 ${this.state.border && "border-2 border-blue-600 rounded-lg"}`}>
          <input
            ref={this.inputRef}
            type="text"
            onBlur={() => this.setState({ border: false })}
            onFocus={() => this.setState({ border: true })}
            value={this.state.input}
            onChange={this.handleChange}
            placeholder="Add todo..."
            className={`w-full outline-none px-4 py-2 ${!this.state.border && "border"} rounded-l-md`}
          />
          <button
            onClick={() => { this.inputRef.current.focus(), this.addTodo() }}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>
        <ul style={{ scrollbarWidth: 'none' }} className="space-y-2 max-h-[70vh] z-0 overflow-y-auto relative">
          {this.state.todos.map(todo => (
            <li className='px-3 hover:z-10 relative'>
              <div
                key={todo.id}
                className={`flex items-center justify-between px-4 py-2 rounded-md
              transition-all duration-200
              hover:scale-105 
              ${todo.completed ? 'bg-green-100' : 'bg-gray-100'}`}
              >
                <span
                  onClick={() => this.toggleTodo(todo.id)}
                  className={`flex items-center gap-2 cursor-pointer select-none ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                    }`}
                >
                  <input
                    type="checkbox"
                    className='scale-150 accent-green-500 cursor-pointer '
                    checked={todo.completed}
                  />
                  {todo.text}
                </span>
                <button
                  onClick={() => this.deleteTodo(todo.id)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div></li>
          ))}
        </ul>
      </div>
    )
  }
}

export default App
