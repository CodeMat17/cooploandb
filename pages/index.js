import { Text, Box } from "@chakra-ui/react";
import { Delius } from "@next/font/google";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import Head from "next/head";
import MainPage from "../components/MainPage";

const delius = Delius({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={delius.className}>
        {!session ? (
          <Box py='24' px='6'>
            <Text textAlign='center' fontSize='3xl' fontWeight='semibold'>
              COOPLOAN ADMIN DASHBOARD
            </Text>
            <Text mt='2' color='green.500' textAlign='center' fontSize='lg' fontWeight='semibold'>
              Sign in or Sign up
            </Text>

            <Box maxW='xs' mx='auto'>
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                theme='dark'
              />
            </Box>
          </Box>
        ) : (
          <MainPage session={session} />
        )}
      </main>
    </>
  );
}
