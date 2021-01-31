import { Theme, createStyles } from '@material-ui/core/styles';

export type mapStyles = ("center" |"parentMap"|"map" | "container" |"container2" |"containerMobilite" | "containerInfoDeplacement"|'fonttext' |"boutonsMonbilite"|"blocVoitureVeloPieton"|"containerPrincipalInput" |"containerInput"|"inputDepart"|"inputDestination"|"iconLocalisation"|"iconSup"|"iconSupParent"|"iconAjoutParent"|"iconAjout"|"ajoutText"|"ajoutTextparent"|"btnValiderItineraire" |
"tempsTrajet" |"tempsTrajetA"|"tempsTrajethms"|"detailBtn"|"detailList"|"leftCol"|"rightCol"|"containerCol"); // add class create

// eslint-disable-next-line
export default (theme: Theme) => createStyles<mapStyles, {}>({
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
   
    fonttext:{
        color:'white',
    },
  
    parentMap:{
        position: 'absolute',
        height: '90vh',
        width: '100vw'
    },

    map:{
        position: 'relative',
        zIndex: 1,
    },
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        width: '25%',
        position: 'absolute',
        zIndex: 2,
        // top: '7vh',
        // left: '5vw',
        height: '90vh',
    },
    containerMobilite: {
        backgroundColor:'white',
        borderRadius: '20px',
        height: '10vh',
        width:'100%',
        marginTop:'50px',
        marginLeft:'10px',
        marginRight:'10px',
        marginBottom:'10px',
    },
    boutonsMonbilite:{
        width: '100%',
        height:'100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '',
    },
    containerInfoDeplacement: {
        backgroundColor:'white',
        borderRadius: '20px',
        marginLeft:'10px',
        marginRight:'10px',
        height: '70vh',
        // height: '90%',
        maxHeight: '80vh',
        width:'100%',
        marginBottom:'10px',
        overflowX: 'auto',
        padding: '8px 7px',
        paddingTop: '20px'
    },
    blocVoitureVeloPieton:{
        marginTop: '',
        marginBottom: '15px',
        width: '100%',
        height:'100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    containerPrincipalInput:{
        backgroundColor:'',
        width:'100%'
    },
    containerInput:{
        width: '100%', 
        backgroundColor:''
    },
    inputDepart:{
        Width:'100%', 
        marginTop: '10px',
        width: '100%'
    },
    inputDestination:{
        marginTop: '10px',
        width: '100%'
    },
    iconLocalisation:{
        width: '70%',
        height:'70%',
        marginTop:'15px', 
        float: 'right',
    },
    
    iconSupParent:{
        width:'30px',
        height:'17px',
        marginTop:'30%',
        marginLef: '1px',
        float: 'left', 
    },
    iconSup:{
        height: '100%',
        width: '100%',
        color:'#E74C3C'
    },
    iconAjoutParent:{
        width:'30px',
        height:'17px',
        marginTop:'30%',
        marginLef: '1px',
        float: 'right',
    },
    iconAjout:{
        height: '100%',
        width: '100%',
        color:''
    },
    ajoutTextparent:{
        marginTop: '20px', 
        padding:'3px 10px',
        textAlign:'center',
        '& a' : {
            color:'black'
        }
    },
    ajoutText:{
    },
    btnValiderItineraire: {
        textAlign:'center',
        marginTop: '20px', 
        backgroundColor: 'black',
        borderRadius: '50px',
        width: '80%',
        height: '40px',
        fontSize: '15px',
        alignItems:'center',
        margin:'auto 0'
    },
//    TABLEAU 2

    container2: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        marginLeft:'30%',
        width: '20%',
        position: 'relative',
        zIndex: 2,
        marginTop:'-710px'
    },
    tempsTrajet:{
        marginTop:'15px',
        backgroundColor:'black',
        width:'80%',
        height:'60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tempsTrajetA:{
    
        color:'white',
    },
    tempsTrajethms:{
        color: 'primary',
        fontWeight:'bold',
    },
    detailBtn:{
        color:'black',
        marginTop:'25px'
    },
    detailList:{
        height:'max-content',
        margin: '15px 15px',
        textAlign:'justify',
    },
    containerCol:{
        maxWidth:'100%',
        
    },
    leftCol:{
        width:'25%',
    },
    rightCol:{
        maxWidth:'75%',
        width:'75%',
        height: '90vh'
    },
    [theme.breakpoints.down('xl')]: {
        
    },
    [theme.breakpoints.down('lg')]: {
        
    },
    [theme.breakpoints.down('md')]: {
        container: {
            width: '35%'
        },
        leftCol:{
            width:'35%',
        },
        rightCol:{
            maxWidth:'65%',
            width:'65%',
        },
    },
    [theme.breakpoints.down('sm')]: {
        container: {
            width: '45%'
        },
        leftCol:{
            width:'45%',
        },
        rightCol:{
            maxWidth:'55%',
            width:'55%',
        },
    },
    [theme.breakpoints.down('xs')]: {
        
    },
});