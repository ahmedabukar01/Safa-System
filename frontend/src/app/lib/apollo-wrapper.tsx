"use client";

// import * as React from 'react'
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { useCookies } from "next-client-cookies";
console.log('haaa',process.env.BACKEND_URL)
function makeClient(token: any) {
  const httpLink = new HttpLink({
      // https://studio.apollographql.com/public/spacex-l4uc6p/
      // uri: process.env.NODE_ENV === 'development' ? process.env.BACKEND_DEV_URL : process.env.BACKEND_PROD_URL ,//"http://localhost:8000/graphql",
      uri: process.env.NEXT_PUBLIC_BACKEND_URL,
      fetchOptions: {cache: "no-store"},
      headers: {
        Authorization: token && `Bearer ${token}`
      },
      credentials: "include",
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const cookie = useCookies();
  const authToken: any = cookie.get('id');

  return (
    <ApolloNextAppProvider makeClient={() => makeClient(authToken)}>
      {children}
    </ApolloNextAppProvider>
  );
}