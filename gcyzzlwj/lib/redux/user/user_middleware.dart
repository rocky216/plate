import 'package:redux/redux.dart';
import 'package:redux_thunk/redux_thunk.dart';
import '../../pages/http.dart';
import '../state.dart';
import './user_action.dart';

ThunkAction<IndexState> getFamilys(context, {params, next}){
  return (Store<IndexState> store) async {
    try{
      var data = await NetHttp.getRequest("/api/app/owner/user/brotherList", params: params);
      if(data != null){
        store.dispatch( Family(data) );
        next();
      }
    }catch(e){}
  };
}