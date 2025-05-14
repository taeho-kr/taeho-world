import { createRoot } from 'react-dom/client';
import './index.css';
import './index-animation.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from './components/theme-provider.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from './components/ui/tooltip.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<ThemeProvider
		defaultTheme='dark'
		storageKey='vite-ui-theme'
	>
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</TooltipProvider>
		</QueryClientProvider>
	</ThemeProvider>
);
