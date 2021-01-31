import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/uber.png';
import styles, { passwordRecoveryStyles } from './request-pwd-recovery-style';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { history } from '../../history';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface P {}
interface S {
    email: string,
    type: string,
}

export default class PasswordRecovery extends React.PureComponent<P & WithStyles<passwordRecoveryStyles>, S> {

    public static Display = withStyles(styles as any)(PasswordRecovery) as React.ComponentType<P>
    
    public state: Readonly<S> = {
        email: "",
        type: "",
    };

    render () {
        const { classes } = this.props;
            return (
            <div className={classes.back + ' ' + classes.center}>
            <Grid container className={classes.container}>
                <Grid item xs={12} className={classes.mainDiv + ' ' + classes.center}>
                    <Grid container >
                        <Grid item xs={12} className={classes.center}>
                            <img className={classes.img} src={logo} alt=""/>
                        </Grid>
                        <Grid item xs={2} className={classes.center}>
                        </Grid>
                        <Grid item xs={8} className={classes.center}>
                            <span className={classes.text}>Vous avez oublié votre mot de passe ?</span>
                        </Grid>
                        <Grid item xs={2} className={classes.center}>
                        </Grid>
                        <Grid item xs={2} className={classes.center}>
                        </Grid>
                        <Grid item xs={8} className={classes.center}>
                            <span className={classes.text}>Entrez votre email pour recevoir un email avec <span>un code pour modifier votre mot de passe.</span></span> 
                        </Grid>
                        <Grid item xs={2} className={classes.center}>
                        </Grid>
                        <Grid item xs={12} className={classes.center}>
                            <form className={classes.form} noValidate autoComplete="off" onSubmit={this.submit}>
                                <Input id="email" name="email" label="EMAIL" variant="outlined" onChange={this.changeVal} />
                                <PasswordRecoveryButton type="submit">Envoyer</PasswordRecoveryButton>
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
        const data = { // définir les data à envoyer
            email: this.state.email.trim(),
            type :'email',
        }
        if(data.email){
            axios.post(`http://localhost:3010/api/UBER-EEDSI/account/request-reset-password`, data)
            .then(res => {
                // localStorage.setItem('currentUser', JSON.stringify(res.data)); // stock les informations de l'utilisateurs en front
                toast.success("Un mail a été envoyé", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                setTimeout(() => {history.push('/password-lost',{email : data.email})}, 50);
            })
            .catch(error => {
                setTimeout(() => {history.push('/password-lost',{email : data.email})}, 50);
                toast.success("Un mail a été envoyé", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                console.log(error.response.data); 
            })
        }else{
            toast.warn("Veuillez saisir un email", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
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

const PasswordRecoveryButton = withStyles({
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
