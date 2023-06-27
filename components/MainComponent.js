import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "../router";

import { authStateChangeUser } from "../redux/auth/authOperations";

const MainComponent = () => {
  const { stateChange } = useSelector((state) => state.auth);
  console.log('stateChange :>> ', stateChange);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('1 :>> ');
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default MainComponent;
