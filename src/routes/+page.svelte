<script lang="ts" context="module">
	enum Modals {
		WAKEUP_TIMES,
		CLOCK,
		INFO
	}
</script>

<script lang="ts">
	import { fly } from 'svelte/transition';

	import FaBed from 'svelte-icons/fa/FaBed.svelte';
	import MdInfoOutline from 'svelte-icons/md/MdInfoOutline.svelte';
	import MdAccessAlarm from 'svelte-icons/md/MdAccessAlarm.svelte';

	import WakeupTimes from '$lib/WakeupTimes.svelte';
	import Clock from '$lib/Clock.svelte';

	let isModalShown = false;
	let modal = Modals.WAKEUP_TIMES;
	let sleepAt: Date | null;

	const closeModal = () => {
		isModalShown = false;
	};

	const showModal = (_modal: Modals, reset?: boolean) => {
		if (reset) sleepAt = null;
		modal = _modal;
		isModalShown = true;
	};

	const showSleepTimes = (event: CustomEvent) => {
		sleepAt = event.detail.date;
		setTimeout(() => showModal(Modals.WAKEUP_TIMES), 100);
	};
</script>

<svelte:head>
	<title>Sleep Assistant</title>
	<meta name="description" content="The sleep assistant" />
</svelte:head>

<section>
	<button class="info" on:click={() => showModal(Modals.INFO)}>
		<MdInfoOutline />
	</button>
	<div class="main-icons">
		<button on:click={() => showModal(Modals.WAKEUP_TIMES, true)}>
			<span class="icon-wrapper">
				<FaBed />
			</span>
		</button>
		<button on:click={() => showModal(Modals.CLOCK)}>
			<span class="icon-wrapper">
				<MdAccessAlarm />
			</span>
		</button>
	</div>

	{#if isModalShown}
		<div class="overlay" on:click={closeModal} transition:fly={{ opacity: 0 }} />
		{#if modal === Modals.WAKEUP_TIMES}
			<WakeupTimes on:close-modal={closeModal} {sleepAt} />
		{:else if modal === Modals.CLOCK}
			<Clock on:close-modal={closeModal} on:show-sleep-times={showSleepTimes} />
		{/if}
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
		height: 100%;
		position: relative;
		background-color: var(--bg);

		.main-icons {
			--padding: 3.5rem;
			height: calc(100% - (var(--padding) * 2));
			padding: var(--padding) calc(var(--padding) * 0.5);
			display: grid;
			grid-template-rows: 1fr 1fr;
			gap: 1rem;

			button {
				@include btn;
				border: 2px solid var(--text-color);
				border-radius: 10px;
				font-size: 1rem;

				.icon-wrapper {
					position: relative;
					width: 5rem;
					color: var(--text-color);
				}
			}
		}

		.info {
			@include btn;
			width: 2.5rem;
			position: absolute;
			top: 1rem;
			left: 0.5rem;
			border: none;
			color: var(--text-color);
		}

		.overlay {
			position: fixed;
			inset: 0;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 0;
		}
	}
</style>
