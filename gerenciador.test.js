import {
	addFilme,
	getQtdeFilmes,
	limparFilmes,
	removerFilme,
} from "./gerenciador";
import { repositorio } from "./repositorio";

jest.mock("./repositorio");

describe("Gerenciador de filmes", () => {
	beforeEach(() => {
		limparFilmes();
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
		repositorio.listar.mockReturnValue([]);
		addFilme(filme1, filme2);
		repositorio.listar.mockReturnValue([filme1, filme2]);

		expect(getQtdeFilmes()).toBe(qtdeFilmesEsperado);
	});

	test("Deve remover um filme", () => {
		const filme = {
			nome: "Madagascar",
			ano: 2005,
		};

		addFilme(filme);
		repositorio.listar.mockReturnValue([filme]);
		expect(getQtdeFilmes()).toBe(1);

		removerFilme(filme);
		repositorio.listar.mockReturnValue([]);
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

	test("Não deve permitir dois filmes com o mesmo nome e ano", () => {
		const filme = {
			nome: "Madagascar",
			ano: 2005,
		};

		repositorio.listar.mockReturnValue([filme]);

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
