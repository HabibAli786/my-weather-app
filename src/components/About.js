// import './App.css';

// import { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import { connect} from 'react-redux';
import { get_id } from './actions/aboutAction';

function About(props) {

    // const [selected, setSelected] = useState(null)

    // const offices = ["London", "Manchester", "Dublin", "Cario"]

    const office2 = [
        {id: 1, name: "London", description: "Situated in Canary Wharf at the heart of coporate London"}, 
        {id: 2, name: "Manchester", description: "Our techonlogy hub for new weather tech is being developed for the future"},
        {id: 3, name: "New York", description: "Based within Manhattan within the techonlogy district"},
        {id: 4, name: "Melbourne", description: "Melbourne is the coastal capital of the southeastern Australian state of Victoria. At the city's centre is the modern Federation Square development."},
        {id: 5, name: "Berlin", description: "The city's also known for its art scene and modern landmarks like the gold-colored, swoop-roofed Berliner Philharmonie, built in 1963. "},
        {id: 6, name: "Montreal", description: "Montréal is the largest city in Canada's Québec province. It’s set on an island in the Saint Lawrence River and named after Mt. Royal, the triple-peaked hill at its heart."},
    ]

    
    const { id, get_id } = props

    return (
        <div className="About">
            <h1 className="d-flex justify-content-center">About Us</h1>
            <div className="px-5">
                <h3 className="mt-4">Select our offices worldwide!</h3>
                {/* {<select onChange={(selected) => setSelected(() => selected.target.value)}>
                    <option defaultValue={null}></option>
                    {office2.map(
                        office => <option key={uuidv4()} value={office.id-1}>{office.name}</option>)
                    }
                </select> } */}
                <DropdownButton title="Dropdown button" onSelect={e => get_id(e)}>
                    <Dropdown.Item defaultValue={null}></Dropdown.Item>
                    {office2.map(
                        office => <Dropdown.Item eventKey={office.id-1} key={uuidv4()} value={office.id-1}>{office.name}</Dropdown.Item>)
                    }
                </DropdownButton>
                {id &&
                    <> 
                        <p className="mt-3">The city: {office2[id].name}</p>
                        <p>Description: {office2[id].description}</p>
                    </>
                }
            </div>
        </div>
    );
}

const matchStateToProps = state => ({
    id : state.city_id
  })
  
  const mapDispatchToProps = (dispatch) => {
    return {
        get_id: (id) => dispatch(get_id(id))
    }
  }
  
  export default connect(matchStateToProps, mapDispatchToProps)(About);