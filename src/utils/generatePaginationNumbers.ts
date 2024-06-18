export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
	// Si el numero total de paginas es 7 o menos
	// Vamos a mostrar todas las paginas sin putos suspensivos.

	if (totalPages < 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	// Si la paginna actual se enncuentra entre las primeras 3 paginas
	// mostrar las primeras 3, puntos suspensivos y las ultimas 2
	if (currentPage <= 3) {
		return [1, 2, 3, "...", totalPages - 1, totalPages];
	}

	// Si la paginna actual se enncuentra entre las ultimas 3 paginas
	// mostrar las primeras 2, puntos suspensivos y las ultimas 3
	if (currentPage <= 3) {
		return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
	}
	// Si la paginna actual se enncuentra en el medio
	// mostrar la primera, puntos suspensivos la pagina actual y vecninos
	if (currentPage <= 3) {
		return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
	}
};
