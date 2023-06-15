import React, { Component } from 'react';
import { nanoid } from 'nanoid';

// Імпорт стилів
import css from '../ContactForm/ContactForm.module.css';

// Клас для відображення форми
class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  //  Метод зв'язки данних імпуту зі стейтом
  handleChange = evt => this.setState({ [evt.target.name]: evt.target.value });

  //  Метод для форми
  handleSubmit = evt => {
    evt.preventDefault();

    // Передача данних
    this.setState({ [evt.target.name]: evt.target.value });

    //Передача об'єкта у пропси у головний компонент
    this.props.onSubmit({
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    });

    //Анулювання введених данних
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
          />
        </label>

        <label>
          Number
          <input
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleChange}
          />
        </label>

        <button className={css.button} type="submit">
          Add contacts
        </button>
      </form>
    );
  }
}

export default ContactForm;
