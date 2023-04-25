import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import App from './App';
import './index.css';

const queryClient = new QueryClient(/*{ // Här kan vi konfa vår klient med en drös olika setups.
    defaultOptions: {
        queries: {
            retry: 3,
            cacheTime: 300_000, // 5 min
            staleTime: 10 * 1000, // 10sek denna avgör om cachad data är ny eller gammal.
            refetchOnWindowFocus: false, // fetchar inte OM om vi hoppar ut och in från ett annat fönster i browsern.
            refetchOnReconnect: false, // fetchar inte om ifall användare tappar uppkoppling och sen hittar den igen.
            refetchOnMount: true, // om du vill att fetchen ska utföras när vår komponent  används/monteras.
        }
    }
}*/);

ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App/>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    </React.StrictMode>
);
