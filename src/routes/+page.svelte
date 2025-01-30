<script lang="ts">
	import EventList from '$lib/components/EventList/EventList.svelte';
	import HourLabels from '$lib/components/HourLabels/HourLabels.svelte';
	import { eventActions, eventStore } from '$lib/stores/eventStore.js';

	let containerWidth = $state(0);
	let containerHeight = $state(0);
	let hourLabelsWidth = $state(0);

	eventActions.init();
	const events = $derived($eventStore);

	$effect(() => {
		eventActions.sort();
	});
</script>

<svelte:window bind:innerWidth={containerWidth} bind:innerHeight={containerHeight} />

<div class="calendar-container" role="region" aria-label="Calendrier des événements">
	<div class="calendar-day" style:display="grid" style:grid-template-columns="auto 1fr" role="grid">
		<HourLabels bind:clientWidth={hourLabelsWidth} {containerHeight} />

		<div style:position="relative" role="presentation">
			<EventList {events} {containerWidth} {containerHeight} {hourLabelsWidth} />
		</div>
	</div>
</div>

<style>
	.calendar-container {
		height: 100vh;
		max-height: 100vh;
		overflow: hidden;
	}
</style>
