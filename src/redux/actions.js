import apiService from '../services/apiService';
import { LOAD_CONTACTS, TOGGLE_MODAL_A, TOGGLE_MODAL_B } from './actionTypes';

export const toggleModalA = (isOpen) => ({
  type: TOGGLE_MODAL_A,
  payload: isOpen,
});

export const toggleModalB = (isOpen) => ({
  type: TOGGLE_MODAL_B,
  payload: isOpen,
});

export const loadContacts = (companyId, query, page, countryId) => async (dispatch) => {
  try {
    const response = await apiService.get('/contacts.json', {
      params: { companyId, query, page, countryId },
    });

    dispatch({
      type: LOAD_CONTACTS,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error loading contacts:', error);
  }
};