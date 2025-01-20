import Ably from 'ably'

const ABLY_API_KEY = import.meta.env.VITE_ABLY_API_KEY as string

if (!ABLY_API_KEY) {
  throw new Error("ABLY_API_KEY environment variable is not set.")
}

export const connect = async () => {
  try {
    const ably = new Ably.Realtime({ key: ABLY_API_KEY })

  ably.connection.on('connected', () => {
    console.log('Connected to Ably!')
  })

  } catch (error) {
    console.error("Error connecting to Ably:", error)
  }
}

export const subscribeToChannel = async (toChannel: string, cb: (arg0: any) => void) => {
  try {
    const ably = new Ably.Realtime({ key: ABLY_API_KEY })

    const channel = ably.channels.get(toChannel)
    await channel.subscribe(cb)

  } catch (error) {
    console.error(error)
  }
}

export const disconnect = async () => {
  try {
    const ably = new Ably.Realtime({ key: ABLY_API_KEY })

    ably.close()
    console.log("Disconnected from Ably.")

    const channel = ably.channels.get('session')
    await channel.detach()
  } catch (error) {
    console.error("Error disconnecting from Ably:", error)
  }
}

export const publishMessage = async (user: string, channelToSend: string, content: any) => {
  try {
    const ably = new Ably.Realtime({ key: ABLY_API_KEY })
    const channel = ably.channels.get(channelToSend)
    await channel.publish(user, content)
    
  } catch (error) {
    console.error(error)
  }
}
