'use client';
import { AppStore, makeStore } from 'app/shared/lib/store';
import { useRef } from 'react';
import { Provider } from 'react-redux';

export default function StoreProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const storeRef = useRef<AppStore>(makeStore());

	if (!storeRef.current) {
		storeRef.current = makeStore();
	}

	return (
		<Provider store={storeRef.current}>
			{children}
		</Provider>
	);
}
