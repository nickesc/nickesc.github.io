<script lang="ts">
	import { fade } from 'svelte/transition';
	import AlertSymbol from '$lib/components/AlertSymbol.svelte';

	let name = $state('');
	let email = $state('');
	let message = $state('');

	let sending = $state(false);
	let error: string | null = $state(null);
	let success: boolean = $state(false);

	// not a secret link, just making it a little harder to detect
	const x = atob('aHR0cHM6Ly9mb3Jtc3ByZWUuaW8vZi94ZGVua2Vidw==');
	// const x = 'https://formspree.io/';

	let emailEl = $state<HTMLInputElement | null>(null);
	let messageEl = $state<HTMLTextAreaElement | null>(null);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		sending = true;
		error = null;

		try {
			const res = await fetch(x, {
				method: 'POST',
				headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, message })
			});

			if (res.ok) {
				sending = false;
				success = true;
			} else {
				const data = await res.json();
				error = data.error || 'Something went wrong.';
			}
		} catch (err) {
			console.error(err);
			error = 'Network error. Please try again.';
		} finally {
			sending = false;
		}
	}

	function focusNext(e: KeyboardEvent, next: HTMLElement | null) {
		if (e.key !== 'Enter') return;
		e.preventDefault();
		next?.focus();
	}
</script>

<h2>Contact</h2>

<div class="contact-container">
	<p>
		I'm always happy to connect, and I'm currently open to new opportunities. You can use the form
		below to get in touch.
	</p>
	{#if success}
		<p
			class="alert-container"
			in:fade={{ duration: 300, delay: 400 }}
			style="--alert-color: rgba(102, 187, 106);"
			role="alert"
		>
			Message sent successfully!
		</p>
	{:else}
		<form onsubmit={handleSubmit} out:fade={{ duration: 400 }}>
			<label for="name">
				<div class="label-text">Name</div>
				<input
					type="text"
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
				<div class="label-text">Email</div>
				<input
					type="email"
					name="email"
					placeholder="Email"
					required
					bind:value={email}
					aria-required="true"
					aria-label="Email"
					enterkeyhint="next"
					onkeydown={(e) => focusNext(e, messageEl)}
					bind:this={emailEl}
				/>
			</label>
			<label for="message">
				<div class="label-text">Message</div>
				<textarea
					name="message"
					placeholder="Message"
					required
					bind:value={message}
					aria-required="true"
					aria-label="Message"
					rows="8"
					bind:this={messageEl}></textarea>
			</label>

			<button
				type="submit"
				disabled={!name || !email || !message || sending}
				aria-busy={sending}
				aria-label="Send message"
				class={['submit-button', { sending }]}
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
	.contact-container {
		width: 100%;
		max-width: 700px;
		margin: 0 auto;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 700px;
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
		}

		input,
		textarea {
			padding: 0.5rem 1rem;
			border-radius: var(--corners);
			border: 1.5px solid rgba(from var(--brand-grey) r g b / 0.6);
			border-bottom: 1.5px solid rgba(from var(--brand-grey) r g b / 0.2);
			border-right: 1.5px solid rgba(from var(--brand-grey) r g b / 0.2);
			font-size: 16px;
			width: 100%;
			box-sizing: border-box;
		}

		button {
			--submit-button-color: rgb(64, 99, 203);
			padding: 0.5rem 1rem;
			border-radius: var(--corners);
			border: none;
			font-size: 16px;
			font-family: var(--mono-font);
			font-weight: 500;
			width: 100%;
			box-sizing: border-box;
			background-color: rgba(from var(--submit-button-color) r g b / 0.8);
			color: rgba(from var(--brand-white) r g b / 0.9);
			transition:
				background-color 0.2s ease-in-out,
				color 0.2s ease-in-out;

			&:disabled {
				background-color: rgba(from var(--submit-button-color) r g b / 0.25);
				color: rgba(from var(--brand-white) r g b / 0.5);
			}

			&:hover:not(:disabled) {
				background-color: rgba(from var(--submit-button-color) r g b / 1);
				color: var(--brand-white);
			}

			&:active:not(:disabled) {
				background-color: rgba(from var(--submit-button-color) r g b / 0.7);
				color: rgba(from var(--brand-white) r g b / 0.7);
			}
		}
	}

	.alert-container {
		--alert-color: rgba(199, 32, 66);
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 1.5rem;
		border-radius: 0.5rem;
		background-color: rgba(from var(--alert-color) r g b / 0.2);
		color: rgba(from var(--alert-color) r g b / 1);
		border: 1.5px solid rgba(from var(--alert-color) r g b / 0.5);
		border-bottom: 1.5px solid rgba(from var(--alert-color) r g b / 0.2);
		border-right: 1.5px solid rgba(from var(--alert-color) r g b / 0.2);
		margin: 1rem 0;
		max-width: 700px;
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
