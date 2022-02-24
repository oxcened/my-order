import * as React from 'react';
import { useEffect, useState } from 'react';
import './src/styles/global.css';
import Navbar from "./src/components/Navbar";
import { Provider } from "react-redux";
import getStore from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import LoginModal from "./src/components/LoginModal";
import { useAuth } from "./src/core/hooks";
import { Helmet } from "react-helmet";
import AvatarModal from "./src/components/AvatarModal";

export const wrapRootElement = ({ element }) => {
  const store = getStore();

  return <>
    <Provider store={store.store}>
      <PersistGate persistor={store.persistor}>
        {element}
      </PersistGate>
    </Provider>
  </>;
};

export const wrapPageElement = ({ element }) => {
  const App = ({ element }) => {
    const { user, logout } = useAuth();
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [currentAvatar, setCurrentAvatar] = useState(0);
    const [currentName, setCurrentName] = useState('');

    useEffect(() => {
      if (!user) {
        setCurrentAvatar(0);
        setCurrentName('');
      }
    }, [user]);

    const onAvatarSubmit = (avatar) => {
      setCurrentAvatar(avatar);
      setShowAvatarModal(false);
    }

    return <>
      <Helmet>
        <title>WinkEat</title>
      </Helmet>
      <Navbar user={user} onLogout={logout} />
      {element}
      <LoginModal
        isOpen={(!user || !user.name) && !showAvatarModal}
        name={currentName}
        currentAvatar={currentAvatar}
        onAvatarChoose={() => setShowAvatarModal(true)}
        onNameChange={setCurrentName}
      />
      <AvatarModal
        isOpen={showAvatarModal}
        current={currentAvatar}
        onBackdropClick={() => setShowAvatarModal(false)}
        onSubmit={onAvatarSubmit}
      />
    </>;
  };

  return <App element={element} />;
};
