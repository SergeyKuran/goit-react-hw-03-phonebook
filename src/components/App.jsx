import React, { Component } from 'react';

// import { nanoid } from 'nanoid';

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

  // // Метод виделення об'єкта з масиву
  deleteObject = id => {
    this.setState(prevetState => {
      return {
        contacts: prevetState.contacts.filter(el => el.id !== id),
      };
    });
  };

  // Метод добавлення об'єкта у масив
  addObject = props => {
    const find = this.state.contacts.find(
      el => el.name.toLowerCase() === props.name.toLowerCase()
    );

    // Умова
    if (find) {
      return alert(`${props.name} is already in contacts`);
    }

    this.setState(prevetState => {
      return { contacts: [...prevetState.contacts, props] };
    });
  };

  // Метод стягування данних при пошуку
  onChange = evt => {
    this.setState({
      filter: evt.target.value,
    });
  };

  componentDidUpdate(nextProps, nextState) {
    const data = localStorage.setItem('contacts', JSON.stringify(nextProps));
    console.log(data, 'data');
    this.setState({ contacts: data });
  }

  componentDidMount() {
    // const data = localStorage.getItem('contacts');
    // console.log(data);
    // const result = JSON.parse(data);
    // console.log(result);
    // if (result) {
    // localStorage.getItem();
    // }
    //   console.log('object no');
  }

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
            filter={filter}
            deleteObject={this.deleteObject}
          />
        </div>
      </>
    );
  }
}

export { App };
