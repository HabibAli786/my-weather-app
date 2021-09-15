import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducers from './store'
import Contact from './Contact';
import configureStore from 'redux-mock-store'

import { set_name, set_surname, set_address, set_phone, set_submitted } from './actions/contactAction';
import contactReducer from './reducers/contactReducer';

const middlewares = contactReducer
const mockStore = configureStore(middlewares)

const store = createStore(
  rootReducers
);

afterEach(cleanup)

describe('Contact store', () => {
  test('Contact page renders correctly', () => {
      render(
        // Arrange
        <Provider store={store} >
          <Contact />
        </Provider>
      );
      // Assert
      const titleElement = screen.getByText("Contact Us");
      const headingElement = screen.getByText("Enter your details below and submit...")
      // Expect
      expect(titleElement).toBeInTheDocument();
      expect(headingElement).toBeInTheDocument();
    });

    test('Enter all details into form', async () => {
      const { debug } = render(
        // Arrange
        <Provider store={store} >
          <Contact />
        </Provider>
      );
      // Assert
      const nameInput = screen.getByLabelText('Name')
      const snameInput = screen.getByLabelText('Surname')
      const addressInput = screen.getByLabelText('Address')
      const numInput = screen.getByLabelText("Phone Number")
      debug()
      // const ele = document.querySelector('input[name="name"]')

      fireEvent.change(nameInput, { target: { value: "Habib" } })
      debug()
      fireEvent.change(snameInput, { target: { value: "Ali" } })
      // console.log(ele.value)
      fireEvent.change(addressInput, { target: { value: "Winsford" } })
      fireEvent.change(numInput, { target: { value: '0776' } })

      await waitFor(() => fireEvent.click(screen.getByText('Submit')))
      // debug()

      // Expect
      expect(screen.getByText('Name: Habib')).toBeInTheDocument()
      expect(screen.getByText('Surname: Ali')).toBeInTheDocument()
      expect(screen.getByText('Address: Winsford')).toBeInTheDocument()
      expect(screen.getByText('Phone Number: 0776')).toBeInTheDocument()
  });
})

describe('contact actions', () => {
  it('returns the correct action for set_name', () => {
      const name = "Habib"
      const expectedAction = {
        type: 'SET_NAME',
        payload: name
      }
      expect(set_name(name)).toEqual(expectedAction)
    })

  it('returns the correct action for set_surname', () => {
      const surname = "Ali"
      const expectedAction = {
        type: 'SET_SURNAME',
        payload: surname
      }
      expect(set_surname(surname)).toEqual(expectedAction)
    })

    it('returns the correct action for set_address', () => {
      const address = "Warwick Road"
      const expectedAction = {
        type: 'SET_ADDRESS',
        payload: address
      }
      expect(set_address(address)).toEqual(expectedAction)
    })

    it('returns the correct action for set_phone', () => {
      const phone = '0775'
      const expectedAction = {
        type: 'SET_PHONE',
        payload: phone
      }
      expect(set_phone(phone)).toEqual(expectedAction)
    })

    it('returns the correct action for set_submitted', () => {
      const isSubmitted = true
      const expectedAction = {
        type: 'SET_SUBMITTED',
        payload: isSubmitted
      }
      expect(set_submitted(isSubmitted)).toEqual(expectedAction)
    })
})

describe('contact reducer', () => {

  it('returns initial state', () => {
      expect(contactReducer(undefined, {})).toEqual(
        {"address": null, "isSubmitted": false, "name": null, "phone": null, "surname": null}
      )
    })

    it('returns updated state for set_name', () => {
      expect(contactReducer(undefined, {type: 'SET_NAME', payload: "Habib"})).toEqual(
        {"address": null, "isSubmitted": false, "name": "Habib", "phone": null, "surname": null}
      )
    })

    it('returns updated state for set_surname', () => {
      expect(contactReducer(undefined, {type: 'SET_SURNAME', payload: "Ali"})).toEqual(
        {"address": null, "isSubmitted": false, "name": null, "phone": null, "surname": "Ali"}
      )
    })

    it('returns updated state for set_address', () => {
      expect(contactReducer(undefined, {type: 'SET_ADDRESS', payload: "Warwick"})).toEqual(
        {"address": "Warwick", "isSubmitted": false, "name": null, "phone": null, "surname": null}
      )
    })

    it('returns updated state for set_phone', () => {
      expect(contactReducer(undefined, {type: 'SET_PHONE', payload: "0785"})).toEqual(
        {"address": null, "isSubmitted": false, "name": null, "phone": "0785", "surname": null}
      )
    })

    it('returns updated state for set_submitted', () => {
      expect(contactReducer(undefined, {type: 'SET_SUBMITTED', payload: true})).toEqual(
        {"address": null, "isSubmitted": true, "name": null, "phone": null, "surname": null}
      )
    })
})

describe('contact store', () => {
  it('returns correct payload for set_name', () => {
      // Initialize mockstore with empty state
      const initialState = {}
      const store = mockStore(initialState)

      // Dispatch the action
      store.dispatch(set_name("Habib"))

      // Test if your store dispatched the expected actions with the correct payload
      const actions = store.getActions()
      // console.log(actions)
      const expectedPayload = { type: 'SET_NAME', payload: "Habib" }
      expect(actions).toEqual([expectedPayload])
  })

  it('returns correct payload for set_surname', () => {
    // Initialize mockstore with empty state
    const initialState = {}
    const store = mockStore(initialState)

    // Dispatch the action
    store.dispatch(set_surname("Ali"))

    // Test if your store dispatched the expected actions with the correct payload
    const actions = store.getActions()
    // console.log(actions)
    const expectedPayload = { type: 'SET_SURNAME', payload: "Ali" }
    expect(actions).toEqual([expectedPayload])
  })

  it('returns correct payload for set_address', () => {
    // Initialize mockstore with empty state
    const initialState = {}
    const store = mockStore(initialState)

    // Dispatch the action
    store.dispatch(set_address("Warwick"))

    // Test if your store dispatched the expected actions with the correct payload
    const actions = store.getActions()
    // console.log(actions)
    const expectedPayload = { type: 'SET_ADDRESS', payload: "Warwick" }
    expect(actions).toEqual([expectedPayload])
  })

  it('returns correct payload for set_phone', () => {
    // Initialize mockstore with empty state
    const initialState = {}
    const store = mockStore(initialState)

    // Dispatch the action
    store.dispatch(set_phone("075"))

    // Test if your store dispatched the expected actions with the correct payload
    const actions = store.getActions()
    // console.log(actions)
    const expectedPayload = { type: 'SET_PHONE', payload: "075" }
    expect(actions).toEqual([expectedPayload])
  })

  it('returns correct payload for set_submitted', () => {
    // Initialize mockstore with empty state
    const initialState = {}
    const store = mockStore(initialState)

    // Dispatch the action
    store.dispatch(set_submitted(true))

    // Test if your store dispatched the expected actions with the correct payload
    const actions = store.getActions()
    // console.log(actions)
    const expectedPayload = { type: 'SET_SUBMITTED', payload: true }
    expect(actions).toEqual([expectedPayload])
  })

})