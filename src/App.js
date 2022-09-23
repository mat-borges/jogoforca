import styled from 'styled-components';
import GlobalStyle from './GlobalStyle.js';
import forcaOne from './assets/forca0.png';
import forcaTwo from './assets/forca1.png';
import forcaThree from './assets/forca2.png';
import forcaFour from './assets/forca3.png';
import forcaFive from './assets/forca4.png';
import forcaSix from './assets/forca5.png';
import forcaSeven from './assets/forca6.png';
import alphabet from './alphabet.js';
import palavras from './palavras.js';

function Jogo() {
	return (
		<JogoDiv>
			<img src={forcaOne} alt="forca inicial" data-identifier="game-image" />
			<Palavra>
				<EscolherPalavra data-identifier="choose-word" onClick={() => alert('Escolher Palavra')}>
					Escolher Palavra
				</EscolherPalavra>
				<AdvinhePalavra className="advinhePalavra" data-identifier="word">
					_ _ _ _ _ _
				</AdvinhePalavra>
			</Palavra>
		</JogoDiv>
	);
}

function Letras() {
	function selecionarLetra(index, letra) {
		alert(`${index} - ${letra}`);
	}

	return (
		<LetrasDiv>
			{alphabet.map((l, index) => (
				<Letra data-identifier="letter" onClick={() => selecionarLetra(index, l)}>
					{l}
				</Letra>
			))}
		</LetrasDiv>
	);
}

function Chute() {
	return (
		<ChuteDiv>
			<p>Já sei a palavra!</p>
			<ChuteInput type={'text'} data-identifier="type-guess"></ChuteInput>
			<ChutarButton data-identifier="guess-button" onClick={() => alert('Chutar')}>
				Chutar
			</ChutarButton>
		</ChuteDiv>
	);
}

export default function App() {
	return (
		<div>
			<GlobalStyle />
			<Jogo />
			<Letras />
			<Chute />
		</div>
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

const EscolherPalavra = styled.button`
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
	font-size: 18px;
	font-weight: 500;
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
