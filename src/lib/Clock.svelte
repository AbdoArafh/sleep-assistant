<script lang="ts">
	import Modal from './Modal.svelte';
	import { TimePicker } from 'svelte-time-picker';
	import { createEventDispatcher } from 'svelte';

	let modalRef: Modal;

	const dispatch = createEventDispatcher();

	const closeModal = () => {
		modalRef.closeModal();
	};

	const handleOk = (event: any) => {
		const date = event.detail;
		dispatch('show-sleep-times', {
			date
		});
		closeModal();
	};
</script>

<Modal on:close-modal bind:this={modalRef}>
	<div class="timepicker-wrapper">
		<TimePicker
			on:ok={handleOk}
			on:cancel={closeModal}
			options={{
				hasButtons: true,
				bgColor: '#666666',
				clockClassName: 'clock',
				timeClassName: 'time-bar',
				buttonClassName: 'buttons-button',
				buttonBarClassName: 'buttons-bar'
			}}
		/>
	</div>
</Modal>
