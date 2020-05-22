import './state.dart';
import './app/app_reducer.dart';


IndexState reducers(IndexState state, action){

  return IndexState(
    appReducer(state.app, action)
  );
}


