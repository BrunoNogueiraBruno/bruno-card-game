import Ably from 'ably';

const ABLY_API_KEY = import.meta.env.VITE_ABLY_API_KEY as string;

if (!ABLY_API_KEY) {
  throw new Error("ABLY_API_KEY environment variable is not set.");
}



export const connect =  () => {
  try {
    const ably = new Ably.Realtime({ key: ABLY_API_KEY });

ably.connection.on('connected', () => {
  console.log('Connected to Ably!');
});
  } catch (error) {
    console.error("Error connecting to Ably:", error);
  }
};

export const disconnect = () => {
  try {
    const ably = new Ably.Realtime({ key: ABLY_API_KEY });

    ably.close();
    console.log("Disconnected from Ably.");
  } catch (error) {
    console.error("Error disconnecting from Ably:", error);
  }
};
