

import './user_state.dart';
import './user_action.dart';

UserState userReducer(UserState state, action){
  
  if(action is Family ){
    return UserState(family: action.family);
  }
  return state;
}