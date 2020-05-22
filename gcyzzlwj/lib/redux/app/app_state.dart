class AppState {

  Map home;
  Map user;

  AppState({this.home, this.user});

  factory AppState.initial(){
    return AppState(home: null, user: null);
  }

}