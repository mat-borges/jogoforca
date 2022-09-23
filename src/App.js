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
	const [palavra, setPalavra] = useState('');
	const [texto, setTexto] = useState('');
	const [gameStart, setGameStart] = useState(false);
	const [letrasSelecionadas, setLetrasSelecionadas] = useState([]);
	const [erros, setErros] = useState(0);
	const [imagem, setImagem] = useState(imagens[erros]);
	const [chute, setChute] = useState('');

	function selecionarLetra(index, letra) {
		if (!letrasSelecionadas.includes(letra)) {
			setLetrasSelecionadas([...letrasSelecionadas, letra]);
		}
		if (!palavra.includes(letra)) {
			setErros(erros + 1);
		}
		setarImagem();
	}

	function sortearIdPalavra() {
		return Math.round(Math.random() * palavras.length);
	}

	function palavraAleatoria() {
		const novaPalavra = palavras[sortearIdPalavra()].toUpperCase();
		const palavraArray = novaPalavra.split('');
		console.log(palavraArray);
		let palavraEdit = '';

		palavraArray.forEach(() => (palavraEdit += `_ `));

		setPalavra(novaPalavra);
		setTexto(palavraEdit);
		setGameStart(true);
	}

	function setarImagem() {
		setImagem(imagens[erros]);
	}

	function conferirChute(valor) {
		console.log(valor);
		if (chute.toUpperCase() === palavra) {
			alert('parabens');
		} else {
			alert('errou');
		}
		setChute('');
	}

	console.log(texto);
	console.log(gameStart);
	console.log(palavra);
	console.log(letrasSelecionadas);
	console.log(erros);
	console.log(imagem);

	return (
		<>
			<GlobalStyle />

			<JogoDiv>
				<img src={imagem} alt="imagem forca" data-identifier="game-image" />
				<Palavra>
					<SortearPalavra
						data-identifier="choose-word"
						onClick={palavraAleatoria}
						disabled={gameStart === true ? 'disabled' : ''}>
						Sortear Palavra
					</SortearPalavra>
					<AdvinhePalavra className="advinhePalavra" data-identifier="word">
						{texto}
					</AdvinhePalavra>
				</Palavra>
			</JogoDiv>

			<LetrasDiv>
				{alphabet.map((l, index) =>
					!letrasSelecionadas.includes(l) ? (
						<Letra
							key={index}
							onClick={() => selecionarLetra(index, l)}
							disabled={gameStart === true ? '' : 'disabled'}
							data-identifier="letter">
							{l}
						</Letra>
					) : (
						<LetraSelecionada
							key={index}
							onClick={() => selecionarLetra(index, l)}
							disabled={gameStart === true ? '' : 'disabled'}
							data-identifier="letter">
							{l}
						</LetraSelecionada>
					)
				)}
			</LetrasDiv>

			<ChuteDiv>
				<p>Já sei a palavra!</p>
				<ChuteInput
					type={'text'}
					data-identifier="type-guess"
					disabled={gameStart === true ? '' : 'disabled'}
					onChange={(e) => setChute(e.target.value)}></ChuteInput>
				<ChutarButton
					onClick={() => conferirChute('teste')}
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
	border: none;
	outline: none;
	border-radius: 4px;
	background-color: #27ae60;
	color: #ffffff;
	font-size: 16px;
	font-weight: 600;
	height: 40px;
	width: 200px;
`;

const AdvinhePalavra = styled.p`
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
	background-color: #e1ecf4;
	border-radius: 5px;
	color: #2c6a96;
	border: 1px solid #2c6a96;
	width: 40px;
	height: 40px;
	margin: 0 10px 10px 0;
`;

const LetraSelecionada = styled(Letra)`
	background-color: #9faab5;
	color: #87848a;
	border: 1px solid #87848a;
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
