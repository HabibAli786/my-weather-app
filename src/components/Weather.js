// import './App.css';

import { useEffect, useState } from "react";
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { set_apiData, set_data, set_error, set_input } from './actions/weatherAction';
// const weatherData =  require('./weatherInfo.json')

function Weather(props) {

    // const [data, setData] = useState(null)

    // const [input, setInput] = useState(null)

    // const [apiData, setApiData] = useState(null)

    // const [error, setError] = useState(false)

    const { input, set_input, api, set_apiData, data, set_data, error, set_error } = props

    function checkResponse(response) {
        if(response.ok) {
            return response.json()
        } else {
            set_error(true)
        }
        
    }
    // http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=c9857603068ba37bf6cab13ecaaf6ff9#
    // 52e277d6c2bc46069b2120625211603
    useEffect(() => {
        if(input !== null) {
            fetch(`http://api.weatherapi.com/v1/current.json?key=f6db6883d8684c6c931100901213103&q=${input}&aqi=no`)
            .then(response => checkResponse(response))
            .then(json => set_apiData(json))
            .catch(error => set_error(true))
        }

        return function cleanup () {
            set_input(null)
        }
        
    }, [input])

    const onSubmit = (event) => {
        event.preventDefault()
        // console.log("We have recieved this: " + data)
        set_input(data) 
        event.target.reset()
    }

    // const getCheckbox = (event) => {
    //     console.log(event.target.value)
    // }

    // console.log("api today" + apiData)
    // console.log(api)

    if(error === false) {
        return (
            <div className="Weather">
                <h1 className="d-flex justify-content-center">Welcome to the Weather Page</h1>
                <div className="px-5">
                    <h3 className="mt-4">Find Current Weather Conditions...</h3>
                        <Form onSubmit={onSubmit}>
                            <Form.Group>
                                <Form.Label htmlFor="city">Enter City Name</Form.Label>
                                <Form.Control className="mr-3" type="text" required name="city" id="city" placeholder="Enter city" onChange={e => set_data(e.target.value)} />
                                <Form.Text className="text-muted">
                                    Please enter a valid city...
                                </Form.Text>
                                {/* <label className="mr-1">Please check the box if you would like ℉</label>
                                <input className="pt-5" type="checkbox" name="tempType" value="yes" onChange={e => getCheckbox(e)}/> */}
                            </Form.Group>
                            <Button variant="primary" type="submit" value="Submit">
                                Search
                            </Button>
                        </Form>
                    {api && 
                        <>
                            <p className="mt-3">Country: {api.location.country}</p>
                            <p>Region: {api.location.region}</p>
                            <p>Local Time: {api.location.localtime}</p>
                            <p>Temperture: {api.current.temp_c}℃</p>
                            <p>Feels Like: {api.current.feelslike_c}℃</p>
                            <p>Humidity: {api.current.humidity}%</p>
                            <p>Current Condition: {api.current.condition.text}</p>
                        </>
                    }
                </div>
            </div>
        )
    } else {
        return <h1>Bad request...</h1>
    }
}

const matchStateToProps = state => ({
    input : state.weather.input,
    api: state.weather.api,
    data: state.weather.data,
    error: state.weather.error
  })
  
  const mapDispatchToProps = (dispatch) => {
    return {
        set_input: (data) => dispatch(set_input(data)),
        set_apiData: (json) => dispatch(set_apiData(json)),
        set_data: (data) => dispatch(set_data(data)),
        set_error: (error) => dispatch(set_error(error))
    }
  }

export default connect(matchStateToProps, mapDispatchToProps)(Weather);