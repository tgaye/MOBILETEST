import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import WalletConnect from "@walletconnect/client";
import { useWalletConnect } from "@walletconnect/react-native-dapp";

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const connector = useWalletConnect();

  const connectWallet = async () => {
    // Check if there is a connection
    if (!connector.connected) {
      // Create a new session
      await connector.createSession();
    }
  };

  const signMessage = async () => {
    if (connector.connected && walletAddress) {
      // Define the message to sign
      const message = "Hello, world!";
      // Sign the message
      const result = await connector.signPersonalMessage([message, walletAddress]);
      console.log('Signed message:', result);
    }
  };

  // Listen to connection events
  if (connector.connected) {
    setWalletAddress(connector.accounts[0]);
  }

  return (
    <View>
      <Button title="Connect Wallet" onPress={connectWallet} />
      {walletAddress && (
        <View>
          <Text>Connected: {walletAddress}</Text>
          <Button title="Sign Message" onPress={signMessage} />
        </View>
      )}
    </View>
  );
};

export default App;
