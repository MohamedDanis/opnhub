import { setupDevCycle } from '@devcycle/nextjs-sdk/server'
import { authClient } from "@/lib/auth-client"
 
const getUserIdentity = async () => {
  // pseudocode function representing some call you might make to
  // your code to determine the current user
  // You can use Next APIs such as `headers()` and `cookies()` here
  const { data: session } = await authClient.getSession()
  const myUser = await session?.user
  return {
    user_id: myUser?.id,
  }
}

export const { getVariableValue, getClientContext } = setupDevCycle({
  // Server SDK Key. This will be private and used to retrieve configuration data, so you MUST use the server SDK key.
  serverSDKKey: process.env.DEVCYCLE_SERVER_SDK_KEY ?? '',
  // Client SDK Key. This will be public and sent to the client, so you MUST use the client SDK key.
  clientSDKKey: process.env.NEXT_PUBLIC_DEVCYCLE_CLIENT_SDK_KEY ?? '',
  userGetter: async () => {
    const identity = await getUserIdentity();
    // Ensure user_id is never undefined by providing a default value
    return {
      user_id: identity.user_id || 'anonymous'
    };
  },
  options: {},
})