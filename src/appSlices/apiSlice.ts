// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Define our single API slice object
export const apiSlice = createApi({
  reducerPath: "api",
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { endpoint }) => {
      const token = localStorage.getItem("access_token");

      if (
        token &&
        endpoint !== "createUser" &&
        endpoint !== "obtainToken" &&
        endpoint !== "forgetPassword" &&
        endpoint !== "resetPassword"
      ) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Staffs", "Zones", "Areas", "Branches"],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (user) => ({
        url: "/v2/user/register",
        method: "POST",
        body: user,
      }),
    }),
    obtainToken: builder.mutation({
      query: (user) => ({
        url: "/v1/user/login",
        method: "POST",
        body: user,
      }),
    }),
    offramp: builder.mutation({
      query: (details) => ({
        url: "/v1/transaction/off-ramp",
        method: "POST",
        body: details,
      }),
    }),
    getAuthUser: builder.query({
      query: () => ({
        url: "/v1/auth/user",
      }),
    }),
    onramp: builder.query({
      query: () => ({
        url: "/v1/transaction/on-ramp",
      }),
    }),
    getTransaction: builder.query({
      query: ({ category, pageSize }) => ({
        url: `/v1/transaction?category=${category}&pageSize=${pageSize}`,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (user) => ({
        url: "/v1/token/forget-password",
        method: "POST",
        body: user,
      }),
    }),
    resetPassword: builder.mutation({
      query: (user) => ({
        url: "/v1/token/reset-password",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useObtainTokenMutation,
  useGetAuthUserQuery,
  useOnrampQuery,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useOfframpMutation,
  useGetTransactionQuery,
} = apiSlice;

// {
//   "data": {
//       "nextPage": "",
//       "prevPage": "",
//       "result": [
//           {
//               "address": "0xcad5797bbe1b64282c316adbc9723b832d83919c",
//               "amount": "3",
//               "blockNumber": 26297631,
//               "chain": "celo-mainnet",
//               "counterAddress": "0x5aa4b6e1a09afa5d9b639752f21dad6965798dab",
//               "hash": "0x8c434bd29a77764a110dbcae0c34edfeae2341ebfaaab153de852a8614cc1bc9",
//               "timestamp": 1719159354000,
//               "tokenAddress": "0x765de816845861e75a25fca122bb6898b8b1282a",
//               "transactionIndex": 4,
//               "transactionSubtype": "incoming",
//               "transactionType": "fungible"
//           }
//       ]
//   },
//   "errors": false,
//   "status": "retrieved transactions successfully"
// }
