import React, { Component } from "react";
import shortid from 'shortid';


class Todo extends Component {
    
    input = React.createRef()

    state = {      
      todos:[],
    }

    componentDidMount() {
        const todos = window.localStorage.getItem("todos");
        const parsedList = JSON.parse(todos);
        if(todos == null) {
            return false
        } else {
            this.setState({ todos: parsedList })
            console.log(this.state.todos);
        }
    }

    addTodo = () => {
        const Items = {
            id: shortid.generate(),
            value: this.input.current.value,
        };

        if(localStorage.getItem("todos") == null) {
            const todos = []
            todos.push(Items);
            localStorage.setItem("todos", JSON.stringify(todos))
        } else {
            const todos = JSON.parse(localStorage.getItem("todos"))
            todos.push(Items)
            localStorage.setItem("todos", JSON.stringify(todos))
            this.input.current.value = "";
        }
        this.setState({
          todos:JSON.parse(localStorage.getItem("todos"))

        });
    }

    updateTodo = (event) => {
        let index = event.target.getAttribute("data-key");
        let item = JSON.parse(localStorage.getItem("todos"));

    }

    
    deleteTodo = (event) => {        
        let index = event.target.getAttribute("data-key")
        let todoValue = JSON.parse(localStorage.getItem("todos"));
        todoValue.splice(index,1)
        this.setState({
          todos: todoValue
        });
        localStorage.setItem("todos", JSON.stringify(todoValue))
    }

    
    
    render() {
        return (
            <div className="main-container">
                <h1>To Do List</h1>
                <hr/>
                <div className="container">
                    <input type="text" placeholder="Add Something To Do..." ref={this.input}></input>
                        <button onClick={this.addTodo} className="button" >Add</button>
                          <ul>
                            {this.state.todos.map((item, index) => {
                                  return(
                                    <li key={item.id}>
                                    <input type="text" placeholder={item.value} ref={item.value}></input>
                                    <button className="button" type="button" value="delete" data-key={index} onClick={this.deleteTodo}>Delete</button>
                                    <button className="u-button" type="button" value="update" data-key={index} onClick={this.updateTodo}>Update</button>
                                    </li>
                                  )
                                })
                            } 
                          </ul>
                </div>
                
            </div>
        )
    }
}

export default Todo;