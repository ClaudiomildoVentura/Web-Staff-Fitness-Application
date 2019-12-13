let PersonalShoppingStyles = ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontWeight: 'bold',
        marginLeft: 5
    },
    logo: {
        maxHeight: 200,
        maxWidth: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    msgSuccess: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'green',
        color: 'green',
        textAlign: 'center',
    },
    msgError: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'red',
        color: 'red',
        textAlign: 'center'
    },
    textinput: {
        borderColor: 'gray',
    },
    viewbtn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    btn: {
        width: 130
    },
    areaCode: {
        borderColor: 'gray',
        borderRightRightRadius: 0,
    },
    areaCodeText: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        textAlign: 'right',
    },
    numberText: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
    number: {
        borderColor: 'gray',
        minWidth: 45
    }
})
export default PersonalShoppingStyles