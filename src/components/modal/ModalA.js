import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadContacts, toggleModalA, toggleModalB } from '../../redux/actions';
import { Modal, Button, FormControl, Form } from 'react-bootstrap';
import ContactList from './../common/ContactList';
import { companyId, defaultPage } from '../../utils/const';

const ModalA = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const contacts = useSelector(state => state.filteredContacts);
  const modalAOpen = useSelector(state => state.rootReducer.modalAOpen);
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [loading, setLoading] = useState(false);
  const [onlyEven, setOnlyEven] = useState(false);
  const [contactsList, setContactsList] = useState([])

  const handleClose = () => {
    dispatch(toggleModalA(false));
    navigate('/');
  };

  const handleSearch = () => {
    dispatch(loadContacts(companyId, searchQuery, defaultPage, null, onlyEven));
  };

  const handleSwitchToModalB = () => {
    dispatch(toggleModalA(false));
    dispatch(toggleModalB(true));
    navigate('/modalB');
  };

  const handleScroll = (e) => {
    const { target } = e;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      if (!loading) {
        setLoading(true);
        setCurrentPage(currentPage + 1);
        dispatch(loadContacts(companyId, searchQuery, currentPage + 1, null, onlyEven)).then(() => {
          setLoading(false);
        });
      }
    }
  };

  useEffect(() => {
    if (modalAOpen) {
      handleSearch();
    }else if (location.pathname === '/modalA'){
      dispatch(toggleModalA(true));
      dispatch(toggleModalB(false));
    }
  }, [modalAOpen, onlyEven]);

  useEffect(() => {
    if(onlyEven){
      setContactsList(contacts?.filter(contact => contact.id % 2 === 0))
    }else{
      setContactsList(contacts)
    }
  },[contacts, onlyEven])

  return (
    <Modal show={modalAOpen} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Modal A</Modal.Title>
      </Modal.Header>
      <Modal.Body onScroll={handleScroll}>
        <FormControl
          type="text"
          placeholder="Search contacts"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onBlur={handleSearch}
        />
        <ContactList contacts={contactsList} />
        {loading && <p>Loading...</p>}
      </Modal.Body>
      <Modal.Footer>
        <div className='d-flex justify-content-between align-items-center w-100'>
          <div>
            <Form.Check
            type="checkbox"
            id="onlyEvenCheckboxA"
            label="Only even"
            checked={onlyEven}
            onChange={() => setOnlyEven(!onlyEven)}
          />
          </div>
          <div>
            <Button className='mr-2' variant="secondary" onClick={handleSwitchToModalB}>
              US Contacts
            </Button>
            <Button className="close-button" variant="primary" onClick={handleClose}>
              Close
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalA;