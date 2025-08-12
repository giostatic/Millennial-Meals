import { useDispatch } from "react-redux";
import { useState } from "react";
import { Button, FormGroup, Label } from "reactstrap";
import { useForm } from "react-hook-form";
import { displayRestaurants } from "./RestaurantsPost";
import { fetchGooglePlaces } from "./fetchPlaces";
import fetchLatLng from "./fetchLocation";


const RestaurantForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (values) => {
        try {
            // Simple check: if input is all digits, treat as zip; else as address/city
            let locationObj = {};
            if (/^\d{5}(-\d{4})?$/.test(values.location.trim())) {
                locationObj.zip = `${values.location.trim()}, USA`; // Add country for zip
            } else {
                locationObj.address = values.location.trim();
            }

            const { lat, lng } = await fetchLatLng(locationObj);

            const data = await fetchGooglePlaces(values.categories, { lat, lng }, values.radius);
            console.log('Nearby search results:', data); // <-- Added console log
            if (data && Array.isArray(data.results)) {
                displayRestaurants(data);
            } else {
                console.error('Places data is missing or not an array:', data);
            }
        } catch (error) {
            console.error('Error code:', error);
            alert('An error occurred while fetching the search results.');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label htmlFor='categories'>Type what you what feel like eating or going to below
                        (for example: bars, burgers, pasta, pizza, or even boba!)</Label>
                    <input
                        {...register('categories', { required: 'Category is required' })}
                        placeholder='What are ya feelin?'
                        className='form-control'
                        id='categories'
                    />
                    {errors.categories && (
                        <p className='text-danger'>{errors.categories.message}</p>
                    )}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="location">Provide your location to narrow down the search to places near you.</Label>
                    <input
                        {...register('location', { required: 'Location is required' })}
                        placeholder='address, city, or zip'
                        className='form-control'
                        id='location'
                    />
                    {errors.location && (
                        <p className='text-danger'>{errors.location.message}</p>
                    )}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="radius">Provide how far you're wiling to go in miles (the max of the tool is 24 miles)</Label>
                    <input
                        {...register('radius', {
                            required: 'Radius is required',
                            min: { value: 1, message: 'Minimum is 1 mile' },
                            max: { value: 24, message: 'Maximum is 24 miles' },
                            valueAsNumber: true
                        })}
                        placeholder='Input a number'
                        className='form-control'
                        id='radius'
                        type='number'
                    />
                    {errors.radius && (
                        <p className='text-danger'>{errors.radius.message}</p>
                    )}
                </FormGroup>
                <Button color="primary" type="submit">Search</Button>
            </form>
        </>
    )
}

export default RestaurantForm;

