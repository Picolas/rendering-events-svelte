<script lang="ts">
	import type { EventProps } from '$lib/models/EventProps.js';
	import { displayTime } from '$lib/utils/EventUtils.js';

	let { id, start, duration, top, height, width, left, backgroundColor }: EventProps = $props();
</script>

<div
	class="event"
	role="gridcell"
	aria-label={`Événement de ${displayTime(start, duration)}`}
	style:top="{top}px"
	style:height="{height}px"
	style:left="{left}px"
	style:width="{width}px"
	style:background-color={backgroundColor.color}
	style:box-shadow="inset 0 0 0 2px {backgroundColor.darkerColor}"
	tabindex="0"
>
	{displayTime(start, duration)}
</div>

<style>
	.event {
		font-weight: bold;
		justify-content: center;
		align-items: center;
		display: flex;
		position: absolute;
		border-radius: 6px;
	}
</style>
