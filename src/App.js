import styled from 'styled-components';
import GlobalStyle from './GlobalStyle.js';
import forca0 from './assets/forca0.png';
import forca1 from './assets/forca1.png';
import forca2 from './assets/forca2.png';
import forca3 from './assets/forca3.png';
import forca4 from './assets/forca4.png';
import forca5 from './assets/forca5.png';
import forca6 from './assets/forca6.png';
import alphabet from './alphabet.js';
import palavras from './palavras.js';
import { useState } from 'react';

export default function App() {
	const imagens = [forca0, forca1, forca2, forca3, forca4, forca5, forca6];

	// States
	const [palavra, setPalavra] = useState('');
	const [palavraNormalizada, setPalavraNormalizada] = useState('');
	const [palavraArray, setPalavraArray] = useState([]);
	const [palavraNormalizadaArray, setPalavraNormalizadaArray] = useState([]);
	const [texto, setTexto] = useState('');
	const [gameStart, setGameStart] = useState(false);
	const [letrasSelecionadas, setLetrasSelecionadas] = useState([]);
	const [erros, setErros] = useState(0);
	const [imagem, setImagem] = useState(imagens[erros]);
	const [chute, setChute] = useState('');
	const [status, setStatus] = useState('jogando');

	// Tirar acentos e cedilhas
	function normalizarPalavra(str) {
		str = str.replace(/[ÀÁÂÃÄÅ]/, 'A');
		str = str.replace(/[àáâãäå]/, 'a');
		str = str.replace(/[ÈÉÊË]/, 'E');
		str = str.replace(/[èéêë]/, 'e');
		str = str.replace(/[ÌÍÏ]/, 'I');
		str = str.replace(/[ìíï]/, 'i');
		str = str.replace(/[ÒÓÔÕÖ]/, 'O');
		str = str.replace(/[òóôõö]/, 'o');
		str = str.replace(/[ÙÚÜ]/, 'U');
		str = str.replace(/[ùúü]/, 'u');
		str = str.replace(/[Ç]/, 'C');
		str = str.replace(/[ç]/, 'c');

		return str.replace(/[^a-z0-9]/gi, '');
	}

	// Random ID
	function sortearIdPalavra() {
		return Math.round(Math.random() * palavras.length);
	}

	// Sortear uma palavra e começar o jogo
	function sortearPalavra() {
		const novaPalavra = palavras[sortearIdPalavra()].toUpperCase();
		const novaPalavraNormalizada = normalizarPalavra(novaPalavra);
		const novaPalavraArray = novaPalavra.split('');
		const novaPalavraNormalizadaArray = novaPalavraNormalizada.split('');
		let palavraUnderlines = novaPalavraArray.map((e) => '_');

		setPalavra(novaPalavra);
		setPalavraNormalizada(novaPalavraNormalizada);
		setPalavraArray(novaPalavraArray);
		setPalavraNormalizadaArray(novaPalavraNormalizadaArray);
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
		let textoEdit = texto.split(' ');
		let novoErro = erros;

		if (!letrasSelecionadas.includes(letra)) {
			setLetrasSelecionadas([...letrasSelecionadas, letra]);
		}

		if (palavraNormalizada.includes(letra)) {
			palavraNormalizadaArray.forEach((e, i) => {
				if (palavraNormalizadaArray[i] === letra) {
					textoEdit[i] = palavraArray[i];
				} else {
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

	console.log(palavra);

	return (
		<>
			<GlobalStyle />

			<JogoDiv>
				<img src={imagem} alt="imagem forca" data-identifier="game-image" />
				<Palavra>
					<SortearPalavra
						data-identifier="choose-word"
						onClick={sortearPalavra}
						backgroundColor={`#27ae60`}>
						{gameStart === false ? 'Sortear Palavra' : 'Sortear Nova Palavra'}
					</SortearPalavra>
					<AdvinhePalavra cor={conferirResultado} data-identifier="word">
						{texto}
					</AdvinhePalavra>
				</Palavra>
			</JogoDiv>

			<LetrasDiv>
				{alphabet.map((l, index) => (
					<Letra
						key={index}
						onClick={() => selecionarLetra(index, l)}
						disabled={gameStart === true ? '' : 'disabled'}
						data-identifier="letter"
						backgroundColor={!letrasSelecionadas.includes(l) ? '#e1ecf4' : '#9faab5'}
						letterBorderColor={!letrasSelecionadas.includes(l) ? '#2c6a96' : '#87848a'}>
						{l}
					</Letra>
				))}
			</LetrasDiv>

			<ChuteDiv>
				<p>Já sei a palavra!</p>
				<ChuteInput
					type={'text'}
					data-identifier="type-guess"
					disabled={gameStart === true ? '' : 'disabled'}
					onChange={(e) => setChute(e.target.value)}
					value={chute}></ChuteInput>
				<ChutarButton
					onClick={() => conferirChute(chute)}
					disabled={gameStart === true ? '' : 'disabled'}
					data-identifier="guess-button">
					Chutar
				</ChutarButton>
			</ChuteDiv>
		</>
	);
}

const JogoDiv = styled.div`
	height: 700px;
	margin: 40px 0;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 30px;
`;

const Palavra = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`;

const SortearPalavra = styled.button`
	background-color: ${(props) => props.backgroundColor};
	border: none;
	outline: none;
	border-radius: 4px;
	color: #ffffff;
	font-size: 16px;
	font-weight: 600;
	height: 40px;
	width: 200px;
`;

const AdvinhePalavra = styled.p`
	color: ${(props) => props.cor};
	font-size: 24px;
	font-weight: 600;
	padding-bottom: 20px;
`;

const LetrasDiv = styled.div`
	width: 46vw;
	max-width: 660px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	margin: 0 auto;
`;

const Letra = styled.button`
	background-color: ${(props) => props.backgroundColor};
	color: ${(props) => props.letterBorderColor};
	border: 1px solid ${(props) => props.letterBorderColor};
	border-radius: 5px;
	width: 40px;
	height: 40px;
	margin: 0 10px 10px 0;
`;

const ChuteDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
	p {
		font-size: 14px;
	}
`;

const ChuteInput = styled.input`
	height: 20px;
	margin: 0 5px;
	width: 400px;
`;

const ChutarButton = styled(Letra)`
	width: 60px;
	height: 30px;
	margin: 0;
`;
