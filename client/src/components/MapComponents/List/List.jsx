import React, { useState, useEffect, createRef } from 'react'
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails.jsx';
import Header from '../Header/Header.jsx';

import useStyles from './styles';

// function List({places, childClicked, isLoading, type, setType, rating, setRating, filteredPlaces}){
    function List({places, childClicked, isLoading, type, setType, rating, setRating, setCoordinates}){
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        const refs = Array(places.length).fill().map((_, i) => elRefs[i] || createRef());

        setElRefs(refs);
    }, [places])

    return(
        // <div className={classes.container}>
        <>
            <Typography variant="h4">Restaurants & Attractions around you</Typography>
            <Header setCoordinates={setCoordinates}></Header>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div> 
            ) : (<>
            {/* <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                    <MenuItem value="restaurants">Restaurants</MenuItem>
                    <MenuItem value="hotels">Hotels</MenuItem>
                    <MenuItem value="attractions">Attractions</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="rating">Rating</InputLabel>
                    <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="3">Above 3.0</MenuItem>
                        <MenuItem value="4">Above 4.0</MenuItem>
                        <MenuItem value="4.5">Above 4.5</MenuItem>
                    </Select>
            </FormControl> */}
            {/* <Grid container spacing={3} className={`${classes.list} ${classes.overflowHidden}`}> */}
            <Grid container spacing={3}>
                {places && places.length > 0 && (
                        <Grid container spacing={3} className={classes.list}>
                            {places.map((place, i) => (
                                <Grid ref={elRefs[i]} key={i} item xs={12}>
                                    <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
                                </Grid>
                            ))}
                        </Grid>
                    )}
            </Grid>
            </>
            )}
        {/* </div> */}
        </>
    );
}

export default List