import Header from '../../component/header/header';
import React from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import styles, { historyStyles } from './history-style';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { toast } from 'react-toastify';

interface P {}
interface S {
    history : Array<Object>,
    hasGetHistory: boolean,
}

export default class myHistory extends React.PureComponent<P & WithStyles<historyStyles>, S> {

    public static Display = withStyles(styles as any)(myHistory) as React.ComponentType<P>

    public state: Readonly<S> = { history: [{}], hasGetHistory: false }

    render () {
        this.getHistory()
        const { classes } = this.props;
        const { history } = this.state;
            return (
            <div className = {classes.all}><Header.Display />
            <div>
                <h1 className={classes.titre}>MON HISTORIQUE DE DÉPLACEMENT</h1>
                <hr className={classes.hr}></hr>
                <Grid container spacing={5} className={classes.container}>
                    { history.map((item: any) => {
                            item.date = new Date(item.createdAt).toLocaleString();
                            let waypointsString = "";
                            if (item.waypoints) {
                                for (let i = 0; i < item.waypoints.length; i++) {
                                    if(i === 0 ) waypointsString +=  item.waypoints[i].location
                                    else waypointsString +=  ' / '+ item.waypoints[i].location
                                }
                            }
                            return (
                                <Grid item xs={12} sm={6} md={6} lg={4}>
                                    <div className={classes.tabHistorique}>
                                        <Grid className={classes.tabHeader}>
                                            <Grid className={classes.textContainer}>
                                                <p><span className={classes.libellé}>Date:</span>&nbsp;<span>{ item.date }</span></p>
                                                <p>
                                                    <span className={classes.libellé}>Temps de trajet:</span> 
                                                    <span> { item.duration }</span>
                                                    <span className={classes.libellé}>Mode:</span> 
                                                    <span>{ (item.mode === 'driving') ? ' Voiture' : (item.mode === 'bicycling') ? ' Vélo' :  ' A pied' }</span>
                                                </p>
                                            </Grid>
                                            <hr className={classes.hrTitre}/>
                                            <Grid className={classes.textContainer}>
                                                <p><span className={classes.libellé}>Départ:</span>&nbsp;<span>{item.departure_location}</span></p>
                                                <p><span className={classes.libellé}>Arrivé:</span>&nbsp;<span>{item.arrival_location}</span></p>
                                            </Grid>
                                            <hr className={classes.hrTitre}/>
                                        </Grid>
                                        <Grid className={classes.textContainer}>
                                            <span className={classes.libellé}>Detail du trajet:</span> 
                                            <p  className={classes.detail}>
                                                Le trajet avait pour points intermédiaire : {waypointsString}
                                            </p>
                                        </Grid>
                                        <hr className={classes.hrTitre}/>
                                        <Grid className={classes.textContainer + ' ' + classes.center}>
                                            <Button variant="outlined" color="secondary" onClick={(e) => this.deleteHistory(e, item._id)}>Supprimer</Button>
                                            <ReplayTrajectButton variant="outlined">Rejouer le trajet</ReplayTrajectButton>
                                        </Grid>
                                    </div>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </div></div>
        );
    }

    getHistory () {
        if (!this.state.hasGetHistory) {
            this.setState({hasGetHistory: true} as Pick<S, keyof S>);
            const user = JSON.parse(localStorage.getItem('currentUser') as string);
            const config: AxiosRequestConfig = {
                method: 'get',
                url: 'http://localhost:3010/api/UBER-EEDSI/history',
                headers: { 
                'Authorization': user.token
                }
            };
            axios(config)
            .then((response) => {
                this.setState({history: response.data.histories} as Pick<S, keyof S>);
            })
            .catch((error) => {
                console.log(error);
            });
        }   
    }

    deleteHistory = (e:React.MouseEvent, historyId: string) => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem('currentUser') as string);
        const data = {
            id : historyId,
        }
        const config: AxiosRequestConfig = {
            method: 'delete',
            url: 'http://localhost:3010/api/UBER-EEDSI/history',
            headers: { 
                'Authorization': user.token, 
                'Content-Type': 'application/json'
            },
            data : data
        };
        axios(config)
        .then(() => {
            let hist:Array<Object> = this.state.history;
            hist = hist.filter((elem:any)=>{ 
                return (elem._id !== historyId)
            });
            this.setState({ 
                history: hist
            });
            toast.success("Suppression réussie", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        })
        .catch((error) => {
            toast.warn("Erreur lors de la suppression", {
                position: toast.POSITION.BOTTOM_CENTER
            });
            console.log(error.response);
        });
    }
}

const ReplayTrajectButton = withStyles({
    root: {
        marginLeft: '25px',
    },
})(Button);



