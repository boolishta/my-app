import React from 'react';
import style from './ProfileStatus.module.css';

class ProfileStatus extends React.Component {

  /* создаем локальный state */
  state = {
    editMode: false //если false то нельзя редактировать, если true то можно редактировать
  }

  activateEditMode() {
    this.setState({ //асинхронный, state меняет не сразу
      editMode: true
    })
  }

  deactivateEditMode() {
    this.setState({ //асинхронный, state меняет не сразу
      editMode: false
    })
  }

  render() {
    return (
      <div className={style.profileStatus}>
        {!this.state.editMode &&
          <div>
            <span onDoubleClick={ this.activateEditMode.bind(this) }>{this.props.status}</span>
          </div>
        }
        {this.state.editMode &&
          <div>
            <input autoFocus={true} onBlur={ this.deactivateEditMode.bind(this) } value={this.props.status} />
          </div>
        }
      </div>
    );
  }
}

export default ProfileStatus;