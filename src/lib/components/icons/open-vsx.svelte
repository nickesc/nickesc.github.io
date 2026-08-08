<script lang="ts">
	let { color = 'rgb(165, 15, 230)', size = 24, title = 'open-vsx', ...rest } = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	fill={color}
	viewBox="0 0 131 131"
	{...rest}
>
	<title>{title}</title>
	<path
		class="st0"
		d="M42.8,43.4L65.4,4.2H20.1l22.7,39.2ZM17.4,87.7h45.3l-22.7-39.1-22.6,39.1ZM68.4,87.7l22.6,39.2,22.6-39.2h-45.2Z"
	/>
	<path
		class="st1"
		d="M65.4,4.2l-22.6,39.2h45.2L65.4,4.2ZM40,48.6l22.7,39.1,22.6-39.1h-45.3ZM91,48.6l-22.6,39.1h45.2l-22.6-39.1Z"
	/>
</svg>
