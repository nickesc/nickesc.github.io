<script lang="ts">
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

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
