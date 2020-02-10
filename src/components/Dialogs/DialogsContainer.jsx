import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { addMessageActionCreator, addUpdateNewMessageTextActionCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage
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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
) (Dialogs) //второй раз вызывается функция которая вернулась при вызове первого раза compose;