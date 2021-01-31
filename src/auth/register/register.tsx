import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/uber.png';
import styles, { registerStyles } from './register-style';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { history } from '../../history';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface P {}
interface S {
    name: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string,
}

export default class Register extends React.PureComponent<P & WithStyles<registerStyles>, S> {

    public static Display = withStyles(styles as any)(Register) as React.ComponentType<P>
    public state: Readonly<S> = {
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
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
                        <Grid item xs={12} className={classes.center}>
                            <form className={classes.form} noValidate autoComplete="off" onSubmit={this.register}>
                                <Input id="name" label="NOM" type="text" name="name" variant="outlined" onChange={this.changeVal} />
                                <Input id="email" label="EMAIL" type="email" name="email" variant="outlined" onChange={this.changeVal}/>
                                <Input id="phone" label="TELEPHONE" type="text"  name="phone" variant="outlined" onChange={this.changeVal} />
                                <Input id="password" label="MOT DE PASSE" type="password" name="password" variant="outlined"onChange={this.changeVal} />
                                <Input id="confirmPassword" label="CONFIRMER LE MOT DE PASSE" type="password" name="confirmPassword" variant="outlined" onChange={this.changeVal} />
                                <RegisterButton type="submit">Inscription</RegisterButton>
                            </form>
                        </Grid>
                        <Grid item xs={12} className={classes.center}>
                            <span className={classes.subtitle}>Vous avez déjà un compte ? <Link to="/login" className={classes.link}>Connexion</Link></span> 
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

    register = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // empecher la redirection sur la même page
        const data :any = {} ; 
        // définir les data à envoyer
        if (this.state.name !== '') data.name = this.state.name
        if (this.state.email !== '') data.email = this.state.email
        if (this.state.phone !== '') data.phone = this.state.phone
        if (this.state.password !== '') data.password = this.state.password
        if(data.name && data.email && data.password && data.password.length > 7 && this.state.password === this.state.confirmPassword) {
            axios.post(`http://localhost:3010/api/UBER-EEDSI/account/register`, data)
            .then((res:any) => {
                toast.success("Votre compte à bien été créé", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                axios.post(`http://localhost:3010/api/UBER-EEDSI/account/request-verify-email`, {email: data.email})
                .then((res:any) => {
                    history.push('/verify-email', {email: data.email}); // faire la redirection
                })
                .catch(error => {
                    console.log(error.response.data)
                    history.push('/verify-email', {email: data.email}); // faire la redirection
                })
            })
            .catch(error => {
                toast.warn("L'adresse email existe déjà", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                console.log(error.response.data); 
            })
        } else {
            toast.warn("Données manquantes pour l'inscription", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
    }
}

const Input = withStyles({
    root: {
        width:'100%',
        marginBottom:'1.7rem',
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

const RegisterButton = withStyles({
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
