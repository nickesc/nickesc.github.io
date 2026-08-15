<script lang="ts">
	import { fade } from 'svelte/transition';
	import AlertSymbol from '$lib/components/AlertSymbol.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import { submitForm } from '$lib/submitForm';

	let name = $state('');
	let email = $state('');
	let message = $state('');

	let sending = $state(false);
	let error: string | null = $state(null);
	let success: boolean = $state(false);

	let emailEl = $state<HTMLInputElement | null>(null);
	let messageEl = $state<HTMLTextAreaElement | null>(null);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		sending = true;
		const result = await submitForm(name, email, message);

		sending = false;

		if (result.success) {
			success = result.success;
		} else {
			error = result.error || 'Something went wrong.';
		}
	}

	function focusNext(e: KeyboardEvent, next: HTMLElement | null) {
		if (e.key !== 'Enter') return;
		e.preventDefault();
		next?.focus();
	}
</script>

<svelte:head>
	<title>Contact | Nick Escobar</title>
	<meta
		name="description"
		content="Contact Nick Escobar about web development, creative technology, technical support, collaborations, or other project inquiries."
	/>
	<link rel="canonical" href="https://nickesc.github.io/contact" />

	<meta property="og:title" content="Contact | Nick Escobar" />
	<meta
		property="og:description"
		content="Contact Nick Escobar about web development, creative technology, technical support, collaborations, or other project inquiries."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://nickesc.github.io/contact" />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Contact | Nick Escobar" />
	<meta
		name="twitter:description"
		content="Contact Nick Escobar about web development, creative technology, technical support, collaborations, or other project inquiries."
	/>
</svelte:head>

<h2>Where to find me</h2>
<ul class="badges">
	<li>
		<Badge icon="github" />
	</li>
	<li>
		<Badge icon="bluesky" />
	</li>
	<li>
		<Badge icon="infosec-exchange" />
	</li>
	<li>
		<Badge icon="linkedin" />
	</li>
	<li>
		<Badge icon="youtube" />
	</li>
	<li>
		<Badge icon="kofi" />
	</li>
</ul>

<h2>Where to find my work</h2>
<ul class="badges">
	<li>
		<Badge icon="github" text="GitHub" />
	</li>
	<li>
		<Badge icon="npm" />
	</li>
	<li>
		<Badge icon="vs-mp" />
	</li>
	<li>
		<Badge icon="open-vsx" />
	</li>
	<li>
		<Badge icon="firefox" />
	</li>
	<li>
		<Badge icon="itchio" />
	</li>
	<li>
		<Badge icon="modrinth" />
	</li>
</ul>

<h2>Contact me</h2>

<div class="contact-container">
	<p>
		I'm always happy to connect, and I'm currently open to new opportunities. You can use the form
		below to get in touch.
	</p>
	{#if success}
		<p
			class="alert-container"
			in:fade={{ duration: 300, delay: 600 }}
			style="--alert-color: rgba(102, 187, 106);"
			role="alert"
		>
			Message sent successfully!
		</p>
	{:else}
		<form onsubmit={handleSubmit} out:fade={{ duration: 400 }}>
			<label for="name">
				<div class="label-text">Name<span class="required">*</span></div>
				<input
					type="name"
					name="name"
					placeholder="Name"
					required
					bind:value={name}
					aria-required="true"
					aria-label="Name"
					enterkeyhint="next"
					onkeydown={(e) => focusNext(e, emailEl)}
				/>
			</label>
			<label for="email">
				<div class="label-text">Email<span class="required">*</span></div>
				<input
					type="email"
					name="email"
					placeholder="Email"
					required
					pattern={'[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}'}
					bind:value={email}
					aria-required="true"
					aria-label="Email"
					enterkeyhint="next"
					onkeydown={(e) => focusNext(e, messageEl)}
					bind:this={emailEl}
				/>
			</label>
			<label for="message">
				<div class="label-text">Message<span class="required">*</span></div>
				<textarea
					name="message"
					placeholder="Type your message here..."
					required
					bind:value={message}
					aria-required="true"
					aria-label="Message"
					rows="8"
					bind:this={messageEl}
					style:resize="vertical"></textarea>
			</label>

			<button
				type="submit"
				disabled={!name || !email || !emailEl?.validity.valid || !message || sending}
				aria-busy={sending}
				aria-label="Send message"
				class={['submit-button', { sending }, 'primary-button']}
			>
				{#if sending}
					<span>Sending...</span>
				{:else}
					<span>Send</span>
				{/if}
			</button>
		</form>
	{/if}

	{#if error}
		<div in:fade={{ duration: 400 }} class="alert-container" role="alert">
			<AlertSymbol height="2em" width="2em" />
			<p class="error-text" in:fade={{ duration: 100 }}>
				{error}<br />If the problem persists, please contact me directly at
				<a href="mailto:nick@nickesc.io">nick@nickesc.io</a>.
			</p>
		</div>
	{/if}
</div>

<style>
	h2 {
		margin-top: 0;
	}

	.badges {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		list-style: none;
		padding: 0;
		margin: 0 0 1.5rem;
	}

	.contact-container {
		width: 100%;
		margin: 0 auto;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;

		label {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			color: rgba(from var(--brand-grey) r g b / 0.7);
			font-size: 10px;
			text-transform: uppercase;
			letter-spacing: 0.05em;
			font-family: var(--mono-font);

			.required {
				color: rgba(199, 32, 66, 0.8);
			}
		}

		button {
			width: 100%;
		}
	}

	.alert-container {
		--alert-color: rgba(199, 32, 66);
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 1.5rem;
		border-radius: var(--corners);
		background-color: rgba(from var(--alert-color) r g b / 0.2);
		color: rgba(from var(--alert-color) r g b / 1);
		border: 1.5px solid rgba(from var(--alert-color) r g b / 0.5);
		margin: 1rem 0;
		width: 100%;

		.error-text {
			font-size: 1rem;
			margin: 0;
		}

		a {
			color: rgba(from var(--alert-color) r g b / 1);
			text-decoration: underline;
			transition: color 0.15s ease-in-out;

			&:hover {
				color: rgba(from var(--alert-color) r g b / 0.8);
			}

			&:active {
				color: rgba(from var(--alert-color) r g b / 0.6);
			}
		}
	}
</style>
