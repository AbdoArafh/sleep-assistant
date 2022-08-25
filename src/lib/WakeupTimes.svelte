<script lang="ts">
	import { onMount } from 'svelte';
	import { minutesToMillis, format12, numbersStrings } from '../utils/time';

	import Modal from './Modal.svelte';

	const sleepCycle = minutesToMillis(90);

	let times: Array<String> = [];
	export let sleepAt: Date | null = null;
	let timeoutId: number;

	const calculateTimes = () => {
		let now = Date.now();
		if (sleepAt) now = sleepAt.valueOf();

		// adding time to fall asleep
		if (!sleepAt) now += minutesToMillis(14);

		times = Array.from(Array(6)).map((_, i) => {
			const time: number = now + (i + 1) * sleepCycle;
			const date = new Date(time);
			let hours = date.getHours().toString().padStart(2, '0');
			let minutes = date.getMinutes().toString().padStart(2, '0');
			let timeString = `${hours}:${minutes}:00`;
			return format12(timeString);
		});

		if (!sleepAt) {
			const date = new Date(now);
			const seconds = date.getSeconds();
			timeoutId = window.setTimeout(calculateTimes, 60 - seconds);
		}
	};

	onMount(() => {
		calculateTimes();

		if (!sleepAt) {
			return () => clearTimeout(timeoutId);
		}
	});
</script>

<Modal on:close-modal>
	<div class="wakeup-times">
		<h3>Wake up at these times:</h3>
		<ul>
			{#each times as time, index (index)}
				<li>
					<span class="strong">{time}</span> for {numbersStrings[index]} sleep {index === 1
						? 'cycle'
						: 'cycles'}
				</li>
			{/each}
		</ul>
		{#if sleepAt}
			<p>
				<span class="strong">Tip:</span> an average person takes about
				<span class="strong">14 minutes</span> to wake up, so plan accordingly!
			</p>
		{/if}
	</div>
</Modal>

<style scoped lang="scss">
	.wakeup-times {
		padding-top: 3rem;
		padding-inline: 1rem;

		width: 80vw;
		height: 80vh;
		background-color: #000000;
		border-radius: 4px;
		color: var(--text-color);

		h3 {
			font-size: 24px;
		}

		ul {
			list-style: none;
			padding: 1rem;

			display: flex;
			flex-direction: column;
			gap: 1rem;

			li {
				font-size: 18px;
			}
		}

		.strong {
			font-weight: 600;
		}

		p {
			line-height: 1.6;
		}
	}
</style>
