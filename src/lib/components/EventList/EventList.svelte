<script lang="ts">
	import type { EventsListProps } from '$lib/models/EventListProps.js';
	import { groupOverlappingEvents } from '$lib/utils/EventUtils.js';
	import Event from '../Event/Event.svelte';

	let { events, containerWidth, containerHeight, hourLabelsWidth }: EventsListProps = $props();

	let columns = $state(
		groupOverlappingEvents(events, containerWidth - hourLabelsWidth, containerHeight)
	);

	$effect(() => {
		columns = groupOverlappingEvents(events, containerWidth - hourLabelsWidth, containerHeight);
	});
</script>

<div>
	{#each columns as event (event.id)}
		<Event
			id={event.id}
			start={event.start}
			duration={event.duration}
			top={event.top}
			height={event.height}
			left={event.left}
			width={event.width}
			backgroundColor={event.backgroundColor}
		/>
	{/each}
</div>

<style>
</style>
