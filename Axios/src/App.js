import React, { Component } from 'react'
import api from './API.js'

export class App extends Component {

    state = {
        cources: []
    }


    constructor() {
        super()
        this.fetchData()
    }


    // Read Data with get 
    fetchData = async ()=> {
        let data = await api.get('/contacts', {
            params: {
                _limit: 2,
                _start: 5
            }
        })
        .then((res) => {
            console.log(res)
            return res.data
        })
        this.setState({ cources: data })
    }

	
    // Creatr New Data with post
    createCourse = async ()=> {
        await api.post('/contacts', {
            id: 7, title: 'Test food', category: 'food', price: 3000
        })

        this.fetchData()
    }



    // Update data with put/ patch
    updateCourse = async ()=> {
        await api.patch('/contacts/7', {
            title: 'Test the buger'
        })

        this.fetchData()
    }


    

    // Delete Data with delete
    deleteCourse = async ()=> {
        await api.delete('/contacts/7')

        this.fetchData()
    }




    render() {
        return (
            <div>
                <h1> Get The Data </h1>
                {
                    this.state.cources.map(d => {
                        return <h2 key={d.id}>{d.title}</h2>
                    })
                }

                <br />
                <button onClick={this.createCourse}> Create Contacts</button>
                <button onClick={this.updateCourse}> Update Contacts</button>
                <button onClick={this.deleteCourse}> Delete Contacts</button>
            </div>
        )
    }


}

export default App
