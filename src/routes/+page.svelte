<script lang="ts">
	import FaBed from 'svelte-icons/fa/FaBed.svelte';
	import MdInfoOutline from 'svelte-icons/md/MdInfoOutline.svelte';
	import MdAccessAlarm from 'svelte-icons/md/MdAccessAlarm.svelte';

	import { fly } from 'svelte/transition';

	let showModals = false;
</script>

<svelte:head>
	<title>Sleep Assistant</title>
	<meta name="description" content="The sleep assistant" />
</svelte:head>

<section>
	<button class="info" on:click={() => (showModals = !showModals)}>
		<MdInfoOutline />
	</button>
	<div class="main-icons">
		<button>
			<span class="icon-wrapper">
				<FaBed />
			</span>
		</button>
		<button>
			<span class="icon-wrapper">
				<MdAccessAlarm />
			</span>
		</button>
	</div>

	{#if showModals}
		<div class="overlay" on:click={() => (showModals = false)} />
	{/if}

	{#if showModals}
		<div class="modal" transition:fly={{ y: 100 }} />
	{/if}
</section>

<style scoped lang="scss">
	@mixin btn {
		display: flex;
		justify-content: center;
		align-items: center;
		background: none;
		cursor: pointer;

		&:hover {
			filter: brightness(0.8);
		}

		&:active {
			filter: brightness(0.95);
		}
	}
	section {
		height: 100vh;
		position: relative;
		background-color: #1d1d1d;

		.main-icons {
			--padding: 3rem;
			height: calc(100% - (var(--padding) * 2));
			padding: var(--padding) calc(var(--padding) * 0.5);
			display: grid;
			grid-template-rows: 1fr 1fr;
			gap: 1rem;

			button {
				@include btn;
				border: 2px solid #ffffff;
				border-radius: 10px;
				font-size: 1rem;

				.icon-wrapper {
					position: relative;
					width: 5rem;
					color: #ffffff;
				}
			}
		}

		.info {
			@include btn;
			width: 2rem;
			position: absolute;
			top: 1rem;
			left: 0.5rem;
			border: none;
			color: #ffffff;
		}

		.overlay {
			position: fixed;
			inset: 0;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 0;
		}

		.modal {
			width: 80%;
			height: 80%;
			background-color: #000000;
			border-radius: 14px;
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>
