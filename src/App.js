import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'


class App extends Component {
    state= {
        contacts: []
    } 
    componentDidMount(){
        ContactsAPI.getAll().then((contacts) => {
            this.setState({ contacts })
            })
    }
    _deleteContact = (contact) => {
        this.setState((prevState) => ({
            contacts: prevState.contacts.filter( (c) => c.id !== contact.id )
        }))

        ContactsAPI.remove(contact)
    
    }   

    _createContact(contact){
        ContactsAPI.create(contact).then(contact => {
            this.setState(prevState => ({
                contacts: prevState.contacts.concat([ contact ])
            }))
        })
    }
    render() {
        return (
          <div className='app'>
            <Route exact path='/' render={ () =>(
                <ListContacts 
                    contacts={this.state.contacts} 
                    onDeleteContact={this._deleteContact}
                />
            )}/>
            <Route path='/create' render={ ({history}) => (
                <CreateContact
                    onCreateContact={ (contact) => { 
                        this._createContact( contact ) 
                        history.push('/')
                    }}
                /> 
            )}/>
          </div>
        )
    }
}

export default App;
