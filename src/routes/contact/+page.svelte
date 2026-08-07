<script lang="ts">
	import AlertSymbol from '$lib/components/AlertSymbol.svelte';

	let name = $state('');
	let email = $state('');
	let message = $state('');

	let sending = $state(false);
	let error: string | null = $state(null);
	let success: boolean = $state(false);

	// not a secret link, just making it a little harder to detect
	const x = atob('aHR0cHM6Ly9mb3Jtc3ByZWUuaW8vZi94ZGVua2Vidw==');

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
			} else {
				const data = await res.json();
				error = data.error || 'Something went wrong.';
			}
		} catch (err) {
			error = 'Network error. Please try again.';
		} finally {
			sending = false;
		}
	}
</script>

<h2>Contact</h2>
{#if error}
	<p class="error">{error}</p>
{/if}
{#if success}
	<p class="success">Message sent successfully!</p>
{:else}
	<form onsubmit={handleSubmit}>
		<input
			type="text"
			name="name"
			placeholder="Name"
			required
			bind:value={name}
			aria-required="true"
			aria-label="Name"
		/>
		<input
			type="email"
			name="email"
			placeholder="Email"
			required
			bind:value={email}
			aria-required="true"
			aria-label="Email"
		/>
		<textarea
			name="message"
			placeholder="Message"
			required
			bind:value={message}
			aria-required="true"
			aria-label="Message"></textarea>

		<button
			type="submit"
			disabled={!name || !email || !message}
			aria-disabled={sending}
			aria-busy={sending}
			aria-label="Send message"
			class={['button', { sending }]}
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
	<div in:fade={{ duration: 400 }} class="error-container">
		<AlertSymbol height="2em" width="2em" />
		<p class="error-text" in:fade={{ duration: 100 }}>
			{error} If the problem persists, please contact me directly at
			<a href="mailto:nick@nickesc.io">nick@nickesc.io</a>.
		</p>
	</div>
{/if}

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.error-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 1.5rem;
		border-radius: 0.5rem;
		background-color: rgba(175, 12, 45, 0.2);
		color: rgba(175, 12, 45, 1);
		border: 1.5px solid rgba(175, 12, 45, 0.5);
		border-bottom: 1.5px solid rgba(175, 12, 45, 0.2);
		border-right: 1.5px solid rgba(175, 12, 45, 0.2);
		margin: 1rem 0;

		.error-text {
			font-size: 1rem;
			margin: 0;
		}

		a {
			color: inherit;
			text-decoration: underline;
			transition: color 0.15s ease-in-out;

			&:hover {
				color: rgb(199, 32, 66);
			}

			&:active {
				color: rgb(154, 26, 52);
			}
		}
	}
</style>
