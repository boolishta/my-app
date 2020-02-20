import React from 'react';
import style from './ProfileStatus.module.css';

class ProfileStatus extends React.Component { //классовая компонента

  /* создаем локальный state */
  state = {
    editMode: false, //если true то можно редактировать
    status: this.props.status
  }

  activateEditMode = () => {
    this.setState({ //асинхронный, state меняет не сразу
      editMode: true
    })
  }

  deactivateEditMode = () => {
    this.setState({ //асинхронный, state меняет не сразу
      editMode: false
    });
    this.props.updateStatus(this.state.status)
  }

  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value
    });
  }

  componentDidUpdate(prevProps, prevState) { //обновление компоненты, срабатывает при любом изменении пропсов или state
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
  }

  render() {
    return (
      <div className={style.profileStatus}>
        {!this.state.editMode &&
          <div>
            <span onDoubleClick={this.activateEditMode}>{this.props.status || "Change your status"}</span>
          </div>
        }
        {this.state.editMode &&
          <div>
            <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status} />
          </div>
        }
      </div>
    );
  }
}

export default ProfileStatus;