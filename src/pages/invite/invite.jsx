import React from 'react';

class Invite extends React.Component {

  constructor() {
    super();
    this.state = {
      name: ''
    };
  }

  componentDidMount() {
    this.props.onGetInvite();
  }

  render() {
    const { host, agenda, guest_count, guests } = this.props.invite;
    return (
      <div className="container">
        <div className="well">
          <h1>Meeting invite</h1>
        </div>
        <div className="bg-warning meeting-summary">
          <div className="row">
            <div className="col-sm-4 col-md-2">
              <b>Host:</b>
            </div>
            <div className="col-sm-8 col-md-10">
              {host}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4 col-md-2">
              <b>Agenda:</b>
            </div>
            <div className="col-sm-8 col-md-10">
              {agenda}
            </div>
          </div>
        </div>
        <div className="bg-info meeting-form">
            <div className="row">
              <div className="col-sm-4 col-md-2">
                <b>Name:</b>
              </div>
              <div className="col-sm-8 col-md-10">
                <input
                  type="text"
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4 col-md-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => this.props.onAddToInvite(this.state.name)}
                >
                  I am coming!
                </button>
              </div>
            </div>
        </div>
        <div className="meeting-list">
          <h2>Guests</h2>
          {guests && guests.length > 0 ? (
            <ul>
              {guests.map((guest, index) => {
                return (
                  <li key={index}>
                    {guest.name}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Invite;