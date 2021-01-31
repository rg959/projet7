import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/uber.png';
import styles, { doubleAuthStyles } from './double-auth-style';
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

export default class DoubleAuth extends React.PureComponent<P & WithStyles<doubleAuthStyles>, S> {

    public static Display = withStyles(styles as any)(DoubleAuth) as React.ComponentType<P>
    public state: Readonly<S> = {
        code: ""
    };

    render () {
        const { classes } = this.props;
            return (
            <div className={classes.back + ' ' + classes.center}>
            <Grid container className={classes.container}>
                <Grid item xs={12} className={classes.mainDiv + ' ' + classes.center}>
                    <Grid container>
                        <Grid item xs={12} className={classes.center}>
                            <img className={classes.img} src={logo} alt=""/>
                        </Grid>
                        <Grid item xs={2} className={classes.center}>
                        </Grid>
                        <Grid item xs={8} className={classes.center}>
                            <span className={classes.text}>La double authentification est activée sur votre compte. Nous vous avons envoyé un mail avec le code de validation. Pour vérifier qu'il s'agit bien de votre compte. <span>Saisissez le code de validation</span></span> 
                        </Grid>
                        <Grid item xs={2} className={classes.center}>
                        </Grid>
                        <Grid item xs={12} className={classes.center}>
                            <form className={classes.form} noValidate autoComplete="off" onSubmit={this.doubleAuth}>
                                <Input id="code" name="code" label="CODE" variant="outlined" onChange={this.changeVal}/>
                                <DoubleAuthButton type="submit">Connexion</DoubleAuthButton>
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

    doubleAuth = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const state: any = history.location.state;
        state.code = this.state.code
        axios.post(`http://localhost:3010/api/UBER-EEDSI/account/login`, state)
        .then( async res => {
            localStorage.setItem('currentUser', JSON.stringify(res.data));
            toast.success("Connexion réussie !", {
                position: toast.POSITION.BOTTOM_CENTER
            });
            setTimeout(() => {history.push('/map')}, 100);
        })
        .catch(error => {
            console.log(error.response.data)
        })
    }
}

const Input = withStyles({
    root: {
        width:'100%',
        marginTop:'4rem',
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

const DoubleAuthButton = withStyles({
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
