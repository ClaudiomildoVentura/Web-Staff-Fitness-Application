let MainHomeStyles = ({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    containerLogin: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: 'rgba(35,45,50,0.6)',
        textAlign: 'center'
    },
    logo: {
        maxHeight: 200,
        maxWidth: 200
    },
    txt: {
        fontSize: 15,
        fontWeight: '700',
        color: 'white'
    },
    viewBtn: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    msgSuccess: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'green',
        color: 'green',
        textAlign: 'center'
    },
    msgError: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'red',
        color: 'red',
        textAlign: 'center',
        fontSize: 15,
        backgroundColor: 'rgba(255,255,255)'
    }
})
export default MainHomeStyles