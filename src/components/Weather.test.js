import { render, screen, cleanup, fireEvent, waitFor, act } from '@testing-library/react';
import Weather from './Weather';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducers from './store'
import configureStore from 'redux-mock-store'

import { set_input, set_apiData, set_data, set_error } from './actions/weatherAction';
import weatherReducer from './reducers/weatherReducer';

const store = createStore(
  rootReducers
);

const middlewares = weatherReducer
const mockStore = configureStore(middlewares)

afterEach(cleanup)

global.fetch = jest.fn(() => {
  Promise.resolved({
    json: () => 
      Promise.resolved({
        location: {
          region: "West Midlands",
          localtime: "10:00"
        },
        current: {
          temp_c: "20",
          feelslike_c: "13",
          humidity: "90",
          condition: {
            text: "Hot"
          }
        }
      })
  })
})

describe('Integration testing for Weather', () => {

  test('Weather page renders correctly', () => {
      render(
        // Arrange
        <Provider store={store} >
          <Weather />
        </Provider>
      );
      // Assert
      const titleElement = screen.getByText("Welcome to the Weather Page");
      const headingElement = screen.getByText("Find Current Weather Conditions...")
      // Expect
      expect(titleElement).toBeInTheDocument();
      expect(headingElement).toBeInTheDocument();
    });

  test('Test correct API call', async () => {
    const { debug } = render(
      <Provider store={store} >
          <Weather />
      </Provider>
    )

    const fakeData = {
      "location": {
          "name": "Coventry",
          "region": "West Midlands",
          "country": "United Kingdom",
          "localtime": "2021-03-26 10:41"
      },
      "current": {
          "temp_c": 5.5,
          "condition": {
              "text": "Patchy rain possible",
              "icon": "//cdn.weatherapi.com/weather/64x64/day/176.png",
          },
          "humidity": 83,
          "cloud": 72,
          "feelslike_c": 1.5,
      }
  }

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        "ok": true,
        json: () => Promise.resolve(fakeData)
      })
    );
    const cityInput = screen.getByLabelText('Enter City Name')
    
    fireEvent.change(cityInput, { target: { value: "Coventry" } })
    // debug()
    await waitFor(async () => fireEvent.click(screen.getByText('Search')))
    // debug()

    expect(screen.getByText("Region: West Midlands")).toBeInTheDocument()
    global.fetch.mockRestore();
  })

  test('Test bad API call', async () => {
    const { debug } = render(
      <Provider store={store}>
        <Weather />
      </Provider>
    )

    const fakeData = {

  }

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        "ok": false,
        json: () => Promise.resolve(fakeData)
      })
    );
    const cityInput = screen.getByLabelText('Enter City Name')
    
    fireEvent.change(cityInput, { target: { value: "Covetryidbchjbaw" } })
    await waitFor(async () => fireEvent.click(screen.getByText('Search')))

    expect(screen.getByText("Bad request...")).toBeInTheDocument()
    global.fetch.mockRestore();
  })
})

describe('returns the correct action when called', () => {
  it('set_input action', () => {
    const data = 'Coventry'
    const expectedAction = {
      type: 'SET_INPUT',
      payload: data
    }
    expect(set_input(data)).toEqual(expectedAction)
  })

  it('set_apiData action', () => {
    const json = {
      location: {
        region: "West Midlands",
        localtime: "10:00"
      }
    }

    const expectedAction = {
      type: 'SET_API_DATA',
      payload: json
    }

    expect(set_apiData(json)).toEqual(expectedAction)
  })

  it('set_data action', () => {
    const data = "Coventry"

    const expectedAction = {
      type: 'SET_DATA',
      payload: data
    }
    
    expect(set_data(data)).toEqual(expectedAction)
  })

  it('set_error action', () => {
    const error = "Undefined"

    const expectedAction = {
      type: 'SET_ERROR',
      payload: error
    }
    
    expect(set_error(error)).toEqual(expectedAction)
  })
})

describe('weather store', () => {
  it('returns correct payload for set_input', () => {
      // Initialize mockstore with empty state
      const initialState = {}
      const store = mockStore(initialState)

      // Dispatch the action
      store.dispatch(set_input("Coventry"))

      // Test if your store dispatched the expected actions with the correct payload
      const actions = store.getActions()
      // console.log(actions)
      const expectedPayload = { type: 'SET_INPUT', payload: "Coventry" }
      expect(actions).toEqual([expectedPayload])
  })

  it('returns correct payload for set_apiData', () => {
    // Initialize mockstore with empty state
    const initialState = {}
    const store = mockStore(initialState)

    // Dispatch the action
    store.dispatch(set_apiData({ location: { temp_c: 12, region:"West Midlands" } }))

    // Test if your store dispatched the expected actions with the correct payload
    const actions = store.getActions()
    // console.log(actions)
    const expectedPayload = { type: 'SET_API_DATA', payload: { location: { temp_c: 12, region:"West Midlands" } } }
    expect(actions).toEqual([expectedPayload])
  })

  it('returns correct payload for set_data', () => {
    // Initialize mockstore with empty state
    const initialState = {}
    const store = mockStore(initialState)

    // Dispatch the action
    store.dispatch(set_data("Coventry"))

    // Test if your store dispatched the expected actions with the correct payload
    const actions = store.getActions()
    // console.log(actions)
    const expectedPayload = { type: 'SET_DATA', payload: "Coventry" }
    expect(actions).toEqual([expectedPayload])
  })

  it('returns correct payload for set_error', () => {
    // Initialize mockstore with empty state
    const initialState = {}
    const store = mockStore(initialState)

    // Dispatch the action
    store.dispatch(set_error("Undefined"))

    // Test if your store dispatched the expected actions with the correct payload
    const actions = store.getActions()
    // console.log(actions)
    const expectedPayload = { type: 'SET_ERROR', payload: "Undefined" }
    expect(actions).toEqual([expectedPayload])
  })
})
