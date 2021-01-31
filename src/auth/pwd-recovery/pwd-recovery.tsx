import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/uber.png';
import styles, { RequestPasswordRecoveryStyles } from './pwd-recovery-style';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { history } from '../../history';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface P {}
interface S {
    code: string,
    password: string,
    confirmPassword: string,
}

export default class RequestPasswordRecovery extends React.PureComponent<P & WithStyles<RequestPasswordRecoveryStyles>, S> {

    public static Display = withStyles(styles as any)(RequestPasswordRecovery) as React.ComponentType<P>
    
    public state: Readonly<S> = {
        code: "",
        password: "",
        confirmPassword:"",
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
                            <span className={classes.text}>Définir un nouveau mot de passe</span>
                        </Grid>
                        <Grid item xs={2} className={classes.center}>
                        </Grid>
                        <Grid item xs={12} className={classes.center}>
                            <form className={classes.form} noValidate autoComplete="off" onSubmit={this.submit}>
                                <Input id="code" name="code" label="CODE" variant="outlined" onChange={this.changeVal} />
                                <Input id="password" name="password" type="password" label="MOT DE PASSE" variant="outlined" onChange={this.changeVal} />
                                <Input id="confirmPassword" name="confirmPassword" type="password" label="CONFIRMER LE MOT DE PASSE" variant="outlined" onChange={this.changeVal} />
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
    submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // empecher la redirection sur la même page
        const state: any = history.location.state;
        state.code = this.state.code
        state.password = this.state.password
        axios.post(`http://localhost:3010/api/UBER-EEDSI/account/reset-password`, state)
        .then(res => {
            if(this.state.password === this.state.confirmPassword){
                localStorage.setItem('currentUser', JSON.stringify(res.data)); // stock les informations de l'utilisateurs en front
                toast.success("Mot de passe changer avec succès", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                setTimeout(() => {history.push('/login')}, 100);
            }
        })
        .catch(error => {
            console.log(error.response.data); 
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