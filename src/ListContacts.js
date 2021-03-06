import React from 'react'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends React.Component {
    static propTypes = {
        contacts: propTypes.array.isRequired,
        onDeleteContact:  propTypes.func.isRequired
    }
    state = {
        query: ''
    }
    _updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }
    _clearQuery = () => {
        this.setState({ query: '' })
    }
    render() {
        const { contacts, onDeleteContact } = this.props
        const { query } = this.state
        let showingContacts
        if ( query ){
            const match = new RegExp( escapeRegExp( query ), 'i' )
            showingContacts = contacts.filter( ( contact ) => match.test( contact.name ) )
        }else{
            showingContacts = contacts
        }
        showingContacts.sort( sortBy( 'name' ) )

        return(
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input 
                        className='search-contacts'
                        type='text'
                        placeholder='Search Contacts' 
                        value={ query }
                        onChange={ ( evt ) => this._updateQuery(evt.target.value) }
                    />
                    <Link 
                        to='/create' 
                        className='add-contact'
                    >
                        Add Contact
                    </Link>
                </div>

                { showingContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                        <span>{`Now Showing ${showingContacts.length} of ${contacts.length}`}</span>
                        <button onClick={ this._clearQuery }>Show All</button>
                    </div>
                )}

                <ol className='contact-list'>
                    {showingContacts.map(( contact )=>(
                        <li key={ contact.id } className='contact-list-item'>
                            <div className='contact-avatar' style={{
                                backgroundImage: `url(${contact.avatarURL})`
                            }} />
                            <div className='contact-details'>
                                <p>{ contact.name }</p>
                                <p>{ contact.email }</p>
                            </div>
                            <button 
                                className='contact-remove' 
                                onClick={ () => onDeleteContact( contact )} 
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        ) //return end
    } //render end
}


export default ListContacts




