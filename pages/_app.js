import "../styles/globals.css";
import Layout from "@/components/Layout";
import { getSession, SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "@/context/ModalContext";
import { NewListModal } from "@/components/NewListModal";
import { ListEditModal } from "@/components/ListEditModal";

import { Navbar } from "@/components/Navbar";
import { RootLayout } from "@/components/RootLayout";
import { useState } from "react";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [queryClient, setQueryClient] = useState(new QueryClient());
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <RootLayout>
            <Navbar />
            <Layout>
              <Component {...pageProps} />
              <NewListModal />
              <ListEditModal />
            </Layout>
          </RootLayout>
        </ModalProvider>
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
