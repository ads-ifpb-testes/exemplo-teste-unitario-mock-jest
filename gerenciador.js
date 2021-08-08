import { repositorio } from "./repositorio";

const addFilme = (...novosFilmes) => {
	const anoCorrente = new Date().getFullYear();
	novosFilmes.forEach((filme) => {
		if (
			filme.nome == null ||
			filme.nome === "" ||
			filme.ano > anoCorrente
		) {
			throw Error("Não é possível adicionar filmes futuros");
		} else {
			const filmesAtuais = repositorio.listar();
			const index = filmesAtuais.findIndex(
				(filmeArmazenado) =>
					filmeArmazenado.ano == filme.ano &&
					filmeArmazenado.nome == filme.nome
			);
			if (index != -1) {
				throw Error("Esse filme já existe");
			}
		}
	});

	repositorio.inserir(novosFilmes);
};
const removerFilme = (filmeRemovido) => {
	repositorio.remover(filmeRemovido);
};

const getQtdeFilmes = () => repositorio.listar().length;
const limparFilmes = () => repositorio.limpar();

export { addFilme, removerFilme, getQtdeFilmes, limparFilmes };
