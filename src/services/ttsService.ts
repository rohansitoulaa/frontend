import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";

let synthesizerInstance: SpeechSDK.SpeechSynthesizer | null = null;
let isCancelled = false;

const subscriptionKey =
  "8a0ERYlyhLAaGRWr0QhxVVXsskO9Il7N9DdkbP2kNNQ3IigcjTrtJQQJ99BEAC3pKaRXJ3w3AAAYACOGuZUx";
const region = "eastasia";

export const ttsService = (text: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (synthesizerInstance) {
      console.warn("TTS already in progress.");
      reject("Speech already in progress.");
      return;
    }

    isCancelled = false;

    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
      subscriptionKey,
      region
    );
    speechConfig.speechSynthesisVoiceName = "en-US-JennyMultilingualNeural";
    const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);
    synthesizerInstance = synthesizer;

    synthesizer.speakTextAsync(
      text,
      (result) => {
        if (isCancelled) {
          reject("Cancelled");
        } else if (
          result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted
        ) {
          resolve();
        } else {
          reject(result.errorDetails);
        }

        synthesizer.close();
        synthesizerInstance = null;
      },
      (error) => {
        reject(error);
        synthesizer.close();
        synthesizerInstance = null;
      }
    );
  });
};

export const stopTTS = () => {
  isCancelled = true;

  if (synthesizerInstance) {
    try {
      synthesizerInstance.close();
    } catch (err) {
      console.warn("Error while stopping TTS:", err);
    } finally {
      synthesizerInstance = null;
    }
  } else {
    console.warn("No active TTS instance.");
  }
};
