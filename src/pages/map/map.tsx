import Header from '../../component/header/header';
import React from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

import styles, { mapStyles } from './map-style';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
// import Iframe from 'react-iframe';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Velo from '@material-ui/icons/DirectionsBike';
import Voiture from '@material-ui/icons/DriveEta';
import Apied from '@material-ui/icons/EmojiPeople';
import AjouterIco from '@material-ui/icons/AddCircleOutline';
import SupprimerIco from '@material-ui/icons/HighlightOff';
// import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import LocalisationIco from '@material-ui/icons/Room';

import Typography from '@material-ui/core/Typography';

import { toast } from 'react-toastify';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const center = {
lat: 46.632969048412384, 
lng: 2.390131424350795
};

interface P {}
interface S {
    response: any,
    travelMode: any,
    origin: any,
    destination: any,
    waypoints: Array<google.maps.DirectionsWaypoint>, 
    alreadyShowMap: boolean,
    readyToShowMap: boolean,
    travelTime: string | number,
}

export default class Map extends React.PureComponent<P & WithStyles<mapStyles>, S> {

    constructor (props: any) {
        super(props)
        this.directionsCallback = this.directionsCallback.bind(this)
        this.checkDriving = this.checkDriving.bind(this)
        this.checkBicycling = this.checkBicycling.bind(this)
        this.checkWalking = this.checkWalking.bind(this)
        this.onClick = this.onClick.bind(this)
    }
    
    public static Display = withStyles(styles as any)(Map) as React.ComponentType<P>
    public keyGoogle = (process.env.KEY_GOOGLE as string);
    
    public state: Readonly<S> = { 
        response: null,
        travelMode: 'DRIVING',
        origin: '',
        destination: '' ,
        alreadyShowMap: false,
        readyToShowMap: false,
        travelTime: 0,
        waypoints: []
    }
    
    public origin: string ="";
    public destination: string = "";
    public user = JSON.parse(localStorage.getItem('currentUser') as string);
    
