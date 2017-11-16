import { connect } from 'react-redux';
import { getInvite } from '../../action/get_invite';
import { addToInvite } from '../../action/add_invite';
import { watchGuestAddedEvent } from '../../action/guest_added_event';
import Invite from './invite.jsx';

function mapStateToProps(state) {
  return {
    invite: state.invite
  };
}

function mapDispatchToProps(dispatch) {
  watchGuestAddedEvent(dispatch);
  return {
    onGetInvite: () => dispatch(getInvite()),
    onAddToInvite: (name) => dispatch(addToInvite(name))
  };
}

const inviteContainer = connect(mapStateToProps, mapDispatchToProps)(Invite);

export default inviteContainer;
