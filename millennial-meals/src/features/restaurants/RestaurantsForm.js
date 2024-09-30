import { useDispatch } from "react-redux";
import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label } from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { displayRestaurants } from "./RestaurantsPost";


//need to take in user geolocation
//global variables
//Captures form values
document.getElementById('searchForm').addEventListener('submit', async function(event){
    event.preventDefault(); // Prevent the form from submitting normally

    // Capture form values
    const term = document.getElementById('categories').value.toString();
    const location = document.getElementById('location').value.toString();
    const radius = document.getElementById('radius').value;
    const radiusInMeters = Math.floor(radius*1609.34).toString();
    console.log(`Searching for: ${term} and ${location} and about ${radiusInMeters} meters`);
    // Creates a JSON object with the form data
    const apiEndPoint = 'https://api.yelp.com/v3/businesses/search?';
    const url = `${apiEndPoint}location=${location}&term=${term}&radius=${radiusInMeters}&sort_by=distance&limit=20`;
    //needed for authorization
    const options = {
        method: 'GET',
        headers: {
            Authorization: API_KEY,
            accept: 'application/json'
        }
    };
    //promise to grab the data, is async
    try {
        const response = await fetch(url, options);
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Search Results:', data);
        // Check if businesses array exists
        if (data && Array.isArray(data.businesses)) {
            displaySearchResults(data);
        } else {
            console.error('Businesses data is missing or not an array:', data);
        }
    } catch (error){
        console.error('Error code:', error);
        alert('An error occurred while fetching the search results.');
    }
});

const RestaurantForm = () => {

    return (
        <>
            <Button outline onClick={() => setModalOpen(true)}>
                <i classname='fa fa=pencil fa-lg' /> Set Restaurant details
            </Button>
            <Modal isOpen={modalOpen}>
                <ModalHeader toggle={() => setModalOpen(false)}>
                    Set your restaurant preferences here
                </ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={{rating: undefined, author:'', commentText:''}}
                        onSubmit={handleSubmit}
                        validate={validateCommentForm}
                    >
                        <Form>
                            <FormGroup>
                                <Label htmlFor='categories'>Type what you what feel like eating or going to below
                                (for example: bars, burgers, pasta, pizza, or even boba!)</Label>
                                <Field
                                    name='categories'
                                    placeholder='What are ya feelin?'
                                    className='form-control'
                                />
                                <ErrorMessage name='categories'>
                                    {(msg) => <p className='text-danger'>{msg}</p>}
                                </ErrorMessage>
                            </FormGroup>
                            <FormGroup>
                               <Label htmlFor="location">Provide your location to narrow down the search to places near you.</Label>
                               <Field
                                    name='location'
                                    placeholder='address, city, or zip'
                                    className='form-control'
                                />
                                <ErrorMessage name='categories'>
                                    {(msg) => <p className='text-danger'>{msg}</p>}
                                </ErrorMessage>
                            </FormGroup>
                            <FormGroup>
                               <Label htmlFor="radius">Provide how far you're wiling to go in miles (the max of the tool is 24 miles)</Label>
                               <Field
                                    name='radius'
                                    placeholder='Input a number'
                                    className='form-control'
                                />
                                <ErrorMessage name='radius'>
                                    {(msg) => <p className='text-danger'>{msg}</p>}
                                </ErrorMessage>
                            </FormGroup>
                        </Form>
                    </Formik>
                </ModalBody>
            </Modal>
        </>
    )
}
