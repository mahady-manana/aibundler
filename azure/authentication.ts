import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { AzureOpenAI } from "openai";
import { ModelName } from "./models";

export async function azureChatAuth() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env.AZURE_CHAT_OPENAI_ENDPOINT;
  const apiKey = process.env.AZURE_CHAT_OPENAI_API_KEY;
  const apiVersion = "2025-01-01-preview";
  const deployment = "gpt-4.1"; // This must match your deployment name

  const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });

  return client;
}

export const azureDeepSeekAuth = () => {
  const endpoint = process.env.AZURE_DEEPSEEK_INFERENCE_SDK_ENDPOINT as string;
  const apiKey = process.env.AZURE_DEEPSEEK_INFERENCE_SDK_KEY as string;
  const client = ModelClient(endpoint, new AzureKeyCredential(apiKey));
  return client;
};

export const azureCrossModelAuth = (model: string) => {
  const endpoint = process.env.AZURE_GROK3_ENDPOINT as string;
  const apiKey = process.env.AZURE_GROK3_API_KEY as string;
  const deployment = getDeployementNames(model || "gpt-4.1"); // This must match your deployment name
  const apiVersion = "2025-01-01-preview";
  console.log({ deployment });

  const client = new AzureOpenAI({ endpoint, apiKey, deployment, apiVersion });

  return client;
};
export async function azureSoraKeys() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env.AZURE_SORA_ENDPOINT as string;
  const apiKey = process.env.AZURE_SORA_API_KEY;
  const apiVersion = "2025-01-01-preview";
  const deployment = "sora"; // This must match your deployment name

  return { endpoint, apiKey, deployment };
}

export const getDeployementNames = (model: string) => {
  switch (model) {
    case ModelName.DeepSeek_R1_0528:
      return "DeepSeek-R1-0528";
    case ModelName.grok_3:
      return "grok-3";
    case ModelName.gpt_o4_mini:
      return "o4-mini";
    case ModelName.model_router:
      return "model-router";
    case ModelName.o1:
      return "o1";
    case ModelName.gpt_4o:
      return "gpt-4o";
    case ModelName.gpt_4_1:
      return "gpt-4.1";
    default:
      return "gpt-4.1";
  }
};

export async function readStream(req: any) {
  const reader = req.body.getReader();
  const decoder = new TextDecoder();
  let result = "";
  let done = false;

  while (!done) {
    const { value, done: readerDone } = await reader.read();
    done = readerDone;
    result += decoder.decode(value, { stream: true });
  }

  return JSON.parse(result);
}
