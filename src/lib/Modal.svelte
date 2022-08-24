<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';

	import IoIosCloseCircleOutline from 'svelte-icons/io/IoIosCloseCircleOutline.svelte';

	const dispatch = createEventDispatcher();

	const closeModal = () => {
		dispatch('close-modal');
	};
</script>

<div class="modal" transition:fly={{ y: 100 }}>
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
