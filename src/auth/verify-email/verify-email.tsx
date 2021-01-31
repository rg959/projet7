import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/uber.png';
import styles, { VerifyEmailStyles } from './verify-email-style';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { history } from '../../history';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface P {}
interface S {
    code: string
}

export default class VerifyEmail extends React.PureComponent<P & WithStyles<VerifyEmailStyles>, S> {

    public static Display = withStyles(styles as any)(VerifyEmail) as React.ComponentType<P>
    public state: Readonly<S> = {
        code: ""
    };

    render () {
        const { classes } = this.props;
            return (
            <div className={classes.back + ' ' + classes.center}>
            <Grid container className={classes.container}>
                <Grid item xs={12} sm={12} md={12} className={classes.mainDiv + ' ' + classes.center}>
                    <Grid container>
                        <Grid item xs={12} className={classes.center}>
                            <img className={classes.img} src={logo} alt=""/>
                        </Grid>
                        <Grid item xs={2} className={classes.center}>
                        </Grid>
                        <Grid item xs={8} className={classes.center}>
                            <span className={classes.text}>Vous devez vérifier votre email afin de pouvoir continuer</span>
                        </Grid>
                        <Grid item xs={12} className={classes.center}>
                            <form className={classes.form} noValidate autoComplete="off" onSubmit={this.verifyEmail}>
                                <Input id="code" label="CODE" name="code" variant="outlined" onChange={this.changeVal}/>
                                <SubmitButton type="submit">Confirmer</SubmitButton>
                            </form>
                        </Grid>
                        <Grid item xs={12} className={classes.center}>
                            <span className={classes.subtitle}>Retourner à l'écran de <Link to="/login" className={classes.link}>connexion</Link></span>  
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            </div>
        );
    }

    changeVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        this.setState({[name]: value} as Pick<S, keyof S>)
    }

    verifyEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let data: any = {};
        if (history.location.state) data = history.location.state;
        if (this.state && this.state.code) data.code = this.state.code;
        axios.post(`http://localhost:3010/api/UBER-EEDSI/account/verify-email`, data)
        .then(res => {
            toast.success("Vérification de l'email réussie", {
                position: toast.POSITION.BOTTOM_CENTER
            });
            history.push('/login');
        })
        .catch(error => {
            if (error.response && error.response.data && error.response.data.message === 'Wrong code') {
                toast.warn("Le code n'est pas bon", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            } else {
                console.log(error.response.data)
                toast.warn("Echec de validation", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }
        })
    }
}


const Input = withStyles({
    root: {
        width:'100%',
        marginBottom:'2rem',
        color:'white',
        '& input': {
            color: 'white',
        },
        '& label': {
            color: 'white',
        },
        '&:hover label': {
            color: '#ADADAE',
        },
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
                borderRadius: '10px',
            },
            '&:hover fieldset': {
            borderColor: '#ADADAE',
            },
            '&.Mui-focused fieldset': {
            borderColor: 'white',
            },
        },
    },
})(TextField);

const SubmitButton = withStyles({
    root: {
        color: 'black',
        backgroundColor:'white',
        marginTop: '2rem',
        border: 'none',
        width: '100%',
        height: '60px',
        fontSize:'25px',
        borderRadius: '10px',
        textTransform: 'capitalize',
        '&:hover': {
            backgroundColor: '#ADADAE',
        },
    },
})(Button);

