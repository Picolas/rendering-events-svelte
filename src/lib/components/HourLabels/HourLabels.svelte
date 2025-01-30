<script lang="ts">
	import { DAY_START_HOUR, DAY_END_HOUR } from '$lib/constants/const.js';
	import type { HourLabelsProps } from '$lib/models/HourLabelsProps.js';

	let { containerHeight, clientWidth = $bindable() }: HourLabelsProps = $props();

	let hours: { hour: number; minutes: number }[] = $state([]);

	const calendarStart = DAY_START_HOUR;
	const calendarEnd = DAY_END_HOUR;

	for (let i = calendarStart; i <= calendarEnd - 1; i++) {
		hours.push({ hour: i, minutes: 0 });
		if (i < calendarEnd) {
			hours.push({ hour: i, minutes: 30 });
		}
	}

	const hourHeight = $derived(containerHeight / ((calendarEnd - calendarStart) * 2));
</script>

<div
	class="hour-labels bg-gray-200"
	bind:clientWidth
	role="rowheader"
	aria-label="Heures de la journée"
>
	{#each hours as { hour, minutes } (hour + '_' + minutes)}
		<li style:height="{hourHeight}px" role="presentation">
			{#if minutes === 0}
				<span class="hour-label" aria-label={`${hour} heures`}>
					{hour}:00
				</span>
			{/if}
			<span
				class={`dotted-line ${minutes === 0 ? 'hour-line' : 'half-hour-line'}`}
				role="presentation"
				aria-hidden="true"
			>
			</span>
		</li>
	{/each}
</div>

<style>
	.hour-labels {
		box-sizing: border-box;
		height: 100%;
		font-weight: bold;
		list-style-type: none;
		overflow: hidden;
	}

	.hour-labels li {
		padding: 0 10px;
		text-align: center;
		position: relative;
		box-sizing: border-box;
	}

	.dotted-line {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		margin-bottom: -0.5px;
		border-top: 0.5px dashed rgba(0, 0, 0, 0.5);
	}

	.hour-line {
		border-top-width: 1px;
	}
</style>
