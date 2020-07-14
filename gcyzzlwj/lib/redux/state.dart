import './app/app_state.dart';
import './user/user_state.dart';


class IndexState {

  AppState app;
  UserState user;

  IndexState(this.app, this.user);

  factory IndexState.initial(){
    
    //初始化state的参数
    return IndexState( 
      AppState.initial(),
      UserState.initial()
    );
  }

}