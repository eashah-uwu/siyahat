import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
// import getAttractions from 'client/src/components/MapComponents/attractions.js'; 
import useStyles from './styles';
import mapStyles from './mapStyles.js'
import axios from 'axios';
import { PushPin } from '@mui/icons-material';

// import attractionsData from 'attractions.json' 

function Map({setCoordinates, setBounds, coordinates, places, setChildClicked}){
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');
    const [zoomLevel, setZoomLevel] = useState(14);
   
    console.log(places)
    try{
   return(
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY }}
                // defaultCenter={coordinates || defaultCoordinates}
                // defaultCenter={coordinates }
                // center={coordinates || defaultCoordinates}
                center={coordinates}
                zoom={zoomLevel}
                // defaultZoom={14}
                
                margin={[50,50,50,50]}
                options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
                onChange={(e)=>{
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw, nw: e.marginBounds.nw, se: e.marginBounds.se });
                    setZoomLevel(e.zoom); 
                }}
               
                onChildClick={(child) => {setChildClicked(child)}}
            >
                {places?.map((place, i)=>(
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}
                    >
                        {
                              zoomLevel >10 ?(
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color="primary" fontSize="large" />
                            ) : ( 
                                <Paper elevation={3} className={place.category === 'Restaurant' ?classes.paperRestaurants: classes.paperAttractions}>
                                    <Typography className={classes.typography} variant="subtitle2" >
                                        {place.name}
                                    </Typography>
                                    {places.photos ? (
                                        <img
                                            className={classes.pointer}
                                            // src={place.photos ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                            src={place.photos[0]}
                                            alt={place.name}
                                        />
                                    ): null}
                                    <Rating size="small" value={Number(place.avgRating)} readOnly />
                                </Paper>
                            )
                            ):(
                               <PushPin></PushPin>
                            )
                            
                        }
                    </div>
                ))}
              
            </GoogleMapReact>
        </div>
    );
}
catch(error){
    console.log(error)
}
}

export default Map
