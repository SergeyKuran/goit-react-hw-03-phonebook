import React, { Component } from 'react';

// Імпорт компонентів
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

// Імпорт стилів
import css from '../components/App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const getData = localStorage.getItem('contacts');
    const dataParse = JSON.parse(getData);
    if (dataParse) {
      this.setState({ contacts: dataParse });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  // Метод добавлення об'єкта у масив
  addObject = props => {
    const find = this.state.contacts.find(
      el => el.name.toLowerCase() === props.name.toLowerCase()
    );

    // Умова
    if (find) {
      return alert(`${props.name} is already in contacts`);
    }

    this.setState(prevState => {
      return { contacts: [...prevState.contacts, props] };
    });
  };

  // // Метод видалення об'єкта з масиву
  deleteObject = id => {
    this.setState(prevetState => {
      return {
        contacts: prevetState.contacts.filter(el => el.id !== id),
      };
    });
  };
  // Метод стягування данних при пошуку
  onChange = evt => {
    this.setState({
      filter: evt.target.value,
    });
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <>
        <div className={css.phonebook}>
          <h2>Phonebook</h2>
          <ContactForm onSubmit={this.addObject} />
        </div>
        <div className={css.contacts}>
          <h3>Contacts</h3>
          <Filter filter={filter} onChange={this.onChange} />

          <ContactList
            contacts={contacts}
            value={filter}
            deleteObject={this.deleteObject}
          />
        </div>
      </>
    );
  }
}

export { App };
