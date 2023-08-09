import { OpenAIApi, Configuration } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function generateEmbedding(text: string):Promise<number[]> {
  const response = await openai.createEmbedding({
    input: text,
    model: 'text-embedding-ada-002',
  });
  return response.data.data[0].embedding;
}

export function generateMatchText(
  subject: string, className: string, level: string, reason: string,
):string {
  return `I am studying ${level} level ${subject} in a class called ${className}. My goals are: ${reason}`;
}
