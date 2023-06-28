import React from 'react';
import PropTypes from 'prop-types';

//  Імпорт стилів
import css from '../ContactList/ContactList.module.css';

// Компонеет для рендеру списку контактів
const ContactList = ({ contacts, value, deleteObject }) => (
  <div>
    <ul className={css.ul}>
      {contacts
        .filter(el => el.name.toLowerCase().includes(value.toLowerCase()))
        .map(({ id, name, number }) => (
          <li key={id}>
            {name}: {number}
            <button
              type="button"
              onClick={() => {
                deleteObject(id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
    </ul>
  </div>
);

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  deleteObject: PropTypes.func.isRequired,
};

export default ContactList;
