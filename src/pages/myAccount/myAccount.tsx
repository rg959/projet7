import Header from '../../component/header/header';
import React from 'react';
import { Link } from 'react-router-dom';
import avatar from  '../../assets/img/linux-avatar.png';
import styles, { myAccountStyles } from './myAccount-style';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

interface P {}
interface S {
    name: string,
    email: string,
    phone: string,
    password: string,
    createdAt: string,
}

export default class MyAccount extends React.PureComponent<P & WithStyles<myAccountStyles>, S> {

    public static Display = withStyles(styles as any)(MyAccount) as React.ComponentType<P>
    public state: Readonly<S> = {
        name: "",
        email: "",
        phone: "",
        password: "",
        createdAt: "",
    };
    render () {
        const user: any = JSON.parse(localStorage.getItem('currentUser') as string);
        const { classes } = this.props;
        const phone: string = (user.phone) ? user.phone : '';
        return (
            <><Header.Display />
                <div>
                    <h1 className={classes.titre}>MON COMPTE</h1>
                    <hr className={classes.hr}></hr>
                    <Grid container className={classes.container}>
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                            <Container className={classes.containerUser}>
                                <Grid container>
                                    <Grid item xs={6} >
                                        <h1 className={classes.h1}>{user.name}</h1>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.fonttext} gutterBottom variant="h5" component="h2">
                                            <h2 className={classes.h2}>Inscrit le : {user.createdAt}</h2>
                                        </Typography>
                                    </Grid>
                                </Grid>
                              
                                <hr className={classes.hr2}></hr>
                                <Typography className={classes.fonttext} gutterBottom variant="h5" component="h2">
                                    <ul className={classes.ul}>
                                        {/* <h2 className={classes.h2}>Inscrit le : jj/mm/aaaa</h2> */}
                                        {/* <li className={classes.li}>Nom: <a>XXXXXXXX</a></li> */}
                                        {/* <li className={classes.li}>Prénom: <a>XXXXXXXX</a></li> */}
                                        <li className={classes.li}> Téléphone: <a>{phone}</a></li>
                                        <li className={classes.li}> Email: <a>{user.email}</a></li>
                                    </ul>
                                </Typography>
                            </Container>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className={classes.btnContainer}>
                        <Link to="/update-my-account"> 
                            <Button className={classes.btnUpdateUser}>Mettre à jour mes informations</Button>
                         </Link>
                        </Grid>
                    </Grid>
                </div></>
        );
    }
}
