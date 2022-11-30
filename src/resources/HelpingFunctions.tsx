export let renderPokemoneName = (name: string) => `${name.charAt(0).toUpperCase()}${name.slice(1)}`;

export let renderPokemonId = (id: number) => `#${String(id).padStart(3, '0')}`;

export let renderPokemonTypeName = (name: string) => `${name.charAt(0).toUpperCase()}${name.slice(1)}`;