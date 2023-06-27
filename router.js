import AuthStackNav from "./routs/AuthStackNav";
import MainTabNav from "./routs/MainTabNav";


export const useRoute = (user) => {
  console.log("user in router:>> ", user);
  if (!user) {
    return <AuthStackNav/>;
  } else {
    return <MainTabNav/>;
  }
};


