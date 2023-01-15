import "../styles/globals.css";
import Layout from "@/components/Layout";
import { getSession, SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "@/context/ModalContext";
import { NewListModal } from "@/components/NewListModal";
import { ListEditModal } from "@/components/ListEditModal";

import { Navbar } from "@/components/Navbar";
import { RootLayout } from "@/components/RootLayout";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <RootLayout>
          <ModalProvider>
            <Navbar />
            <Layout>
              <Component {...pageProps} />
              <NewListModal />
              <ListEditModal />
            </Layout>
          </ModalProvider>
        </RootLayout>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const user = session ? session.user : null;

  return {
    props: {
      user,
    },
  };
}