    render () {
        const { classes } = this.props;
        const { waypoints } = this.state;
        return (
            <><Header.Display />
                <div className={classes.parentMap}>
                    <Grid container className={classes.containerCol}>
                        {/* Bloc de gauche  */}
                        <Grid className={classes.leftCol}>
                            <Grid container className={classes.container}>
                                <Container className={classes.containerMobilite}>
                                    <Grid container className={classes.boutonsMonbilite}>
                                        <Grid item xs={4} className={classes.blocVoitureVeloPieton}>
                                            <Fab id="driving" color="primary" aria-label="add" onClick={(e) => this.checkDriving(e)}>
                                                <Voiture fontSize="large" />
                                            </Fab>
                                        </Grid>
                                        <Grid item xs={4} className={classes.blocVoitureVeloPieton}>
                                            <Fab id="bicycling" color="default" aria-label="add" onClick={(e) => this.checkBicycling(e)}>
                                                <Velo fontSize="large" />
                                            </Fab>
                                        </Grid>
                                        <Grid item xs={4} className={classes.blocVoitureVeloPieton}>
                                            <Fab id="walking" color="default" aria-label="add" onClick={(e) => this.checkWalking(e)}>
                                                <Apied fontSize="large" />
                                            </Fab>
                                        </Grid>
                                    </Grid>
                                </Container>
                            <Container className={classes.containerInfoDeplacement}>
                                <Grid container>
                                    <Grid className={classes.containerPrincipalInput}>
                                        <Grid container className={classes.containerInput}>
                                            <Grid item xs={2}>
                                                <LocalisationIco className={classes.iconLocalisation} />
                                            </Grid>
                                            <Grid item xs={8}>
                                                <div>
                                                    <TextField className={classes.inputDepart} name="origin" label="Adresse de départ" variant="filled"  onChange={this.changeVal}/>
                                                </div>
                                            </Grid>
                                            <Grid item xs={2}>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <LocalisationIco className={classes.iconLocalisation} />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <div>
                                                <TextField className={classes.inputDestination} name="destination" label="Destination" variant="filled"  onChange={this.changeVal}/>
                                            </div>
                                        </Grid>
                                        <Grid item xs={2}>
                                        </Grid>
                                    </Grid>
                                    {
                                        waypoints.map((x:google.maps.DirectionsWaypoint, i:number) => {
                                            let destination = "Destination " + (i + 1)
                                            return (
                                                <Grid container key={i}>
                                                    <Grid item xs={2}>
                                                        <LocalisationIco className={classes.iconLocalisation} />
                                                    </Grid>
                                                    <Grid item xs={8}>
                                                        <div>
                                                            <TextField className={classes.inputDestination} name="location" label={destination} variant="filled"  onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {this.handleInputChange(e, i)}}/>
                                                        </div>
                                                    </Grid>
                                                    { waypoints.length - 1 === i &&
                                                        <Grid item xs={2}>
                                                            <div className={classes.center}>
                                                            <Fab color="default" className={classes.iconSupParent} onClick={() => {this.handleRemoveInput(i)}}>
                                                                <SupprimerIco className={classes.iconSup}/>
                                                            </Fab>
                                                            </div>
                                                        </Grid>
                                                    }
                                                </Grid>
                                            )
                                        })
                                    }
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <Fab color="default" className={classes.iconAjoutParent} onClick={this.handleAddInput}>
                                                <AjouterIco className={classes.iconAjout} />
                                            </Fab>
                                        </Grid>
                                        <Grid item xs={8} className={classes.ajoutTextparent}>
                                            <div className={classes.ajoutText}>Ajouter une Destination</div>
                                        </Grid>
                                    </Grid>
                                    <Grid container justify="center" alignItems="center">
                                        <Button className={classes.btnValiderItineraire} variant="contained" color="primary" disableElevation type="button" onClick={this.onClick}> Valider l'itinéraire</Button>
                                    </Grid>
                                    { 
                                        (this.state.travelTime !== 0) &&
                                        (<Grid container justify="center" alignItems="center">
                                            <div className={classes.tempsTrajet}>
                                                <Typography className={classes.fonttext}>
                                                    <a className={classes.tempsTrajetA}>Temps éstimé: </a><a color="primary.main" className={classes.tempsTrajethms}>{ this.state.travelTime }</a>
                                                </Typography>
                                            </div>
                                        </Grid>)
                                    }
                                    {/* <Grid container justify="center" alignItems="center">
                                        <a className={classes.detailBtn} href="#"> DETAIL DE L'ITINERAIRE &#9660;</a>
                                    </Grid>
                                    <Grid container justify="center" alignItems="center">
                                        <p className={classes.detailList}>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.Assumenda aliquam commodi accusantium eum.Fugiat,
                                            Doloremque sint vel assumenda?Distinctio quis officia corrupti modi esse repudiandae aliquid vitae ex?Iure.
                                            sit amet, consectetur adipisicing elit.Assumenda aliquam commodi accusantium eum.Fugiat,
                                            voluptate?Doloremque sint vel assumenda?Distinctio quis officia corrupti modi esse repudiandae aliquid vitae ex?Iure.
                                        </p>
                                    </Grid> */}
                                </Grid>
                            </Container>
                        </Grid>
                    </Grid>
                    {/* Bloc de gauche  */}
                    <Grid container className={classes.rightCol}>
                        <LoadScript googleMapsApiKey={process.env.REACT_APP_KEY_GOOGLE as string}>
                            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
                            { /* Child components, such as markers, info windows, etc. */ }
                            {
                                (
                                    this.state.destination !== '' &&
                                    this.state.origin !== '' && 
                                    this.state.readyToShowMap && 
                                    !this.state.alreadyShowMap
                                ) && (
                                    <DirectionsService
                                    // required
                                    options={{ 
                                        destination: this.state.destination,
                                        origin: this.state.origin,
                                        travelMode: this.state.travelMode,
                                        optimizeWaypoints: true,
                                        waypoints: this.state.waypoints
                                    }}
                                    // required
                                    callback={this.directionsCallback}
                                    // optional
                                    onLoad={directionsService => {console.log('DirectionsService onLoad directionsService: ', directionsService)}}
                                    // optional
                                    onUnmount={directionsService => {console.log('DirectionsService onUnmount directionsService: ', directionsService)}}/>
                                )
                            }
                            {
                                this.state.response !== null && (
                                    <DirectionsRenderer
                                    // required
                                    options={{directions: this.state.response}}
                                    // optional
                                    onLoad={directionsRenderer => {console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)}}
                                    // optional
                                    onUnmount={directionsRenderer => {console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)}}/>
                                )
                            }
                            <></>
                            </GoogleMap>
                        </LoadScript>
                    </Grid>
                </Grid>
            </div></>
        );
    }

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.currentTarget;
        let waypoints = this.state.waypoints;
        waypoints[index] = {location: value}
        this.setState({waypoints: waypoints});
        console.log(this.state.waypoints);
    };

    handleRemoveInput= (index: number) => {
        this.setState(prevState => ({
            waypoints: prevState.waypoints.filter((_, i) => i !== index),
        }), () => {
            // console.log(this.state.waypoints);
        });
    };

    handleAddInput = () => {
        this.setState(prevState => ({
            waypoints: [...prevState.waypoints, {location:''}]
        }), () => {
            // console.log(this.state.waypoints);
        });
    };

    changeVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        this.setState({ ...this.state, [name]: value });
    }

    directionsCallback (response: any) {
        console.log(response);
        let i: number = 0
        let totalTime: number|string = 0
        while (i < response.routes[0].legs.length) {
            totalTime += response.routes[0].legs[i].duration.value
            i = i + 1
        }
        totalTime = this.sToTime(totalTime);
        this.setState(
            () => ({
                alreadyShowMap: true,
                travelTime: totalTime
            })
        )
        if (response !== null) {
            if (response.status === 'OK') {

                this.setState(() => ({response}))

                const data: any = {
                    departure_location: this.state.origin,
                    arrival_location: this.state.destination,
                    duration: totalTime,
                    mode: this.state.travelMode.toLowerCase()
                }
                if (this.state.waypoints.length > 0) data.waypoints = this.state.waypoints;
                console.log(data);
                const config: AxiosRequestConfig = {
                    method: 'post',
                    url: 'http://localhost:3010/api/UBER-EEDSI/history',
                    headers: { 
                        'Authorization': this.user.token, 
                        'Content-Type': 'application/json'
                    },
                    data : data
                };
                
                axios(config)
                .then((res) => {
                    console.log(res.data);
                    toast.success("Historique enregistré", {
                        position: toast.POSITION.BOTTOM_CENTER,
                        style: {
                            textAlign:'center',
                        }
                    });
                })
                .catch((error) => {
                    console.log(error.response);
                });
            } else {
                toast.error("Une ou plusieurs adresses sont invalide", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    style: {
                        textAlign:'center',
                    }
                });
            }
        }
    }

    checkDriving = (e:React.MouseEvent) => {
        if (!e.currentTarget.classList.contains('MuiFab-primary'))
            e.currentTarget.classList.add('MuiFab-primary')
        if (document.querySelector("#walking")?.classList.contains('MuiFab-primary')) {
            document.querySelector("#walking")?.classList.remove('MuiFab-primary')
        }
        if (document.querySelector("#bicycling")?.classList.contains('MuiFab-primary')) {
            document.querySelector("#bicycling")?.classList.remove('MuiFab-primary')
        }
        this.setState(
            () => ({
                travelMode: 'DRIVING',
                readyToShowMap: true,
                alreadyShowMap: false
            })
        )
    }

    checkBicycling = (e:React.MouseEvent) => {
        if (!e.currentTarget.classList.contains('MuiFab-primary'))
            e.currentTarget.classList.add('MuiFab-primary')
        if (document.querySelector("#walking")?.classList.contains('MuiFab-primary')) {
            document.querySelector("#walking")?.classList.remove('MuiFab-primary')
        }
        if (document.querySelector("#driving")?.classList.contains('MuiFab-primary')) {
            document.querySelector("#driving")?.classList.remove('MuiFab-primary')
        }
        this.setState(
        () => ({
            travelMode: 'BICYCLING',
            readyToShowMap: true,
            alreadyShowMap: false
        })
        )
    }

    checkWalking = (e:React.MouseEvent) => {
        if (!e.currentTarget.classList.contains('MuiFab-primary'))
            e.currentTarget.classList.add('MuiFab-primary')
        if (document.querySelector("#driving")?.classList.contains('MuiFab-primary')) {
            document.querySelector("#driving")?.classList.remove('MuiFab-primary')
        }
        if (document.querySelector("#bicycling")?.classList.contains('MuiFab-primary')) {
            document.querySelector("#bicycling")?.classList.remove('MuiFab-primary')
        }
        this.setState(
        () => ({
            travelMode: 'WALKING',
            readyToShowMap: true,
            alreadyShowMap: false
        })
        )
    }

    onClick () {
        if (this.state.origin !== '' && this.state.destination !== '' && this.state.waypoints.length === 0) {
            this.setState(
                () => ({
                    readyToShowMap: true,
                    alreadyShowMap: false
                })
            )
        } else if (this.state.origin !== '' && this.state.destination !== '') {
            const data = {
                origin: this.state.origin,
                destination: this.state.destination,
                mode: this.state.travelMode.toLowerCase(),
                waypoints: [],
            }
            for (let i = 0; i < this.state.waypoints.length; i++) {
                data.waypoints.push((this.state.waypoints[i].location as never))
            }
            const config: AxiosRequestConfig = {
                method: 'post',
                url: 'http://localhost:3010/api/UBER-EEDSI/map/direction',
                headers: { 
                    'Authorization': this.user.token, 
                    'Content-Type': 'application/json'
                },
                data : data,
            };
            axios(config)
            .then( (response) => {
                for (let i = 0; i < response.data.waypoints.length; i++) {
                    response.data.waypoints[i] = {location: response.data.waypoints[i]}
                }
                this.setState(
                    () => ({
                        readyToShowMap: true,
                        alreadyShowMap: false,
                        origin: response.data.origin,
                        destination: response.data.destination,
                        waypoints: response.data.waypoints,
                    })
                )
            })
            .catch((error) => {
                console.log(error.response.data.message);
                if (error.response && error.response.data && error.response.data.message === 'To much waypoints') {
                    toast.error("Trop de points de destination", {
                        position: toast.POSITION.BOTTOM_CENTER,
                        style: {
                            textAlign:'center',
                        }
                    });
                } else {
                    toast.error("Une ou plusieurs adresses sont invalide", {
                        position: toast.POSITION.BOTTOM_CENTER,
                        style: {
                            textAlign:'center',
                        }
                    });
                }
            });
        }
    }

    sToTime = (duration: number) => {
        let hours: number|string = Math.floor((duration / (60 * 60)));
        let minutes: number|string = Math.floor((duration / (60)) % 60);
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        return hours + "h " + minutes + "min"
    }
}
