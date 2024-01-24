import React from 'react';
import { Container, Box, Card, Stack, Text, Input, Button, Title, useMantineTheme } from '@mantine/core';
import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai';
import { Icon3dCubeSphere } from '@tabler/icons-react';

export const ChatGpt: React.FC = () => {
	// Based on: https://github.com/andresz74/react_typescript_chatgpt
	
	const theme = useMantineTheme();
	const [prompt, setPrompt] = React.useState<string | undefined>('');
	const [response, setResponse] = React.useState<string | undefined>('');
	const configuration = new Configuration({
		organization: 'org-khJHySYMKnXFtXAX5aP4XvdL',
		apiKey: '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',
	});
	const myOpenAi = new OpenAIApi(configuration);
	const chatGptMessages = [
		{
			role: ChatCompletionRequestMessageRoleEnum.User,
			content: !!prompt ? prompt : '',
		}
	];
	const getOpenAIResponse = async (e: React.FormEvent<EventTarget>) => {
		e.preventDefault();
		const res = await myOpenAi.createChatCompletion({
			messages: chatGptMessages,
			model: 'gpt-3.5-turbo',
		});
		setResponse(res.data.choices[0].message?.content);
	};
	return (
		<Box p="x1">
			<Title mb="lg">
				<Icon3dCubeSphere size={48} style={{ marginRight: 8 }} />
				PathFlow Copilot
			</Title>
			<Box p="xl">
				<Text size="lg"  my="sm">
					PathFlow Copilot quickly provides medical insights from the worlds most respected medical knowledge sources.  
				</Text>
				<Text size="lg" color="dimmed" my="sm">
					Current Sources: [PubMed, Embase, Ovid, Medline]
					<br/>
					Additional Sources being added quarterly.
				</Text>
			</Box>
			
			<Box style={{ textAlign: 'right' }}>
				<form onSubmit={getOpenAIResponse}>
					<Input 
						id="chat-input"
						type='text'
						value={prompt}
						placeholder='Enter your question...'
						onChange={e => setPrompt(e.target.value)}
					/>
					<br/>
					<Button p="x1" type="submit">Get Answers</Button>
					<br/>
				</form>
			</Box>
			<br/>
			<Box 
				sx={(theme) => ({
					backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
					padding: theme.spacing.xl,
					borderRadius: theme.radius.md,
					cursor: 'pointer',

					'&:hover': {
						backgroundColor:
							theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
					},
				})}
			>
				{!!response && <Text size="lg">{response}</Text>}
			</Box>	
		</Box>
	);
};
