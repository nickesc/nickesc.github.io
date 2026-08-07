export type Category =
	| 'code'
	| 'art'
	| 'design'
	| 'gamedev'
	| 'video'
	| 'writing'
	| 'extensions'
	| 'packages'
	| 'hardware'
	| 'other';

export type Project = {
	name: string;
	imgUrl: string;
	background: string;
	projectUrl: string;
	sourceUrl?: string;
	description: string;
	year: number;
	categories: Category[];
	featured?: true;
	archived?: true;
};

function logo(filename: string): string {
	return `/images/project-logos/${filename}`;
}

export const projects: Project[] = [
	{
		name: 'modpack-lock',
		imgUrl: logo('modpackLock.png'),
		background: '#363e3f',
		projectUrl: 'https://www.npmjs.com/package/modpack-lock',
		sourceUrl: 'https://github.com/nickesc/modpack-lock',
		description:
			'Creates a modpack lockfile for files hosted on Modrinth (mods, resource packs, shaders and datapacks).',
		year: 2026,
		categories: ['code', 'packages'],
		featured: true
	},

	{
		name: 'More JourneyMap Waypoints',
		imgUrl: logo('moreJourneyMapWaypoints.png'),
		background: '#0f0f0f',
		projectUrl: 'https://modrinth.com/project/more-journeymap-waypoints',
		sourceUrl: 'https://github.com/nickesc/More-JourneyMap-Waypoints',
		description: 'An addon resource pack for JourneyMap with more icons to use as waypoints.',
		year: 2026,
		categories: ['other', 'art']
	},

	{
		name: 'Pokémon GSC Clock Password Generator',
		imgUrl: logo('gscClockUtil.png'),
		background: '#232323',
		projectUrl: 'https://gsc-clock-util.batcomputer.xyz',
		sourceUrl: 'https://github.com/nickesc/gsc-clock-util',
		description: 'Generates a password to reset the clock in Pokemon Gold, Silver and Crystal.',
		year: 2025,
		categories: ['code']
	},

	{
		name: 'Pokémon Team Analyzer',
		imgUrl: logo('pokemonAnalysis.png'),
		background: '#232323',
		projectUrl: 'https://pokemon-analysis.batcomputer.xyz',
		description: 'Analyze a Pokemon team and generate reports on coverage.',
		year: 2025,
		categories: ['code']
	},

	{
		name: '4ajs',
		imgUrl: logo('4ajs.png'),
		background: '#80cfff',
		projectUrl: 'https://github.com/nickesc/4ajs',
		sourceUrl: 'https://github.com/nickesc/4ajs',
		description: 'A game made with love for the greatest person in the world.',
		year: 2025,
		categories: ['gamedev', 'code', 'art']
	},

	{
		name: 'animwebp',
		imgUrl: logo('animwebp.png'),
		background: '#f9f9f9',
		projectUrl: 'https://www.npmjs.com/package/animwebp',
		sourceUrl: 'https://github.com/nickesc/animwebp',
		description: 'Convert a sequence of images to an animated WebP.',
		year: 2025,
		categories: ['code', 'packages']
	},

	{
		name: 'input-terminal',
		imgUrl: logo('inputTerminal.png'),
		background: '#0c0c0c',
		projectUrl: 'https://nickesc.github.io/input-terminal/',
		sourceUrl: 'https://github.com/nickesc/input-terminal',
		description: 'Turn any HTMLInputElement into a terminal interface.',
		year: 2025,
		categories: ['code', 'packages'],
		featured: true
	},

	{
		name: 'Steploop',
		imgUrl: logo('steploop.png'),
		background: '#fb3448',
		projectUrl: 'https://www.npmjs.com/package/steploop',
		sourceUrl: 'https://github.com/nickesc/steploop',
		description: 'A foundation for building loops that execute at a consistent, specified rate.',
		year: 2025,
		categories: ['code', 'packages'],
		featured: true
	},

	{
		name: 'No More AI Search',
		imgUrl: logo('noMoreAiSearch.png'),
		background: '#0f0f0f',
		projectUrl: 'https://github.com/nickesc/no-more-ai-search',
		sourceUrl: 'https://github.com/nickesc/no-more-ai-search',
		description: 'Remove the AI Mode button and AI Overview from Google Search results.',
		year: 2025,
		categories: ['code', 'extensions']
	},

	{
		name: 'QR-Baker',
		imgUrl: logo('qrBaker.png'),
		background: '#46465b',
		projectUrl: 'https://nickesc.github.io/qr-baker/',
		sourceUrl: 'https://github.com/nickesc/qr-baker',
		description: 'Multi-platform QR code generator built with Godot 4.',
		year: 2025,
		categories: ['code', 'gamedev']
	},

	{
		name: 'Keyboard Layouts',
		imgUrl: logo('keyboardLayouts.png'),
		background: '#fff',
		projectUrl: 'https://github.com/nickesc/KeyboardLayouts/blob/main/README.md',
		sourceUrl: 'https://github.com/nickesc/keyboardLayouts',
		description: 'Various keyboard layouts in SVG and PNG formats, organized by category/size.',
		year: 2025,
		categories: ['art']
	},

	{
		name: 'White Background Enforcer',
		imgUrl: logo('wbge.png'),
		background: '#2B2B2B',
		projectUrl: 'https://addons.mozilla.org/en-US/firefox/addon/wbge/',
		sourceUrl: 'https://github.com/nickesc/white-background-enforcer',
		description:
			'A browser extension that sets a white background on pages where background-color is not explicitly set.',
		year: 2025,
		categories: ['code', 'extensions']
	},

	{
		name: 'Controller Mapping Templates',
		imgUrl: logo('controllerMappingTemplates.png'),
		background: '#FFFFFF',
		projectUrl: 'https://nickesc.itch.io/controller-mapping-templates',
		sourceUrl: 'https://github.com/nickesc/controller-mapping-templates',
		description: 'Simple templates to create controller mapping images for a number of gamepads.',
		year: 2025,
		categories: ['art', 'gamedev']
	},

	{
		name: 'Client-Enhanced',
		imgUrl: logo('clientEnhanced.png'),
		background: '#76D676',
		projectUrl: 'https://github.com/nickesc/client-enhanced/releases',
		sourceUrl: 'https://github.com/nickesc/client-enhanced',
		description:
			'A client-side Minecraft modpack that aims to overhaul and modernize the experience.',
		year: 2024,
		categories: ['other'],
		featured: true
	},

	{
		name: 'deltaskin-template',
		imgUrl: logo('deltaskinTemplate.png'),
		background: '#9636EB',
		projectUrl: 'https://github.com/nickesc/deltaskin-template',
		sourceUrl: 'https://github.com/nickesc/deltaskin-template',
		description: 'A template and build system for creating skins for the Delta emulator.',
		year: 2024,
		categories: ['other'],
		archived: true
	},

	{
		name: 'tempChecker',
		imgUrl: logo('tempCheckerLogo.png'),
		background: '#111111',
		projectUrl: 'https://io.adafruit.com/nickesc/dashboards/room-environment',
		sourceUrl: 'https://github.com/nickesc/tempChecker',
		description:
			'A small project to track the temperature and other conditions in my bedroom and other rooms of my house.',
		year: 2023,
		categories: ['code', 'hardware'],
		archived: true
	},

	{
		name: 'loggedmessage',
		imgUrl: logo('loggedmessageLogo.png'),
		background: '#CECECE',
		projectUrl: 'https://www.npmjs.com/package/loggedmessage',
		sourceUrl: 'https://github.com/nickesc/loggedmessage',
		description:
			'A simple but flexible console logging library with common-sense builtin functions and defaults.',
		year: 2023,
		categories: ['code']
	},

	{
		name: 'Starfish',
		imgUrl: logo('starfishLogo.png'),
		background: '#92D0DD',
		projectUrl: 'https://nickesc.itch.io/starfish',
		sourceUrl: 'https://github.com/nickesc/projectStarfish',
		description:
			'A small, physics-based game with a simple premise: throw the Starfish as far as you can before the timer runs out! Built with Godot as a part of the Gamedev.js Jam 2023 game jam.',
		year: 2023,
		categories: ['gamedev', 'code', 'art'],
		featured: true
	},

	{
		name: 'The BumbleBee',
		imgUrl: logo('bumblebeeLogo.png'),
		background: '#152C49',
		projectUrl: 'https://nickesc.github.io/BumbleBee',
		sourceUrl: 'https://github.com/nickesc/bumblebee',
		description:
			'A portable word game generator written in CircuitPython, based on The New York Times Spelling Bee.',
		year: 2023,
		categories: ['gamedev', 'code', 'hardware', 'writing'],
		featured: true
	},

	{
		name: '.dotfiles',
		imgUrl: logo('dotfilesLogo.png'),
		background: '#28704F',
		projectUrl: 'https://github.com/nickesc/.dotfiles',
		sourceUrl: 'https://github.com/nickesc/.dotfiles',
		description:
			'My .dotfile repository for automated MacOS setup, including custom scripts and themes.',
		year: 2022,
		categories: ['code']
	},

	{
		name: 'note',
		imgUrl: logo('noteLogo.png'),
		background: '#232323',
		projectUrl: 'https://github.com/nickesc/.dotfiles/blob/main/scripts/note',
		sourceUrl: 'https://github.com/nickesc/.dotfiles/blob/main/scripts/note',
		description:
			"A ZSH script to manage 'notes' and 'notebooks' from the command line; creates git tracked directories of Markdown files for easy access to notes.",
		year: 2022,
		categories: ['code'],
		archived: true
	},

	{
		name: 'VSCode Paradise',
		imgUrl: logo('paradiseLogo.png'),
		background: '#151515',
		projectUrl:
			'https://marketplace.visualstudio.com/items?itemName=nickesc.vscode-paradise-nickesc',
		sourceUrl: 'https://github.com/nickesc/vscode-paradise-nickesc',
		description:
			'An alternate port of the Paradise theme by Manas140 to VSCode, released on the Visual Studio Code Marketplace.',
		year: 2022,
		categories: ['code', 'extensions']
	},

	{
		name: 'ScaredyBot',
		imgUrl: logo('scaredyBotLogo.png'),
		background: '#29485d',
		projectUrl: 'https://nickesc.github.io/scaredyBot/',
		sourceUrl: 'https://github.com/nickesc/scaredyBot',
		description:
			'A robot that runs away from people, built using an iRobot Create2, the pyCreate2 library and a Raspberry Pi.',
		year: 2022,
		categories: ['code', 'hardware', 'writing']
	},

	{
		name: 'Gmail Explorer',
		imgUrl: logo('gmailExplorerLogo.png'),
		background: '#e0dfea',
		projectUrl: 'https://github.com/nickesc/GmailExplorer',
		sourceUrl: 'https://github.com/nickesc/GmailExplorer',
		description:
			"A series of Jupyter Notebooks that grab and visualize nearly every email I've ever received.",
		year: 2022,
		categories: ['code', 'writing', 'art'],
		archived: true
	},

	{
		name: 'My Girlfriend is Curious',
		imgUrl: logo('mgicLogo.png'),
		background: '#191414',
		projectUrl: 'https://nickesc.github.io/My-Girlfriend-is-Curious',
		sourceUrl: 'https://github.com/nickesc/My-Girlfriend-is-Curious',
		description:
			"My girlfriend wants to know what I’m listening to, and I don’t like Spotify displaying it on their app, so I wrote a small server and HTML tag using Spotify's API and thelinmichael/spotify-web-api-node that will return and display my current listening activity.",
		year: 2022,
		categories: ['code']
	},

	{
		name: 'Logos',
		imgUrl: logo('logosLogo.png'),
		background: '#EF5252',
		projectUrl: 'https://nickesc.github.io/N.-Escobar-Media-Branding/Logos/logos.html',
		sourceUrl: 'https://github.com/nickesc/N.-Escobar-Media-Branding/tree/main/Logos',
		description:
			'A reference for my different logos. Provides image links, HTML tags and color codes useful when making other projects to keep branding consistent',
		year: 2022,
		categories: ['art', 'code'],
		archived: true
	},

	{
		name: 'Branches',
		imgUrl: logo('branchesLogo.png'),
		background: '#e0e0e0',
		projectUrl: 'https://github.com/nickesc/BranchesGame',
		sourceUrl: 'https://github.com/nickesc/BranchesGame',
		description:
			'Branches: A Game of Choice and Agency is a game that aims to create a feeling of agency for the player through the use of choice and branching narrative.',
		year: 2021,
		categories: ['gamedev', 'code', 'writing', 'art']
	},

	{
		name: 'Branches Script',
		imgUrl: logo('branchesScriptLogo.png'),
		background: '#e0e0e0',
		projectUrl: 'https://nickesc.github.io/Branches-Script/',
		sourceUrl: 'https://github.com/nickesc/Branches-Script/',
		description:
			'The script page for Branches. Frontend and backend with a database for lines in the script. Used the webpage to keep voice actors updated on lines I needed recoded while making the game, and sent notifications to them when a new line is added. The database is currently broken.',
		year: 2021,
		categories: ['code', 'gamedev', 'writing'],
		archived: true
	},

	{
		name: 'Homebaked Pi: Arithmetic',
		imgUrl: logo('hbPiALogo.png'),
		background: '#000000',
		projectUrl: 'https://github.com/nickesc/HomebakedPiArithmetic',
		sourceUrl: 'https://github.com/nickesc/HomebakedPiArithmetic',
		description: 'Bare metal coding a Raspberry Pi into a calculator with a primitive GUI.',
		year: 2021,
		categories: ['code']
	},

	{
		name: 'Steam Tools API',
		imgUrl: logo('steamToolsApiLogo.png'),
		background: '#1B2838',
		projectUrl: 'https://steam-tools-nickesc.herokuapp.com/',
		sourceUrl: 'https://github.com/nickesc/SteamToolsAPI',
		description:
			'A wrapper for the Steam Web API. Unfinished but semi-robust, allows users to explore the Steam Web API a little more easily.',
		year: 2021,
		categories: ['code'],
		archived: true
	},

	{
		name: 'Wildlife',
		imgUrl: logo('wildlifeLogo.png'),
		background: '#2D417C',
		projectUrl: 'https://nickesc.github.io/Wildlife/',
		sourceUrl: 'https://github.com/nickesc/Wildlife',
		description:
			"A spoof of a Steam listing for the fake game, Wildlife: Speculative Explorations of Southern California's Animal Ecology. Wildlife is an exploration of a potential climate change future, made as a part of an experimental art class.",
		year: 2021,
		categories: ['art']
	},

	{
		name: 'Lice License Templates',
		imgUrl: logo('lltLogo.png'),
		background: '#C1A4DD',
		projectUrl: 'https://github.com/nickesc/N.-Escobar-Media-Branding/blob/main/license-info.md',
		sourceUrl: 'https://github.com/nickesc/license-templates',
		description: 'Better license templates for the Lice license generator.',
		year: 2021,
		categories: ['code'],
		archived: true
	},

	{
		name: 'In Our Backyard',
		imgUrl: logo('iobLogo.png'),
		background: '#142d14',
		projectUrl: 'https://github.com/nickesc/In-Our-Backyard',
		sourceUrl: 'https://github.com/nickesc/In-Our-Backyard',
		description:
			'A collaboration between my parents and me; a project containing an animation and guide, both based around point-cloud visualization.',
		year: 2021,
		categories: ['art', 'writing']
	},

	{
		name: 'Valor',
		imgUrl: logo('valorLogo.png'),
		background: '#7C5745',
		projectUrl: '#',
		description:
			'The final project from my COMP 131 class. An confusing first person dungeon crawler, written in Java. No links to this yet.',
		year: 2019,
		categories: ['gamedev', 'code'],
		archived: true
	}
];
