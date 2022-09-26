import styled from 'styled-components';

export default function Jogo(props) {
	return (
		<JogoDiv>
			<img src={props.imagem} alt="imagem forca" data-identifier="game-image" />
			<Palavra>
				<SortearPalavra
					data-identifier="choose-word"
					onClick={props.sortearPalavra}
					backgroundColor={`#27ae60`}>
					{props.gameStart === false ? 'Sortear Palavra' : 'Sortear Nova Palavra'}
				</SortearPalavra>
				<ImagemResultado
					src={
						props.status === 'ganhou'
							? 'https://i.pinimg.com/originals/3c/1b/79/3c1b796e422435beccdf379027a468d7.gif'
							: 'https://media1.giphy.com/media/1ymqeIFIHv5A1Dg2ni/giphy.gif'
					}
					display={props.status === 'jogando' ? 'none' : 'initial'}
					alt="gif comemoração"
				/>
				<AdvinhePalavra cor={props.conferirResultado} data-identifier="word">
					{props.texto}
				</AdvinhePalavra>
			</Palavra>
		</JogoDiv>
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
	width: 250px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`;

const ImagemResultado = styled.img`
	display: ${(props) => props.display};
	max-width: 350px;
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
