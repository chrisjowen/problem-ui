import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/api/feed': 'http://localhost:4001',
			'/api': 'http://localhost:4000',
			'/oauth': 'http://localhost:4000',
		}
	}
});
