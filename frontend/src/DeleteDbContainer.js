import React from 'react';
import { connect } from 'react-redux';
import DeleteDb from './store/powerActions';

const DeleteDbContainer = connect(() => ({}), mapDispatchToProps)(DeleteDbComponent);
export default DeleteDbContainer;

function mapDispatchToProps(dispatch) {
  dispatch(DeleteDb());
  return {};
}

function DeleteDbComponent() {
  return <div>database deleted</div>;
}