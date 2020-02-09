import { connect } from 'react-redux';
import { addMessageActionCreator, addUpdateNewMessageTextActionCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
    isAuth: state.auth.isAuth
  }
};

let mapDispatchToProps = (dispatch) => {
  return {
    updateNewMessageText: (text) => {
      dispatch(addUpdateNewMessageTextActionCreator(text)); //диспатчим результат вызова функции addUpdateNewMessageTextActionCreator()
    },
    sendMessage: () => {
      dispatch(addMessageActionCreator());
    }
  }
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (Dialogs);

export default DialogsContainer;