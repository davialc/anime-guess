import { UserProvider } from '@auth0/nextjs-auth0';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { ControlProvider } from '../providers/ControlProvider';
import '../styles/global.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<UserProvider>
				<ControlProvider>
					<Component {...pageProps} />
				</ControlProvider>
			</UserProvider>
		</QueryClientProvider>
	);
}

export default MyApp;
