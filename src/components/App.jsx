import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import css from "./App.module.css"
import {useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

// export class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//     name: '',
//     number: '',
//   };

  export const App = () => {
    const [contacts, setContacts] = useState(
      () => JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
    const [filter, setFilter] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

  
    useEffect(() => {
      const localStorageContacts = JSON.parse(localStorage.getItem('contacts'));
      if (localStorageContacts) {
        localStorage.setItem('contacts', JSON.stringify(contacts));
      }
    }, [contacts]);


  // componentDidMount = () => {
  //   const localStorageContacts = JSON.parse(localStorage.getItem('contacts'));
  //   if (localStorageContacts) {
  //     this.setState({ contacts: localStorageContacts });
  //   }
  // };

  // const componentDidUpdate = () => {
  //   localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  // };

  const handleChange = event => {
    setName({ name: event.target.value });
  };

  const handleChangeNumber = event => {
    setNumber({ number: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
const newContact =  { id: nanoid(), name: name, number: number }
    // this.componentDidUpdate(newContact);
   
    contacts.find(contactName => 
        contactName.name.toLowerCase() === event.target.name.value.toLowerCase()
    )
      ? window.alert(`${contacts.name} is already in contacts`)
      : setContacts( [
            ...contacts,
            newContact,
          ],
        );

    event.target.name.value = '';
    event.target.number.value = '';
  };

  const handleChangeFilter = event => {
    setFilter({ filter: event.target.value });
  };

  const deleteButton = event => {
    setContacts(contacts.filter(contact => contact.name!== event.target.name))
    
  }

  const nameInputId = nanoid();

 
    return (
      <div
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
          
        }}
      >
        <p className={css.p}>Phonebook</p>
        <ContactForm
          handleSubmit={handleSubmit}
          nameInputId={nameInputId}
          handleChange={handleChange}
          handleChangeNumber={handleChangeNumber}
          handleChangeFilter={handleChangeFilter}
        ></ContactForm>
        <p className={css.p}>Contacts</p>

        <ContactList
          contacts={contacts}
          filter={filter}
          handleChangeFilter={handleChangeFilter}
          deleteButton = {deleteButton}
        ></ContactList>
      </div>
    );
  }


