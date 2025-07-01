import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { AzureOpenAI } from "openai";

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
