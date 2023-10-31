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
import nookies from 'nookies'
import { useAppContext } from "./AppContext";

function makeClient(token: any) {
  const httpLink = new HttpLink({
      // https://studio.apollographql.com/public/spacex-l4uc6p/
      uri: "http://localhost:8000/graphql",
      headers: {
        Authorization: token && `Bearer ${token}`
      }
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
  const authToken: any = localStorage.getItem('token');
  console.log('authToken in apollo ',authToken);

  return (
    <ApolloNextAppProvider makeClient={() => makeClient(authToken)}>
      {children}
    </ApolloNextAppProvider>
  );
}