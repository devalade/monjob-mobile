import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Form, Label, Theme } from 'tamagui';
import { Input } from 'tamagui';
import { Button, YStack } from 'tamagui';
import { useSession } from '../utils/ctx';

export default function Page() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const session = useSession();

  function onSubmit() {
    session
      ?.signIn(form)
      .then((res) => router.push('/(app)/(tabs)/'))
      .catch((e) => {
        setErrors(e);
      });
  }

  return (
    // <SafeAreaView
    // style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <>
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
            <Label>Email</Label>
            <Input
              value={email}
              onChangeText={(value) =>
                setForm((prev) => ({ ...prev, email: value }))
              }
              size='$4'
              borderWidth={2}
            />
          </YStack>
          <YStack marginBottom='$6'>
            <Label>Password</Label>
            <Input
              type='password'
              value={password}
              onChangeText={(value) =>
                setForm((prev) => ({ ...prev, password: value }))
              }
              size='$4'
              borderWidth={2}
            />
          </YStack>
          <Button onPress={onSubmit} marginBottom='$2'>
            Se Connecter
          </Button>
          <Link href='/sign-up' style={{ color: '#FFF' }}>
            Create your account
          </Link>
        </YStack>
      </Form>
    </>
    // </SafeAreaView>
  );
}
