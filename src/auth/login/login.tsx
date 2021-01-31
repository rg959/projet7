import React from 'react';
import axios from 'axios';
import logo from '../../assets/img/1.png';
import logo2 from '../../assets/img/uber.png';
import styles, { loginStyles } from './login-style';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { history } from '../../history';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface P {
}
interface S {
    email: string,
    password: string,
}
export default class Login extends React.PureComponent<P & WithStyles<loginStyles>, S> {

    public static Display = withStyles(styles as any)(Login) as React.ComponentType<P>

    public state: Readonly<S> = {
        email: "",
        password: "",
    };

    render () {
        const { classes } = this.props;
            return (
            <div className={classes.back + ' ' + classes.center}>
            <Grid container className={classes.container}>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className={classes.leftSide + ' ' + classes.center}>
                    <Grid container>
                        <Grid item xs={12} className={classes.center}>
                            <img className={classes.img} src={logo2} alt=""/>
                        </Grid>
                        <Grid item xs={12} className={classes.center}>
                            <form className={classes.form} noValidate autoComplete="off" onSubmit={this.login}>
                                <InputEmail id="email" label="EMAIL" name="email" variant="outlined" onChange={this.changeVal} />
                                <InputPassword id="password" label="MOT DE PASSE" type="password" name="password" variant="outlined" onChange={this.changeVal} />
                                <div className={classes.passwordLost}>
                                    <Link to="/request-password-lost" className={classes.link}>Mot de passe oublié ?</Link>
                                </div>
                                <LoginButton type='submit'>Connexion</LoginButton>
                            </form>
                        </Grid>
                        <Grid item xs={12} className={classes.center}>
                            <span className={classes.subtitle}>Vous n'avez pas encore de compte ? <Link to="/register" className={classes.link}>Rejoignez-nous !</Link></span> 
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={6} xl={6} className={classes.rightSide + ' ' + classes.center}>
                    <img className={classes.img2} src={logo} alt=""/>
                </Grid>
            </Grid>
            </div>
        );
    }

    changeVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        this.setState({[name]: value} as Pick<S, keyof S>)
    }

    login = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // empecher la redirection sur la même page
        const data = { // définir les data à envoyer
            email: this.state.email.trim(),
            password: this.state.password.trim(),
        }
        axios.post(`http://localhost:3010/api/UBER-EEDSI/account/login`, data)
        .then(res => {
            localStorage.setItem('currentUser', JSON.stringify(res.data)); // stock les informations de l'utilisateurs en front
            toast.success("Connexion réussie", {
                position: toast.POSITION.BOTTOM_CENTER
            });
            setTimeout(() => {history.push('/map')}, 100);
        })
        .catch(error => {
            if (error.response && error.response.data && error.response.data.message === 'Double authentification is activated, code is required') {
                axios.post(`http://localhost:3010/api/UBER-EEDSI/account/request-double-authentification`, data)
                .then(res => {
                    toast.warn("La double authentification est activée", {
                        position: toast.POSITION.BOTTOM_CENTER
                    });
                    history.push('/double-auth', data); // faire la redirection en envoyant des données à la page d'après
                })
                .catch(error => {
                    console.log(error.response.data)
                })
            } else if (error.response && error.response.data && error.response.data.message === 'Email address not verified') {
                axios.post(`http://localhost:3010/api/UBER-EEDSI/account/request-verify-email`, {email: data.email})
                .then(() => {
                    history.push('/verify-email', {email: data.email}); // faire la redirection
                })
                .catch(error => {
                    toast.warn("Erreur lors de l'envoi du mail de vérification", {
                        position: toast.POSITION.BOTTOM_CENTER
                    });
                    console.log(error.response.data)
                })
            } else {
                toast.warn("Veuillez remplir tous les champs", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                console.log(error.response.data)
            }
        })
    }
}

const InputEmail = withStyles({
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


const InputPassword = withStyles({
    root: {
        width:'100%',
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

const LoginButton = withStyles({
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
