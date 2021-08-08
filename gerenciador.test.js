import {
	addFilme,
	getQtdeFilmes,
	limparFilmes,
	removerFilme,
} from "./gerenciador";

describe("Gerenciador de filmes", () => {
	beforeEach(() => {
		limparFilmes();
	});

	test("Deve inserir apenas 1 filme", () => {
		const filmeTeste = {
			nome: "Homem de Ferro",
			ano: 2008,
		};

		addFilme(filmeTeste);
		const qtdeFilmes = getQtdeFilmes();
		expect(qtdeFilmes).toBe(1);
	});

	test("Deve inserir vários filmes", () => {
		const filme1 = {
			nome: "Capitão América: Guerra Civil",
			ano: 2016,
		};

		const filme2 = {
			nome: "Vingadores: Era de Ultron",
			ano: 2015,
		};

		const qtdeFilmesEsperado = 2;
		addFilme(filme1, filme2);
		expect(getQtdeFilmes()).toBe(qtdeFilmesEsperado);
	});

	test("Deve remover um filme", () => {
		const filme = {
			nome: "Madagascar",
			ano: 2005,
		};

		addFilme(filme);
		expect(getQtdeFilmes()).toBe(1);

		removerFilme(filme);
		expect(getQtdeFilmes()).toBe(0);
	});

	test("Não deve inserir filmes com data futura", () => {
		const filme = {
			nome: "Doutor Estranho no Multiverso da Loucura",
			ano: 2022,
		};

		expect(() => {
			addFilme(filme);
		}).toThrow(Error);
	});

	test("Filmes não podem ter nome vazio", () => {
		const filme = {
			nome: "",
		};
		expect(() => {
			addFilme(filme);
		}).toThrow(Error);
	});
});

// });
