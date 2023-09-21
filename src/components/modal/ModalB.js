import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadContacts, toggleModalA, toggleModalB } from '../../redux/actions';
import { Modal, Button, FormControl, Form } from 'react-bootstrap';
import ContactList from './../common/ContactList';
import { companyId, countryIdUS, defaultPage } from '../../utils/const';

const ModalB = () => {  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const contacts = useSelector(state => state.filteredContacts);
  const modalBOpen = useSelector(state => state.rootReducer.modalBOpen);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [loading, setLoading] = useState(false);
  const [onlyEven, setOnlyEven] = useState(false);
  const [contactsList, setContactsList] = useState([])

  const handleClose = () => {
    dispatch(toggleModalB(false));
    navigate('/');
  };

  const handleSearch = () => {
    dispatch(loadContacts(companyId, searchQuery, defaultPage, countryIdUS));
  };

  const handleSwitchToModalA = () => {
    dispatch(toggleModalB(false));
    dispatch(toggleModalA(true));
    navigate('/modalA');
  };

  const handleScroll = (e) => {
    const { target } = e;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      if (!loading) {
        setLoading(true);
        setCurrentPage(currentPage + 1);
        dispatch(loadContacts(companyId, searchQuery, currentPage + 1, countryIdUS)).then(() => {
          setLoading(false);
        });
      }
    }
  };

  useEffect(() => {
    if (modalBOpen) {
      handleSearch();
    }else if (location.pathname === '/modalB'){
      dispatch(toggleModalB(true));
      dispatch(toggleModalA(false));
    }
  }, [modalBOpen]);

  useEffect(() => {
    if(onlyEven){
      setContactsList(contacts?.filter(contact => contact.id % 2 === 0))
    }else{
      setContactsList(contacts)
    }
  },[contacts, onlyEven])

  return (
    <Modal show={modalBOpen} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Modal B</Modal.Title>
      </Modal.Header>
      <Modal.Body onScroll={handleScroll}>
        <FormControl
          type="text"
          placeholder="Search US contacts"
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
            id="onlyEvenCheckboxB"
            label="Only even"
            checked={onlyEven}
            onChange={() => setOnlyEven(!onlyEven)}
          />
        </div>
        <div>
          <Button className='mr-2' variant="secondary" onClick={handleSwitchToModalA}>
            All Contacts
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

export default ModalB;