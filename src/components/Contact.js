// import '../App.css';

import React from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from 'react-redux'
import { set_address, set_name, set_phone, set_surname, set_submitted } from "./actions/contactAction";

class Contact extends React.Component {

    handleChange = (event) => {
        const target = event.target
        const value = target.value
        const name = target.name

        // console.log(target.name)

        switch(name) {
            case('name'):
                this.props.set_name(value)
                break
            case('surname'):
                this.props.set_surname(value)
                break
            case('address'):
                this.props.set_address(value)
                break
            case('phone'):
                this.props.set_phone(value)
                break
            default:
                return "Not correct input"

        // this.props.set_name({
        //     [name]: value
        // })
        }
    }

    onSubmit = (event) => {
        event.preventDefault()

        // const name = event.target.name.value
        // const surname = event.target.surname.value
        // const address = event.target.address.value
        // const phone = event.target.phone.value

        // this.props.set_name(name)
        // this.props.set_surname(surname)
        // this.props.set_address(address)
        // this.props.set_phone(phone)
        this.props.set_submitted(true)

        event.target.reset()

        return event
    }

    render() {
        return (
            <>
            <div className="Contact px-5">
                <h1 className="d-flex justify-content-center">Contact Us</h1>
                <p>Enter your details below and submit...</p>
                {/* <form onSubmit={onSubmit}>
                    <label>Name</label>
                    <input required type="text" name="name"/>
                    <br></br>
                    <label>Surname</label>
                    <input required type="text" name="surname" />
                    <br></br>
                    <label>Address</label>
                    <input type="text" name="address" />
                    <br></br>
                    <label>Phone Number</label>
                    <input required type="number" name="phone" />
                    <br></br>
                    <input type="submit" value="Submit" />
                </form> */}
            <Form data-testid="form" className="pr-5" onSubmit={this.onSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control id="name" type="text" name="name" placeholder="enter name here" onChange={this.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="surname">Surname</Form.Label>
                    <Form.Control id="surname" type="text" name="surname" placeholder="enter surname here" onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="address">Address</Form.Label>
                    <Form.Control id="address" type="text" name="address" placeholder="enter address here" onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="number">Phone Number</Form.Label>
                    <Form.Control id="number" type="number" name="phone" placeholder="enter phone number here" onChange={this.handleChange}/>
                </Form.Group>
                <Button variant="primary" type="submit" value="Submit">
                    Submit
                </Button>
            </Form>
            {this.props.isSubmitted && 
                <>
                    <div className="mt-3">
                        <p>Here are your results:</p>
                        <p>Name: {this.props.name}</p>
                        <p>Surname: {this.props.surname}</p>
                        <p>Address: {this.props.address}</p>
                        <p>Phone Number: {this.props.phone}</p>  
                    </div>
                    
                </>
            }
            </div>
            </>
        )
    }
}

const matchStateToProps = state => ({
    name: state.contact.name,
    surname: state.contact.surname,
    address: state.contact.address,
    phone: state.contact.phone,
    isSubmitted: state.contact.isSubmitted
  })
  
  const mapDispatchToProps = (dispatch) => {
    return {
        set_name: (name) => dispatch(set_name(name)),
        set_surname: (surname) => dispatch(set_surname(surname)),
        set_address: (address) => dispatch(set_address(address)),
        set_phone: (phone) => dispatch(set_phone(phone)),
        set_submitted: (value) => dispatch(set_submitted(value))
    }
  }
  
  export default connect(matchStateToProps, mapDispatchToProps)(Contact);