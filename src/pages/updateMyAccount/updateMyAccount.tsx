import React from 'react';
import avatar from  '../../assets/img/linux-avatar.png';
import styles, { updateMyAccountStyles } from './UpdateMyAccount-style';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import axios, { AxiosRequestConfig } from 'axios';
import { history } from '../../history';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteAccount from '@material-ui/icons/DeleteForever';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from "react-bootstrap";

import HeaderBarUpdateMyAccount from '../../component/header/header-update-my-account';
interface P {}
interface S {
    name: string,
    email: string,
    phone: string,
    doubleAuth: boolean,
    password: string,
    newPassword: string,
    confirmPassword: string,
    isOpen : boolean,
} 
 export default class UpdateMyAccount extends React.PureComponent<P & WithStyles<updateMyAccountStyles>, S> {

    public static Display = withStyles(styles as any)(UpdateMyAccount) as React.ComponentType<P>
    
    public user = JSON.parse(localStorage.getItem('currentUser') as string);
    public phone: string = (this.user.phone) ? this.user.phone : '';
    public doubleAuth: boolean = (this.user.double_authentification) ? this.user.double_authentification : false;
    
    public state: Readonly<S> = {
        name: this.user.name,
        email: this.user.email,

        phone: this.phone,
        doubleAuth: this.doubleAuth,
        password: "",
        newPassword: "",
        confirmPassword: "",
        isOpen: false
    };

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

    render () {
        const { classes } = this.props;
        return (
            <div className ={classes.all}><HeaderBarUpdateMyAccount.Display />
                <form noValidate autoComplete="off" onSubmit={this.changeAccount}>
                    <h1 className={classes.h1}>MON COMPTE &gt; METTRE A JOUR MON COMPTE</h1>
                    <hr className={classes.hr}></hr>
                    <Grid container className={classes.container}>
                        <Grid item  >
                            {/* xs={12} sm={6} md={6} lg={4} */}
                            <Container className={classes.containerUser}>
                                <Grid container>
                                    <Grid item lg={4}  md={4} className={classes.left}>
                                        <Grid item sm={12} className={classes.userAvatar}>
                                            <img src={avatar} className={classes.userAvatar} alt="" />
                                        </Grid>
                                        <Grid item sm={12} >
                                        <input accept="image/*" className={classes.input} 
                                        id="contained-button-file" multiple type="file" />
                                            <label htmlFor="contained-button-file">
                                                <Button className={classes.btnAvatar} variant="contained" color="primary" component="span">
                                                <PhotoCamera className={classes.iconCamera}/> &nbsp; Modifier mon avatar &nbsp; &nbsp; 
                                                </Button>
                                            </label>
                                            </Grid>
                                    </Grid>
                                    <Grid xs={12}  md={4} lg={4} >
                                        <div className={classes.form}>
                                            <TextField className={classes.formId} label="Nom" variant="filled" name='name' value={this.state.name} inputProps={{autoComplete: 'name',form: {autoComplete: 'off',},}} onChange={this.changeVal}/>
                                            <TextField className={classes.formId} label="Téléphone" variant="filled" name='phone' value={this.state.phone} inputProps={{autoComplete: 'phone',form: {autoComplete: 'off',},}} onChange={this.changeVal}/>
                                            <TextField className={classes.formId} type= "password" label= "Nouveau mot de passe" name='newPassword' variant="filled" inputProps={{autoComplete: 'new-password',form: {autoComplete: 'off',},}} onChange={this.changeVal}/>
                                        </div>
                                    </Grid>
                                    <Grid xs={12} md={4} lg={4}>
                                        <div className={classes.form}>
                                            {/* <TextField className={classes.formId} label="Prénom" variant="filled" /> */}
                                            <TextField className={classes.formId} label="Email" variant="filled" name='email' value={this.state.email} inputProps={{autoComplete: 'email',form: {autoComplete: 'off',},}} onChange={this.changeVal}/>
                                            <TextField className={classes.formId} type= "password" label="Mot de passe actuel" variant="filled" name='password' inputProps={{autoComplete: 'password',form: {autoComplete: 'off',},}} onChange={this.changeVal}/>
                                            <TextField className={classes.formId} type= "password" label="Confirmer le nouveau mot de passe" variant="filled" name='confirmPassword' inputProps={{autoComplete: 'confirm-password',form: {autoComplete: 'off',},}} onChange={this.changeVal}/><br className={classes.brDA}></br>
                                            <Checkbox className={classes.checked} checked={this.state.doubleAuth} name="doubleAuth" onChange={this.doubleAuthChange}/>
                                        <a className={classes.a}>Double authentification</a> 
                                        </div>
                                    </Grid>
                                </Grid>
                                <br/>
                                <Grid container >
                                    <Grid xs={12} md={4} lg={4} className={classes.blocBtn}>
                                        <Button className={classes.btnDeleteAccount} variant="contained" color="primary" component="span" onClick={this.openModal}>
                                            <DeleteAccount className={classes.iconDeleteAccount}/> &nbsp; Supprimer mon compte
                                        </Button>
                                    </Grid>
                                    <Modal show={this.state.isOpen} onHide={this.closeModal}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Confirmation</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>Souhaitez-vous vraiment supprimer votre compte?</Modal.Body>
                                        <Modal.Footer>
                                            <Button className={classes.btnValidationDeleteAccount} onClick={this.deleteAccount}>
                                            Oui
                                            </Button>
                                            <Button className={classes.btnCancelDeleteAccount} onClick={this.closeModal}>
                                            Non
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <Grid item xs={12} lg={8} md={8} className={classes.containerBtnvalider} >
                                        <Button  className={classes.btnUpdateUser} variant="contained" color="primary" disableElevation type="submit"> VALIDER </Button>
                                    </Grid>                         
                                </Grid>
                            </Container>
                        </Grid>
                    </Grid>              
                </form></div>
        );
    }

    changeVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        this.setState({ ...this.state, [name]: value });
    }

    changeAccount = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let data: any = {
            name : this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password.trim(),
            oldPassword : this.state.password.trim(),
            newPassword: this.state.newPassword,
            confirmPassword: this.state.confirmPassword,
        };
        const config: AxiosRequestConfig = {
            method: 'put',
            url: 'http://localhost:3010/api/UBER-EEDSI/account',
            headers: { 
                'Authorization': this.user.token, 
                'Content-Type': 'application/json'
            },
            data : data
        };
        const config2: any = {
            method: 'post',
            url: 'http://localhost:3010/api/UBER-EEDSI/account/change-password',
            headers: { 
                'Authorization': this.user.token, 
                'Content-Type': 'application/json'
            },
            data : data
        };
        if (data.password === '') {
            toast.error("Mot de passe actuel nécessaire", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        } else if(data.name === '' || data.email === ''){
            toast.error("Email/Nom manquant(s)", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
        if(data.name !== '' && data.email !== '' && data.password !== '')
        axios(config)
        .then(res => {
            localStorage.setItem('currentUser', JSON.stringify(res.data)); // stock les informations de l'utilisateurs en front
            toast.success("Informations mises à jour avec succès", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        })
        .catch(error => {
            console.log(error.response.data)
        })
        if(data.email !=='' && data.oldPassword !=='' && data.newPassword !=='' && data.confirmPassword !== '' && data.newPassword !== data.confirmPassword){
            toast.error("Les mots de passe ne sont pas identiques", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
        if(data.email !=='' && data.oldPassword !=='' && data.newPassword !=='' && data.confirmPassword !== '' && data.newPassword === data.confirmPassword)
        axios(config2)
        .then(res => {
            localStorage.setItem('currentUser', JSON.stringify(res.data)); // stock les informations de l'utilisateurs en front
            toast.success("Mot de passe mis à jour", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        })
        .catch(error => {
            console.log(error.response.data)
        })
        console.log(this.state);
    }

    doubleAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        this.setState({ ...this.state, [e.target.name]: e.target.checked });
        const user = JSON.parse(localStorage.getItem('currentUser') as string);
        const data = {allow: !this.state.doubleAuth};
        const config: AxiosRequestConfig = {
            method: 'post',
            url: 'http://localhost:3010/api/UBER-EEDSI/account/double-authentification',
            headers: { 
                'Authorization': user.token, 
                'Content-Type': 'application/json'
            },
            data : data
        };
        const config2: AxiosRequestConfig = {
            method: 'get',
            url: 'http://localhost:3010/api/UBER-EEDSI/account/',
            headers: { 
                'Authorization': user.token, 
                'Content-Type': 'application/json'
            }
        };
        axios(config)
        .then(() => {
            axios(config2)
            .then((data2) => {
                if (data.allow) {
                    toast.success("Double authentification activé", {
                        position: toast.POSITION.BOTTOM_CENTER
                    });
                } else {
                    toast.success("Double authentification desactivé", {
                        position: toast.POSITION.BOTTOM_CENTER
                    });
                }
            })
            .catch((error) => {
                console.log(error.response.data);
            });
        })
        .catch((error) => {
            console.log(error.response.data);
        });
    }

    deleteAccount = (e:React.MouseEvent,) => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem('currentUser') as string)
        const data = {
            email :user.email
        }
        const config: AxiosRequestConfig = {
            method: 'delete',
            url: 'http://localhost:3010/api/UBER-EEDSI/account',
            headers: { 
                'Authorization': user.token, 
                'Content-Type': 'application/json'
            },
            data : data,
        };
        console.log("userToken: "+user.token);
        axios(config)
        .then(() => {
            toast.success("Votre compte a bien été supprimé", {
                position: toast.POSITION.BOTTOM_CENTER
            });
            history.push('/home');
        })
        .catch((error) => {
            toast.warn("Vous n'êtes pas autorisé à effectuer cette requête", {
                position: toast.POSITION.BOTTOM_CENTER
            });
            console.log(error.response);
        });
    }
}