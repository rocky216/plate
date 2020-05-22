import './app_state.dart';
import './app_action.dart';



AppState appReducer(AppState state, action){
  if(action is HomeInfo){ 
    return AppState( home: action.home, user: state.user);
  }
  if(action is UserInfo){
    return AppState(home: state.home, user: action.user );
  }
  if(action is ClearAllStore){
    return AppState();
  }

  return state;
}