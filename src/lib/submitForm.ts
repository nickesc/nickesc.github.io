const x = atob('aHR0cHM6Ly9mb3Jtc3ByZWUuaW8vZi94ZGVua2Vidw==');

type FormspreeError = {
	error: string;
	errors: { code: string; field: string; message: string }[];
};

export async function submitForm(
	name: string,
	email: string,
	message: string
): Promise<{ success: boolean; error: string | null }> {
	let error: string | null = null;
	let success: boolean = false;

	console.log(JSON.stringify({ name, email, message }));

	try {
		const res = await fetch(x, {
			method: 'POST',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, email, message })
		});

		if (res.ok) {
			success = true;
		} else {
			const data: FormspreeError = await res.json();
			error = data.errors.map((error) => `Error: ${error.field} - ${error.message}`).join('\n');
		}
	} catch (err) {
		console.error(err);
		error = 'Network error. Please try again.';
	}

	return { error, success };
}
