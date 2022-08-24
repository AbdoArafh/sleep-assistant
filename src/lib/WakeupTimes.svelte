<script context="module" lang="ts">
	const minutesToMillis = (minutes: number) => minutes * 60000;

	const format12 = (timeString: string) => {
		const date = new Date('1970-01-01T' + timeString + 'Z')
			.toLocaleTimeString('en-US', {
				timeZone: 'UTC',
				hour12: true,
				hour: 'numeric',
				minute: 'numeric'
			})
			.replace(' ', '');
		console.log(timeString, date);
		return date;
	};

	const numbersStrings = ['one', 'two', 'three', 'four', 'five', 'six'];
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import Modal from './Modal.svelte';

	const sleepCycle = minutesToMillis(90);

	let times: Array<String> = [];

	const calculateTimes = () => {
		let now = Date.now();

		// adding time to fall asleep
		now += minutesToMillis(14);

		times = Array.from(Array(6)).map((_, i) => {
			const time: number = now + (i + 1) * sleepCycle;
			const date = new Date(time);
			let hours = date.getHours().toString().padStart(2, '0');
			let minutes = date.getMinutes().toString().padStart(2, '0');
			let timeString = `${hours}:${minutes}:00`;
			return format12(timeString);
		});
	};

	onMount(() => {
		calculateTimes();

		let intervalId = setInterval(calculateTimes, minutesToMillis(1));

		return () => clearInterval(intervalId);
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

			.strong {
				font-weight: 600;
			}
		}
	}
</style>
