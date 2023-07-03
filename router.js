import AuthStackNav from "./routs/AuthStackNav";
import MainTabNav from "./routs/MainTabNav";


export const useRoute = (user) => {

  if (!user) {
    return <AuthStackNav/>;
  } else {
    return <MainTabNav/>;
  }
};


