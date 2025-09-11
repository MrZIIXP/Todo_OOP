import React from 'react'

const API = "https://68500995e7c42cfd17971442.mockapi.io/Todo"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: false,
      isFirst: true
    }
  }
  componentDidMount() {
    this.Get()
  }

  async Get() {
    this.setState({ loading: true })
    try {
      const responce = await fetch(API)
      const data = await responce.json()
      this.setState({ data })
    } finally {
      this.setState({ loading: false })
      this.setState({ isFirst: false })
    }
  }

  async AddTodo(data) {
    if (data?.text?.trim() !== "") {
      try {
        await fetch(API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
        this.Get()
      } catch (error) { }
    }
  }

  async DelTodo(id) {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" })
      this.Get()
    } catch (error) { }
  }

  async Check(id, completed) {
    try {
      await fetch(`${API}/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ completed: completed }) })
      this.Get()
    } catch (error) {

    }
  }

  render() {
    const { data, loading, isFirst } = this.state
    if (loading && isFirst) {
      return <div className='flex justify-center items-center h-screen flex-col'>
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-r-4 border-blue-500"></div>
        <h1>Загрузка</h1>
      </div>
    }

    return (<div className='max-h-[80vh] w-full'>
      <div className='max-w-1/3 mx-auto h-fill w-full p-2 rounded-lg gap-2 flex-col pb-10 shadow-lg flex items-center mt-20'>
        <h1 className='text-xl font-semibold'>Todo Async OOP</h1>
        <form className={`border-2 border-blue-500 w-[80%] rounded-md flex`} onSubmit={(e) => {
          e.preventDefault()
          const obj = {
            text: e.target.name.value,
            completed: false,
            id: Date.now() + Math.random()
          }
          this.AddTodo(obj)
          e.target.reset()
        }} >
          <input type="text" name="name" id="" className='w-full py-2 px-3 outline-none' />
          <button type="submit" className='bg-blue-500 px-3 py-2 rounded-none text-white'>Submit</button>
        </form>
        <br />
        <div className='w-4/5 gap-2 flex flex-col-reverse'>
          {data && data.map((item, index) => {
            return <div onClick={() => this.Check(item.id, !item.completed)} className={`shadow-md py-3 ${item.completed && "bg-green-200"} px-5 rounded-2xl flex justify-between items-center`} key={index}>
              <p className={`text-lg flex items-center gap-1 ${item.completed && "line-through"}`}><input type="checkbox" className='scale-150 accent-green-500' checked={item.completed} />{item.text}</p>
              <div onClick={(e) => e.stopPropagation()}><button onClick={() => this.DelTodo(item.id)} className='text-red-500 cursor-pointer'>X</button></div>
            </div>
          })}
        </div>
      </div>
    </div>)
  }
}

export default App