import { render, screen, cleanup, fireEvent, waitFor } from './test.utils';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducers from './store'
import About from './About';
import configureStore from 'redux-mock-store'

import { get_id } from './actions/aboutAction';
import aboutReducer from './reducers/aboutReducer';

const store = createStore(
  rootReducers
);

const middlewares = aboutReducer
const mockStore = configureStore(middlewares)

afterEach(cleanup)

// describe('Integration testing for About', () => {
//   it('About page renders correctly', () => {

//     const initialState = {}
//     const store = mockStore(initialState)

//     render(
//       // Arrange
//       <Provider store={store} >
//         <About />
//       </Provider>
//     );
//     // Assert
//     const textElement = screen.getByText("Select our offices worldwide!");
//     const selectButton = screen.getByText("Dropdown button")
//     // Expect
//     expect(textElement).toBeInTheDocument();
//     expect(selectButton).toBeInTheDocument();
//   });

//   it('Select dropdown option', async () => {
//     const { debug } = render(
//       // Arrange
//       <Provider store={store} >
//         <About />
//       </Provider>
//     );
//     // Assert
//     fireEvent.click(screen.getByText('Dropdown button'))
//     await waitFor(() => fireEvent.click(screen.getByText("Manchester")))
//     // debug()
//     // Expect
//     const descriptionElement = screen.getByText('The city: Manchester')
//     expect(descriptionElement).toBeInTheDocument()
//   });

// })

  describe('get_id action', () => {
    it('returns the correct action', () => {
      const id = 1
      const expectedAction = {
        type: 'GET_CITY_ID',
        payload: id
      }
      expect(get_id(id)).toEqual(expectedAction)
    })
  })

  describe('about reducer', () => {
    it('returns initial state', () => {
      expect(aboutReducer(undefined, {})).toEqual(null)
    })

    it('handles GET_ID_CITY', () => {
      const action = get_id(1)
      expect(aboutReducer(undefined, action)).toEqual(1)
    })
  })

  // Tringger unit tests written in code within pipelines
  // Sonarcloud

  describe('about store', () => {
    it('returns correct payload for get_id', () => {
        // Initialize mockstore with empty state
        const initialState = {}
        const store = mockStore(initialState)

        // Dispatch the action
        store.dispatch(get_id(0))

        // Test if your store dispatched the expected actions with the correct payload
        const actions = store.getActions()
        // console.log(actions)
        const expectedPayload = { type: 'GET_CITY_ID', payload: 0 }
        expect(actions).toEqual([expectedPayload])
    })
  })

  describe('connected about component', () => {
    it('Renders the connected About with updated state', () => {
      render(<About />, { initialState: { city_id: '1' }, reducer: aboutReducer })

      expect(screen.getByText(/manchester/i)).toBeInTheDocument()
    })
  })
