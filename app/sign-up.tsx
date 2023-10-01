import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Form, Label, Theme } from 'tamagui';
import { Input } from 'tamagui';
import { Button, YStack } from 'tamagui';

function register(data: Record<string, any>) {
  return fetch('http://locahost:8000/api/login', {
    body: JSON.stringify(data),
  });
}

export default function Page() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);

  function onSubmit() {
    register({ name, email, password })
      .then((res) => {
        router.push('/(app)/(tabs)/');
      })
      .catch((e) => {
        setErrors(e);
      });
  }

  return (
    // <SafeAreaView
    // style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <>
      <StatusBar style='light' />
      <Form
        alignItems='center'
        minWidth={300}
        gap
        onSubmit={onSubmit}
        flex={1}
        justifyContent='center'
        borderWidth={1}
        borderRadius='$4'
        backgroundColor='$background'
        borderColor='$borderColor'
        padding='$8'>
        <YStack width='100%'>
          <YStack marginBottom='$2'>
            <Label>Name</Label>
            <Input
              value={name}
              onChangeText={(value) => setName(value)}
              size='$4'
              borderWidth={2}
            />
          </YStack>
          <YStack marginBottom='$2'>
            <Label>Email</Label>
            <Input
              value={email}
              onChangeText={(value) => setEmail(value)}
              size='$4'
              borderWidth={2}
            />
          </YStack>
          <YStack marginBottom='$6'>
            <Label>Password</Label>
            <Input
              type='password'
              value={password}
              onChangeText={(value) => setPassword(value)}
              size='$4'
              borderWidth={2}
            />
          </YStack>
          <Button onPress={onSubmit}>Sign Up</Button>
        </YStack>
      </Form>
    </>
    // </SafeAreaView>
  );
}
