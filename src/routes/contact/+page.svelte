<script lang="ts">
	import { fade } from 'svelte/transition';
	import AlertSymbol from '$lib/components/AlertSymbol.svelte';
	import Badge from '$lib/components/Badge.svelte';

	let name = $state('');
	let email = $state('');
	let message = $state('');

	let sending = $state(false);
	let error: string | null = $state(null);
	let success: boolean = $state(false);

	// not a secret link, just making it a little harder to detect
	const x = atob('aHR0cHM6Ly9mb3Jtc3ByZWUuaW8vZi94ZGVua2Vidw==');

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

<h2>Where to find me</h2>
<ul class="badges">
	<li>
		<Badge
			icon="github"
			text="nickesc"
			href="https://github.com/nickesc"
			bgColor="rgb(245,245,243)"
		/>
	</li>
	<li>
		<Badge
			icon="bluesky"
			text="@nickesc.io"
			href="https://bsky.app/profile/nickesc.io"
			bgColor="rgb(17,133,254)"
		/>
	</li>
	<li>
		<Badge
			icon="infosec-exchange"
			text="@nickesc@infosec.exchange"
			href="https://infosec.exchange/@nickesc"
			bgColor="rgb(236,28,36)"
		/>
	</li>
	<li>
		<Badge
			icon="linkedin"
			text="nickesc"
			href="https://www.linkedin.com/in/nickesc/"
			bgColor="rgb(0, 119, 181)"
		/>
	</li>
	<li>
		<Badge
			icon="youtube"
			text="@nickesc_"
			href="https://www.youtube.com/@nickesc_"
			bgColor="rgb(255,0,0)"
		/>
	</li>
	<li>
		<Badge icon="kofi" text="nickesc" href="https://ko-fi.com/nickesc" bgColor="rgb(255,90,22)" />
	</li>
</ul>

<h2>Where to find my work</h2>
<ul class="badges">
	<li>
		<Badge
			icon="github"
			text="GitHub"
			href="https://github.com/nickesc"
			bgColor="rgb(245,245,243)"
		/>
	</li>
	<li>
		<Badge
			icon="npm"
			text="npm"
			href="https://www.npmjs.com/org/nickesc"
			bgColor="rgb(204, 51, 51)"
		/>
	</li>
	<li>
		<Badge
			icon="vs-mp"
			text="VS Marketplace"
			href="https://marketplace.visualstudio.com/publishers/nickesc"
			bgColor="rgb(0, 122, 204)"
		/>
	</li>
	<li>
		<Badge
			icon="open-vsx"
			text="Open VSX"
			href="https://open-vsx.org/namespace/nickesc"
			bgColor="rgb(165, 15, 230)"
		/>
	</li>
	<li>
		<Badge
			icon="firefox"
			text="Firefox Add-ons"
			href="https://addons.mozilla.org/en-US/firefox/user/18835687/"
			bgColor="rgb(255,113,57)"
		/>
	</li>
	<li>
		<Badge icon="itchio" text="itch.io" href="https://nickesc.itch.io/" bgColor="rgb(250,92,92)" />
	</li>
	<li>
		<Badge
			icon="modrinth"
			text="Modrinth"
			href="https://modrinth.com/user/nickesc"
			bgColor="rgb(27, 218, 106)"
		/>
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
