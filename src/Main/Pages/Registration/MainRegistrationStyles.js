let MainRegistrationStyles = ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: 'rgba(35,45,50,0.6)',
        textAlign: 'center',
        paddingBottom: 20
    },
    logo: {
        maxHeight: 200,
        maxWidth: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt: {
        fontWeight: '700',
        marginLeft: 5
    },
    txtInput: {
        borderColor: 'gray'
    },
    btn: {
        width: 130,
        alignSelf: 'right',
        marginLeft: 15,
        marginRight: 10
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
        backgroundColor: 'rgba(255,255,255)'
    },
    overlay: {
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#F9F9FF',
        fontSize: 20
    }
})
export default MainRegistrationStyles