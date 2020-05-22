import './app/app_state.dart';


class IndexState {

  AppState app;

  IndexState(this.app);

  factory IndexState.initial(){
    
    //初始化state的参数
    return IndexState( 
      AppState.initial() 
    );
  }

}