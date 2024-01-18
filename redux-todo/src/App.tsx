import "./App.css";
import React, { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "./hooks/thunk";
import { RootState } from "./types/Root.Types";

//Imports actions
import { IsAuntheticatedAction } from "./actions/AuthActions";
import { PopulateTodoAction } from "./actions/TodoActions";

//Imports components for display
import TitleHeader from "./components/TitleHeader";
import AuthForm from "./components/AuthForm";
import TodoContainer from "./components/TodoContainer";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAppSelector((state: RootState) => state.Auth);

  useEffect(() => {
    dispatch(IsAuntheticatedAction()).finally(() => setLoading(false));
  }, [dispatch]); // dispatch is a dependency

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(PopulateTodoAction());
    }
  }, [dispatch, isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>; // replace this with your actual loading component
  }

  return (
    // Formerly: App
    <div className="text-center">
      {/* Formerly App-Header */}
      <header className="bg-blue-200 min-h-screen flex flex-col items-center text-white text-lg">
        <TitleHeader />
        {isAuthenticated ? <TodoContainer /> : <AuthForm />}
      </header>
    </div>
  );
}

export default App;
