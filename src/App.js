import { useState } from 'react';
import GlobalStyle from './style/GlobalStyle.js';
import forca0 from './assets/forca0.png';
import forca1 from './assets/forca1.png';
import forca2 from './assets/forca2.png';
import forca3 from './assets/forca3.png';
import forca4 from './assets/forca4.png';
import forca5 from './assets/forca5.png';
import forca6 from './assets/forca6.png';
import palavras from './arrays/palavras.js';
import Jogo from './components/Jogo.js';
import Letras from './components/Letras.js';
import Chute from './components/Chute.js';

export default function App() {
	const imagens = [forca0, forca1, forca2, forca3, forca4, forca5, forca6];

	// States
	const [palavra, setPalavra] = useState('');
	const [palavraNormalizada, setPalavraNormalizada] = useState('');
	const [texto, setTexto] = useState('');
	const [gameStart, setGameStart] = useState(false);
	const [letrasSelecionadas, setLetrasSelecionadas] = useState([]);
	const [erros, setErros] = useState(0);
	const [imagem, setImagem] = useState(imagens[erros]);
	const [chute, setChute] = useState('');
	const [status, setStatus] = useState('jogando');

	// Tirar acentos e cedilhas
	function normalizarPalavra(str) {
		return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	}

	// Sortear uma palavra e começar o jogo
	function sortearPalavra() {
		const i = Math.floor(Math.random() * palavras.length);
		const novaPalavra = palavras[i].toUpperCase();
		const novaPalavraNormalizada = normalizarPalavra(novaPalavra);
		const palavraUnderlines = novaPalavra.split('').map(() => '_');

		setPalavra(novaPalavra);
		setPalavraNormalizada(novaPalavraNormalizada);
		setTexto(palavraUnderlines.join(' '));
		setGameStart(true);
		setLetrasSelecionadas([]);
		setStatus('jogando');
		setErros(0);
		setarImagem(0);
	}

	// Mostrar imagem de acordo com o número de erros
	function setarImagem(nErro) {
		setImagem(imagens[nErro]);
	}

	// Ações ao selecionar uma letra
	function selecionarLetra(index, letra) {
		const textoEdit = texto.split(' ');
		let novoErro = erros;

		if (!letrasSelecionadas.includes(letra)) {
			setLetrasSelecionadas([...letrasSelecionadas, letra]);
		}

		if (palavraNormalizada.includes(letra)) {
			palavraNormalizada.split('').forEach((e, i) => {
				if (palavraNormalizada.split('')[i] === letra) {
					textoEdit[i] = palavra[i];
				}
			});
			setTexto(textoEdit.join(' '));
			if (textoEdit.join('') === palavra) {
				setStatus('ganhou');
				setGameStart(false);
			}
		} else if (!palavraNormalizada.includes(letra) && novoErro < 5) {
			setErros(erros + 1);
			novoErro++;
			setarImagem(novoErro);
		} else if (novoErro >= 5) {
			setarImagem(6);
			setTexto(palavra);
			setStatus('perdeu');
			setGameStart(false);
		}
	}

	// Conferir se o chute inserido === palavra
	function conferirChute(valor) {
		if (valor.toUpperCase() === palavra) {
			setTexto(palavra);
			setStatus('ganhou');
			setGameStart(false);
		} else {
			setTexto(palavra);
			setImagem(forca6);
			setGameStart(false);
			setStatus('perdeu');
		}
		setChute('');
	}

	// Conferir resultado

	function conferirResultado() {
		if (status === 'jogando') {
			return '#000000';
		} else if (status === 'ganhou') {
			return 'green';
		} else if (status === 'perdeu') {
			return 'red';
		}
	}

	return (
		<>
			<GlobalStyle />

			<Jogo
				gameStart={gameStart}
				imagem={imagem}
				sortearPalavra={() => sortearPalavra()}
				conferirResultado={() => conferirResultado()}
				texto={texto}
				status={status}
			/>
			<Letras
				gameStart={gameStart}
				letrasSelecionadas={letrasSelecionadas}
				selecionarLetra={(index, letra) => selecionarLetra(index, letra)}
			/>
			<Chute
				gameStart={gameStart}
				setChute={(e) => setChute(e)}
				chute={chute}
				conferirChute={(e) => conferirChute(e)}
			/>
		</>
	);
}
