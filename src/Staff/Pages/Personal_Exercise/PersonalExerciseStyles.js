let PersonalExerciseStyles = ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerTbl: {
        height: 530,
        paddingTop: 10,
        backgroundColor: '#F9F9FF'
    },
    card: {
        backgroundColor: '#FFFFFF',
    },
    accordion: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8F8FF',
    },
    txtAccordion: {
        fontSize: 50,
        textAlign: 'center'
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
        justifyContent: 'space-around',
        alignItems: 'right'
    },
    tbl: {
        textAlign: 'center'
    },
    viewBtnTbl: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 2
    },
    btn: {
        width: 28,
        height: 28
    },
    i: {
        fontSize: 12
    },
    titleBox: {
        marginTop: -27,
        marginLeft: 12,
        width: 'max-content',
        backgroundColor: 'rgba(255,255,255,0.8)',
        fontWeight: '600'
    },
    containerExerciseQueue: {
        borderColor: 'rgba(125,125,125,0.7)',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 15
    },
    containerExerciseQueueList: {
        borderColor: 'rgba(125,125,125,0.7)',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 15
    },
    overlay: {
        fontWeight: '500',
        backgroundColor: '#F9F9FF',
        fontSize: 15
    }
})
export default PersonalExerciseStyles