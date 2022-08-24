<script lang="ts">
	import { slide } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';

	import IoIosCloseCircleOutline from 'svelte-icons/io/IoIosCloseCircleOutline.svelte';

	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	export const closeModal = () => {
		dispatch('close-modal');
	};

	function handleKeyup(event: KeyboardEvent) {
		if (event.key === 'Escape') closeModal();
	}
	onMount(() => {
		window.addEventListener('keyup', handleKeyup);
		return () => window.removeEventListener('keyup', handleKeyup);
	});
</script>

<div class="modal" transition:slide={{ easing: expoOut }}>
	<button class="close-btn" on:click={closeModal}>
		<IoIosCloseCircleOutline />
	</button>
	<slot />
</div>

<style scoped lang="scss">
	.modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		.close-btn {
			position: absolute;
			top: 1rem;
			left: 0.5rem;
			color: var(--text-color);
			border: none;
			background: none;
			width: 3rem;
			cursor: pointer;
		}
	}
</style>
