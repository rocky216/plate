import 'package:redux/redux.dart';
import 'package:redux_thunk/redux_thunk.dart';
import './state.dart';
import './reducers.dart';

Store<IndexState> createStore(){
  return Store(
    reducers,
    initialState: IndexState.initial(),
    middleware: [
      thunkMiddleware
    ]
  );
} 