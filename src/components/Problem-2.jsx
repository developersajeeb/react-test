import React, { useState, useEffect } from 'react';

const Problem2 = () => {
  const [modalAOpen, setModalAOpen] = useState(false);
  const [modalBOpen, setModalBOpen] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch contacts from the API using the provided URL
    const fetchContacts = async () => {
      const response = await fetch('https://contact.mediusware.com/api/contacts');
      const data = await response.json();
      setContacts(data);
      setFilteredContacts(data);
    };

    fetchContacts();
  }, []);

  const openModalA = () => {
    setModalAOpen(true);
  };

  const openModalB = () => {
    setModalBOpen(true);
  };

  const closeModal = () => {
    setModalAOpen(false);
    setModalBOpen(false);
  };

  const handleCheckboxChange = () => {
    setCheckboxChecked(!checkboxChecked);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    // Filter contacts based on search query and checkbox status
    let filtered = contacts;

    if (searchQuery) {
      filtered = filtered.filter((contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (checkboxChecked) {
      filtered = filtered.filter((contact) => contact.id % 2 === 0);
    }

    setFilteredContacts(filtered);
  }, [searchQuery, checkboxChecked, contacts]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={openModalA}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={openModalB}
          >
            US Contacts
          </button>
        </div>

        {modalAOpen && (
          <div className="modal">
            <div className="modal-content">
              <h3>Modal A</h3>
              <button className="btn btn-primary" onClick={openModalA}>
                All Contacts
              </button>
              <button className="btn btn-primary" onClick={openModalB}>
                US Contacts
              </button>
              <button className="btn btn-primary" onClick={closeModal}>
                Close
              </button>
              <input
                type="checkbox"
                id="onlyEvenCheckbox"
                checked={checkboxChecked}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="onlyEvenCheckbox">Only even</label>
              <input
                type="text"
                placeholder="Search contacts"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {/* Display filtered contacts */}
              <ul>
                {filteredContacts.map((contact) => (
                  <li key={contact.id}>{contact.name}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {modalBOpen && (
          <div className="modal">
            <div className="modal-content">
              <h3>Modal B</h3>
              <button className="btn btn-primary" onClick={openModalA}>
                All Contacts
              </button>
              <button className="btn btn-primary" onClick={openModalB}>
                US Contacts
              </button>
              <button className="btn btn-primary" onClick={closeModal}>
                Close
              </button>
              <input
                type="checkbox"
                id="onlyEvenCheckbox"
                checked={checkboxChecked}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="onlyEvenCheckbox">Only even</label>
              <input
                type="text"
                placeholder="Search contacts"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {/* Display filtered contacts */}
              <ul>
                {filteredContacts.map((contact) => (
                  <li key={contact.id}>{contact.name}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Problem2;
