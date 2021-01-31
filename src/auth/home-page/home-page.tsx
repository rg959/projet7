import * as React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/uber.png';
import voiture2 from '../../assets/img/uberCar.gif';
import yvi from '../../assets/img/bgVille.gif';

import styles, { homePageStyles } from './home-page-style';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

interface P {}
interface S {}

export default class homePage extends React.PureComponent<P & WithStyles<homePageStyles>, S> {

    public static Display = withStyles(styles as any)(homePage) as React.ComponentType<P>
    
    render () {
        const { classes } = this.props;
            return (
            <div className={classes.back + ' ' + classes.center}>
                            
            <Grid container className={classes.containerLeft}>
                <Grid item xs={12} >
                    <div className={classes.annimation}>
                        <img className={classes.fondVilleImage} src={yvi} alt=""/>
                        <div className={classes.ligneBlanche1}>&nbsp;</div>
                        <hr className={classes.dotted} />
                        <img className={classes.voiture} src={voiture2} alt=""/>
                        <div className={classes.ligneBlanche}>&nbsp;</div>
                    </div><br></br>       
                </Grid>
            </Grid>
            <Grid container className={classes.container}>
            
                <Grid item xs={12} className={classes.mainDiv + ' ' + classes.center}>
                    
                    <Grid container className={classes.boxDroite}>
                    
                        <Grid item xs={12} className={classes.center}>
                            <img className={classes.img} src={logo} alt=""/>
                        </Grid>
                        <Grid item xs={2} className={classes.center}>
                        </Grid>
                        <Grid item xs={12} className={classes.center}>
                            <form className={classes.form} noValidate autoComplete="off">
                            <ConnexionButton><Link to="/login">Connexion</Link></ConnexionButton>
                            </form>
                        </Grid>
                        <Grid item xs={2} className={classes.center}>
                        </Grid>
                        <Grid item xs={12} className={classes.center}>
                            <span className={classes.subtitle}>Vous n'avez pas de compte ? <Link to="/register" className={classes.link}>Rejoignez-nous</Link>&nbsp;!</span> 
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            </div>
        );
    }
}



const ConnexionButton = withStyles({
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
        '& span:hover': {
            textDecoration: 'none',
        },
        '& a': {
            color: 'black',
        },
        '& a:hover': {
            textDecoration: 'none',
        },
    },
})(Button);
