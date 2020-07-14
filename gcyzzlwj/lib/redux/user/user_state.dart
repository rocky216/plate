class UserState {

  List family;

  UserState({this.family});

  factory UserState.initial(){
    return UserState(family: []);
  }

}