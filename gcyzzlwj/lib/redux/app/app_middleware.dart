import 'package:redux/redux.dart';
import 'package:redux_thunk/redux_thunk.dart';
import '../state.dart';
import '../../pages/http.dart';
import './app_action.dart';

ThunkAction<IndexState> getHomeInfoFetch(context,{params, next}){
  return (Store<IndexState> store) async {
    try{
      var data = await NetHttp.getRequest("/api/app/owner/common/indexInfo", context:context, 
        params: params!=null?params:{});
      
      if(data!=null){
        store.dispatch( HomeInfo(data) );
      }
    }catch(e){}
  };
}

ThunkAction<IndexState> getUserInfoFetch(context, {params, next}){
  return (Store<IndexState> store) async {
    try {
      
      var data = await NetHttp.getRequest("/api/app/owner/user/info/", context: context, params: {});
      
      if(data != null){
        store.dispatch( UserInfo(data[0]) );
        if(next!=null)next();
      }
    } catch (e) {
    }
  };
}

ThunkAction<IndexState> clearAllState(context, {params, next}){
  return (Store<IndexState> store) async {
    store.dispatch( ClearAllStore() );
  };
}